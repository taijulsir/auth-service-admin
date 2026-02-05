import { axiosPrivate } from '../axios';

export const productService = {
    getProducts: async (params?: any) => {
        const response = await axiosPrivate.get('/admin/products', { params });
        return response.data;
    },
    
    getProductById: async (id: string) => {
        const response = await axiosPrivate.get(`/admin/products/${id}`);
        return response.data;
    },
    
    createProduct: async (data: any) => {
        const response = await axiosPrivate.post('/admin/products', data);
        return response.data;
    },
    
    updateProduct: async (id: string, data: any) => {
        const response = await axiosPrivate.patch(`/admin/products/${id}`, data);
        return response.data;
    },
    
    deleteProduct: async (id: string) => {
        const response = await axiosPrivate.delete(`/admin/products/${id}`);
        return response.data;
    }
};
