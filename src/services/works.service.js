import api  from '../utils/api';

const getWorks = () => {

    return api.get('/api/v1/admin/works').then(d => {
        return d.works;
    });
};


export const worksService = {
    getWorks
};