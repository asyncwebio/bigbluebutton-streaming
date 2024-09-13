import React from 'react';
import { isEqual } from 'radash';
import {
  persistShape,
  removeShapes,
  notifyNotAllowedChange,
  notifyShapeNumberExceeded,
} from './service';

const WHITEBOARD_CONFIG = Meteor.settings.public.whiteboard;
const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const findRemoved = (A, B) => A.filter((a) => !B.includes(a));

const filterInvalidShapes = (shapes, curPageId, tldrawAPI) => {
  const retShapes = shapes;
  const keys = Object.keys(shapes);
  const removedChildren = [];
  const removedParents = [];

  keys.forEach((shape) => {
    if (shapes[shape].parentId !== curPageId) {
      if (!keys.includes(shapes[shape].parentId)) {
        delete retShapes[shape];
      }
    } else if (shapes[shape].type === 'group') {
      const groupChildren = shapes[shape].children;

      groupChildren.forEach((child) => {
        if (!keys.includes(child)) {
          removedChildren.push(child);
        }
      });
      retShapes[shape].children = groupChildren.filter((child) => !removedChildren.includes(child));

      if (shapes[shape].children.length < 2) {
        removedParents.push(shape);
        delete retShapes[shape];
      }
    }
  });
  // remove orphaned children
  Object.keys(shapes).forEach((shape) => {
    if (shapes[shape] && shapes[shape].parentId !== curPageId) {
      if (removedParents.includes(shapes[shape].parentId)) {
        delete retShapes[shape];
      }
    }

    // remove orphaned bindings
    if (shapes[shape] && shapes[shape].type === 'arrow'
      && (shapes[shape].handles.start.bindingId || shapes[shape].handles.end.bindingId)) {
      const startBinding = shapes[shape].handles.start.bindingId;
      const endBinding = shapes[shape].handles.end.bindingId;

      const startBindingData = tldrawAPI?.getBinding(startBinding);
      const endBindingData = tldrawAPI?.getBinding(endBinding);

      if (startBinding && (!startBindingData && (
        removedParents.includes(startBindingData?.fromId)
        || removedParents.includes(startBindingData?.toId)
        || !keys.includes(startBindingData?.fromId)
        || !keys.includes(startBindingData?.toId)
      ))) {
        delete retShapes[shape].handles.start.bindingId;
      }
      if (endBinding && (!endBindingData && (
        removedParents.includes(endBindingData?.fromId)
        || removedParents.includes(endBindingData?.toId)
        || !keys.includes(endBindingData?.fromId)
        || !keys.includes(endBindingData?.toId)
      ))) {
        delete retShapes[shape].handles.end.bindingId;
      }
    }
  });
  return retShapes;
};

const isValidShapeType = (shape) => {
  const invalidTypes = ['image', 'video'];
  return !invalidTypes.includes(shape?.type);
};

