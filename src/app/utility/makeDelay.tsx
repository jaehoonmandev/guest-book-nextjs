
import Config from "../../../config/config.export";

const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

const MakeDelay = async () => {
    await delay(Config().delayTime);
}

export default MakeDelay;