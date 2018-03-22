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
  TouchableOpacity,
  Image,
  ImageBackground,
  View
} from 'react-native';
import Constansts from './../../utils/Constants.js';
import Common from './../../utils/Common';
import FetchBack from './../../utils/FetchBack';
import RNFS from 'react-native-fs';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import Orientation from 'react-native-orientation';


export default class Demo extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
                  dataSource: ds.cloneWithRows(this.genRows()),
                  date: new Date(),
                  width:100,
                  height:101,
                  x:10,
                  y:20,
                  documentPath: RNFS.DocumentDirectoryPath+'/',
                };
      }
    layoutchanged(e){
        this.setState({
            width: Math.ceil(e.nativeEvent.layout.width),
            height: Math.ceil(e.nativeEvent.layout.height),
            x: Math.ceil(e.nativeEvent.layout.x),
            y: Math.ceil(e.nativeEvent.layout.y)
          });
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header: null,
        title: 'Product',
    });

     handleNextButtonPress() {
             const date = new Date(this.state.date);
             date.setMonth(date.getMonth() + 1);
             this.setState({
                 date
             });
     }

     handlePrevButtonPress() {
         const date = new Date(this.state.date);
         date.setMonth(date.getMonth() - 1);
         this.setState({
             date
         });
     }

     handleDateSelect(date) {
         alert(`clicked: ${this.state.date.toString()}`);
     }

    genRows(){
            const dataBlob = [];
            for(let i = 0 ; i< 20 ; i ++ ){
                           dataBlob.push({"Icon":{ uri: 'data:image/jpeg;base64,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fQVj/xu82qvRDuvz+61Hi9jk7xMurchbiqCRtLu61P8M+TLQ0xrpR82OZYBPczMT8J0gCnUyCuSesKXfWrnOf/Kl33Tmre9PKQMA4N23r0HUUVQXMaaOBF59hfdOW+GdXpW3WI9NaT3qmZjQtSR+b2no9YfexfLSN4qjPc3matngRoFEYUcejzry1clD4aNDK/2wPSWwFcJPXobKOaUMSOk9Xx2GCuDXGe1Jt6xSN9tthT5qfV5vbPrqwxzwYrsMfP6W0xN1vqc9zwZ7l55PmaDltkhaRJFno47e0Wm4XdVBMx40BMTAjz85etKxOmUa9+p/HIa/iBG1BGtfvwgv/OfUOq/KbzMeXWcsv9F4VGVTfCEESu1u8OelgoqAJ9xIXctiW5zChdpykexxoe4O2/LY6lcP7B99sgmvxgimBA995uSDf0oZkNK7vzIMFym8KsMfYDSORov9Ad5iPLre+rzVeLSaTWHuUcqMUrYVvRozwd69y1RNCXTJgB+NAnnMhXp/0JA99eV2MmgKwrbAWMJPPn1qgD9tDEjp6i8Pw1YoZkaFceT5jlmyxt9sfLrKWNpqPLqSLS3LpIJmclnjLp8Y/h4ejuajXSI94kJ9wkX6Mxfow+MHgqdWXFJxUUdAhuACxUOfPbXAn3YGpPTurwzHoAhgK4SBpRbjI0Hdr/Nm69NmtnQxEV5HTBuYaSUxFhETE3erqJk5kEWvAmj8KGhDRA+r6D5V/EoiHYkCfTJoyN6lF/mNxtEILoifiQBwykf8GWdAka7+8jDEKYxHMB7BVhmDKy0O/k9zoFI3q9nSOjZ0ORlsIqK1xFhDhOUgqhOhhrykGqmiBdWGKsZUMKqqL6jTp8Vhr0S6vzPlRtdcMdCaHIsQtQUuVLhQwYZO22ifif4PoeZM728HgBIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMTJUMTA6MTE6MzMrMDg6MDBks1SoAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTA1LTI2VDEwOjIxOjUyKzA4OjAwuxE6gQAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNy4wLjEtNiBRMTYgeDg2XzY0IDIwMTYtMDktMTcgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfd2aVOAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA1MTKPjVOBAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUxMhx8A9wAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTM2OTUzNDkxMnukYa4AAAASdEVYdFRodW1iOjpTaXplADUxLjNLQhSZh1cAAABfdEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvc2l0ZS93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzExMTQ1LzExMTQ1MTkucG5ncNVQCwAAAABJRU5ErkJggg==' },
                           "Title":"Title" + i,"Summary":"Summary" + i });
                        }
            return dataBlob;
        }

         linkTo(rowData) {
                    this.setState({ error: '', loading: true });

                    this.setState({ error: '', loading: false });
                }

    pressRow(rowData){
        alert(rowData.Summary);
        //this.props.navigation.navigate('ProductView', { ListViewClickItemHolder: rowData  });
    }

    rollback(){
        this.props.navigation.navigate('Demo2');
        Orientation.lockToLandscape();
    }


    renderRow(rowData){
        if(rowData.Icon != null)
        {
             return(
                        <TouchableOpacity onPress={this.pressRow.bind(this, rowData)} style={{ backgroundColor: 'transparent'}}>
                            <View style={styles.itemStyle}>
                                <Image source={ rowData.Icon} style={styles.imageStyle}/>
                                <View style={styles.subItemStyle}>
                                    <Text style={{marginTop:5, fontSize:17}}>{rowData.Title}</Text>
                                    <Text style={{marginBottom:5, fontSize:13, color:'green'}}>{rowData.Summary}</Text>
                                </View>
                            </View>
                          </TouchableOpacity>
                        );
         }
         return (<View style={styles.itemStyle}></View>);
        }

  render() {
    return (
        <ImageBackground source={require('./../../../images/common/whitebg.png')} style={styles.entire_background}>
          <View style={styles.container} onLayout={(event) => { this.layoutchanged(event) }}>
            <View style={{flexDirection: 'row',backgroundColor: '#A52A2A', height: 40}}>
                <View style={{}}>
                    <TouchableOpacity onPress={this.rollback.bind(this)}>
                        <Image style={{height: 30, width: 30, marginTop: 3, marginLeft: 3}} source={require('./../../../images/Toolbar/menu.png')} />
                    </TouchableOpacity>
                 </View>
                 <View style={{flex: 1}}>
                 </View>
                <View style={{}}>
                    <TouchableOpacity onPress={this.rollback.bind(this)}>
                        <Image style={{height: 30, width: 30, marginTop: 3, marginLeft: 3}} source={require('./../../../images/Toolbar/search.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <TouchableOpacity onPress={this.rollback.bind(this)}>
                        <Image style={{height: 30, width: 30, marginTop: 3, marginLeft: 3}} source={require('./../../../images/Toolbar/new.png')} />
                     </TouchableOpacity>
                </View>
            </View>
            <View style={styles.flexContainer}>
                  <View style={styles.cellfixed}>
                    <Text></Text>
                    <View>
                    </View>
                  </View>
                  <View style={styles.cell}>
                    <Calendar
                     style={{
                            borderWidth: 0,
                            borderColor: '#EFEFEF'
                          }}
                          // Specify theme properties to override specific styles for calendar parts. Default = {}
                      theme={{
                        backgroundColor: 'transparent',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00C5CD',
                        selectedDayTextColor: '#ffff00',
                        todayTextColor: '#1E90FF',
                        dayTextColor: '#001122',
                        textDisabledColor: '#09e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                      }}
                      // Initially visible month. Default = Date()
                      current={'2018-01-01'}
                      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                      minDate={'2012-05-10'}
                      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                      maxDate={'2020-05-30'}
                      // Handler which gets executed on day press. Default = undefined
                      onDayPress={(day) => {console.log('selected day', day)}}
                      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                      monthFormat={'yyyy MM'}
                      // Handler which gets executed when visible month changes in calendar. Default = undefined
                      onMonthChange={(month) => {console.log('month changed', month)}}
                      // Hide month navigation arrows. Default = false
                      hideArrows={false}
                      // Do not show days of other months in month page. Default = false
                      hideExtraDays={true}
                      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                      // day from another month that is visible in calendar page. Default = false
                      disableMonthChange={true}
                      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                      firstDay={1}
                      // Hide day names. Default = false
                      hideDayNames={false}
                    />
                  </View>
                  <View style={styles.cellfixed}>
                    <Text style={styles.welcome}>
                    </Text>
                  </View>

                </View>

                <ListView style={{width:'90%',backgroundColor: 'transparent'}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    entire_background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width:'100%',
    height:'100%',
  },
  header:{
  width:'100%',
  height:50,
  },
  flexContainer: {
      flexDirection: 'row',
      height: 280,
  },
  cell: {
      flex: 1,
      backgroundColor: '#aaaaaa'
  },
  cellfixed: {
      backgroundColor: '#fefefe'
  },
    styleproducts:{
        width:'98%',
    },
    itemStyle: {
        // 主轴方向
        flexDirection:'row',
        // 下边框
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },
    imageStyle: {
        // 尺寸
        width:60,
        height:60,
        // 边距
        marginLeft:10,
        margin:10
    },
    subItemStyle: {
        // 对齐方式
        justifyContent:'space-around'
    }
});
