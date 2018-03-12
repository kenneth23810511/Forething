/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ListView,
    Image,
    View,
    RefreshControl
} from 'react-native';
import Constansts from './../../utils/Constants.js';
import Common from './../../utils/Common';
import FetchBack from './../../utils/FetchBack';
import RNFS from 'react-native-fs';
import { StackNavigator } from 'react-navigation';


export default class ShopUserList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            pageisloading: false,
            currentModifyID: [],
            resultCurrentPageIndex: 1,
            resultDefaultDataRows: 15,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            dataRecords: [],
            width: 100,
            height: 101,
            x: 10,
            y: 20,
            documentPath: RNFS.DocumentDirectoryPath + '/',
        };

        this.QueryResult(true, false);
    }
    layoutchanged(e) {
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y)
        });
    }

    static navigationOptions = {
        title: 'Product',
    };

    linkTo(rowData) {
        this.setState({ error: '', loading: true });
        this.props.navigation.navigate('ProductView', { ListViewClickItemHolder: rowData });
        this.setState({ error: '', loading: false });
    }

    QueryResult(refreshCondition, forcepager) {
        //this.setState({ pageisloading: true, currentModifyID :[] });   

        if (refreshCondition) {
            var keyword1 = "";
            var keyword2 = ""

            var dateFrom = "";
            var dateTo = "";
            var orderBy = "ModifyTime";
            var sortorder = "desc";
            var conditions = [{ Name: "Keyword1", Fields: "UserCode,UserName", Symbol: "and", Fuzzy: "like", Type: "String", Value: keyword1 },
            { Name: "Keyword2", Fields: "UserCode,UserName", Symbol: "and", Fuzzy: "like", Type: "String", Value: keyword2 },
            { Name: "CreateBy", Fields: "CreateBy", Symbol: "and", Fuzzy: "=", Type: "String", Value: "" },
            { Name: "DateFrom", Fields: "CreateTime", Symbol: "and", Fuzzy: ">=", Type: "DateTime", Value: dateFrom },
            { Name: "DateTo", Fields: "CreateTime", Symbol: "and", Fuzzy: "<=", Type: "DateTime", Value: dateTo }];
            var currentSendParameter = { PageIndex: this.state.resultCurrentPageIndex, Rows: this.state.resultDefaultDataRows, Conditions: JSON.stringify(conditions), OrderBy: orderBy, SortOrder: sortorder };
            queryString = JSON.stringify(currentSendParameter);
        }
        if (forcepager) {
            var pagerparas = JSON.parse(queryString);
            pagerparas.PageIndex = this.state.resultCurrentPageIndex;
            pagerparas.Rows = this.state.resultDefaultDataRows;
            queryString = JSON.stringify(pagerparas);
        }

        FetchBack.Post(this, Constansts.ShopUserLoadResults, queryString, function (target, set) {
            if (set.ErrorCode == Constansts.Success) {
                var returnObj = JSON.parse(set.ReturnObj);
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

                var dataRecords = target.state.dataRecords;
                /*
                 returnObj.rows.forEach(p =>{
                           var filename = p.Icon.replace(/^.*[\\\/]/, '');
                           var localpath =  target.state.documentPath + filename;
                                        RNFS.downloadFile({
                                            fromUrl: p.Icon,
                                            toFile: localpath,
                                          }).promise.then((r) => {
                                           p.Icon = localpath;
                                          }).catch(err => {
                                                console.log("downloadFile error: ", err)
                                            });
                                          }
                                    );*/

                returnObj.rows.forEach(p =>{ dataRecords.push(p);  });                

                target.setState({
                    dataSource: ds.cloneWithRows(dataRecords),
                    dataRecords: dataRecords
                });
            }
            else {
                alert(set.ErrorCode + ':' + set.ErrorMessage);
            }
        });
    }



    renderRow(rowData) {
        if (rowData.UserCode != null) {
            //var localpath = Common.GetLocalFullPath(rowData.Icon);
            return (
                <View style={styles.itemStyle}>
                    <Image source={{ uri: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQWsRVibEribE97ymIXeVY4kolV0ibtvdQ18micZN7ibFEhZOMOkOHDiavHFpNVTv9A4UchAjMsmGKWGUw/132' }} style={styles.imageStyle} />
                    <View style={styles.subItemStyle}>
                        <Text style={{ marginTop: 5, fontSize: 17 }}>{rowData.UserCode}</Text>
                        <Text style={{ marginBottom: 5, fontSize: 13, color: 'green' }} onPress={this.linkTo.bind(this, rowData)}>{rowData.UserName}</Text>
                    </View>
                </View>
            );
        }
        return (<View style={styles.itemStyle}></View>);
    }

    onRefresh() {
        // To-be-implemented
    }

    onEndReached() {
        alert("trigger");
        this.setState({ resultCurrentPageIndex: this.state.resultCurrentPageIndex +1 });          
        this.QueryResult(true, false);
    }

    render() {
        return (
            <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
                <Text>
                    My Picture
              {this.state.width},
              {this.state.height},
              {this.state.x},
              {this.state.y},
            </Text>
                <ListView style={styles.styleproducts}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.onRefresh.bind(this)}
                        />
                    }
                    onEndReached={() => this.onEndReached.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: '100%',
        height: '100%',
    },
    styleproducts: {
        width: '90%',
    },
    itemStyle: {
        // 主轴方向
        flexDirection: 'row',
        // 下边框
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    imageStyle: {
        // 尺寸
        width: 60,
        height: 60,
        // 边距
        marginLeft: 10,
        margin: 10
    },
    subItemStyle: {
        // 对齐方式
        justifyContent: 'space-around'
    }
});
