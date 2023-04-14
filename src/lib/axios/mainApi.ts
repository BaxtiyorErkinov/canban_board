import axios from 'axios';

import { base_url } from './constants';
export const mainApi = axios.create({
  baseURL: base_url,
  headers: {
    'Content-type': 'application/json',
  },
});
