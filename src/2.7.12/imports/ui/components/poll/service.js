import Auth from '/imports/ui/services/auth';
import { CurrentPoll } from '/imports/api/polls';
import { escapeHtml } from '/imports/utils/string-utils';
import { defineMessages } from 'react-intl';

const POLL_AVATAR_COLOR = '#3B48A9';
const MAX_POLL_RESULT_BARS = 20;

// 'YN' = Yes,No
// 'YNA' = Yes,No,Abstention
// 'TF' = True,False
// 'A-2' = A,B
// 'A-3' = A,B,C
// 'A-4' = A,B,C,D
// 'A-5' = A,B,C,D,E
const pollTypes = {
  YesNo: 'YN',
  YesNoAbstention: 'YNA',
  TrueFalse: 'TF',
  Letter: 'A-',
  A2: 'A-2',
  A3: 'A-3',
  A4: 'A-4',
  A5: 'A-5',
  Custom: 'CUSTOM',
  Response: 'R-',
};

const pollAnswerIds = {
  true: {
    id: 'app.poll.answer.true',
    description: 'label for poll answer True',
  },
  false: {
    id: 'app.poll.answer.false',
    description: 'label for poll answer False',
  },
  yes: {
    id: 'app.poll.answer.yes',
    description: 'label for poll answer Yes',
  },
  no: {
    id: 'app.poll.answer.no',
    description: 'label for poll answer No',
  },
  abstention: {
    id: 'app.poll.answer.abstention',
    description: 'label for poll answer Abstention',
  },
  a: {
    id: 'app.poll.answer.a',
    description: 'label for poll answer A',
  },
  b: {
    id: 'app.poll.answer.b',
    description: 'label for poll answer B',
  },
  c: {
    id: 'app.poll.answer.c',
    description: 'label for poll answer C',
  },
  d: {
    id: 'app.poll.answer.d',
    description: 'label for poll answer D',
  },
  e: {
    id: 'app.poll.answer.e',
    description: 'label for poll answer E',
  },
};

const intlMessages = defineMessages({
  legendTitle: {
    id: 'app.polling.pollingTitle',
    description: 'heading for chat poll legend',
  },
  pollQuestionTitle: {
    id: 'app.polling.pollQuestionTitle',
    description: 'title displayed before poll question',
  },
});

const getUsedLabels = (listOfAnswers, possibleLabels) => listOfAnswers.map(
  (answer) => {
    if (answer.key.length >= 2) {
      const formattedLabel = answer.key.slice(0, 2).toUpperCase();
      if (possibleLabels.includes(formattedLabel)) {
        return formattedLabel;
      }
    }
    return undefined;
  },
);

const getFormattedAnswerValue = (answerText) => {
  // In generatePossibleLabels there is a check to see if the
  // answer's length is greater than 2
  const newText = answerText.slice(2).trim();
  return newText;
};

const generateAlphabetList = () => Array.from(Array(26))
  .map((e, i) => i + 65).map((x) => String.fromCharCode(x));

const generatePossibleLabels = (alphabetCharacters) => {
  // Remove the Letter from the beginning and the following sign, if any, like so:
  // "A- the answer is" -> Remove "A-" -> "the answer is"
  const listOfForbiddenSignsToStart = ['.', ':', '-'];

  const possibleLabels = [];
  for (let i = 0; i < alphabetCharacters.length; i += 1) {
    for (let j = 0; j < listOfForbiddenSignsToStart.length; j += 1) {
      possibleLabels.push(alphabetCharacters[i] + listOfForbiddenSignsToStart[j]);
    }
  }
  return possibleLabels;
};

