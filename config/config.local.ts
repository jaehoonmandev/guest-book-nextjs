import getConfigs from "./config.common";

const configLocal = getConfigs({
    APIHost: "http://localhost:8080/guestbook",
    // pageSize: 5,
    // delayTime: 2000
});

export default configLocal;