import { axiosPrivate } from '../axios';

export const auditService = {
    getLogs: async (params?: any) => {
        const response = await axiosPrivate.get('/admin/audit-logs', { params });
        return response.data;
    }
};
