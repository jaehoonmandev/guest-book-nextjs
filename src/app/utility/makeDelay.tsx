
import Config from "../../../config/config.export";

const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

/**
 * 딜레이 생성 모듈
 * @param time
 * ms로 입력한 시간만큼 딜레이를 생성해준다.
 * 입력 값을 parameter로 넣지 않는다면 환경 변수 설정 값.
 * @constructor
 */
const MakeDelay = async (time : number = Config().delayTime) => {
    await delay(time);
}

export default MakeDelay;