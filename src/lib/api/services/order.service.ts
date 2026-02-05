import { axiosPrivate } from '../axios';

export const orderService = {
    getOrders: async (params?: any) => {
        const response = await axiosPrivate.get('/admin/orders', { params });
        return response.data;
    },
    
    getOrderById: async (id: string) => {
        const response = await axiosPrivate.get(`/admin/orders/${id}`);
        return response.data;
    },
    
    updateOrderStatus: async (id: string, status: string) => {
        const response = await axiosPrivate.patch(`/admin/orders/${id}/status`, { status });
        return response.data;
    }
};
