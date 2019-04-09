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
    TextInput,
    TouchableOpacity
} from 'react-native';

 //引用插件
import Header from './component/backHeads'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo'
import Swiper from 'react-native-swiper';
import Constants from './global.js'
import getFetch from './service/index.js'
import ConfirmationWindow from './component/confirmationWindow'
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
            text : '',
            changeTabNum : 0,
            works : '作品',
            say : '说说',
            time : '',
            address : '',
            onTFlag : false,
            onTFlagF : true,
            replyToCommentText : '',
            replyToCommentMaxFlag : true,
            callId : '',
            callName : '',
            addId : 0,
            perId : '',
            deleteCommentItemsFlag : false,
            deleteCommentItems : [
                {
                    title : '确定要删除吗?',
                    leftT : '取消',
                    rightT : '确定',
                    type : 'delete'
                }
            ],
            nickName : ''
        }
    }
    //时间戳转时间

    changeTime = (date) => {
        let day = Math.floor(date / (3600*24));
        let hour =  Math.floor((date % (3600*24)) / 3600);
        let minute = Math.floor(((date % (3600*24)) % 3600) / 60);
        let month = Math.floor(day / (31))
        if(month>0){
            return month + '月前'
        }else if(day>0){
            return day + '天前'
        }else if(hour>1){
            return hour + '小时前'
        }else if(minute>1){
            return minute + '分钟前'
        }else{
            return '刚刚' 
        }
    }
    //绑定监听事件
    showDataImg = async () => {
        this.setState({
            itemImg : [],
            changeTabNum : ''
        })
        let publishedList = await getFetch.selectPublished()
        if(publishedList.code == 200){
            this.init(publishedList.list)
        }else if(publishedList.code == 400){
            alert(message)
        }else{
            alert(message)
        }
    }
    //注册通知
    componentWillMount (){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.showDataImg())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //加载数据
    init = (publishedList) => {
        let newTiem = Date.parse(new Date())
        const { navigation } = this.props;
        let id = navigation.getParam("id")
        let changeTabNum = navigation.getParam("changeTabNum")
        for(let i = 0;i<publishedList.length;i++){
            if(publishedList[i].id == id){
                this.state.itemDetail = publishedList[i],
                this.state.index = i
                this.state.onTFlagF = false
                break //这里一定要return,否则一个作品多张图时,会执行多次,重复
            }
        }
        if(this.state.onTFlagF){
            this.state.onTFlag = true
        }else{
            this.state.onTFlag = false
        }
        let commentsItem = publishedList[this.state.index].data ? publishedList[this.state.index].data : []
        for(let j = 0;j<commentsItem.length;j++){
            commentsItem[j].data[0].replyToCommentListFlag = true
            commentsItem[j].data[0].replyToCommentListT = '查看'
            commentsItem[j].data[0].replyToCommentMaxFlag = true
            for(let k = 0;k<commentsItem[j].data[0].replyToComment.length;k++){
                commentsItem[j].data[0].replyToComment[k].replyToCommentMaxFlag = true
            }
        }
        this.setState({
            id : id,
            data : publishedList,
            itemDetail : this.state.itemDetail,
            itemImg : publishedList[this.state.index].publicHeadImg,
            commentsItem : commentsItem,
            commentNim : publishedList[this.state.index].commentsNum,
            userNameImg : publishedList[this.state.index].perImg,
            user : publishedList[this.state.index].userName,
            nickName : publishedList[this.state.index].nickName?publishedList[this.state.index].nickName:publishedList[this.state.index].userName,
            index: this.state.index,
            text : publishedList[this.state.index].text,
            changeTabNum : changeTabNum,
            time : this.changeTime((newTiem-publishedList[this.state.index].time)/1000),
            address : publishedList[this.state.index].address,
            onTFlag : this.state.onTFlag,
        })
    }
    //加载图片或视频
    showWokerImg = () => {
        if(this.state.changeTabNum == 0 || this.state.changeTabNum == 2){
            let wokerImgView = <View style = {styles.workeImg}>
            <Swiper style={styles.wrapper} autoplay = {true}
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
    //删除自己发的作品或评论
    deleteItem = (id,type,perId) => {
        if(type == 'work'){
            this.type = 'work'
        }else if(type == 'commit'){
            this.type = 'commit'
        }else if(type == 'commitChild'){
            this.type = 'commitChild'
        }
        this.setState({
            deleteCommentItemsFlag : true,
            id : id,
            perId : perId
        })
    }
    //不删除
    noDelete = () => {
        this.setState({
            deleteCommentItemsFlag : false,
        })
    }
    //删除
    deleteI = async () => {
        let data = []
        let dataA = []
        let commitList = []
        let deteleCommit = {code : 0}
        let publishedD = {code : 0}
        let deteleCommitChild = {code : 0}
        if(this.type == 'work'){
            for(let i = 0;i<this.state.data.length;i++){
                if(this.state.id == this.state.data[i].id){
                    continue
                }else{
                    data.push(this.state.data[i])
                }
            }
            if(data.length == 0){
                this.state.onTFlag = true
            }else{
                this.state.onTFlag = false
            }
            publishedD = await getFetch.deletePublished({id : this.state.id}) //删除作品
        }else if(this.type == 'commit'){
            for(let i = 0 ;i<this.state.data[this.state.index].data.length;i++){
                if(this.state.id == this.state.data[this.state.index].data[i].data[0].id){
                    continue
                }else{
                    dataA.push(this.state.data[this.state.index].data[i])
                }
            }
            this.state.data[this.state.index].data = dataA
            this.state.data[this.state.index].commentsNum = this.state.data[this.state.index].commentsNum - 1
            data = this.state.data
            deteleCommit = await getFetch.commentsWork({id:this.state.addId,data:dataA,commentsNum:this.state.data[this.state.index].commentsNum}) //删除评论
        }else if(this.type == 'commitChild'){
            for(let i = 0 ;i<this.state.data[this.state.index].data.length;i++){
                if(this.state.perId == this.state.data[this.state.index].data[i].data[0].id){
                    for(let j = 0;j<this.state.data[this.state.index].data[i].data[0].replyToComment.length;j++){
                        if(this.state.id == this.state.data[this.state.index].data[i].data[0].replyToComment[j].id){
                            continue
                        }else{
                            dataA.push(this.state.data[this.state.index].data[i].data[0].replyToComment[j])
                        }
                    }
                    this.state.data[this.state.index].data[i].data[0].replyToComment = dataA
                    deteleCommitChild = await getFetch.eveyComments({id:this.state.addId,index:this.state.perId,
                        data:this.state.data[this.state.index].data[i].data[0].replyToComment,
                        replyToCommentMaxFlag:this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag,
                        replyToCommentListFlag:this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag,
                        replyToCommentListT : this.state.data[this.state.index].data[i].data[0].replyToCommentListT,
                    }) //删除多级评论
                }
            }
            data = this.state.data
        }
        
        if(publishedD.code == 200 || deteleCommit.code == 200 || deteleCommitChild.code == 200){
            if(this.type == 'work'){
                await getFetch.deleteCollection({id : this.state.id}) //取消
            }
            this.setState({
                data : data,
                commentsItem : this.state.data[this.state.index].data,
                deleteCommentItemsFlag : false,
                onTFlag : this.state.onTFlag,
                commentNim : this.state.data[this.state.index].commentsNum,
            })
        }else if(publishedD.code == 400 || deteleCommit.code == 400 || deteleCommitChild.code == 400){
            alert(message)
        }else{
            alert(message)
        }
    }
    //删除作品选择
   confirmationWindowF = () => {
        if(this.state.deleteCommentItemsFlag){
            return(
                <ConfirmationWindow confirmationWindowFlagData = {this.state.deleteCommentItems} noDelete = {this.noDelete.bind(this)} deleteI = {this.deleteI.bind(this)}/>
            )
        }else{
            return
        }
    }
    //发送评论
    saveMsg = async () => {
        let num = 0
        if(this.state.comments){
            for(let i = 0;i<this.state.data.length;i++){
                if(this.state.addId == this.state.data[i].id){
                    num = this.state.data[i].data.length != 0 ? this.state.data[i].data[this.state.data[i].data.length-1].data[0].id + 1 : num
                }
            }
            let data = {
                id : num,
                img : this.state.userNameImg,
                name : this.state.nickName,
                nameT : this.state.comments,
                replyToComment : [],
                replyToCommentMaxFlag : true,
                replyToCommentListFlag : true,
                replyToCommentListT : '查看'
            }
            let commentsItem = 
                {
                    id : num,
                    data : []
                }
            
            commentsItem.data.unshift(data)
            this.state.data[this.state.index].data.push(commentsItem)
            this.state.data[this.state.index].commentsNum = this.state.data[this.state.index].commentsNum + 1
            let commentsSave = await getFetch.commentsWork({id:this.state.addId,data:this.state.data[this.state.index].data,commentsNum:this.state.data[this.state.index].commentsNum})
            if(commentsSave.code == 200){
                this.setState({
                    comments : '',
                    commentsItem : this.state.data[this.state.index].data,
                    commentNim : this.state.data[this.state.index].commentsNum
                })
            }else if(commentsSave.code == 400){
                alert(message)
            }else{
                alert(message)
            }
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
                     <View style = {styles.removeAndCall}>
                        <Text style = {styles.commentRIghtPerName}>
                            {item.name}
                        </Text>
                        <Text style = {[styles.callBackMsg,styles.replayToCommentCallBack]} onPress = {this.eplyToCommentT.bind(this,item.id)}>回复</Text>
                        <Text style = {[styles.callBackMsg,styles.replayToCommentRemove,item.name == this.state.user ? '' : styles.replayToCommentRemoveHide]} onPress = {this.deleteItem.bind(this,item.id,'commit',item.id)}>删除</Text>
                    </View>
                    <Text style = {styles.commentRIghtPerText} onLongPress = {this.eplyToCommentT.bind(this,item.id)}>
                        {item.nameT}
                    </Text>
                    <View style = {[styles.eplyToCommentMax,item.replyToCommentMaxFlag ? styles.eplyToCommentMaxB : '']}>
                        <TextInput
                            ref = "code"
                            style = {[styles.code,styles.eplyToCommentCode]}
                            onChangeText={(replyToCommentText) => {
                                this.setState({
                                    replyToCommentText : replyToCommentText
                                })
                            }}
                            value={this.state.replyToCommentText}
                            placeholder = '请输入您想回复的话……'
                            maxLength = {50}
                            autoCapitalize = "none"
                            clearButtonMode = "while-editing"
                        />
                        <Text style = {styles.codeLine}></Text>
                        <Text style = {styles.getCode} onPress = {this.replyToCommentSaveMsg.bind(this,item.id,item.name,true,-1)}>发送</Text>
                    </View>
                    <Text style = {[styles.replyToCommentTitle,item.replyToComment.length == 0 ? styles.replyToCommentTitleHide : '']} onPress = {this.showReplyToComment.bind(this,item.id)}>{item.replyToCommentListT}{item.replyToComment.length}条回复</Text>
                    {this.replyToCommentTitleList(item)}
                </View>
            </View>
        )
    }
    //回复评论
    replyToCommentSaveMsg = async (id,name,callFlag,childId) => {
        let itemName = null
        if(callFlag){
            itemName = name
        }else{
            itemName = this.state.callName
        }
        for(let i = 0;i<this.state.data[this.state.index].data.length;i++){
            if(id == this.state.data[this.state.index].data[i].data[0].id){
                let replyToCommentId = this.state.data[this.state.index].data[i].data[0].replyToComment.length == 0 ? 0 : this.state.data[this.state.index].data[i].data[0].replyToComment[this.state.data[this.state.index].data[i].data[0].replyToComment.length-1].id + 1
                if(this.state.replyToCommentText){
                    let replyToComment = {
                        id : replyToCommentId,
                        img:this.state.userNameImg,
                        name : this.state.nickName,
                        itemName : itemName,
                        nameT : this.state.replyToCommentText,
                        replyToCommentMaxFlag : true
                    }
                    this.state.data[this.state.index].data[i].data[0].replyToComment.push(replyToComment)
                    this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag = true
                    if(childId != -1){
                        this.state.data[this.state.index].data[i].data[0].replyToComment[childId].replyToCommentMaxFlag = true
                    }
                    this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag = false
                    this.state.data[this.state.index].data[i].data[0].replyToCommentListT = '收起'
                    let eveyComments = await getFetch.eveyComments({id:this.state.addId,index:id,
                        data:this.state.data[this.state.index].data[i].data[0].replyToComment,
                        replyToCommentMaxFlag:this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag,
                        replyToCommentListFlag:this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag,
                        replyToCommentListT : this.state.data[this.state.index].data[i].data[0].replyToCommentListT,
                    })
                    if(eveyComments.code == 200){
                        this.setState({
                            commentsItem : this.state.data[this.state.index].data,
                            replyToCommentText : '',
                            commentInputCallFlag : false,
                            shareFlag : false,
                        })
                    }else if(eveyComments.code == 400){
                        alert(message)
                    }else{
                        alert(message)
                    }
                }else{
                    alert("回复评论不能为空!")
                }
            }
        }
    }
    //评论可回复
    eplyToCommentT = (index) => {
        for(let i = 0;i<this.state.data[this.state.index].data.length;i++){
            if(index == this.state.data[this.state.index].data[i].data[0].id){
                if(this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag){
                    this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag = false
                }else{
                    this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag = true
                }
                this.setState({
                    commentsItem : this.state.data[this.state.index].data,
                    replyToCommentText : ''
                })
            }else{
                this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag = true
            }
        }
        
    }
    //查看更多回复
    showReplyToComment = (index) => {
        for(let i = 0;i<this.state.data[this.state.index].data.length;i++){
            if(index == this.state.data[this.state.index].data[i].data[0].id){
                if(this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag){
                    this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag = false
                    this.state.data[this.state.index].data[i].data[0].replyToCommentListT = '收起'
                    this.setState({
                        commentsItem : this.state.data[this.state.index].data,
                    })
                }else{
                    this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag = true
                    this.state.data[this.state.index].data[i].data[0].replyToCommentListT = '查看'
                    this.setState({
                        commentsItem : this.state.data[this.state.index].data,
                    })
                }
            }
        }
    }
    //多级回复
    callBackCall = (id,name,perId) => {
        for(let i = 0;i<this.state.data[this.state.index].data.length;i++){
            if(perId == this.state.data[this.state.index].data[i].data[0].id){
                for(j = 0;j<this.state.data[this.state.index].data[i].data[0].replyToComment.length;j++){
                    if(id == this.state.data[this.state.index].data[i].data[0].replyToComment[j].id){
                        if(this.state.data[this.state.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag){
                            this.state.data[this.state.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag = false
                        }else{
                            this.state.data[this.state.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag = true
                        }
                        this.setState({
                            commentsItem : this.state.data[this.state.index].data,
                            replyToCommentText : ''
                        })
                    }else{
                        this.state.data[this.state.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag = true
                    }
                }
            }
        }
        this.setState({
            callName : name,
            replyToCommentText : ''
        })
    }
    //评论的回复
    replyToCommentTitleList = (item) => {
        let array = []
        for(let i = 0;i<item.replyToComment.length;i++){
            let view = <View style = {[styles.replyToComment,styles.commentList,item.replyToCommentListFlag ? styles.replyToCommentListStyle : '']} key = {i}>
                <View style = {styles.commentLeftPerImg}>
                    <Image source={{uri:item.replyToComment[i].img}} style = {styles.commentLeftPerListImg} />
                </View>
                <View style = {styles.commentRightPerText}>
                    <View style = {styles.removeAndCall}>
                        <Text style = {styles.commentRIghtPerName}>
                            {item.replyToComment[i].name}回复了{item.replyToComment[i].itemName}
                        </Text>
                        <Text style = {[styles.callBackMsg,styles.replayToCommentCallBack]} onPress = {this.callBackCall.bind(this,item.replyToComment[i].id,item.replyToComment[i].name,item.id)}>回复</Text>
                        <Text style = {[styles.callBackMsg,styles.replayToCommentRemove,item.replyToComment[i].name == this.state.user ? '' : styles.replayToCommentRemoveHide]} onPress = {this.deleteItem.bind(this,item.replyToComment[i].id,'commitChild',item.id)}>删除</Text>
                    </View>
                    <Text style = {styles.commentRIghtPerText}>
                        {item.replyToComment[i].nameT}
                    </Text>
                    <View style = {[styles.eplyToCommentMax,item.replyToComment[i].replyToCommentMaxFlag ? styles.eplyToCommentMaxB : '']}>
                        <TextInput
                            ref = "code"
                            style = {[styles.code,styles.eplyToCommentCode]}
                            onChangeText={(replyToCommentText) => {
                                this.setState({
                                    replyToCommentText : replyToCommentText
                                })
                            }}
                            value={this.state.replyToCommentText}
                            placeholder = '请输入您想回复的话……'
                            maxLength = {50}
                            autoCapitalize = "none"
                            clearButtonMode = "while-editing"
                        />
                        <Text style = {styles.codeLine}></Text>
                        <Text style = {styles.getCode} onPress = {this.replyToCommentSaveMsg.bind(this,item.id,item.name,false,item.replyToComment[i].id)}>发送</Text>
                    </View>
                </View>
            </View>
            array.push(view)
        }
        return array
    }
    //跳转作者主页
    goPersonCenter = (userName,perNameImg) => {
        const { navigation } = this.props;
        this.props.navigation.navigate('DuthonPerCenter',{
            userName : userName,perNameImg:perNameImg
        })
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)}/>
                {this.showWokerImg()}
                <TouchableOpacity onPress = {this.goPersonCenter.bind(this,this.state.user,this.state.userNameImg)}>
                    <View style = {styles.detailMsg}>
                        <Image source={{uri : this.state.userNameImg}} style = {styles.authorImg}/>
                        <Text style = {styles.playName}>该{this.state.changeTabNum == 0 ? this.state.works : this.state.say}由《{this.state.nickName}》发布</Text>
                    </View>
                </TouchableOpacity>
                <View style = {styles.detailT}>
                    <Text style = {styles.playNum}>最近浏览了{this.state.playNum}次和{this.state.data[this.state.index] ? this.state.data[this.state.index].giveALike.length : []}人赞了</Text>
                    <Text style = {styles.authorText}>{this.state.text}</Text>
                    <Text style = {styles.commentsTitle}>{this.state.commentNim}条评论</Text>
                    <Text style = {[styles.time]}>{this.state.time} {this.state.address}</Text>
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
                <View style = {[styles.opacityBg,this.state.deleteCommentItemsFlag ? styles.showopacityBg : '']} ></View>
                {this.confirmationWindowF()}
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    opacityBg: {
        position:'absolute',
        right:0,
        top:-20,
        left:0,
        backgroundColor:'#000000',
        opacity:0.5
    },
    showopacityBg: {
        bottom:0,
    },
    time: {
        fontSize:11,
        color:'#898989',
        paddingBottom:10,
    },
    max: {
        flex :1
    },
    workeImg: {
        width:ScreenWidth,
        height:200
    },
    wrapper: {
        // height:250
    },
    workeImgs:{
        // height:200
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
        // alignItems: 'center',
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
        flex:1,
        paddingTop:6
    },
    commentLeftPerListImg:{
        paddingTop:10,
        width:30,
        height:30,
        borderRadius:15
    },
    commentRightPerText:{
        paddingLeft:15,
        flex:9
    },
    commentRIghtPerName:{
        flex:6,
        fontSize:14,
        color:'#EE82EE'
    },
    replyToCommentTitleHide: {
        display:'none'
    },
    removeAndCall:{
        flexDirection:'row',
        justifyContent: 'center',
    },
    commentRIghtPerText:{
        fontSize:14,
        color:'#999999',
        marginTop:8
    },
    replayToCommentCallBack:{
        flex:1
    },
    replayToCommentRemove:{
        flex:1
    },
    replayToCommentRemoveHide: {
        display:'none'
    },
    callBackMsg:{
        fontSize:10,
        color:'#E066FF'
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
        color:'#FF00FF',
        marginTop:10
    },
    authorText: {
        fontSize:14,
        color:'#898989',
        marginTop:6
    },
    eplyToCommentMax:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#dddddd',
        borderBottomWidth:1,

    },
    eplyToCommentMaxB: {
        display:'none'
    },
    replyToCommentTitle: {
        marginTop:10,
        fontSize:14,
        color:'#EED5D2'
    },
    replyToComment: {
        marginTop:10
    },
    replyToCommentTitle: {
        marginTop:10,
        fontSize:14,
        color:'#EED5D2'
    },
    replyToCommentListStyle: {
        display:'none'
    },
});