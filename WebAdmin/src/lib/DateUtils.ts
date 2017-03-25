import * as moment from 'moment';
import 'moment/locale/pt-br';

/**
 * Formats date string in the format yyyy-mm-dd to dd/mm/yyyy
 * @param {String} dateStr 
 * @return {String} Formatted date string
 */
export function dateFormat(dateStr):string {
    if(!dateStr)
        return '';
    const result = moment(dateStr).utcOffset(0).format('DD/MM/YYYY');
    return result;
}

/**
 * Formats date-time string. The date is expected to be in UTC
 * This functions converts from UTC to local time
 * @param {String} dateTimeStr 
 * @return {String} Formatted date string
 */
export function dateTimeFormat(dateTimeStr):string {
    if(!dateTimeStr)
        return '';
    const result = moment(dateTimeStr).format('DD/MM/YYYY HH:mm');
    return result;
}
