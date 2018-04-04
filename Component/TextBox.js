import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import inputcss from './../styles/inputcss.js';

class TextBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showClearIcon: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        var textValue = nextProps.value;
        this.setState({ showClearIcon: (textValue !== null && textValue !== undefined && textValue !== '') });
    }

    render() {
        var props = { ...this.props, value: this.state.textValue }
        return (
            <View style={inputcss.containerStyle}>
                <TextInput style={inputcss.inputStyle} ref={ref => this.textInputRef = ref}  {...props} />                
                {
                    !this.state.showClearIcon ? null :
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.textInputRef.clear(); this.setState({ showClearIcon: false }) }}>
                            <Image
                                source={require('./../images/Toolbar/clear.png')}
                                style={inputcss.imageIconStyle}
                            />
                        </TouchableOpacity>
                }
            </View>
        );
    }
}

module.exports = TextBox;