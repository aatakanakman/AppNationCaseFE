import { BASE_API_URL } from './constant';

async function customFetch(url, options = {}) {
  const token = localStorage.getItem('jwt');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(`${BASE_API_URL}/${url}`, options);

  if (response.status === 401 || response.status === 400) {
    localStorage.removeItem('jwt');
    // window.location = '/login';
    return response;
  }

  return response;
}

export default customFetch;
