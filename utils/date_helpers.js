var moment= require('moment');

const TIME_FORMAT = 'h:mm a';
const DATE_FORMAT = 'DD-MMM-YY';
const DATE_TIME_FORMAT = 'ddd, DD-MMM-YY h:mm a';
const AVAILABILITY_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const YEAR_FIRST_DATE_FORMAT = 'YYYY-MM-DD';
const DB_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
const DB_DATE_FORMAT = "YYYY-MM-DD";
const FRIENDLY_DATE_FORMAT = 'ddd, DD-MMM-YY';

const momentFromString = function(date, fmt = null) {
  if (fmt) {
    return moment(date, fmt, true);
 }
  if (date) {
    return moment(date);
 }
  return null;
};

export default {
  DB_DATE_TIME_FORMAT: DB_DATE_TIME_FORMAT,
  DB_DATE_FORMAT: DB_DATE_FORMAT,
  AVAILABILITY_TIME_FORMAT: AVAILABILITY_TIME_FORMAT,
  DATE_TIME_FORMAT: DATE_TIME_FORMAT,
  FRIENDLY_DATE_FORMAT: FRIENDLY_DATE_FORMAT,
  toShortDateString(d, fmt = null) {
    if (!d) return "";
    return momentFromString(d, fmt).format(DATE_FORMAT);
 },

  toDateString(d, fmt = null) {
    if (!d) return "";
    return momentFromString(d, fmt).format('ddd, DD-MMM-YY');
 },

  toTimeString(d, fmt = null) {
    if (!d) return "";
    return momentFromString(d, fmt).format(TIME_FORMAT);
 },

  toMonthString(str, fmt = null) {
    if (!str) return "";
    return momentFromString(str, fmt).format('YYYY');//MMM, 
 },

  toDateTimeString(d, fmt = null) {
    if (!d) return "";
    return momentFromString(d, fmt).format(DATE_TIME_FORMAT);
 },

  isDateValid(dateString) {
    if (!dateString) {
      return false;
   }
    if (!moment(dateString, 'MM/DD/YYYY', true).isValid()) {
      return false;
   }
    return true;
 },

  getYearFromString(dateString) {
    return String(dateString.split("-", 1));
 },
  
  momentToDateTime(m){
    if(m){
      return m.format(DATE_TIME_FORMAT);
   }
    return null;
 },

  getDateTimeStringFromMoment(m){
    if (m) {
      return m.format(DATE_TIME_FORMAT);
   }
    return null;
 },

  existsAndIsBetween(dttm, fr, th, inFormat1, inFormat2) {
    if (!dttm) return false;
    if (!inFormat1) inFormat1 = DB_DATE_TIME_FORMAT;
    if (!inFormat2) inFormat2 = DATE_TIME_FORMAT;
    const dttmMoment = momentFromString(dttm, inFormat1);
    const frMoment = momentFromString(fr, inFormat2);
    const toMoment = momentFromString(th, inFormat2);
    return dttmMoment.isBetween(frMoment, toMoment, null, '[]');
 },

  hoursSince(dtTmStr, fmt) {
    const dt = momentFromString(dtTmStr, fmt);
    return moment.duration(moment().diff(dt)).asHours();
 },

  diffInHours(earlierStr, laterStr, fmt) {
    earlier = momentFromString(earlierStr, fmt);
    later = momentFromString(laterStr, fmt);
    return moment.duration(later.diff(earlier)).asHours();
 },

  getDateTimeStringFromDate(d){
    if(d){
      return moment(d).format(DATE_TIME_FORMAT);
   }
    return null;
 },

  getAvailabilityDateTimeStringFromDate(d){
    if(d){
      return moment(d).format(AVAILABILITY_TIME_FORMAT);
   }
    return null;
 },

  getTimeStringFromMoment(m) {
    if (!m) return "";
    return m.format(TIME_FORMAT);
 },

  getMomentFromString(date, fmt = null) {
    if (!date) return null;
    return momentFromString(date, fmt);
 },

  reformat(inString, inFormat, outFormat) {
    if (!inString) return "";
    const dttm = momentFromString(inString, inFormat);
    return dttm.format(outFormat);
 },

  getStringFromMoment(m, fmt = null) {
    if (m) {
      fmt = fmt === null ? DATE_FORMAT : fmt;
      return m.format(fmt);
   }
    return null;
 },

  getTimeRange() {
    const start = moment().startOf('06:00');
    const times = 14 * 2; // 14 hours * two 30 mins sessions/hour
    for (let i = 0; i < times; i++) {
      const toPrint = moment(start).add(30 * i, 'minutes').format(TIME_FORMAT);
      return toPrint;
   }
 },

  parseDate(s, fmt = "YYYY-MM-DD") {
    let test = moment(s, [
      "MM/DD/YYYY",
      "M/D/YY",
      "MM/D/YY",
      "MM/DD/YY",
      "MM/D/YYYY",
      "M/D/YYYY",
      "YYYY-MM-DD"
    ]);
    if (test.isValid()) {
      if (test.year() > new Date().getFullYear()) {
        test.year(test.year() - 100);
     }
      return test.format(fmt);
   } else {
      return s;
   }
 },
};