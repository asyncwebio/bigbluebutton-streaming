"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDateTimeFieldCode = void 0;
var CODES_FOR_DATE_TIME_FIELD = [
    'era',
    'year',
    'quarter',
    'month',
    'weekOfYear',
    'weekday',
    'day',
    'dayPeriod',
    'hour',
    'minute',
    'second',
    'timeZoneName',
];
function IsValidDateTimeFieldCode(field) {
    return CODES_FOR_DATE_TIME_FIELD.indexOf(field) >= 0;
}
exports.IsValidDateTimeFieldCode = IsValidDateTimeFieldCode;
