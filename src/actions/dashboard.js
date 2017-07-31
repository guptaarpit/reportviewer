/**
 * Created by arpit on 7/11/2017.
 */

import request from 'request';
import { API_URL } from './index';
import { FETCH_ASSETS, FETCH_CULIST, FETCH_METRICS } from './types';

export function fetchCUList() {
  const option = {
    baseUrl: API_URL,
    url: 'user/cunames',
    headers: {
      authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkJoYXVtaWsiLCJnZW5kZXIiOiJtYWxlIiwibG9jYXRpb24iOiIiLCJkZXNpZ25hdGlvbiI6IiIsIm9yZ2FuaXphdGlvbiI6IiIsIndlYnNpdGUiOiIiLCJhY2Nlc3NMZXZlbCI6InByZW1pdW0iLCJlbWFpbCI6ImJoYXVtaWtAZXhsc2VydmljZS5jb20iLCJjcmVhdGVkQXQiOiIyMDE3LTA3LTA0VDA4OjAxOjAyLjAwMFoiLCJzdGF0dXMiOiJhY3RpdmUiLCJwYXNzd29yZFJlc2V0VG9rZW4iOm51bGwsInBhc3N3b3JkUmVzZXRFeHBpcmVzIjpudWxsLCJ1cGRhdGVkQXQiOiIyMDE3LTA3LTA0IiwiaWF0IjoxNDk5Njk0NTI5LCJleHAiOjE1MDExOTQ4NzE0NzF9.Oc7GvsAmV43p16J_BMqCcPFld5xHLAaxrJfGjoUcRyTSFdvabQXQKxgsSuMFophRVPhHWrmkyce-GRHdUXkpl52bHKp7o_Fi5aWm3fw0SIpdE_1IGKGlYhkncC-ZlL2kvX_wDV1bblW8u7gjafiuvb25DKJ2OAJxl9djhrpsnCU',
    },
    method: 'GET',
  };
  return {
    type: FETCH_CULIST,
    payload: new Promise((resolve, reject) => {
      request(option, (err, response, body) => {
        if (err) {
          reject(err);
        }

        resolve(JSON.parse(body));
      });
    }),
  };
}

export function renderDashboard(cuNumber) {
  const option = {
    baseUrl: API_URL,
    url: `user/dashboard?cunumber=${cuNumber || 1}`,
    headers: {
      authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkJoYXVtaWsiLCJnZW5kZXIiOiJtYWxlIiwibG9jYXRpb24iOiIiLCJkZXNpZ25hdGlvbiI6IiIsIm9yZ2FuaXphdGlvbiI6IiIsIndlYnNpdGUiOiIiLCJhY2Nlc3NMZXZlbCI6InByZW1pdW0iLCJlbWFpbCI6ImJoYXVtaWtAZXhsc2VydmljZS5jb20iLCJjcmVhdGVkQXQiOiIyMDE3LTA3LTA0VDA4OjAxOjAyLjAwMFoiLCJzdGF0dXMiOiJhY3RpdmUiLCJwYXNzd29yZFJlc2V0VG9rZW4iOm51bGwsInBhc3N3b3JkUmVzZXRFeHBpcmVzIjpudWxsLCJ1cGRhdGVkQXQiOiIyMDE3LTA3LTA0IiwiaWF0IjoxNDk5Njk0NTI5LCJleHAiOjE1MDExOTQ4NzE0NzF9.Oc7GvsAmV43p16J_BMqCcPFld5xHLAaxrJfGjoUcRyTSFdvabQXQKxgsSuMFophRVPhHWrmkyce-GRHdUXkpl52bHKp7o_Fi5aWm3fw0SIpdE_1IGKGlYhkncC-ZlL2kvX_wDV1bblW8u7gjafiuvb25DKJ2OAJxl9djhrpsnCU',
    },
    method: 'GET',
  };
  return {
    type: FETCH_ASSETS,
    payload: new Promise((resolve, reject) => {
      request(option, (err, response, body) => {
        if (err) {
          reject(err);
        }

        resolve(JSON.parse(body));
      });
    }),
  };
}

export function retrieveMetrics() {
  const option = {
    baseUrl: API_URL,
    url: 'user/metrics',
    headers: {
      authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkJoYXVtaWsiLCJnZW5kZXIiOiJtYWxlIiwibG9jYXRpb24iOiIiLCJkZXNpZ25hdGlvbiI6IiIsIm9yZ2FuaXphdGlvbiI6IiIsIndlYnNpdGUiOiIiLCJhY2Nlc3NMZXZlbCI6InByZW1pdW0iLCJlbWFpbCI6ImJoYXVtaWtAZXhsc2VydmljZS5jb20iLCJjcmVhdGVkQXQiOiIyMDE3LTA3LTA0VDA4OjAxOjAyLjAwMFoiLCJzdGF0dXMiOiJhY3RpdmUiLCJwYXNzd29yZFJlc2V0VG9rZW4iOm51bGwsInBhc3N3b3JkUmVzZXRFeHBpcmVzIjpudWxsLCJ1cGRhdGVkQXQiOiIyMDE3LTA3LTA0IiwiaWF0IjoxNDk5Njk0NTI5LCJleHAiOjE1MDExOTQ4NzE0NzF9.Oc7GvsAmV43p16J_BMqCcPFld5xHLAaxrJfGjoUcRyTSFdvabQXQKxgsSuMFophRVPhHWrmkyce-GRHdUXkpl52bHKp7o_Fi5aWm3fw0SIpdE_1IGKGlYhkncC-ZlL2kvX_wDV1bblW8u7gjafiuvb25DKJ2OAJxl9djhrpsnCU',
    },
    method: 'GET',
  };
  return {
    type: FETCH_METRICS,
    payload: new Promise((resolve, reject) => {
      request(option, (err, response, body) => {
        if (err) {
          reject(err);
        }

        resolve(JSON.parse(body));
      });
    }),
  };
}
