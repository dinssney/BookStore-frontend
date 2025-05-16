const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed');
    }
    return data;
  },

  async register(username, email, password, role) {
    const endpoint = role === 'publisher' ? '/publisher/register' : '/register';
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  },

  storeToken(token) {
    localStorage.setItem('token', token);
  },
};

export default authService;