import React, { Component } from 'react';

class FetchBack extends React.Component {

    static currentUserId = "";
    static currentUserName = "";
    static currentSessionId = "token";
    static currentStoreId = "";    

    static promisefetch(fetch_promise, timeout) {
        var abort_fn = null;
        var abort_promise = new Promise(function (resolve, reject) {
            abort_fn = function () {
                reject('time out, please check the web connection is working!');
            };
        });

        var abortable_promise = Promise.race([
            fetch_promise,
            abort_promise
        ]);

        setTimeout(function () {
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
        var url = "http://base.myfamilyshop.cn/api/smart";

        let params = { 'CurrentAllocation': '', 'CurrentUserId': this.currentUserId, 'CurrentSessionId': this.currentSessionId, 'CurrentStoreId': this.currentStoreId, 'ServiceCode': serviceCode, 'currentSendParameter': inEntity };
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
                'AccessToken': this.currentSessionId
            },
        }), 8000)
            .then((response) => {
                if (response.status == '200') {
                    return response.text();//response.json();
                }
                else {
                    throw response.status;
                }
            })
            .then((responseText) => {
                callback(target, JSON.parse(JSON.parse(responseText)));
            })
            .catch(error => {
                callback(target, { ErrorCode: '000001', ErrorMessage: error });
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
        var url = "http://base.myfamilyshop.cn/api/smart";
        let params = { 'CurrentAllocation': '', 'CurrentUserId': this.currentUserId, 'CurrentSessionId': this.currentSessionId, 'CurrentStoreId': this.currentStoreId, 'ServiceCode': serviceCode, 'currentSendParameter': inEntity };
        var bodycontent = JSON.stringify(params);
        //fetch请求
        FetchBack.promisefetch(fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                'AccessToken': this.currentSessionId
            },
            body: bodycontent
        }), 8000)
            .then((response) => {
                if (response.status == '200') {
                    return response.text();//response.json();
                }
                else {
                    throw response.status;
                }
            })
            .then((responseText) => {
                callback(target, JSON.parse(JSON.parse(responseText)));
            })
            .catch(error => {
                callback(target, { ErrorCode: '000001', ErrorMessage: error });
            })
            .done();
    }

    static Authorize(target, inEntity, callback) {
        var url = "http://base.myfamilyshop.cn/api/authorize";
        let params = {
            'CurrentAllocation': '', 'CurrentUserId': this.currentUserId, 'CurrentSessionId': this.currentSessionId, 'CurrentStoreId': this.currentStoreId,
            'AssemblyName': 'WebBusiness', 'ClassType': 'WebBusiness.SysUserPool', 'MethodName': 'VerifyLoginInHost', 'currentSendParameter': inEntity
        };
        var bodycontent = JSON.stringify(params);
        //fetch请求        
        FetchBack.promisefetch(fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                'AccessToken': this.currentSessionId
            },
            body: bodycontent
        }), 8000)
            .then((response) => {
                if (response.status == '200') {
                    return response.text();//response.json();
                }
                else {
                    throw response.status;
                }
            })
            .then((responseText) => {
                callback(target, JSON.parse(JSON.parse(responseText)), this);
            })
            .catch(error => {
                callback(target, { ErrorCode: '000001', ErrorMessage: error }, this);
            })
            .done();
    }

    static Verify(target, inEntity, callback) {
        var url = "http://base.myfamilyshop.cn/api/authorize";
        let params = {
            'CurrentAllocation': '', 'CurrentUserId': this.currentUserId, 'CurrentSessionId': this.currentSessionId, 'CurrentStoreId': this.currentStoreId,
            'AssemblyName': 'WebBusiness', 'ClassType': 'WebBusiness.SysVerifyPool', 'MethodName': 'PushVerifyCode', 'currentSendParameter': inEntity
        };
        var bodycontent = JSON.stringify(params);
        //fetch请求         
        FetchBack.promisefetch(fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                'AccessToken': this.currentSessionId
            },
            body: bodycontent
        }), 8000)
            .then((response) => {
                if (response.status == '200') {
                    return response.text();//response.json();
                }
                else {
                    throw response.status;
                }
            })
            .then((responseText) => {
                callback(target, JSON.parse(JSON.parse(responseText)));
            })
            .catch(error => {
                callback(target, { ErrorCode: '000001', ErrorMessage: error });
            })
            .done();
    }
}

module.exports = FetchBack;



/* Core API
static Post(target, serviceCode, inEntity, callback) {
        var url = "http://10.72.1.66/api/transfer";
        var token = "token";
        var storeid = "";
        var userid = "";
        let params = { 'CurrentAllocation': '', 'CurrentUserId': userid, 'CurrentSessionId': token, 'CurrentStoreId': storeid, 'ServiceCode': serviceCode, 'currentSendParameter': inEntity };
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
            .then((response) => {
                if (response.status == '200') {
                    return response.json();
                }
                else {
                    throw response.status;
                }
            })
            .then((response) => {
                callback(target, response);
            })
            .catch(error => {
                callback(target, { ErrorCode: '000001', ErrorMessage: error });
            })
            .done();
    }
*/