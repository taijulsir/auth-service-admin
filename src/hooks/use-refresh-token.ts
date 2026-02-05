import axios from '../lib/api/axios';
import { useAuth } from '../context/auth-context';

export const useRefreshToken = () => {
    const { setUser } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/consumer/auth/refresh', {
                withCredentials: true
            });
            
            setUser(prev => {
                return { ...prev, accessToken: response.data.accessToken } as any;
            });
            
            return response.data.accessToken;
        } catch (error) {
            setUser(null);
            throw error;
        }
    };
    
    return refresh;
};
