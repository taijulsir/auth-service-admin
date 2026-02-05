import api from '../axios';

export const authService = {
    forgotPassword: async (email: string) => {
        const response = await api.post('/consumer/auth/forgot-password', { email });
        return response.data;
    },
    
    resetPassword: async (password: string, token: string) => {
        const response = await api.post('/consumer/auth/reset-password', { pwd: password, token });
        return response.data;
    },
    
    register: async (data: any) => {
        const response = await api.post('/consumer/auth/register', data);
        return response.data;
    }
};
