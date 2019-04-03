import React, {Component} from "react";
// StackNavigator用于实现各个页面间的跳转。TabNavigator切换组件，实现同一页面上不同界面的切换。
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import Login from "./login";
import Registered from "./registered";
import HomePage from "./homePage";
import Rearch from "./rearch";
import Collection from "./collection";
import PersonalCenter from "./personalCenter";
import EditPage from "./editPage";
import VerificationCode from "./verificationCode";
import SetPassWord from "./setPassWord";
import ComList from "./comList";
import Published from "./published";
import Detail from "./detail";
import DuthonPerCenter from "./duthonPerCenter"
import chatListPage from './chatListPage'
import dialogPage from './dialogPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default class App extends Component {
    render() {
        return (
            <AppContainer/>
        );
    }
}
const chatNavigator = createBottomTabNavigator({
      chatListPage:chatListPage
    },{
      tabBarOptions: {
        //当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: '#B23AEE',
        //当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: 'black',
        //是否显示tab bar的图标，默认是false
        showIcon: true,
        //showLabel - 是否显示tab bar的文本，默认是true
        showLabel: true,
        //tab bar的样式
        style: {
            backgroundColor: '#f8f8f8',
            height:47
        },
        //tab bar的文本样式
        labelStyle: {
            fontSize: 11,
            margin: 0
        },
        //tab 页指示符的样式 (tab页下面的一条线).
        indicatorStyle: {height: 0},
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: true,
    //是否在切换tab页时使用动画
    animationEnabled: false,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none',
});
const TabNavigator = createBottomTabNavigator({
  HomePage:{screen:HomePage,navigationOptions :({navigation})=>({
    tabBarLabel: '首页',
    tabBarIcon: ({focused}) => {
      if(!focused){
        return (
          <SimpleLineIcons name = {'home'} size = {18} color = {'black'}/>
        );
      }else{
        return (
          <MaterialIcons name = {'home'} size = {26} color = {'black'}/>
        );
      }
    }
  })},
  Rearch:{screen:Rearch,navigationOptions :({navigation})=>({
    tabBarLabel: '搜索',
    tabBarIcon: ({focused}) => {
      if(!focused){
        return (
          <EvilIcons name = {'search'} size = {25} color = {'black'}/>
        );
      }else{
        return (
          <Octicons name = {'search'} size = {18} color = {'black'}/>
        );
      } 
    }
  })},
  Collection:{screen:Collection,navigationOptions :({navigation})=>({
    tabBarLabel: '说说',
    tabBarIcon: ({focused}) => {
      if(!focused){
        return (
          <MaterialIcons name = {'chat-bubble-outline'} size = {20} color = {'black'}/>
        );
      }else{
        return (
          <MaterialIcons name = {'chat-bubble'} size = {20} color = {'black'}/>
        );
      }
    }
  })},
  PersonalCenter:{screen:PersonalCenter,navigationOptions :({navigation})=>({
    tabBarLabel: '个人中心',
    tabBarIcon: ({focused}) => {
      if(!focused){
        return (
          <FontAwesome name = {'user-o'} size = {18} color = {'black'}/>
        );
      }else{
        return (
          <FontAwesome name = {'user'} size = {25} color = {'black'}/>
        );
      }
    }
  })}
},{
  tabBarOptions: {
    //当前选中的tab bar的文本颜色和图标颜色
    activeTintColor: '#B23AEE',
    //当前未选中的tab bar的文本颜色和图标颜色
    inactiveTintColor: 'black',
    //是否显示tab bar的图标，默认是false
    showIcon: true,
    //showLabel - 是否显示tab bar的文本，默认是true
    showLabel: true,
    //tab bar的样式
    style: {
        backgroundColor: '#f8f8f8',
        height:47
    },
    //tab bar的文本样式
    labelStyle: {
        fontSize: 11,
        margin: 0
    },
    //tab 页指示符的样式 (tab页下面的一条线).
    indicatorStyle: {height: 0},
},
//tab bar的位置, 可选值： 'top' or 'bottom'
tabBarPosition: 'bottom',
//是否允许滑动切换tab页
swipeEnabled: true,
//是否在切换tab页时使用动画
animationEnabled: false,
//是否懒加载
lazy: true,
//返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
backBehavior: 'none',
});
const RootStack = createStackNavigator(
  {
    Login:{screen:Login,navigationOptions :({navigation})=>({
      headerTitle:"登陆",
      header:null,
    })},
    Registered:{screen:Registered,navigationOptions :({navigation})=>({
      headerTitle:"注册",
      header:null,
    })},
    HomePage:{screen:TabNavigator,navigationOptions :({navigation})=>({
      // headerTitle:"首页",
      header:null
    })},
    ComList:{screen:ComList,navigationOptions :({navigation})=>({
      // headerTitle:"首页",
      header:null
    })},
    EditPage:{screen:EditPage,navigationOptions :({navigation})=>({
      // headerTitle:"首页",
      header:null
    })},
    Published:{screen:Published,navigationOptions :({navigation})=>({
      // headerTitle:"首页",
      header:null
    })},
    VerificationCode:{screen:VerificationCode,navigationOptions :({navigation})=>({
      headerTitle:"填写验证码",
    })},
    SetPassWord : {screen:SetPassWord,navigationOptions :({navigation})=>({
      headerTitle:"确定密码",
    })},
    Detail:{screen:Detail,navigationOptions :({navigation})=>({
      // headerTitle:"首页",
      header:null
    })},
    DuthonPerCenter:{screen:DuthonPerCenter,navigationOptions :({navigation})=>({
      // headerTitle:"首页",
      header:null
    })},
    chatNavigator:{screen:chatNavigator,navigationOptions :({navigation})=>({
      // headerTitle:"聊天功能块",
      header:null
    })},
    dialogPage:{screen:dialogPage,navigationOptions :({navigation})=>({
      // headerTitle:"聊天界面",
      header:null
    })},
  },
  {
    initialRouteName:'chatNavigator' //默认入口
  }
)


const AppContainer = createAppContainer(RootStack);