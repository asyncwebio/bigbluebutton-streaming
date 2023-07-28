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
export function IsValidDateTimeFieldCode(field) {
    return CODES_FOR_DATE_TIME_FIELD.indexOf(field) >= 0;
}
