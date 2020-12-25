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
        const data = await res.json();
        if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
        return data;
    }catch(err){
        throw err;
    }
}

export const sendJSON = async function(url, dataObject){
  try{
    const res = await Promise.race([fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataObject)
    }), timeout(API_TIMEOUT)]);
    const data = await res.json();
    if(!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
    return data;
  }catch(err){
    throw err;
  }
}