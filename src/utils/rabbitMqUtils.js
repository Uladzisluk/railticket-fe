import { Client } from '@stomp/stompjs';

export const connectToRabbitMQ = (topicName, queueName, onMessageReceived) => {
    const RABBITMQ_WS_URL = 'ws://localhost:15674/ws';

    const stompClient = new Client({
        brokerURL: RABBITMQ_WS_URL,
        connectHeaders: {
            login: 'guest',
            passcode: 'guest',
        },
        reconnectDelay: 5000,
        debug: (str) => {
            console.log(`STOMP Debug: ${str}`);
        }
    });

    stompClient.onConnect = (frame) => {
        stompClient.subscribe(`/exchange/${topicName}/${queueName}`, (message) => {
            if (message.body) {
                console.log('Message received:', message);
                onMessageReceived(message);
            } else {
                console.log('Message without body');
            }
        });
    };

    stompClient.onStompError = (frame) => {
        console.error('Error STOMP:', frame.headers['message'], frame.body);
    };

    stompClient.activate();
};
