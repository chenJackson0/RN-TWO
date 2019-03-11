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
import {strings} from './language/index'
global.deviceWidth = Dimensions.get('window').width

export default class App extends Component{

  constructor(props){
      super(props)
      this.state = {
        userName : '',
        passWord : '',
        flag : false,
        accountFlag : true,
      }
  }
  accountList = [];
  //页面加载时执行
  componentWillMount = () => {
    Constants.storageF()//加载缓存获取数据
    //删除所以数据
  }
  //获取前一个page传来的值
  getAccount = () => {
    const { navigation } = this.props;
    Constants.storageF()//加载缓存获取数据
    let user = navigation.getParam("account")
    this.setState({
        userName : user
    })
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
//页面将要离开的是时候发送通知
//   componentWillUnmount(){
//     DeviceEventEmitter.emit('accountList', {accountList:this.accountList});
//   }
  //点击注册按钮
  registered = () =>{
    const { navigation } = this.props;
    this.setState({
        userName : '',
        passWord : ''
    })
    this.props.navigation.navigate('Registered')
  };
  //校验
  checkAccount = () => {
    if(this.state.accountFlag){
        this.accountList = Constants.getStorageAccount() ? Constants.getStorageAccount() : []
    }else{
        this.accountList = this.accountList
    }
    if(this.state.userName != '' && this.state.passWord != ''){
        for(let i = 0;i<this.accountList.length;i++){
            if(this.state.userName == this.accountList[i].userName){
                if(this.state.passWord == this.accountList[i].passWord){
                    return true
                }else{
                    alert("用户名或密码不正确!")
                    return false
                }
            }
        }
        alert("用户名或密码不正确!")
        return false
    }else{
        alert("用户名或密码不能为空!")
        return
    }
  };
  //登录
  loginCheckAccount = () => {
    const { navigation } = this.props;
    if(this.checkAccount()){
        this.props.navigation.navigate('HomePage',{
            perUser : this.state.userName
        })
        this.setState({
            userName : '',
            passWord : ''
        })
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
                        this.setState({
                            userName : user
                        })
                    }}
                    value={this.state.userName}
                    autoCapitalize = "none"
                    placeholder = "手机号、账号或邮箱"
                    clearButtonMode = "while-editing"
                />
                <TextInput
                    style = {[styles.inputText,styles.inputTextLast]}
                    onChangeText={(passWord) => {
                        this.setState({
                            passWord : passWord
                        })
                    }}
                    value={this.state.passWord}
                    placeholder = "密码"
                    autoCapitalize = "none"
                    clearButtonMode = "while-editing"
                    secureTextEntry={true}
                />
                <Text style = {styles.foat}>忘记密码了?</Text>
                <TouchableOpacity style={styles.button} onPress = {this.loginCheckAccount.bind(this)}>
                    <Text style={styles.buttonText}>{strings('home.exit')}</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.line}>
                <Text style = {styles.lineItem}></Text>
                <Text style = {styles.lineText}>或</Text>
                <Text style = {styles.lineItem}></Text>
            </View>
            <View style = {styles.sectionD}>
                <Image source={require('./image/f.png')} style = {styles.sectionDlogo} />
                <Text style = {styles.sectionDText}>使用 Facebook 登录</Text>
            </View>
            <View style = {styles.registered}>
                <Text style = {styles.registerMsg}>还没有账户?</Text>
                <Text style = {styles.registerButton} onPress = {this.registered.bind(this)}>注册.</Text>
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
    },
    buttonText: {
        color:'#ffffff',
        fontSize:14
    },
    line: {
        paddingRight:15,
        paddingLeft:15,
        marginTop:30,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineItem: {
        backgroundColor:'#dddddd',
        width:140,
        height:1
    },
    lineText: {
        fontSize:12,
        color:'#666666',
        width:65,
        textAlign:'center'
    },
    sectionD: {
        marginTop:40,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionDlogo: {
        width:20,
        height:20,
        marginRight:5
    },
    sectionDText: {
        fontSize:14,
        color:'#BF3EFF'
    },
    registered: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:45,
        borderColor:'#dddddd',
        borderWidth:1,
        position:'absolute',
        left:0,
        bottom:0,
        right:0
    },
    registerMsg: {
        fontSize:12,
        color:'#666666'
    },
    registerButton: {
        fontSize:12,
        color:'#B23AEE',
        marginLeft:10
    }
});
