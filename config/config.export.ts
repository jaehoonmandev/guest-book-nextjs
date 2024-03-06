import configDev from "./config.dev";
import configLocal from "./config.local";
import configProd from "./config.prod";

// 클라이언트에서는 이 함수를 사용하여 config 값을 참조합니다.
const Config = () => {
    switch(process.env.NEXT_PUBLIC_RUN_MODE) {
        case 'local': return configLocal;
        case 'development': return configDev;
        case 'production': return configProd;
        default: return configLocal;
    }
};

export default Config;