/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {DeviceEventEmitter, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from './global.js'
import getFetch from './service/index.js'
global.deviceWidth = Dimensions.get('window').width

export default class SetPassWord extends Component{

  constructor(props){
      super(props)
      this.state = {
        account: '',
        accountFlag : true,
        commentsItem : [],
        userImg : '',
        userNameImg : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
        addCommentNum : 0,
        address : '上海'
      }
  };
  user = ''; //用户名
  passWord = ''; //密码
  newPassWord = ''; //确认密码
  accountListLength = 0
  message = ''
  
  //页面将要离开的是时候发送通知
//   componentWillUnmount(){
//     DeviceEventEmitter.emit('ChangeUI', {account:this.state.account,accountList:this.accountList});
//   }
  //注册通知
//   componentDidMount(){
//     DeviceEventEmitter.addListener('accountList',(dic)=>{
//         //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
//         this.setState({
//             userName:dic.account,
//             accountFlag : false
//         });
//         this.accountList = dic.accountList
//    });
//  }
  //注册的事件
   getAccount = async () => {
        const { navigation } = this.props;
        this.setState({
            account : navigation.getParam("account"), //页面加载获取前一个页面传来的手机号码
            // commentsItem : commentsItem
        })
  };
  //加载数据
//   init = () => {
//     const { navigation } = this.props;
//     let commentsItem = Constants.getcommentsItem() ? Constants.getcommentsItem() : []
//     this.setState({
//         account : navigation.getParam("account"), //页面加载获取前一个页面传来的手机号码
//         commentsItem : commentsItem
//     })
//   }
  //注册通知
  componentDidMount(){
//     DeviceEventEmitter.addListener('ChangeUI',(dic)=>{
//         //接收到详情页发送的通知，刷新首页的数据
//         this.setState({
//             userName:dic.account,
//             accountFlag : false
//         });
//         this.accountList = dic.accountList
//    });
    this.Is_GoodsRefreshed = [this.props.navigation.addListener('willFocus', () => this.getAccount())]; //BottomTab路由改变时增加读取数据的监听事件 
} 

  //校验新注册的账号和是否重复
  checkAccount = async () => {
    let commentsItem = await getFetch.getUser({userName:this.state.account})
    if(commentsItem.code == 200){
        this.accountListLength = commentsItem.count
        return true;
    }else if(commentsItem.code == 400){
        this.message = commentsItem.message
        return false;
    }else if(commentsItem.code == 500){
        this.message = commentsItem.message
        return false;
    }
    
  };
  //注册
  submit = async () =>{
    const { navigation } = this.props;
    //将用户名存入全局缓存
    if(!await this.checkAccount()){
        alert(this.message)
    }else if(this.state.account != '' && this.passWord != '' && this.newPassWord != ''){
        if(this.passWord == this.newPassWord ){
            this.commentsItemBind()
            this.props.navigation.navigate('Login',{
                account : this.state.account
            })
        }else{
            alert("二次输入密码不一致!")
        }
    }else{
        alert("密码不能为空!")
    }
  }
  //创建粉丝和关注绑定关系
  commentsItemBind = () => {
    let data = {
        id : this.accountListLength + 1,
        userName : this.state.account,
        passWord : this.passWord,
        fensi : [], //关注主播的人
        focusOns : [], //主播关注的人
        img : this.state.userNameImg,
        commeName : this.state.account,
        addCommentNum : this.state.addCommentNum,
        focusOn :'关注',
        focusOnFlag : true,
        address : this.state.address,
        nickName : '',
        webSite : '',
        personalResume : '',
        email : '',
        phone : '',
        sex : ''
    }
    getFetch.registered(data)
  }
  render() {
    return (
        <View style = {styles.max}>
            <View style = {styles.img}>
                <Image source={require('./image/logo.png')} style = {styles.logo} />
            </View>
            <View style = {styles.input}>
                <TextInput
                    style = {styles.inputText}
                    onChangeText={(user) => {
                        this.user = user
                    }}
                    value={this.state.account}
                    placeholder = "手机号、账号或邮箱"
                    autoCapitalize = "none"
                    clearButtonMode = "while-editing"
                />
                <TextInput
                    style = {[styles.inputText,styles.inputTextLast]}
                    onChangeText={(passWord) => {
                        this.passWord = passWord
                    }}
                    // value={}
                    placeholder = "密码"
                    autoCapitalize = "none"
                    clearButtonMode = "while-editing"
                    secureTextEntry={true}
                />
                <TextInput
                    style = {[styles.inputText,styles.inputTextLast]}
                    onChangeText={(newPassWord) => {
                        this.newPassWord = newPassWord
                    }}
                    // value={}
                    placeholder = "确认密码"
                    autoCapitalize = "none"
                    clearButtonMode = "while-editing"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress = {this.submit.bind(this)}>
                    <Text style={styles.buttonText}>注册</Text>
                </TouchableOpacity>
            </View>            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    max: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:'#ffffff'
    },
    img: {
        marginTop:130,
        alignItems: 'center',
    },
    logo: {
        width:180,
        height:50,
        
    },
    input: {
        alignItems: 'center',
        marginTop:35
    },
    inputText: {
        width:345,
        height:45,
        borderWidth:1,
        borderColor:'#dddddd',
        borderRadius:5,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#f8f8f8',
        fontSize:12
    },
    inputTextLast: {
        marginTop:12
    },
    foat: {
        fontSize:12,
        color:'#B23AEE',
        textAlign:'right',
        paddingTop:17,
        paddingBottom:30,
        paddingRight:15,
        width:375
    },
    button: {
        width:345,
        height:45,
        backgroundColor:'#87CEFA',
        borderRadius:5,
        color:'#ffffff',
        fontSize:14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    },
    buttonText: {
        color:'#ffffff',
        fontSize:14
    }
});
