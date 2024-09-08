import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useTickets = () => {
    const handleAddTicket = useCallback(async (newTicketData) => {
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Tickets', newTicketData);
        return response.data;
    }, []);

    const handleDeleteTicket = useCallback(async (ticketId) => {
        await apiUtils.delRequestWithCorrelationId(`/api/Tickets/${ticketId}`);
    }, []);

    return { handleAddTicket, handleDeleteTicket };
};
