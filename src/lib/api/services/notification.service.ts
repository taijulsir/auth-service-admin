import { axiosPrivate } from '../axios';

export const notificationService = {
    getNotifications: async () => {
        const response = await axiosPrivate.get('/admin/notifications');
        return response.data;
    },

    createNotification: async (data: { title: string, message: string, type: string, target?: string }) => {
        const response = await axiosPrivate.post('/admin/notifications', data);
        return response.data;
    },

    markAsRead: async (id: string) => {
        const response = await axiosPrivate.patch(`/admin/notifications/${id}/read`);
        return response.data;
    }
};
