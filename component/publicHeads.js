import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
global.deviceWidth = Dimensions.get('window').width

export default class PublicHeads extends Component{

  constructor(props){
      super(props)
      this.state = {
        videoImgFlag : true
      }
  };
  //发视频或者图文作品
    getImg = () => {
        if(this.props.open){
            this.props.getImg()
        }else{
            this.props.getNoImg()
        }
        
    }

    //长按事件,发说说,全文字
    onLongC = () =>{
        this.props.videoImg()
    }
  render() {
    return (
        <View style = {styles.max}>
            <View style = {styles.headerP}>
                <SimpleLineIcons name = {'camera'} size = {22} color = {'black'} onLongPress = {this.onLongC.bind(this)} onPress = {this.getImg.bind(this)}/>
            </View>
            <View style = {styles.headerT}>
                <Text style = {styles.headerText}>{this.props.title}</Text>
            </View>
            <View style = {styles.headerV}>
                {/* <MaterialIcons name = {'live-tv'} size = {22} color = {'black'}/> */}
            </View>
            <View style = {styles.headerS}>
                <SimpleLineIcons name = {'paper-plane'} size = {22} color = {'black'}/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
