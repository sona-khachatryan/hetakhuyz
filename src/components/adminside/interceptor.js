import axios from "axios"
import { address } from "../../repetitiveVariables/variables";


const instance = axios.create({
    baseURL: address,
})


instance.interceptors.request.use(config => {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        return config
    })

instance.interceptors.response.use( 
        response => response, 
        async error => { 
            const config = error?.config; 

            if (error?.response?.status === 401 && !config?.sent) { 
                config.sent = true; 
                
                const {data} = await axios.get(address+'/admin/refresh', {
                    params: {
                        refreshToken: localStorage.getItem('refreshToken')
                    } 
                })
                if (data?.accessToken) { 
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('refreshToken', data.refreshToken)
                    config.headers = { 
                        ...config.headers, 
                        Authorization: data?.accessToken, 
                    }; 
                } 
     
                return instance(config); 
            } 
            return Promise.reject(error); 
        }, 
    );

export default instance