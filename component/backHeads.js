import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
global.deviceWidth = Dimensions.get('window').width
export default class BackHeads extends Component{

  constructor(props){
      super(props)
      this.state = {
        
      }
  };
  go = () => {
      this.props.goBackPage()
  }
  render() {
    return (
        <View style = {styles.max}>
            <View style = {styles.headerP}>
                <AntDesign name = {'left'} size = {22} color = {'black'} />
            </View>
            <View style = {styles.headerT}>
                <Text style = {styles.headerText}>{this.props.title}</Text>
            </View>
            <View style = {styles.headerV}>
                <MaterialIcons name = {'live-tv'} size = {22} color = {'black'}/>
            </View>
            <View style = {styles.headerS}>
                <SimpleLineIcons name = {'paper-plane'} size = {22} color = {'black'}/>
            </View>
            <Text style = {styles.goback} onPress = {this.go.bind(this)}></Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    goback: {
        width:60,
        height:30,
        position:'absolute',
        left:0,
        top:40
    },
    max: {
        // flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f8f8f8',
        paddingTop:40,
        borderBottomWidth:1,
        borderBottomColor:"#dddddd",
        paddingBottom:6,
        position:'relative'
    },
    headerP: {
        width:22,
        height:22,
        marginLeft:25,
        marginRight:30,
    },
    headerT: {
        width:244,
        height:22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerV: {
        width:22,
        height:22,
    },
    headerS: {
        width:22,
        height:22,
        marginRight:20,
        marginLeft:15,
    },
    line: {
        flex:1,
        backgroundColor:'red'
    }
});
