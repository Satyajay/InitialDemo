'use strict';
const localhost = "localhost:8081",//"10.20.3.27:3000",
    staging = "delgate.mobilytedev.com",
    live = "13.233.162.221:8283";

const running_url = live,
    http_url = `http://${running_url}`,
    socket_url = `ws://${running_url}/websocket`,
    apiBase_url = `http://${running_url}/api/`,
    staticPagesUrl = `http://${running_url}/`,
    mediaBase_url = `http://${running_url}/uploadedFiles/`;

export default class Connection {
    static getResturl() {
        return apiBase_url;
    };

    static getSocketResturl() {
        return socket_url;
    };

    static getBaseUrl() {
        return http_url;
    };

    static getMedia(_id) {
        return mediaBase_url;
    }

    static getStaticPage(url) {
        return staticPagesUrl + url;
    }

    // Added for because request URL is different 

    static getTempUrl() {

        return 'http://18.212.245.222:9000/api/';

    }

    static getCustomerTempUrl() {
        return 'http://18.212.245.222:9000/api/';

    }

    static getAdminUrl() {
        return 'http://13.233.162.221:8283/api';
    }

    static mediaURL() {

        return 'http://13.233.162.221:8283';
    }


    static mediaBase_sav_url() {

        return 'http://13.233.162.221:8283';
    }


}
