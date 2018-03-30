import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import globalcss from './../styles/globalcss.js';
import buttoncss from './../styles/buttoncss.js';
import searchcss from './../styles/searchcss.js';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
        };
    }

    static propTypes = {

        searchHandle: PropTypes.func,
    }

    render() {
        return (
            <View style={searchcss.SearchBoxStyle}>
                <TextInput onChangeText={(keyword) => this.setState({ keyword })}
                    style={searchcss.inputStyle}
                    placeholder='查询条件'
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    textAlign='left' />
                <View style={searchcss.SeparatorLine} />

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.searchHandle(this.state.keyword)}>
                    <Image
                        source={require('./../images/Toolbar/search.png')}
                        style={buttoncss.ImageIconStyle}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = SearchBar;