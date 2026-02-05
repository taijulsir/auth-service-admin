import { axiosPrivate } from '../axios';

export const userService = {
    getUsers: async (params?: any) => {
        const response = await axiosPrivate.get('/admin/users', { params });
        return response.data;
    },
    
    getUserById: async (id: string) => {
        const response = await axiosPrivate.get(`/admin/users/${id}`);
        return response.data;
    },
    
    updateUser: async (id: string, data: any) => {
        const response = await axiosPrivate.patch(`/admin/users/${id}`, data);
        return response.data;
    },
    
    deleteUser: async (id: string) => {
        const response = await axiosPrivate.delete(`/admin/users/${id}`);
        return response.data;
    }
};
