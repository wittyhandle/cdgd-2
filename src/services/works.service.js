import { get } from '../helpers/ajax';

const getWorks = () => {

    return get('/api/v1/admin/works').then(d => {
        return d.works;
    });
};

export const worksService = {
    getWorks
};