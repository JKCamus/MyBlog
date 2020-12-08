const devBaseURL = "http://47.102.211.145:8086";
const proBaseURL = "http://47.102.211.145:8086";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
