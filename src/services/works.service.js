import axios from 'axios';

const getWorks = () => {

    return axios
        .get('http://localhost:5000/api/v1/admin/works')
        .then(res => {
            return res.data.works;
        })
        .catch(e => {
            const error = (e.response && e.response.data) || e.response.statusText;
            return Promise.reject(error);
        });
};

export const worksService = {
    getWorks
};