import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',  // Change on real URL
    headers: {
        'Content-Type': 'application/json',
    },
});

const get = async (url, config = {}) => {
    try {
        return await api.get(url, config);
    } catch (error) {
        console.error(`URL GET request error: ${url}`, error);
        throw error;
    }
};

const post = async (url, data, config = {}) => {
    try {
        return await api.post(url, data, config);
    } catch (error) {
        console.error(`URL POST request error: ${url}`, error);
        throw error;
    }
};

const del = async (url, config = {}) => {
    try {
        return await api.delete(url, config);
    } catch (error) {
        console.error(`URL DELETE request error: ${url}`, error);
        throw error;
    }
};

const put = async (url, data, config = {}) => {
    try {
        return await api.put(url, data, config);
    } catch (error) {
        console.error(`URL PUT request error: ${url}`, error);
        throw error;
    }
};

const apiUtils = {
    get,
    post,
    delete: del,  // Rename 'delete' to avoid conflicts with the keyword
    put,
};

export default apiUtils;
