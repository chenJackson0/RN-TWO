//czg data 2019-02-19
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    SectionList,
    ScrollView,
    TextInput
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
            commentsItem : [],
            id : -1,
            data : [],
            commentNim : 0,
            userNameImg : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            user : '',
            comments : '',
            index : -1,
            playNum : 23453,
            author:'',
            authorImg :'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            text : '',
            changeTabNum : 0,
            works : '作品',
            say : '说说'
        }
    }
    //绑定监听事件
    showDataImg = () => {
        Constants.publishedListStorageF()//加载缓存获取数据
        Constants.getUserNameImgStorageF()
        Constants.getUserNameStorageF()
        // this.setState({
        //     itemDetail:[],
        //     itemImg : [],
        //     userNameImg : '',
        //     data : [],
        //     commentsItem : [],
        //     commentNim : 0,
        //     id : -1,
        //     index : -1,
        //     authorImg : ''
        // })
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
        let changeTabNum = navigation.getParam("changeTabNum")
        let userName = Constants.getUserName() ? Constants.getUserName() : ''
        let userNameImg = Constants.getUserNameImg() ? Constants.getUserNameImg() : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'
        let publishedList = Constants.getSublishedList() ? Constants.getSublishedList() : []
        for(let i = 0;i<publishedList.length;i++){
            if(publishedList[i].id == id){
                this.state.itemDetail = publishedList[i],
                this.state.itemImg = publishedList[i].publicHeadImg
                this.state.index = i
                break //这里一定要return,否则一个作品多张图时,会执行多次,重复
            }
        }
        let commentsItem = publishedList[this.state.index].data ? publishedList[this.state.index].data : []
        this.setState({
            id : id,
            data : publishedList,
            itemDetail : this.state.itemDetail,
            itemImg : this.state.itemImg,
            commentsItem : commentsItem,
            commentNim : publishedList[this.state.index].commentsNum,
            userNameImg : userNameImg,
            user : userName,
            index: this.state.index,
            authorImg : publishedList[this.state.index].perImg,
            author : publishedList[this.state.index].userName,
            text : publishedList[this.state.index].text,
            changeTabNum : changeTabNum
        })
    }
    //加载图片或视频
    showWokerImg = () => {
        if(this.state.changeTabNum == 0){
            let wokerImgView = <View style = {styles.wokerImg}>
            <Swiper style={styles.wrapper} showsButtons={false} showsPagination = {true}
                autoPlay = {true} loop = {true}
            >
                {this.workeImg()}
            </Swiper>
            </View>
            return wokerImgView
        }else if(this.state.changeTabNum == 1){
    
        }
    }
    workeImg = ()=> {
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
    //发送评论
    saveMsg = () => {
        if(this.state.comments){
            let data = {
                id : this.state.data[this.state.index].commentsNum + 1,
                img : this.state.userNameImg,
                name : this.state.user,
                nameT : this.state.comments,
            }
            let commentsItem = 
                {
                    data : []
                }
            
            commentsItem.data.unshift(data)
            this.state.data[this.state.index].data.push(commentsItem)
            this.state.data[this.state.index].commentsNum = this.state.data[this.state.index].commentsNum + 1
            this.setState({
                comments : '',
                commentsItem : this.state.data[this.state.index].data,
                commentNim : this.state.data[this.state.index].commentsNum
            })
            Constants.storage.save({
                key : 'publishedLi',
                data : this.state.data,
                defaultExpires: true, 
            })
        }else{
           alert("评论不能为空!")
        }
    }
    //评论列表
    addcommentsItem = ({item}) => {
        return(
            <View style = {styles.commentList}>
                <View style = {styles.commentLeftPerImg}>
                    <Image source={{uri:item.img}} style = {styles.commentLeftPerListImg} />
                </View>
                <View style = {styles.commentRightPerText}>
                    <Text style = {styles.commentRIghtPerName}>
                        {item.name}
                    </Text>
                    <Text style = {styles.commentRIghtPerText}>
                        {item.nameT}
                    </Text>
                </View>
            </View>
        )
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)}/>
                {this.showWokerImg()}
                <View style = {styles.detailMsg}>
                    <Image source={{uri : this.state.authorImg}} style = {styles.authorImg} />
                    <Text style = {styles.playName}>该{this.state.changeTabNum == 0 ? this.state.works : this.state.say}由《{this.state.author}》发布</Text>
                </View>
                <View style = {styles.detailT}>
                    <Text style = {styles.playNum}>最近浏览了{this.state.playNum}次</Text>
                    <Text style = {styles.authorText}>{this.state.text}</Text>
                    <Text style = {styles.commentsTitle}>{this.state.commentNim}条评论</Text>
                </View>
                <ScrollView>
                    <View style = {[styles.adimatedView]}>
                        <SectionList style = {styles.sectList}
                            renderItem={this.addcommentsItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor = {(item,index) => item + index}
                            sections={
                                this.state.commentsItem
                            }>
                        </SectionList>
                    </View>
                </ScrollView>
                <View style = {[styles.commentInput]}>
                    <TextInput
                        ref = "code"
                        style = {styles.code}
                        onChangeText={(comments) => {
                            this.setState({
                                comments : comments
                            })
                        }}
                        value={this.state.comments}
                        placeholder = '请输入您想说的话……'
                        maxLength = {50}
                        autoCapitalize = "none"
                        clearButtonMode = "while-editing"
                    />
                    <Text style = {styles.codeLine}></Text>
                    <Text style = {styles.getCode} onPress = {this.saveMsg.bind(this)}>发送</Text>
                </View>
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
    wokerImg: {
        height:200
    },
    wrapper: {
        height:200
    },
    adimatedView: {
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#ffffff',
        paddingTop:15
    },
    commentsTitle:{
        fontSize:14,
        color:'#000000',
        paddingTop:10,
        paddingBottom:10,
        textAlign:'left',
    },
    commentList: {
        marginBottom:20,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectList:{
        marginBottom:30
    },
    commentInput:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor:'#dddddd',
        borderTopWidth:1,
        paddingLeft:20,
        paddingRight:20
    },
    code: {
        fontSize:13,
        color:'#000000',
        flex:10,
        paddingLeft:5,
        height:40,
        backgroundColor:'#ffffff'
    },
    getCode: {
        fontSize:11,
        color:'#000000',
        flex:1,
        textAlign:'center',
        height:40,
        marginLeft:10,
        lineHeight:40
    },
    codeLine: {
        height:30,
        width:0,
        backgroundColor:"#dddddd"
    },
    commentLeftPerImg:{
        flex:1
    },
    commentLeftPerListImg:{
        width:30,
        height:30,
        borderRadius:15
    },
    commentRightPerText:{
        paddingLeft:15,
        flex:9
    },
    commentRIghtPerName:{
        fontSize:14,
        color:'#EE82EE'
    },
    commentRIghtPerText:{
        fontSize:14,
        color:'#999999',
        marginTop:8
    },
    detailMsg: {
        flexDirection:'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:15
    },
    authorImg: {
        width:30,
        height:30,
        borderRadius:15,
        marginRight:10
    },
    playName: {
        fontSize:13,
        color:'#000000'
    },
    detailT: {
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'#EDEDED',
        borderBottomWidth:1
    },
    playNum: {
        fontSize:14,
        color:'#898989',
        marginTop:10
    },
    authorText: {
        fontSize:14,
        color:'#898989',
        marginTop:6
    },

});