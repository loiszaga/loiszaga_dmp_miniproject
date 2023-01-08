import axiosClient from './AxiosSetting';

const showJobList = (req_payload) => {
    return axiosClient.get(`/recruitment/positions.json?page=${req_payload.page}`);
}

const searchJob = (req_payload) => {
    return axiosClient.get(`/recruitment/positions.json?description=${req_payload.keyword}`);
}

export default { showJobList, searchJob }