import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useTickets = () => {
    const handleAddTicket = useCallback(async (newTicketData) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Tickets', newTicketData, config);
        return response.data;
    }, []);

    const handleDeleteTicket = useCallback(async (ticketId) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        await apiUtils.delRequestWithCorrelationId(`/api/Tickets/${ticketId}`, config);
    }, []);

    return { handleAddTicket, handleDeleteTicket };
};
