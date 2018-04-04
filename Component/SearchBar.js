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
import TextBox from './TextBox.js';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textValue: '',
        };
    }

    static propTypes = {

        searchHandle: PropTypes.func,
    }

    render() {
        return (
            <View style={searchcss.searchBoxStyle}>
                <TextBox onChangeText={(textValue) => this.setState({ textValue })}
                    value={this.state.textValue}
                    style={searchcss.inputStyle}
                    placeholder='查询条件'
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    textAlign='left' />
                <View style={searchcss.separatorLine} />
                <View style={searchcss.iconSpaceStyle}>
                    <TouchableOpacity onPress={() => this.props.searchHandle(this.state.textValue)}>
                        <Image
                            source={require('./../images/Toolbar/search.png')}
                            style={searchcss.imageIconStyle}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

module.exports = SearchBar;