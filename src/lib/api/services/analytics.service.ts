import { axiosPrivate } from '../axios';

export const analyticsService = {
    getStats: async () => {
        const response = await axiosPrivate.get('/admin/stats');
        return response.data;
    }
};
