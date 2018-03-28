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
    FlatList,
    Image,
    View,
    RefreshControl,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Constansts from './../../utils/Constants.js';
import Common from './../../utils/Common';
import FetchBack from './../../utils/FetchBack';
import RNFS from 'react-native-fs';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import globalcss from './../../styles/globalcss.js';
import buttoncss from './../../styles/buttoncss.js';
import searchcss from './../../styles/searchcss.js';

export default class ShopUserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            seed: 1,
            refreshing: false,
            currentModifyID: [],
            keyword: '',
            message: '',
            resultCurrentPageIndex: 1,
            resultDefaultDataRows: 16,
            dataSource: [],
            flatListReady: false,
            width: 100,
            height: 101,
            x: 10,
            y: 20,
            documentPath: RNFS.DocumentDirectoryPath + '/',
        };

        this.QueryResult(this.state.keyword, true, false);
    }
    layoutchanged(e) {
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y)
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: '测试',
            header: (
                <View style={globalcss.headerStyle}>
                    <TouchableOpacity style={buttoncss.TransparentButtonStyle} activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <Image
                            source={require('./../../images/Toolbar/back.png')}
                            style={buttoncss.ImageIconStyle}
                        />
                    </TouchableOpacity>
                    <View style={searchcss.SearchBoxStyle}>
                        <TextInput onChangeText={(keyword) => { params.handleSearchKey(keyword) }}
                            style={searchcss.inputStyle}
                            placeholder='查询条件'
                            numberOfLines={1}
                            underlineColorAndroid={'transparent'}
                            textAlign='left'
                        />
                        <View style={searchcss.SeparatorLine} />

                        <TouchableOpacity activeOpacity={0.5} onPress={() => params.handleSearch()}>
                            <Image
                                source={require('./../../images/Toolbar/search.png')}
                                style={buttoncss.ImageIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={buttoncss.SeparatorButtonStyle} activeOpacity={0.5} onPress={() => params.handleNew()}>
                        <Image
                            source={require('./../../images/Toolbar/new.png')}
                            style={buttoncss.ImageIconStyle}
                        />
                    </TouchableOpacity>
                </View>
            ),
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSearch: this.searchHandler, handleSearchKey: this.searchHandlerKey, handleNew: this.newHandler })
    }

    searchHandlerKey = (keyword) => {
        this.setState(
            {
                keyword: keyword
            },
            () => {
                this.setState({ message: 'keyword:' + this.state.keyword });
            }
        );
    }

    searchHandler = () => {
        this.handleRefresh();
    }

    newHandler = () => {
        this.handleEdit();
    }

    handleEdit2 = (item) => {
        this.setState(
            {
                loading: true
            },
            () => {
                //this.props.navigation.navigate('ShopUserEdit', { ListItemSender: item });
                this.setState({ loading: false });
            }
        );
    };
    handleEdit = () => {
        this.setState(
            {
                resultCurrentPageIndex: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.setState({ message: 'handleRefresh' + this.state.resultCurrentPageIndex });
                this.props.navigation.navigate('ShopUserEdit', { ListItemSender: null });
            }
        );
    };

    QueryResult(keyword, refreshCondition, forcepager) {
        //this.setState({ pageisloading: true, currentModifyID :[] });   

        if (refreshCondition) {
            var keyword1 = keyword;
            var keyword2 = "";

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

                target.setState({
                    dataSource: target.state.resultCurrentPageIndex === 1 ? returnObj.rows : [...target.state.dataSource, ...returnObj.rows],
                    loading: false,
                    refreshing: false
                });
            }
            else {
                alert(set.ErrorCode + ':' + set.ErrorMessage);
            }
        });
    }


    _renderItem = ({ item }) => {
        let swipeBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { alert(item.UserName) }
            },
            {
                text: 'Edit',
                backgroundColor: 'blue',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.handleEdit(item) }
            }
        ];
        return (
            <Swipeout right={swipeBtns}
                autoClose={true}
                sensitivity={10}
                backgroundColor='transparent'>
                <TouchableHighlight underlayColor='blue'>
                    <View style={globalcss.flatitemStyle}>
                        <Image source={{ uri: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQWsRVibEribE97ymIXeVY4kolV0ibtvdQ18micZN7ibFEhZOMOkOHDiavHFpNVTv9A4UchAjMsmGKWGUw/132' }} style={globalcss.flatimageStyle} />
                        <View style={globalcss.flatsubItemStyle}>
                            <Text style={{ marginTop: 5, fontSize: 17 }}>{item.UserCode}</Text>
                            <Text style={{ marginBottom: 5, fontSize: 13, color: 'green' }}>{item.UserName}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>);
    }
    emptyComponent = () => {
        return <View style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{
                fontSize: 16
            }}>暂无数据下拉刷新</Text>
        </View>
    }

    handleRefresh = () => {
        this.setState(
            {
                resultCurrentPageIndex: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.setState({ message: 'handleRefresh' + this.state.resultCurrentPageIndex });
                this.QueryResult(this.state.keyword, true, false);
            }
        );
    };

    onScrolled = () => {
        this.setState({ flatListReady: true });
    }

    onEndReached = () => {
        if (this.state.flatListReady) {
            this.setState(
                {
                    resultCurrentPageIndex: this.state.resultCurrentPageIndex + 1,
                    message: 'onEndReached' + this.state.resultCurrentPageIndex
                },
                () => {
                    this.QueryResult(this.state.keyword, true, false);
                }
            );
        }
    }

    _keyExtractor = (item, index) => item.RecId;

    renderHeader = () => {
        return <View />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={globalcss.flatlistboxFooter}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <View style={globalcss.body}>
                <View style={{ height: 40, width: 300 }}>
                    <TextInput
                        style={searchcss.inputStyle}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        textAlign='left'
                        value={this.state.message}
                    />
                </View>
                <View style={globalcss.container} onLayout={(event) => { this.layoutchanged(event) }}>
                    <View style={globalcss.columnSpace}></View>
                    <View style={globalcss.internalView}>
                        <FlatList style={globalcss.flatlistbox}
                            data={this.state.dataSource}
                            keyExtractor={this._keyExtractor}
                            ItemSeparatorComponent={() => <View style={globalcss.flatlistboxSeparator} />}
                            renderItem={this._renderItem}
                            ListEmptyComponent={this.emptyComponent}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
                            onScroll={this.onScrolled}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.refreshing}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={0.5} />
                    </View>
                    <View style={globalcss.columnSpace}></View>
                </View>
            </View>
        );
    }
}