const sendShapeChanges = (
  app,
  changedShapes,
  shapes,
  prevShapes,
  hasShapeAccess,
  whiteboardId,
  currentUser,
  intl,
  redo = false,
) => {
  let isModerator = currentUser?.role === ROLE_MODERATOR;

  const invalidChange = Object.keys(changedShapes)
    .find((id) => !hasShapeAccess(id));

  const invalidShapeType = Object.keys(changedShapes)
    .find((id) => !isValidShapeType(changedShapes[id]));

  const currentShapes = app?.document?.pages[app?.currentPageId]?.shapes;
  const { maxNumberOfAnnotations } = WHITEBOARD_CONFIG;
  // -1 for background shape
  const shapeNumberExceeded = Object.keys(currentShapes).length - 1 > maxNumberOfAnnotations;

  const isInserting = Object.keys(changedShapes)
    .filter(
      (shape) => typeof changedShapes[shape] === 'object'
        && changedShapes[shape].type
        && !prevShapes[shape],
    ).length !== 0;

  if (invalidChange || invalidShapeType || (shapeNumberExceeded && isInserting)) {
    if (shapeNumberExceeded) {
      notifyShapeNumberExceeded(intl, maxNumberOfAnnotations);
    } else {
      notifyNotAllowedChange(intl);
    }
    const modApp = app;
    // undo last command without persisting to not generate the onUndo/onRedo callback
    if (!redo) {
      const command = app.stack[app.pointer];
      modApp.pointer -= 1;
      app.applyPatch(command.before, 'undo');
      return;
      // eslint-disable-next-line no-else-return
    } else {
      modApp.pointer += 1;
      const command = app.stack[app.pointer];
      app.applyPatch(command.after, 'redo');
      return;
    }
  }
  const deletedShapes = [];
  Object.entries(changedShapes)
    .forEach(([id, shape]) => {
      if (!shape) deletedShapes.push(id);
      else {
        // checks to find any bindings assosiated with the changed shapes.
        // If any, they may need to be updated as well.
        const pageBindings = app.page.bindings;
        if (pageBindings) {
          Object.entries(pageBindings).forEach(([, b]) => {
            if (b.toId.includes(id)) {
              const boundShape = app.getShape(b.fromId);
              if (shapes[b.fromId] && !isEqual(boundShape, shapes[b.fromId])) {
                const shapeBounds = app.getShapeBounds(b.fromId);
                boundShape.size = [shapeBounds.width, shapeBounds.height];
                persistShape(boundShape, whiteboardId, isModerator);
              }
            }
          });
        }
        let modShape = shape;
        if (!shape.id) {
          // check it already exists (otherwise we need the full shape)
          if (!shapes[id]) {
            modShape = app.getShape(id);
          }
          modShape.id = id;
        }
        const shapeBounds = app.getShapeBounds(id);
        const size = [shapeBounds.width, shapeBounds.height];
        if (!shapes[id] || (shapes[id] && !isEqual(shapes[id].size, size))) {
          modShape.size = size;
        }
        if (!shapes[id] || (shapes[id] && !shapes[id].userId)) {
          modShape.userId = currentUser?.userId;
        }
        // do not change moderator status for existing shapes
        if (shapes[id]) {
          isModerator = shapes[id].isModerator;
        }
        persistShape(modShape, whiteboardId, isModerator);
      }
    });

  // order the ids of shapes being deleted to prevent crash
  // when removing a group shape before its children
  const orderedDeletedShapes = [];
  deletedShapes.forEach((eid) => {
    if (shapes[eid]?.type !== 'group') {
      orderedDeletedShapes.unshift(eid);
    } else {
      orderedDeletedShapes.push(eid);
    }
  });

  if (orderedDeletedShapes.length > 0) {
    removeShapes(orderedDeletedShapes, whiteboardId);
  }
};

// map different localeCodes from bbb to tldraw
const mapLanguage = (language) => {
  // bbb has xx-xx but in tldraw it's only xx
  if (['es', 'fa', 'it', 'pl', 'sv', 'uk'].some((lang) => language.startsWith(lang))) {
    return language.substring(0, 2);
  }
  // exceptions
  switch (language) {
    case 'nb-no':
      return 'no';
    case 'zh-cn':
      return 'zh-ch';
    default:
      return language;
  }
};

/* getFontStyle adapted from tldraw source code
  https://github.com/tldraw/tldraw/blob/55a8831a6b036faae0dfd77d6733a8f585f5ae23/packages/tldraw/src/state/shapes/shared/shape-styles.ts#L123 */
const getFontStyle = (style) => {
  const fontSizes = {
    small: 28,
    medium: 48,
    large: 96,
    auto: 'auto',
  };

  const fontFaces = {
    script: '"Caveat Brush"',
    sans: '"Source Sans Pro"',
    serif: '"Crimson Pro"',
    mono: '"Source Code Pro"',
  }

  const fontSize = fontSizes[style.size];
  const fontFace = fontFaces[style.font];
  const { scale = 1 } = style;

  return `${fontSize * scale}px/1 ${fontFace}`;
}

/* getMeasurementDiv and getTextSize adapted from tldraw source code
  https://github.com/tldraw/tldraw/blob/55a8831a6b036faae0dfd77d6733a8f585f5ae23/packages/tldraw/src/state/shapes/shared/getTextSize.ts */
