import { API_TIMEOUT } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJSON = async function(url){
    try{
        const res = await Promise.race([fetch(url), timeout(API_TIMEOUT)]);
        if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
        const data = await res.json();
        return data;
    }catch(err){
        throw err;
    }
}