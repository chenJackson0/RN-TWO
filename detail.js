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
import Header from './component/backHeads'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo'
import Swiper from 'react-native-swiper';
import Constants from './global.js'
 export default class Detail extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '作品详情',
            itemDetail : [],
            itemImg : [],
            a : 0
        }
    }
    //绑定监听事件
    showDataImg = () => {
        Constants.publishedListStorageF()//加载缓存获取数据
        this.setState({
            itemDetail:[],
            itemImg : []
        })
        setTimeout(()=>{
            this.init()
        },200)
    }
    //注册通知
    componentWillMount (){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.showDataImg())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //加载数据
    init = () => {
        const { navigation } = this.props;
        let id = navigation.getParam("id")
        let publishedList = Constants.getSublishedList() ? Constants.getSublishedList() : []
        for(let i = 0;i<publishedList.length;i++){
            if(publishedList[i].id == id){
                this.setState({
                    itemDetail : publishedList[i],
                    itemImg : publishedList[i].publicHeadImg
                })
            }
        }
    }
    //加载图片或视频
    showWokerImg = () => {
        let data = []
        for(let i = 0;i<this.state.itemImg.length;i++){
            let view = <Image source={{uri : this.state.itemImg[i].img}} style = {styles.workeImg} key = {i}/>
            data.push(view)
        }
        return data
    }
    //返回
    goBackPage = () =>{
        const { navigation } = this.props;
        this.props.navigation.goBack()
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)}/>
                <ScrollView>
                    <View style = {styles.wokerImg}>
                        <Swiper style={styles.wrapper} showsButtons={false} showsPagination = {true}
                            autoPlay = {true} loop = {true}
                        >
                            {this.showWokerImg()}
                        </Swiper>
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
    workeImg: {
        width:ScreenWidth,
        height:200
    },
});