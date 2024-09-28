import {GetAllEventsLink, LeaveLink, JoinLink} from './api_routes';

export const leaveEvent = async (eventID, username) => {
    try {
        const response  = await fetch(LeaveLink, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              EventID: eventID,
              username: username,
            })
          })
        const data = await response.json()
        return data

        
    } catch (error) {
        console.error('Failed to leave event:', error);
    }
};

export const joinEvent = async (eventID, username) => {
    try {
        const response  = await fetch(JoinLink, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              EventID: eventID,
              username: username,
            })
          })
        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Failed to join event:', error);
    }
};