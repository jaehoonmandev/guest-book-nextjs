import getConfigs from "./config.common";

const configProd = getConfigs({
    APIHost: "https://jaehoonman.site:18080/guestbook",
    // APIHost: "https://jaehoonman.site/guestbook",
    // pageSize: 5,
    // delayTime: 2000
});

export default configProd;