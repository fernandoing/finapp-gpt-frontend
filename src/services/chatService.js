const API_URL = import.meta.env.VITE_API_URL;
const LOGIN = import.meta.env.VITE_API_LOGIN;

export async function getHistory(token) {
    const response = await fetch(`${API_URL}/chats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.chats;
}

export async function deleteHistory(token) {
    const response = await fetch(`${API_URL}/chats`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

export async function sendMessage(messageText, token) {
    const response = await fetch(`${API_URL}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify({ user_input: messageText }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

export async function login(username, password) {
    const response = await fetch(`${LOGIN}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
}

export async function register(username, password) {
    const response = await fetch(`${LOGIN}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
}
