import React, { Component } from 'react';

class FetchBack extends React.Component {

    static promisefetch(fetch_promise, timeout) {
        var abort_fn = null;
        var abort_promise = new Promise(function(resolve, reject) {
               abort_fn = function() {
                  reject('time out, please check the web connection is working!');
               };
        });

         var abortable_promise = Promise.race([
               fetch_promise,
               abort_promise
         ]);

         setTimeout(function() {
               abort_fn();
          }, timeout);

         return fetch_promise;
    }
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static Get(target, serviceCode, inEntity, callback) {
        var url = "http://172.16.23.60:8006/api/transfer";
        var token = "token";
        let params = {'CurrentAllocation':'','CurrentUserId':'','AccessToken':'','ServiceCode': serviceCode ,'CurrentSendParameter': inEntity};
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        FetchBack.promisefetch(fetch(url, {
            method: 'GET',
            headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Accept': 'application/json',
                    'AccessToken': token
                },
        }), 8000)
        .then((response) =>
        {
            if(response.status == '200'){
               return response.json();
             }
             else{
                throw response.status;
             }
        })
        .then((response) => {
            callback(target, response);
        })
        .catch(error =>
        {
            callback(target, {errorCode: '000001', errorMessage: error });
        })
        .done();
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static Post(target, serviceCode, inEntity, callback) {
        var url = "http://172.16.23.60:8006/api/transfer";
        var token = "token";
        let params = {'CurrentAllocation':'','CurrentUserId':'','AccessToken':token,'ServiceCode': serviceCode ,'CurrentSendParameter': inEntity};
        var bodycontent = JSON.stringify(params);
        //fetch请求
        FetchBack.promisefetch(fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                'AccessToken': token
            },
            body: bodycontent
        }), 8000)
          .then((response) =>
          {
              if(response.status == '200'){
                 return response.json();
               }
               else{
                  throw response.status;
               }
          })
          .then((response) => {
              callback(target, response);
          })
          .catch(error =>
          {
               callback(target, {errorCode: '000001', errorMessage: error });
          })
       .done();
    }
}

module.exports = FetchBack;