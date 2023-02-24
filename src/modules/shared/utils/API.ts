import axios from 'axios';

function getHeaders() {
  try {
    const userStore = localStorage.getItem('user-store');
    if (userStore) {
      const token = JSON.parse(userStore).state.tokens.access.token;
      return {
        Authorization: `Bearer ${token}`,
      };
    }

    return {};
  } catch {
    return {};
  }
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
  baseURL: 'https://api.carbon-neutralize.com',
});

export { getHeaders, api };
