import React, { Component } from 'react';

class FetchBack extends React.Component {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static Get(target, params, callback) {
        var url = "http://172.16.23.60:8006/api/transfer";

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
        fetch(url, {
            method: 'GET',
        })
        .then((response) => {
            callback(target, response)
        }).done();
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static Post(target, params, callback) {
        var url = "http://172.16.23.60:8006/api/transfer";
        var token = "token";
        var bodycontent = JSON.stringify(params);
        
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                'token': token
            },
            body: bodycontent
        })
       .then((response) => response.json())
       .then((responseJSON) => {
            callback(target, responseJSON);
       })
       .catch(error => alert(error))
       .done();
    }
}

module.exports = FetchBack;