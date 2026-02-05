import { axiosPrivate } from '../axios';

export const roleService = {
    getRoles: async () => {
        const response = await axiosPrivate.get('/admin/roles');
        return response.data;
    },
    
    getRolePermissions: async (roleId: string) => {
        const response = await axiosPrivate.get(`/admin/roles/${roleId}/permissions`);
        return response.data;
    }
};
