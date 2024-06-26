import moment from "moment-timezone";




//사용자의 위치를 유추하는 기능을 활성화한다.
const localTimeZone = moment.tz.guess(true);


/**
 * 날짜 형식 변환 유틸.
 * @param date
 */
export const dateConvert = (date : Date) => {
    return moment.utc(date).tz(localTimeZone).format("YYYY-MM-DD HH:mm:ss");
}