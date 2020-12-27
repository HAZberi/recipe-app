import { API_TIMEOUT } from './config';

/**
 * A Promise that gets rejects after a specified time
 * @param {number} s - Time in seconds
 * @author Hassaan Zuberi <hassaan.zuberi@ucalgary.ca>
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} ${
            s > 1 ? 'seconds' : 'second'
          }`
        )
      );
    }, s * 1000);
  });
};

/**
 * Gets the data from any API in JSON format
 * @param {string} url - Complete API URL with endpoint
 * @requires timeout(API_TIMEOUT) where API_TIMEOUT can be declared globally or imported from config module
 * @returns {object} An object that ontains the data successfully fetched from the source API
 * @author Hassaan Zuberi <hassaan.zuberi@ucalgary.ca>
 */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(API_TIMEOUT)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * GET or POST the data to and fro any API in JSON format
 * @param {string} url - Complete API URL with endpoint
 * @param {object} dataObject - An object containing the data to be posted. If not specified, results a GET response.
 * @requires timeout(API_TIMEOUT) where API_TIMEOUT can be declared globally or imported from config module
 * @returns {object} An object that contains the data successfully posted or fetched
 * @author Hassaan Zuberi <hassaan.zuberi@ucalgary.ca>
 */

export const AJAX = async function (url, dataObject) {
  try {
    const res = await Promise.race([
      dataObject
        ? fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObject),
          })
        : fetch(url),
      timeout(API_TIMEOUT),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * POST the data to any API in JSON format
 * @param {string} url - Complete API URL with endpoint
 * @param {object} dataObject - An object containing the data to be posted
 * @requires timeout(API_TIMEOUT) where API_TIMEOUT can be declared globally or imported from config module
 * @returns {object} An object that contains the data successfully posted to the source API
 * @author Hassaan Zuberi <hassaan.zuberi@ucalgary.ca>
 */
export const sendJSON = async function (url, dataObject) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      }),
      timeout(API_TIMEOUT),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
