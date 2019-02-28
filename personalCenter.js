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
import EvilIcons from 'react-native-vector-icons/EvilIcons'

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
                <ScrollView>
                    <View style = {styles.userConter1}>
                        <View style = {styles.userConter1Left}>
                            <Image source={{uri :'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.userImg} />
                        </View>
                        <View style = {styles.userConter1Right}>
                            <View style = {styles.userConter1RightTop}>
                                <Text style = {styles.userConter1RightTop1}>1</Text>
                                <Text style = {styles.userConter1RightTop1}>0</Text>
                                <Text style = {styles.userConter1RightTop1}>10</Text>
                            </View>
                            <View style = {styles.userConter1RightMidd}>
                                <Text style = {styles.userConter1RightMidd1}>帖子</Text>
                                <Text style = {styles.userConter1RightMidd1}>粉丝</Text>
                                <Text style = {styles.userConter1RightMidd1}>关注</Text>
                            </View>
                            <View style = {styles.userConter1RightBottom}>
                                <Text style = {styles.userConter1RightBottomText}>编辑主页</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.userConter2}>
                        <Text style = {styles.userConterName}>Charlie Chen</Text>
                    </View>
                    <View style = {styles.userConter3}>
                        <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.userConterTab} />
                        <EvilIcons name = {'credit-card'} size = {30} color = {'#898989'} style = {styles.userConterTab} />
                        <EvilIcons name = {'image'} size = {30} color = {'#898989'} style = {styles.userConterTab} />
                    </View>
                    <View style = {styles.userConter4}>
                        <Image source={{uri :'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.userConter4Img} />
                    </View>
                    <View style = {styles.userConter5}>
                        <Text style = {styles.userConter5Title}>完善个人主页</Text>
                        <Text style = {styles.userConter5Msg}>完成3/4项</Text>
                        <View style = {styles.userConter5Item}>
                            <View style = {[styles.userConter5ItemOne,styles.userConter5ItemOneR]}>
                                <EvilIcons name = {'comment'} size = {50} color = {'#E066FF'} style = {styles.userConterTab} />
                                <Text style = {styles.userConter5ItemOneT}>添加个人简历</Text>
                                <Text style = {styles.userConter5ItemOneS}>向粉丝介绍一下自己吧.</Text>
                                <Text style = {styles.userConter5ItemOneB}>添加个人简历</Text>
                            </View>
                            <View style = {styles.userConter5ItemOne}>
                                <EvilIcons name = {'link'} size = {50} color = {'#E066FF'} style = {styles.userConterTab} />
                                <Text style = {styles.userConter5ItemOneT}>查找用户并关注</Text>
                                <Text style = {styles.userConter5ItemOneS}>关注想了解的用户和感兴趣的内容.</Text>
                                <Text style = {[styles.userConter5ItemOneB,styles.userConter5ItemOneButB]}>查看更多</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    userConter5: {
        // backgroundColor:'#f2f2f2',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:12,
        paddingBottom:12
    },
    userConter5Title: {
        fontSize:14,
        fontWeight:'700',
        color:'#000000'
    },
    userConter5Msg: {
        fontSize:9,
        color:'#898989',
        marginTop:5
    },
    userConter5Item: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:12
    },
    userConter5ItemOne: {
        flex:1,
        borderColor:'#EDEDED',
        borderWidth:1,
        borderRadius:4,
        paddingBottom:12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:15
    },
    userConter5ItemOneR: {
        marginRight:5
    },
    userConterTab: {
        // marginTop:15
    },
    userConter5ItemOneT: {
        fontSize:12,
        color:'#000000',
        marginTop:12,
        textAlign:'center'
    },
    userConter5ItemOneS: {
        fontSize:11,
        color:'#898989',
        paddingLeft:13,
        paddingRight:13,
        marginTop:6,
        textAlign:'center'
    },
    userConter5ItemOneB: {
        fontSize:12,
        color:'#ffffff',
        paddingBottom:5,
        paddingLeft:3,
        paddingRight:3,
        paddingTop:5,
        borderRadius:4,
        backgroundColor:'#AB82FF',
        marginTop:50,
        width:90,
        textAlign:'center',
        overflow:'hidden'
    },
    userConter4: {

    },
    userConter4Img: {
        width:100,
        height:100
    },
    userConter3: {
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1
    },
    userConterTab: {
        flex:1,
        textAlign:'center'
    },
    max: {
        flex :1
    },
    userConter1: {
        paddingTop:10,
        paddingBottom:10,
        paddingRight:8,
        paddingLeft:8,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1Left: {
        width:70,
        height:70,
        marginRight:8
    },
    userImg: {
        width:70,
        height:70,
        borderRadius:35,
    },
    userConter1Right: {
        width:281,
        marginTop:5,
    },
    userConter1RightTop: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1RightTop1: {
        flex:1,
        fontSize:12,
        color:'#000000',
        fontWeight:'700',
        textAlign:'center'
    },
    userConter1RightMidd: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1RightMidd1: {
        flex:1,
        fontSize:12,
        color:'#898989',
        textAlign:'center'
    },
    userConter1RightBottom: {
        marginTop:8
    },
    userConter1RightBottomText: {
        fontSize:12,
        color:'#000000',
        fontWeight:'700',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#EDEDED',
        paddingTop:5,
        paddingBottom:5,
        textAlign:'center'
    },
    userConter2: {
        borderBottomColor:'#EDEDED',
        borderBottomWidth:1,
        paddingBottom:10,
        paddingLeft:10
    },
    userConterName: {
        marginTop:0,
        fontSize:13,
        color:'#000000',
        fontWeight:'700',
    },
    userConter5ItemOneButB: {
        backgroundColor:'#ffffff',
        color:'#000000',
        width:60,
        borderColor:'#EDEDED',
        borderWidth:1,
    }
});