const getPollResultsText = (isDefaultPoll, answers, numRespondents, intl) => {
  let responded = 0;
  let resultString = '';
  let optionsString = '';

  const alphabetCharacters = generateAlphabetList();
  const possibleLabels = generatePossibleLabels(alphabetCharacters);

  // We need to guarantee that the labels are in the correct order, and that all options have label
  const pollAnswerMatchLabeledFormat = getUsedLabels(answers, possibleLabels);
  const isPollAnswerMatchFormat = !isDefaultPoll
    ? pollAnswerMatchLabeledFormat.reduce(
      (acc, label, index) => acc && !!label && label[0] === alphabetCharacters[index][0], true,
    )
    : false;

  answers.map((item) => {
    responded += item.numVotes;
    return item;
  }).forEach((item, index) => {
    const numResponded = responded === numRespondents ? numRespondents : responded;
    const pct = Math.round((item.numVotes / numResponded) * 100);
    const pctBars = '|'.repeat((pct * MAX_POLL_RESULT_BARS) / 100);
    const pctFotmatted = `${Number.isNaN(pct) ? 0 : pct}%`;
    if (isDefaultPoll) {
      const translatedKey = pollAnswerIds[item.key.toLowerCase()]
        ? intl.formatMessage(pollAnswerIds[item.key.toLowerCase()])
        : item.key;
      resultString += `${translatedKey}: ${item.numVotes || 0} |${pctBars} ${pctFotmatted}\n`;
    } else {
      if (isPollAnswerMatchFormat) {
        resultString += `${pollAnswerMatchLabeledFormat[index][0]}`;
        const formattedAnswerValue = getFormattedAnswerValue(item.key);
        optionsString += `${pollAnswerMatchLabeledFormat[index][0]}: ${formattedAnswerValue}\n`;
      } else {
        resultString += `${item.id + 1}`;
        optionsString += `${item.id + 1}: ${item.key}\n`;
      }
      resultString += `: ${item.numVotes || 0} |${pctBars} ${pctFotmatted}\n`;
    }
  });

  return { resultString, optionsString };
};

const isDefaultPoll = (pollType) => pollType !== pollTypes.Custom
  && pollType !== pollTypes.Response;

const getPollResultString = (pollResultData, intl) => {
  const formatBoldBlack = (s) => s.bold().fontcolor('black');

  const sanitize = (value) => escapeHtml(value);

  const { answers, numRespondents, questionType } = pollResultData;
  const ísDefault = isDefaultPoll(questionType);
  let {
    resultString,
    optionsString,
  } = getPollResultsText(ísDefault, answers, numRespondents, intl);
  resultString = sanitize(resultString);
  optionsString = sanitize(optionsString);

  let pollText = formatBoldBlack(resultString);
  if (!ísDefault) {
    pollText += formatBoldBlack(`<br/><br/>${intl.formatMessage(intlMessages.legendTitle)}<br/>`);
    pollText += optionsString;
  }

  const pollQuestion = pollResultData.questionText;
  if (pollQuestion.trim() !== '') {
    const sanitizedPollQuestion = sanitize(pollQuestion.split('<br#>').join(' '));

    pollText = `${formatBoldBlack(intl.formatMessage(intlMessages.pollQuestionTitle))}<br/>${sanitizedPollQuestion}<br/><br/>${pollText}`;
  }

  return pollText;
};

const matchYesNoPoll = (yesValue, noValue, contentString) => {
  const ynPollString = `(${yesValue}\\s*\\/\\s*${noValue})|(${noValue}\\s*\\/\\s*${yesValue})`;
  const ynOptionsRegex = new RegExp(ynPollString, 'gi');
  const ynPoll = contentString.replace(/\n/g, '').match(ynOptionsRegex) || [];
  return ynPoll;
};

const matchYesNoAbstentionPoll = (yesValue, noValue, abstentionValue, contentString) => {
  const ynaPollString = `(${yesValue}\\s*\\/\\s*${noValue}\\s*\\/\\s*${abstentionValue})|(${yesValue}\\s*\\/\\s*${abstentionValue}\\s*\\/\\s*${noValue})|(${abstentionValue}\\s*\\/\\s*${yesValue}\\s*\\/\\s*${noValue})|(${abstentionValue}\\s*\\/\\s*${noValue}\\s*\\/\\s*${yesValue})|(${noValue}\\s*\\/\\s*${yesValue}\\s*\\/\\s*${abstentionValue})|(${noValue}\\s*\\/\\s*${abstentionValue}\\s*\\/\\s*${yesValue})`;
  const ynaOptionsRegex = new RegExp(ynaPollString, 'gi');
  const ynaPoll = contentString.replace(/\n/g, '').match(ynaOptionsRegex) || [];
  return ynaPoll;
};

