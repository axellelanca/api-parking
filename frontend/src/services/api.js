import axios from 'axios';

// Define the api URL
const api = axios.create({
    baseURL: "http://localhost:8080"
});

export default api;
