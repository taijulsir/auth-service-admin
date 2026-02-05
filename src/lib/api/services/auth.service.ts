import api from '../axios';

export const authService = {
    // ...existing code...
    register: async (data: any) => {
        const response = await api.post('/consumer/auth/register', data);
        return response.data;
    },

    // 2FA Methods (Note: these use the private axios instance via hooks in components, 
    // but we define the methods here for consistency. 
    // For setup, we'll need to pass the axios instance or use useAxiosPrivate in the component)
    generate2FA: async (axiosInst: any) => {
        const response = await axiosInst.post('/admin/2fa/generate');
        return response.data;
    },

    verify2FASetup: async (axiosInst: any, token: string) => {
        const response = await axiosInst.post('/admin/2fa/verify', { token });
        return response.data;
    },

    disable2FA: async (axiosInst: any, token: string) => {
        const response = await axiosInst.post('/admin/2fa/disable', { token });
        return response.data;
    },

    verify2FALogin: async (mfaToken: string, token: string) => {
        const response = await api.post('/admin/auth/verify-mfa', { mfaToken, token });
        return response.data;
    }
};
