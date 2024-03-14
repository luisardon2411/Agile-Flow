import axios from 'axios';

const id = '7085'

const useAxios = axios.create({
    baseURL: `https://waapi.app/api/v1/instances/${id}/client/action`
})


useAxios.interceptors.request.use((config) => {
    const token = '26Gfc092TSplazs4jOF8R0Wmie28Ph367CJyVL6I217bce08';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    console.log('error:', error)
    return Promise.reject(error.response.data.message);
  });

export default useAxios;