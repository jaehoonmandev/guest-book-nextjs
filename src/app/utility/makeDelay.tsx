import {delayTime} from "@/app/components/common/globalVar";

const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

const MakeDelay = async () => {
    await delay(delayTime);
}

export default MakeDelay;