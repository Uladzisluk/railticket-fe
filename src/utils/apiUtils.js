import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
    baseURL: 'http://localhost:5077/',  // Change on real URL
    headers: {
        'Content-Type': 'application/json',
    },
});

const sendRequestWithCorrelationId = async (url, data, config = {}) => {
    const correlationId = generateCorrelationId();
    try {
        const response = await api.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + config.token,
                'correlationId': correlationId,
            }
        });
        console.log('Post request sent with correlationId:', correlationId);
        return correlationId;
    } catch (error) {
        console.error('Post request sending error:', error);
        throw error;
    }
};

const get = async (url, config = {}) => {
    try {
        return await api.get(url, {
            headers: {
                'Authorization': 'Bearer ' + config.token,
            }
        });
    } catch (error) {
        console.error(`URL GET request error: ${url}`, error);
        throw error;
    }
};

const post = async (url, data, config = {}) => {
    try {
        return await api.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + config.token,
            }
        });
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

const delRequestWithCorrelationId = async (url, config = {}) => {
    const correlationId = generateCorrelationId();
    try {
        const response = await api.delete(url, {
            headers: {
                'correlationId': correlationId,
                'Authorization': 'Bearer ' + config.token,
            }
        });
        console.log('Delete request sent with correlationId:', correlationId);
        return correlationId;
    } catch (error) {
        console.error('Delete request sending error:', error);
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
    sendRequestWithCorrelationId,
    delRequestWithCorrelationId,
};

const generateCorrelationId = () => uuidv4();

export default apiUtils;
