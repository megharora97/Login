import React, { Component } from 'react';
import axios from 'axios';
import Config from '../Utils/Config';


//getLanguageApi
export const getLanguageApi = () => {
  var authOptions = {
    method: 'GET',
    url: Config.Language,
    headers: {
      "X-Username": "wallet",
      "X-Password": "4970FAB298E271E430010235E9C88EA5E467DEEF",
      "Content-Type": "application/json",
    },
  };
  console.log('authOptions GET getCategoryApi :-  ', authOptions)
  return axios(authOptions)
    .then(res => {
      console.log("response getCategoryApi", res)
      if (res && res.data.status === 'Success') {
        return res.data.data;
      } else { return res }
    })
    .catch((error) => {
      handleErrors(error)
    });
}


//getServiceApi
export const getServiceApi = () => {
  var authOptions = {
    method: 'POST',
    url: Config.Service,
    headers: {
      "X-Username": "wallet",
      "X-Password": "4970FAB298E271E430010235E9C88EA5E467DEEF",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  console.log('authOptions getServiceApi :-  ', authOptions)
  return axios(authOptions)
    .then(res => {
      console.log("response getServiceApi", res)
      if (res && res.data.status === 'Success') {
        return res.data.data;
      } else {
        if (res && res.data && res.data.data) {
          return res.data.data
        } else {
          return res.data
        }
      }
    })
    .catch((error) => {
      console.log("response catch getServiceApi", error)
      handleErrors(error)
    });
}

//callLoginApi
export const callLoginApi = (email, password) => {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  var authOptions = {
    method: 'POST',
    url: Config.Login,
    data: formData,
    headers: {
      "X-Username": "wallet",
      "X-Password": "4970FAB298E271E430010235E9C88EA5E467DEEF",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  console.log('authOptions callLoginApi :-  ', authOptions)

  return axios(authOptions)
    .then(response => {
      return response.data;
    })
    .catch((error) => {
      handleErrors(error);
    });
}



function handleErrors(error) {
  console.log('Error :- ', error)
  if (!error.response) {
    // network error
    throw 'Please check your network connection.'
  }
  else {
    // http status code
    const code = error.response.status
    // response data
    const response = error.response.data
    console.log('code :- ' + code + ' response :- ', response)

    if (error.response.status === 400) {
      throw 'Please Provide valid credentials.'
    }
    else {
      throw 'Oops server error occurred'
    }
  }
}


