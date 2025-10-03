import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const medicineAPI = {
        getAll: async () => {
        const shopEmail = localStorage.getItem("email"); // get it here
        const response = await api.get('/medicines');
        return {
            ...response,
            data: response.data.filter(med => med.email === shopEmail)
        };
    },
    search: (query) => api.get(`/medicines/search?query=${query}`),
    add: (data) => api.post('/medicines', data),
    update: (id, data) => api.patch(`/medicines/${id}`, data),
    importData: () => api.get('/import-data')
};

export default api;