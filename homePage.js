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
import Ionicons from 'react-native-vector-icons/Ionicons'

 export default class HomePage extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '首页'
        }
    }

    personItem = () => {
        let array = {
            user:[]
        }
        for(let i = 0;i<10;i++){
           let item =  <View style = {styles.per} key = {i}>
                <View style = {styles.radius}>
                    <Image source={{uri:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.perImg} />
                </View> 
                <Text style = {styles.perName}>jackson</Text>
            </View>
            array.user.push(item)
        }
        return array.user
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title}/>
                <ScrollView style = {styles.items}>
                    <View style = {styles.listItem}>
                        <ScrollView style = {styles.perItem} horizontal = {true} showsHorizontalScrollIndicator={false}>
                            {this.personItem()}
                            <View style = {styles.add}>
                                <Entypo name = {'circle-with-plus'} size = {16} color = {'#BF3EFF'}/>
                            </View>
                        </ScrollView>
                    </View>

                    <View style = {styles.perListItem}>
                        <View style = {styles.perTitle}>
                            <Image source={{uri:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.perListImg} />
                            <Text style = {styles.perName}>
                                marcoasensio 10
                            </Text>
                            <Ionicons name = {'ios-more'} size = {16} color = {'#000000'} style = {styles.icon}/>
                        </View>
                        <Image source={{uri:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.perMaxImg} />
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    max: {
        flex :1
    },
    items: {
        paddingLeft:4,
        paddingRight:4
    },
    listItem: {
        paddingRight:10,
        paddingLeft:10,
        paddingTop:6,
        paddingBottom:5,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
    },
    perItem: {
        position:'relative',
        zIndex:9
    },
    per: {
        width:70,
        height:70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radius: {
        width:50,
        height:50,
        overflow:'hidden',
        borderRadius:35,
    },
    add: {
        width:20,
        height:20,
        backgroundColor:'#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:15,
        left:45,
        borderRadius:10,
        zIndex:999
    },
    perImg: {
        width:50,
        height:50,
    },
    perName: {
        width:70,
        fontSize:12,
        color:'#898989',
        paddingTop:5,
        overflow:'hidden',
        textAlign:'center'
    },
    perListItem: {
        
        
        paddingTop:8,
        
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    perTitle: {
        // width:30,
        // height:30,
        // overflow:'hidden',
        // borderRadius:15,
        // justifyContent: 'center',
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:8,
        alignItems: 'center',
        position:'relative',
        flexDirection:'row',
    },
    perListImg: {
        borderRadius:15,
        width:30,
        height:30,
        marginRight:5,
    },
    perName: {
        fontSize:12,
        color:'#898989'
    },
    icon: {
        position:'absolute',
        top:9,
        right:8
    },
    perMaxImg: {
        flex:1,
        height:345
    }
});