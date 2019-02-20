//czg data 2019-02-19
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    RefreshControl,
    ScrollView
} from 'react-native';

 //引用插件
import Header from './component/publicHeads'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo'
 export default class PersonalCenter extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '个人中心'
        }
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title}/>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    max: {
        flex :1
    }
});