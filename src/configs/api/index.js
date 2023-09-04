import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api3.harnic.id/v3',
  headers: {
    Accept: 'application/json',
  },
  timeout: 5000,
});
