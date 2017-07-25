/**
 * Created by arpit on 7/11/2017.
 */

/* eslint-disable consistent-return */
const request = require('request');

const formEncodedTypeConst = 'application/x-www-form-urlencoded';
const jsonTypeConst = 'application/json';

/**
 *
 * @param {string} body Body contain fields required to be added or updated by service.
 * @returns {object} body Body contain fields required to be added or updated by service.
 */
function parseStringToJson(body) {
  if (body && typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
}

/**
 *
 * @param {object} option Options for request.
 * @param {callback} next response object to be return from service.
 * @returns {Promise} object retrieved on making request to server.
 */
const executeRequest = (option, next) => {
  let err = new Error();
  return new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
      try {
        const responseBody = parseStringToJson(body);
        if (response) {
          if (response.statusCode >= 200 && response.statusCode <= 208) {
            resolve(responseBody);
          } else {
            err = new Error(body);
            err.status = response.statusCode;
            reject(err);
          }
        } else {
          err = new Error(error);
          err.status = response.statusCode;
          reject(err);
        }
      } catch (ex) {
        reject(ex);
      }
    });
  }).catch(ex => next(ex));
};

/**
 *
 * @param {string} authorization The authorization Token provided in header.
 * @param {string} correlationId The Correlation Id provided in header
 * @param {object} res response object to be return from service.
 * @param {string} baseUrl Base Path of Service
 * @param {string} url Relative Path of Service on which service require to be completed.
 * @param {string} method Type of Method request should be processed
 * @param {object} form Body contain fields required to be added or updated by service.
 * @returns {object} Return Promise
 */
function processFormRequest(authorization, correlationId, res, baseUrl, url, method, form) {
  const options = {
    baseUrl,
    url,
    form,
    headers: {
      'content-type': formEncodedTypeConst,
      authorization,
      correlationId,
    },
    method,
  };
  return executeRequest(options, res);
}

/**
 *
 * @param {string} authorization The authorization Token provided in header.
 * @param {string} correlationId The Correlation Id provided in header
 * @param {object} res response object to be return from service.
 * @param {string} baseUrl Base Path of Service
 * @param {string} url Relative Path of Service on which service require to be completed.
 * @param {string} method Type of Method request should be processed
 * @param {object} json Body contain fields required to be added or updated by service.
 * @returns {object} Return Promise
 */
function processJSONRequest(authorization, correlationId, res, baseUrl, url, method, json) {
  const options = {
    baseUrl,
    url,
    json,
    headers: {
      'content-type': jsonTypeConst,
      authorization,
      correlationId,
    },
    method,
  };
  return executeRequest(options, res);
}

module.exports.executeRequest = executeRequest;
module.exports.processJSONRequest = processJSONRequest;
module.exports.processFormRequest = processFormRequest;