const getMeasurementDiv = (font) => {
  // A div used for measurement
  const pre = document.getElementById('text-measure');
  pre.style.font = font;

  return pre;
}

const getTextSize = (text, style, padding) => {
  const font = getFontStyle(style);

  if (!text) {
    return [16, 32];
  }

  const melm = getMeasurementDiv(font);
  melm.textContent = text;

  if (!melm) {
    // We're in SSR
    return [10, 10];
  }

  // In tests, offsetWidth and offsetHeight will be 0
  const width = melm.offsetWidth || 1;
  const height = melm.offsetHeight || 1;

  return [width + padding, height + padding];
};


// getBoundsEstimate here is a function inspired by implementations in tldraw-v1:
// TextUtil: https://github.com/tldraw/tldraw-v1/blob/f786c38ac0fdce337c4405c11cbfa9223d2ee6dd/packages/tldraw/src/state/shapes/TextUtil/TextUtil.tsx#L24
// getTextSize: https://github.com/tldraw/tldraw-v1/blob/f786c38ac0fdce337c4405c11cbfa9223d2ee6dd/packages/tldraw/src/state/shapes/shared/getTextSize.ts#L6
// It calculates the estimated bounds of a text shape based on its content and style.
const TextUtil = {
  getBoundsEstimate(shape) {
    const { text, style } = shape;
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre';
    div.style.fontSize = this.getFontSize(style.size);
    div.style.fontFamily = this.getFontFamily(style.font);
    div.style.letterSpacing = style.letterSpacing || 'normal';
    div.style.lineHeight = style.lineHeight || 'normal';
    div.textContent = text;
    document.body.appendChild(div);

    // Calculate the number of lines
    const numberOfLines = text.split('\n').length;

    // Get the bounding box dimensions
    const { width } = div.getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(div).lineHeight);
    const height = lineHeight * numberOfLines;
    document.body.removeChild(div);

    // Dynamic padding adjustment based on font size
    const paddingAdjustment = parseInt(div.style.fontSize, 10) * 0.3;
    let finalWidth = width + paddingAdjustment;
    let finalHeight = height + paddingAdjustment;

    // Apply width and height multipliers based on font size and style
    finalWidth *= this.getWidthMultiplier(style.size, style.font);
    finalHeight *= this.getHeightMultiplier(style.size, style.font, numberOfLines);

    return {
      width: finalWidth,
      height: finalHeight,
    };
  },

  getFontSize(size) {
    switch (size) {
      case 'small': return '12px';
      case 'medium': return '16px';
      case 'large': return '20px';
      default: return '16px';
    }
  },

  getFontFamily(font) {
    switch (font) {
      case 'mono': return 'monospace';
      case 'script': return 'Comic Sans MS, cursive, sans-serif';
      case 'sans': return 'Arial, sans-serif';
      case 'serif': return 'Times New Roman, serif';
      default: return 'sans-serif';
    }
  },

  getWidthMultiplier(size, font) {
    const fontMultiplier = {
      small: { mono: 3, default: 2 },
      medium: { mono: 4, default: 3 },
      large: { mono: 7, default: 4 },
    };

    if (font === 'mono') {
      return fontMultiplier[size].mono;
    } else if (['script', 'sans', 'serif'].includes(font)) {
      return fontMultiplier[size].default;
    }

    return 1;
  },

  getHeightMultiplier(size, font, numberOfLines) {
    const baseMultiplier = 1.5;

    if (font === 'mono') {
      return baseMultiplier + (numberOfLines > 1 ? 0.5 : 0);
    } else if (['script', 'sans', 'serif'].includes(font)) {
      return baseMultiplier + (numberOfLines > 1 ? 0.3 : 0);
    }

    return baseMultiplier;
  }
};

const Utils = {
  usePrevious,
  findRemoved,
  filterInvalidShapes,
  mapLanguage,
  sendShapeChanges,
  getTextSize,
  TextUtil
};

export default Utils;
export {
  usePrevious,
  findRemoved,
  filterInvalidShapes,
  mapLanguage,
  sendShapeChanges,
  getTextSize,
  TextUtil
};