const matchTrueFalsePoll = (trueValue, falseValue, contentString) => {
  const tfPollString = `(${trueValue}\\s*\\/\\s*${falseValue})|(${falseValue}\\s*\\/\\s*${trueValue})`;
  const tgOptionsRegex = new RegExp(tfPollString, 'gi');
  const tfPoll = contentString.match(tgOptionsRegex) || [];
  return tfPoll;
};

const checkPollType = (
  type,
  optList,
  yesValue,
  noValue,
  abstentionValue,
  trueValue,
  falseValue,
) => {
  let _type = type;
  let pollString = '';
  let defaultMatch = null;
  let isDefault = null;

  switch (_type) {
    case pollTypes.Letter:
      pollString = optList.map((x) => x.val.toUpperCase()).sort().join('');
      defaultMatch = pollString.match(/^(ABCDEF)|(ABCDE)|(ABCD)|(ABC)|(AB)$/gi);
      isDefault = defaultMatch && pollString.length === defaultMatch[0].length;
      _type = isDefault ? `${_type}${defaultMatch[0].length}` : pollTypes.Custom;
      break;
    case pollTypes.TrueFalse:
      pollString = optList.map((x) => x.val).join('/');
      defaultMatch = matchTrueFalsePoll(trueValue, falseValue, pollString);
      isDefault = defaultMatch.length > 0 && pollString.length === defaultMatch[0].length;
      if (!isDefault) _type = pollTypes.Custom;
      break;
    case pollTypes.YesNoAbstention:
      pollString = optList.map((x) => x.val).join('/');
      defaultMatch = matchYesNoAbstentionPoll(yesValue, noValue, abstentionValue, pollString);
      isDefault = defaultMatch.length > 0 && pollString.length === defaultMatch[0].length;
      if (!isDefault) {
        // also try to match only yes/no
        defaultMatch = matchYesNoPoll(yesValue, noValue, pollString);
        isDefault = defaultMatch.length > 0 && pollString.length === defaultMatch[0].length;
        _type = isDefault ? pollTypes.YesNo : _type = pollTypes.Custom;
      }
      break;
    default:
      break;
  }
  return _type;
};

/**
 * 
 * @param {String} input
 */
 const validateInput = (input) => {
  let _input = input;
  while (/^\s/.test(_input)) _input = _input.substring(1);
  return _input;
};

/**
 * 
 * @param {String} input
 */
const removeEmptyLineSpaces = (input) => {
  const filteredInput = input.split('\n').filter((val) => val.trim() !== '');
  return filteredInput;
};

/**
 * 
 * @param {String|Array} questionAndOptions
 */
const getSplittedQuestionAndOptions = (questionAndOptions) => {
  const inputList = Array.isArray(questionAndOptions)
    ? questionAndOptions
    : questionAndOptions.split('\n').filter((val) => val !== '');
  const splittedQuestion = inputList.length > 0 ? inputList[0] : questionAndOptions;
  const optionsList = inputList.slice(1);

  optionsList.forEach((val, i) => { optionsList[i] = { val }; });

  return {
    splittedQuestion,
    optionsList,
  };
};

export default {
  pollTypes,
  currentPoll: () => CurrentPoll.findOne({ meetingId: Auth.meetingID }),
  pollAnswerIds,
  POLL_AVATAR_COLOR,
  isDefaultPoll,
  getPollResultString,
  matchYesNoPoll,
  matchYesNoAbstentionPoll,
  matchTrueFalsePoll,
  checkPollType,
  validateInput,
  removeEmptyLineSpaces,
  getSplittedQuestionAndOptions,
};
