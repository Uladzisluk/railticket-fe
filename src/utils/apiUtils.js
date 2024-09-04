export const fetchRoutesFromAPI = async () => {
    const response = await fetch('/api/Routes');
    if (!response.ok) {
        throw new Error('Failed to fetch routes');
    }
    return await response.json();
};

export const fetchStationsFromAPI = async () => {
    const response = await fetch('/api/Station');
    if (!response.ok) {
        throw new Error('Failed to fetch stations');
    }
    return await response.json();
};