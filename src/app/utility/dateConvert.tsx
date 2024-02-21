import moment from "moment-timezone";

/**
 * 날짜 형식 변환 유틸.
 * @param date
 */
export const dateConvert = (date : Date) => {

    //사용자의 위치를 유추하는 기능을 활성화한다.
    const localTimeZone = moment.tz.guess(true);

    //timezone에 맞게 date를 변환
    const dateOnTimeZone = moment.utc(date).tz(localTimeZone);

    //formatting
    const formattedDate = dateOnTimeZone.format("YYYY-MM-DD HH:mm:ss");

    return formattedDate
}