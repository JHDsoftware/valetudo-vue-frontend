const BaseSetting ={
    // http://3.124.147.27:8080/
    potocol: 'http://',
    host: '3.124.147.27',
    port: '8080',
    baseUrl: ''
}

const baseUrl = BaseSetting.port + BaseSetting.host + ':' + BaseSetting.port

export const GlobalSetting = Object.assign({}, {...BaseSetting, baseUrl})