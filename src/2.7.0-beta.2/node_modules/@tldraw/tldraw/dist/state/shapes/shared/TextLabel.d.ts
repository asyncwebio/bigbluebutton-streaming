import * as React from 'react';
export interface TextLabelProps {
    font: string;
    text: string;
    color: string;
    onBlur?: () => void;
    onChange: (text: string) => void;
    offsetY?: number;
    offsetX?: number;
    scale?: number;
    isEditing?: boolean;
}
export declare const TextLabel: React.NamedExoticComponent<TextLabelProps>;
//# sourceMappingURL=TextLabel.d.ts.map