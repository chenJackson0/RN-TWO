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
global.deviceWidth = Dimensions.get('window').width

export default class SetPassWord extends Component{

  constructor(props){
      super(props)
      this.state = {
        account: '',
        accountFlag : true
      }
  };
  user = ''; //用户名
  passWord = ''; //密码
  newPassWord = ''; //确认密码
  accountList = []
  //页面加载获取前一个页面传来的手机号码
  componentWillMount = () => {
    Constants.storageF()//加载缓存获取数据
    const { navigation } = this.props;
    this.setState({
        account : navigation.getParam("account")
    })
  };

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
  
   getAccount = () => {
        Constants.storageF()//加载缓存获取数据
  };
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
  checkAccount = () => {
    if(this.state.accountFlag){
        this.accountList = Constants.getStorageAccount() ? Constants.getStorageAccount() : []
    }else{
        this.accountList = this.accountList
    }
    for(let i = 0;i<this.accountList.length;i++){
        if(this.state.account == this.accountList[i].userName){
            return false;
        }
    }
    return true;
  };
  //注册
  submit = () =>{
    const { navigation } = this.props;
    //将用户名存入全局缓存
    if(!this.checkAccount()){
        alert("账号已经被注册")
        return
    }
    if(this.state.account != '' && this.passWord != '' && this.newPassWord != ''){
        if(this.passWord == this.newPassWord ){
            let data = {
                userName : this.state.account,
                passWord : this.passWord
            }
            this.accountList = this.accountList.concat(data)
            Constants.storage.save({
                key : 'account',
                data : this.accountList,
                defaultExpires: true, 
            })
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
