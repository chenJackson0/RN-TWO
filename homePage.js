//czg data 2019-02-19
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    Animated,
    Share,
    SectionList,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

 //引用插件
import Header from './component/publicHeads'
import VideoImg from './component/videoImg'
// 取得屏幕的宽高Dimensions
let windowsSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
};
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-picker'
import getFetch from './service/index.js'
import ConfirmationWindow from './component/confirmationWindow'
const photoOptions = {
    title:'请选择',
    quality: 0.8,
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
const options = {
    title: '选择视频',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '录制视频',
    chooseFromLibraryButtonTitle: '选择视频',
    mediaType: 'video',
    videoQuality: 'medium'
};
 export default class HomePage extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '首页',
            butText : '展开',
            userName : '',
            user : '',
            data : [],
            fadeAnim: new Animated.Value(0),
            sharefadeAnim: new Animated.Value(-110),
            commentFlag : true,
            shareFlag : false,
            videoImgFlag : false,
            comments : '',
            addCommentItem : [],
            commentsItem : [],
            index : 0,
            commentNim : 0,
            userNameImg : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            addCommentNum : 0,
            foucsOnList : [],
            onTFlag : false,
            onTFlagF : true,
            replyToCommentText : '',
            replyToCommentMaxFlag : true,
            onFFlag : false,
            onFFlagF : true,
            collectionList :[],
            deleteCommentItems : [
                {
                    title : '确定要删除吗?',
                    leftT : '取消',
                    rightT : '确定',
                    type : 'delete'
                }
            ],
            deleteCommentItemsFlag : false,
            id : '',
            idArray : [],
            loveFlag : true,
            commentInputCallFlag:false,
            callId : '',
            callName : '',
            addId : 0,
            perId : ''
        }
    }
    //时间戳转时间
    type = 'work'
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
            return hour + '时前'
        }else if(minute>1){
            return minute + '分钟前'
        }else{
            return '刚刚' 
        }
    }
    addPublised = async () => {
        const { navigation } = this.props;
        this.setState({
            user : '',
            data : [],
            userNameImg : '',
            addCommentItem : [],
            addCommentNum : 0,
            collectionList : [],
            idArray : []
        })
        let publishedList = await getFetch.selectPublished()
        let collectionList = await getFetch.findCollection()
        if(publishedList.code == 200 && collectionList.code == 200){
            this.init(publishedList.list,publishedList.userList,collectionList.collectionList)
        }else if(publishedList.code == 400 || collectionList.code == 400){

        }else{

        }
    }
    componentDidMount = () => {
       
    }
     //注册通知
     componentWillMount(){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.addPublised())]; //BottomTab路由改变时增加读取数据的监听事件 
    }   
    //处理业务逻辑
    init = async (publishedList,commentsItem,collectionList) => {
        let userNameImg = 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'
        let works = []
        let foucsOnList = []
        let newAddName = []
        const { navigation } = this.props;
        let newTiem = Date.parse(new Date())
        let user = navigation.getParam("perUser") ? navigation.getParam("perUser") : ''
        let lastTime
        let getChangeTime
        //获取作品列表
        for(let i = 0;i<publishedList.length;i++){
            lastTime = newTiem - publishedList[i].time
            if(lastTime>=0){
                if(publishedList[i].typeNum == 0){
                    if(publishedList[i].type == 'works'){
                        works.push(publishedList[i])
                        this.state.onTFlagF = false
                    }
                }else if(publishedList[i].typeNum == 1){
                    //私密的
    
                }else if(publishedList[i].typeNum == 2){
                    for(let i = 0;i<commentsItem.length;i++){
                        if(user == commentsItem[i].userName){
                            for(let j = 0;j<commentsItem[i].focusOns.length;j++){
                                if(publishedList[i].userName == commentsItem[i].focusOns[j].name){
                                    works.push(publishedList[i])
                                }
                            }
                        }
                    }
                }
            }else{
                continue
            } 
        }
        //收藏和点赞初始化
        for(let i = 0;i<works.length;i++){
            works[i].commentsFlag = true
            works[i].cllFlag = true
            works[i].flag = true
            works[i].butText = '查看更多点赞'
            //不同的用户需要判断,不同的作品是否被收藏
            for(let j = 0;j<collectionList.length;j++){
                if(user == collectionList[j].perUserName && collectionList[j].id == works[i].id){
                    works[i].commentsFlag = false
                }
            }
            //不同的用户需要判断,不同的作品是否被点赞
            for(let j = 0;j<works[i].giveALike.length;j++){
                if(user == works[i].giveALike[j]){
                    works[i].cllFlag = false
                }
            }
        }
        if(this.state.onTFlagF){
            this.state.onTFlag = true
        }else{
            this.state.onTFlag = false
        }
        
        //获取推荐的用户
        for(let i = 0;i<commentsItem.length;i++){
            //关注用户不包括自己,需要时放开
            // if(user != commentsItem[i].userName){
            //     // commentsItemList.push(commentsItem[i])
            //     commentsItem[i].addCommentNum = commentsItem[i].focusOns.length
            // }
            if(user == commentsItem[i].userName){
                if(commentsItem[i].focusOns.length == 0){
                    this.changFocusOnFlag(commentsItem,newAddName)
                }else{
                    for(let j = 0;j<commentsItem[i].focusOns.length;j++){
                        newAddName.push(commentsItem[i].focusOns[j].name)
                        foucsOnList.push(commentsItem[i].focusOns[j])
                        this.changFocusOnFlag(commentsItem,newAddName)
                        this.state.onFFlagF = false
                    }
                }
            }
            commentsItem[i].addCommentNum = commentsItem[i].focusOns.length
        }
        if(this.state.onFFlagF){
            this.state.onFFlag = true
        }else{
            this.state.onFFlag = false
        }
        this.setState({
            data : works,
            user:user,
            userNameImg : userNameImg,
            addCommentItem : commentsItem,
            foucsOnList : foucsOnList,
            fadeAnim: new Animated.Value(0),
            sharefadeAnim: new Animated.Value(-110),
            commentFlag : true,
            collectionList : collectionList,
            onFFlag : this.state.onFFlag,
            onTFlag : this.state.onTFlag
         })
    }
    //关注的用户,在没有关注的用户中要是能被关注的
    changFocusOnFlag = (commentsItem,newAddName) => {
        let newCommentsItemIndex = []
        if(newAddName.length == 0){
            for(let i = 0;i<commentsItem.length;i++){
                commentsItem[i].focusOnFlag = true
                commentsItem[i].focusOn = '关注'
            }
        }else{
            for(let i = 0;i<commentsItem.length;i++){
                for(let j = 0;j<newAddName.length;j++){
                    if(commentsItem[i].userName == newAddName[j]){
                        commentsItem[i].focusOnFlag = false
                        commentsItem[i].focusOn = '取消关注'
                        break //此处的break很重要
                    }else{
                        commentsItem[i].focusOnFlag = true
                        commentsItem[i].focusOn = '关注'
                        // newCommentsItem.push(commentsItem[i])
                    }
                }
            }
        }
        // this.setState({
        //     addCommentItem : newCommentsItem
        // })
    }
    //加载已经关注用户
    personItem = () => {
        let array = {
            user:[]
        }
        for(let i = 0;i<this.state.foucsOnList.length;i++){
           let item =  <TouchableOpacity style = {styles.per} key = {i} onPress = {this.goPersonCenter.bind(this,this.state.foucsOnList[i].name,this.state.foucsOnList[i].img)}>
                <View style = {styles.radius}>
                    <Image source={{uri:this.state.foucsOnList[i].img}} style = {styles.perImg} />
                </View> 
                <Text style = {styles.perName}>{this.state.foucsOnList[i].name}</Text>
            </TouchableOpacity>
            array.user.push(item)
        }
        return array.user
    };
    //加载推荐用户
    addPerItem = () =>{
        let array = {
            perItem:[]
        }
        for(let i = 0;i<this.state.addCommentItem.length;i++){
           let item =  <TouchableOpacity style = {[styles.childItem,i == this.state.addCommentItem.length ? styles.childItemR : '']} key = {i} onPress = {this.goPersonCenter.bind(this,this.state.addCommentItem[i].userName,this.state.addCommentItem[i].img)}>
                <Image source={{uri:this.state.addCommentItem[i].img}} style = {styles.addPerListImg} />
                <Text style = {styles.addPerName}>{this.state.addCommentItem[i].userName}</Text>
                <Text style = {styles.addPerMsg}>{this.state.addCommentItem[i].commeName}和其他{this.state.addCommentItem[i].addCommentNum}位用户关注了</Text>
                <Text style = {[styles.addPerButton,this.state.addCommentItem[i].focusOnFlag ? '' : styles.changeaddPerButtonBg]} onPress = {this.focusOn.bind(this,i,this.state.addCommentItem[i].userName,this.state.addCommentItem[i].img)}>{this.state.addCommentItem[i].focusOn}</Text>
                <Text style = {styles.addPerColse} onPress = {this.closeCommentItem.bind(this,i)}>X</Text>
            </TouchableOpacity>
            array.perItem.push(item)
        }
        return array.perItem
    }

    //点击删除commentItem
    closeCommentItem = (num) => {
        let data = []
        for(let i = 0;i<this.state.addCommentItem.length;i++){
            if(i == num){
                continue
            }else{
                data.push(this.state.addCommentItem[i])
            }
        }
        this.setState({
            addCommentItem : data
        })
    }
    //判断是否有图片
    isImg = (img) => {
        if(img){
            return (
                <Image source={{uri:img}} style = {styles.perMaxImg} />
            )
        }else{
            return
        }
    }
    //跳转作品详情
    goDetail = (id) => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Detail',{
            id : id,changeTabNum : 0
        })
    }
    //跳转作者主页
    goPersonCenter = (userName,perNameImg) => {
        const { navigation } = this.props;
        this.props.navigation.navigate('DuthonPerCenter',{
            userName : userName,perNameImg:perNameImg
        })
    }
    //没有说说的时候ui
    onT = () => {
        if(this.state.onTFlag){
            return(
                <Text style = {styles.noT} key = {1}>空空如也,还没有发布任何作品,赶紧点击左上角相机吧.</Text>
            )
        }
    }
    //没有关注主播的时候ui
    onF = () => {
        if(this.state.onFFlag){
            return(
                <Text style = {styles.noT} key = {1}>空空如也,您还没有关注任何的主播,赶紧去关注自己喜欢的主播吧.</Text>
            )
        }
    }
    //收藏
    collectionItems = async (i,id) => {
        if(this.state.data[i].commentsFlag){
            let data = {
                id : this.state.data[i].id,
                perUserName : this.state.user,
                name : this.state.data[i].userName,
                img : this.state.data[i].publicHeadImg
            }
            let collectionL = await getFetch.collection(data) //收藏
            if(collectionL.code == 200){
                this.state.data[i].commentsFlag = false
                this.state.collectionList.push(data)
            }
        }else{
            for(let j = 0;j<this.state.collectionList.length;j++){
                if(this.state.collectionList[j].id == id){
                    let collectionD = await getFetch.deleteCollection({id : id}) //取消
                    if(collectionD.code == 200){
                        this.state.data[i].commentsFlag = true
                    }
                    break
                }
            }
        }
        this.setState({
            data : this.state.data
        })
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

        }else{

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
    //加载已关注的用户发布的作品
    saveWorks = () =>{
        let array = {
            works:[]
        }
        for(let i = 0;i<this.state.data.length;i++){
           let item =   <View style = {styles.perListItem} key = {i} ref = {i}>
                <TouchableOpacity onPress = {this.goPersonCenter.bind(this,this.state.data[i].userName,this.state.data[i].perImg)}>
                    <View style = {styles.perTitle}>
                        <Image source={{uri:this.state.data[i].perImg}} style = {styles.perListImg} />
                        <Text style = {styles.perName}>
                            {this.state.data[i].nickName}
                        </Text>
                        <Ionicons name = {'ios-more'} size = {16} color = {'#000000'} style = {styles.icon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.goDetail.bind(this,this.state.data[i].id)}>
                    {this.isImg(this.state.data[i].publicHeadImg[0].img)}
                </TouchableOpacity>
                <View style = {styles.shareAndCollection}>
                    <View style = {styles.left}>
                        <Entypo name = {this.state.data[i].cllFlag ? 'heart-outlined' : 'heart'} size = {26} color = {'black'} style = {styles.call} onPress = {this.clickCall.bind(this,i,this.state.data[i].id)}/>
                        <EvilIcons name = {'comment'} size = {30} color = {'black'} style = {styles.mas} onPress = {this.comment.bind(this,i,this.state.data[i].id)}/>
                        <EvilIcons name = {'share-google'} size = {30} color = {'black'} style = {styles.share} onPress = {this.share.bind(this)}/>
                    </View>
                    <View style = {styles.right}>
                        <Text style = {[styles.commentT,this.state.data[i].commentsFlag ? styles.commentTH : '']}>已收藏</Text>
                        <FontAwesome name = {'bookmark'} size = {25} color = {this.state.data[i].commentsFlag ? '#D3D3D3' : 'black'} style = {styles.collect} onPress= {this.collectionItems.bind(this,i,this.state.data[i].id)}/>
                    </View>
                </View>
                <View style = {styles.commentsItem}>
                    <Text style = {styles.playNum}>{this.state.data[i].playNum}次播放 · {this.state.data[i].giveALike[this.state.data[i].giveALike.length-1]}赞了</Text>
                    <Text style = {styles.playText}>{this.state.data[i].text}</Text>
                    <View style = {styles.playCont}>
                        {this.moreCall(this.state.data[i].giveALike,this.state.data[i].flag)}
                        <Text style = {styles.leftButton} onPress = {this.showContent.bind(this,i)}>{this.state.data[i].butText}</Text>
                    </View>
                    <Text style = {styles.commentNum} onPress = {this.comment.bind(this,i,this.state.data[i].id)}>共{this.state.data[i].commentsNum}条评论</Text>
                    <View style = {styles.removeList}>
                        <Text style = {styles.commentDay}>{this.state.data[i].timeText} {this.state.data[i].address}</Text>
                        <Text style = {[styles.removeCommentDay,this.state.data[i].userName == this.state.user ? '' : styles.hideRemove]} onPress = {this.deleteItem.bind(this,this.state.data[i].id,'work',this.state.data[i].id)}>删除</Text>
                    </View>
                    
                </View>
            </View>
            array.works.push(item)
        }
        return array.works
    }
    //更多点赞的人
    moreCall = (like,flag) => {
        let giveName = ''
        for(let i = 0;i<like.length;i++){
            giveName = giveName + like[i] + ', '
        }
        if(!flag){
            return(
                <Text style = {styles.leftText}>{like.length}人都点赞了 {giveName}</Text>
            )
        }else{
            return
        }
        
    }
    //展示
    showContent =  (j) =>{
        for(let i = 0;i<this.state.data.length;i++){
            if(this.state.data[i].flag){
                if( i == j){
                    this.state.data[i].flag = false
                    this.state.data[i].butText = '收起'
                }
            }else{
                if( i == j){
                    this.state.data[i].flag = true
                    this.state.data[i].butText = '查看更多点赞'
                }
            }
        }
        this.setState({
            data : this.state.data
        })
    }
    //点击关注
    focusOn = async (j,name,img) => {
        let deteleFochs = []
        let deteleFensi = []
        let deteleFochsIndex = 0
        let deteleFensiIndex = 0
        for(let i = 0;i<this.state.addCommentItem.length;i++){
            if(this.state.addCommentItem[i].userName == name){ 
                deteleFensiIndex = i
            }
            if(this.state.addCommentItem[i].userName == this.state.user){
                deteleFochsIndex = i
            }
        }
        for(let i = 0;i<this.state.addCommentItem.length;i++){
            if(this.state.addCommentItem[i].focusOnFlag){
                if(i == j){
                    this.state.addCommentItem[i].focusOn = '取消关注'
                    this.state.addCommentItem[i].focusOnFlag = false
                    let data = {
                        id : this.state.addCommentItem[i].id,
                        name : name,
                        img : img
                    }
                    this.state.addCommentItem[deteleFochsIndex].focusOns.push(data)
                    let dataT = {
                        id : this.state.addCommentItem[i].id,
                        name : this.state.user,
                        img : this.state.userNameImg
                    }
                    this.state.addCommentItem[deteleFensiIndex].fensi.push(dataT)
                    break
                }
            }else{
                if(i == j){
                    this.state.addCommentItem[i].focusOn = '关注'
                    this.state.addCommentItem[i].focusOnFlag = true
                    for(let k = 0;k<this.state.addCommentItem[deteleFochsIndex].focusOns.length;k++){
                        if(this.state.addCommentItem[deteleFochsIndex].focusOns[k].name != name){
                            deteleFochs.push(this.state.addCommentItem[deteleFochsIndex].focusOns[k])
                        }
                    }
                    for(let k = 0;k<this.state.addCommentItem[deteleFensiIndex].fensi.length;k++){
                        if(this.state.addCommentItem[deteleFensiIndex].fensi[k].name != this.state.user){
                            deteleFensi.push(this.state.addCommentItem[deteleFensiIndex].fensi[k])
                        }
                    }
                    this.state.addCommentItem[deteleFochsIndex].focusOns = deteleFochs
                    this.state.addCommentItem[deteleFensiIndex].fensi = deteleFensi
                    break
                }
            }
        }
        if(this.state.addCommentItem.length == 0){
            this.state.onFFlag = true
        }else{
            this.state.onFFlag = false
        }
        let focusOnIn = await getFetch.focusOn({userName : this.state.user,focusOns:this.state.addCommentItem[deteleFochsIndex].focusOns})
        let fensi = await getFetch.fensi({userName : name,fensi:this.state.addCommentItem[deteleFensiIndex].fensi})
        if(focusOnIn.code == 200 && fensi.code == 200){
            this.setState({
                addCommentItem : this.state.addCommentItem,
                onFFlag : this.state.onFFlag,
                foucsOnList : this.state.addCommentItem[deteleFochsIndex].focusOns
            })
        }else if(focusOnIn.code == 400 || fensi.code == 400){

        }else{
            
        }
    }
    //点赞
    clickCall = async (j,id) => {
        let clickCallUpdata
        for(let i = 0;i<this.state.data.length;i++){
            if(this.state.data[i].cllFlag){
                if( i == j){
                    this.state.data[i].cllFlag = false
                    this.state.data[i].perUser = this.state.user
                    this.state.data[i].giveALike.push(this.state.user)
                    clickCallUpdata = await getFetch.updateOnePublished({id:id,giveALike:this.state.data[i].giveALike})
                }
            }else{
                if( i == j){
                    this.state.data[i].cllFlag = true
                    this.state.data[i].perUser = this.state.user + '取消'
                    this.state.data[i].giveALike.pop(this.state.user)
                    clickCallUpdata = await getFetch.updateOnePublished({id:id,giveALike:this.state.data[i].giveALike})
                }
            }
        }
        if(clickCallUpdata.code == 200){
            this.setState({
                loveFlag : false,
                data : this.state.data,
                loveWidth : 150
            })
        }
        setInterval(() => {
            this.setState({
                loveWidth : -100
            })
        },500)
        {this.showContent()}
    }

    //评论
    comment = (i,id) => {
        let commentsItem = this.state.data[i].data ? this.state.data[i].data : []
        for(let j = 0;j<commentsItem.length;j++){
            commentsItem[j].data[0].replyToCommentListFlag = true
            commentsItem[j].data[0].replyToCommentListT = '查看'
            commentsItem[j].data[0].replyToCommentMaxFlag = true
            for(let k = 0;k<commentsItem[j].data[0].replyToComment.length;k++){
                commentsItem[j].data[0].replyToComment[k].replyToCommentMaxFlag = true
            }
        }
        this.setState({
            commentsItem : commentsItem,
            commentNim : this.state.data[i].commentsNum,
            index : i,
            addId : id
        })
        if(this.state.commentFlag){
            Animated.timing(
                this.state.fadeAnim,
                {
                  toValue: 550,
                  duration: 500,
                }
              ).start();
              this.setState({
                commentFlag : false
              })
        }else{
            Animated.timing(   
                this.state.fadeAnim,
                {
                  toValue:0,
                  duration: 500,
                }
              ).start();
              this.setState({
                commentFlag : true
              })
        }
    }
    //关闭发送评论
    closeSaveMsg = () => {
        Animated.timing(   
            this.state.fadeAnim,
            {
              toValue:0,
              duration: 500,
            }
          ).start();
          this.setState({
            commentFlag : true
          })
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
                name : this.state.user,
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
            let commentsSave = await getFetch.commentsWork({id:this.state.addId,data:this.state.data[this.state.index].data,commentsNum:this.state.data[this.state.index].commentsNum + 1})
            if(commentsSave.code == 200){
                this.setState({
                    comments : '',
                    commentsItem : this.state.data[this.state.index].data,
                    commentNim : this.state.data[this.state.index].commentsNum
                })
            }else if(commentsSave.code == 400){

            }else{

            }
        }else{
            alert("评论不能为空!")
        }
    }
    //拉取分享面板
    share = () => {
        if(!this.state.shareFlag){
            Animated.timing(
                this.state.sharefadeAnim,
                {
                  toValue: 0,
                  duration: 500,
                }
              ).start();
              this.setState({
                shareFlag : true
              })
        }
    }
    //隐藏分享面板
    shareHide = () => {
        if(this.state.shareFlag){
            Animated.timing(
                this.state.sharefadeAnim,
                {
                  toValue: -110,
                  duration: 500,
                }
              ).start();
              this.setState({
                shareFlag : false,
                commentInputCallFlag : false,
                shareFlag : false
              })
        }
    }
    //分享
    hideShareBg = () => {
        Animated.timing(   
            this.state.sharefadeAnim,
            {
              toValue:-110,
              duration: 500,
            }
          ).start();
        this.setState({
            shareFlag : false
        })
        try {
            const result = Share.share({
              message:
                'React Native | A framework for building native apps using React',
            })
      
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
    }

    //跳转用户列表
    goComList = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('ComList',{
            list : this.state.addCommentItem,perUser:this.state.user
        })
    }

    //发布作品不带图片
    videoImg = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Published',{imgFlag : false,user : this.state.user,userNameImg : this.state.userNameImg})
    }
    //唤起发布作品选择组件
    getImg = () => {
        this.setState({
            videoImgFlag : true,
            shareFlag : true
        })
    }
    //视频
    getVideo = () => {
        this.setState({
            videoImgFlag : false,
            shareFlag : false
        })
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                
            }
            else if (response.error) {
                
            }
            else if (response.customButton) {
                
            }
            else {
                alert(JSON.stringify(response))
                // let source = response.uri;
                // const { navigation } = this.props;
                // this.props.navigation.navigate('Published',{imgFlag :true,avatarSource:source,user : this.state.user,userNameImg:this.state.userNameImg})
            }
        });
    }
    //图片
    getImgs = () => {
        this.setState({
            videoImgFlag : false,
            shareFlag : false
        })
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
            
            }
            else if (response.error) {
                
            }
            else if (response.customButton) {
                
            }
            else {
                let source = response.uri;
                const { navigation } = this.props;
                this.props.navigation.navigate('Published',{imgFlag :true,avatarSource:source,user : this.state.user,userNameImg:this.state.userNameImg})
            }
        });
    }
    //发视频或者图片选择
    showAndHidw = () => {
        if(this.state.videoImgFlag){
            return (
                <VideoImg getVideo = {this.getVideo.bind(this)} getImgs = {this.getImgs.bind(this)}/>
            )
        }else{
            return
        }
    }
    //点击浮层隐藏弹窗
    hideF = () => {
        Animated.timing(
            this.state.sharefadeAnim,
            {
              toValue: -110,
              duration: 500,
            }
          ).start();
        this.setState({
            shareFlag : false,
            videoImgFlag : false
        })
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
                    <Text style = {styles.commentRIghtPerText}>
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
                        name : this.state.user,
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

                    }else{

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
                    replyToCommentText : '',
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
    
    render() {
        let {fadeAnim}  = this.state;
        let {sharefadeAnim}  = this.state;
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} videoImg = {this.videoImg.bind(this)} getImg = {this.getImg.bind(this)}/>
                <ScrollView style = {styles.items}>
                    <View style = {styles.listItem}>
                    {this.onF()}
                        <ScrollView style = {styles.perItem} horizontal = {true} showsHorizontalScrollIndicator={false}>
                            {this.personItem()}
                            {/* <View style = {styles.add}>
                                <Entypo name = {'circle-with-plus'} size = {16} color = {'#BF3EFF'}/>
                            </View> */}
                        </ScrollView>
                    </View>
                    {this.onT()}
                   {this.saveWorks()}
                    <View style = {styles.addItemPer}>
                        <View style = {styles.headerTitle}>
                            <Text style = {styles.addPerLeft}>推荐用户</Text>
                            <Text style = {styles.addPerRight} onPress = {this.goComList.bind(this)}>显示全部</Text>
                        </View>
                        <ScrollView style = {styles.addItemList} horizontal = {true} showsHorizontalScrollIndicator={false}>
                            {this.addPerItem()}
                        </ScrollView>
                    </View>
                </ScrollView>
                <Entypo name = {'heart'} size = {this.state.loveWidth} color = {'red'} style = {[styles.love,this.state.loveFlag ? styles.loveHide : '']}/>
                <Animated.View style = {[styles.adimatedView,{height:fadeAnim}]}>
                    <Text style = {styles.commentsTitle}>{this.state.commentNim}条评论</Text>
                    <Text style = {styles.commerCosle} onPress = {this.closeSaveMsg.bind(this)}>X</Text>
                    <SectionList style = {styles.sectList}
                        renderItem={this.addcommentsItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor = {(item,index) => item + index}
                        sections={
                            this.state.commentsItem
                        }>
                    </SectionList>
                    <View style = {[styles.commentInput,this.state.commentFlag ? '' : styles.commentInputB]}>
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
                </Animated.View>
                <View style = {[styles.opacityBg,this.state.shareFlag ? styles.showopacityBg : '']} >
                    <Text style = {styles.bindClick} onPress = {this.hideF.bind(this)}></Text>
                </View>
                <Animated.View style = {[styles.showShare,{bottom:sharefadeAnim}]}>
                    <View style = {styles.shareItem}>
                        <AntDesign name = {'wechat'} size = {40} color = {'black'} style = {styles.shareLogo} onPress = {this.hideShareBg.bind(this)}/>
                        <Text style = {styles.shareName}>微信</Text>
                    </View>
                    <View style = {styles.shareItem}>
                        <AntDesign name = {'QQ'} size = {40} color = {'black'} style = {styles.shareLogo} onPress = {this.hideShareBg.bind(this)}/>
                        <Text style = {styles.shareName}>QQ</Text>
                    </View>
                    <View style = {styles.shareItem}>
                        <AntDesign name = {'codepen-circle'} size = {40} color = {'black'} style = {styles.shareLogo} onPress = {this.hideShareBg.bind(this)}/>
                        <Text style = {styles.shareName}>微信朋友圈</Text>
                    </View>
                    <Text style = {styles.closeShare} onPress = {this.shareHide.bind(this)}>X</Text>
                </Animated.View>
                {this.showAndHidw()}
                <View style = {[styles.opacityBg,this.state.deleteCommentItemsFlag ? styles.showopacityBg : '']} ></View>
                {this.confirmationWindowF()}
                {/* <View style = {[styles.commentInputCall,this.state.commentInputCallFlag ? '' : styles.commentInputCallB]}>
                    <TextInput
                        ref = "code"
                        style = {styles.code}
                        onChangeText={(replyToCommentText) => {
                            this.setState({
                                replyToCommentText : replyToCommentText
                            })
                        }}
                        value={this.state.replyToCommentText}
                        placeholder = '请输入您想说的话……'
                        maxLength = {50}
                        autoCapitalize = "none"
                        clearButtonMode = "while-editing"
                    />
                    <Text style = {styles.codeLine}></Text>
                    <Text style = {styles.getCode} onPress = {this.replyToCommentSaveMsg.bind(this,this.state.callId,this.state.callName,false,this.state.id)}>发送</Text>
                    <Text style = {[styles.closeShare,styles.closeShareCall]} onPress = {this.shareHide.bind(this)}>X</Text>
                </View> */}
            </View>
        )
    }
 }

 const styles = StyleSheet.create({

    commentInputCallB:{
        display:'none'
    },
    commentInputCall:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        height:550,
        position:'relative'
    },
    loveHide:{
        display:'none'
    },
    replyToCommentTitleHide: {
        display:'none'
    },
    goDetail: {
        height:345,
        position:'absolute',
        left:0,
        top:45,
        zIndex:9999,
        right:0
    },
    sectList:{
        marginBottom:30
    },
    commerCosle:{
        position:'absolute',
        top:15,
        right:20
    },
    commentInput:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        left:15,
        bottom:-50,
        borderTopColor:'#dddddd',
        borderTopWidth:1,
    },
    commentInputB:{
        bottom:0
    },
    commentInputBt:{
        bottom:-50
    },
    commentsTitle:{
        fontSize:14,
        color:'#000000',
        paddingTop:15,
        paddingBottom:15,
        textAlign:'center'
    },
    commentList: {
        marginBottom:20,
        flexDirection:'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    commentLeftPerImg:{
        paddingTop:6,
        flex:1
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
    bindClick: {
        flex:1
    },
    closeShare: {
        position:'absolute',
        top:7,
        right:7,
        fontSize:14,
        color:'#898989'
    },
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
    showShare: {
        position:'absolute',
        left:0,
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#ffffff',
    },
    shareItem: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareLogo: {
        flex:1,
        width:40,
        height:40,
        borderRadius:20
    },
    shareName:{
        flex:1,
        fontSize:14,
        color:'#000000',
        marginTop:6,
    },
    adimatedView: {
        height:0,
        // top:0,
        bottom:-2,
        right:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingLeft:15,
        paddingRight:15,
        position:'absolute',
        left:0,
        backgroundColor:'#ffffff',
        borderColor:'#dddddd',
        borderWidth:1,
    },
    addItemPer: {
        backgroundColor :'#f8f8f8',
    },
    headerTitle: {
        paddingLeft:5,
        paddingRight:10,
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10
    },
    addPerLeft: {
        fontSize:13,
        color:'#333333',
        flex:1,
        fontWeight:'700'
    },
    addPerRight: {
        fontSize:13,
        color:'#B23AEE',
        textAlign:'right',
        flex:1
    },
    addItemList: {
        paddingBottom:12
    },
    childItem: {
        marginRight:3,
        borderRadius:3,
        borderColor:'#EAEAEA',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        width:135,
        paddingRight:4,
        paddingLeft:4,
        backgroundColor:'#ffffff'
    },
    childItemR: {
        marginRight:0
    },
    addPerListImg: {
        width:70,
        height:70,
        borderColor:'#cccccc',
        borderWidth:1,
        marginTop:10,
        borderRadius:35,
    },
    addPerName: {
        fontSize:12,
        color:'#333333',
        marginTop:10,
        marginBottom:5,
        textAlign:'center'
    },
    addPerMsg: {
        fontSize:10,
        color:'#898989',
        textAlign:'center'
    },
    addPerButton: {
        fontSize:12,
        color:'#ffffff',
        backgroundColor:'#AB82FF',
        marginBottom:10,
        marginTop:10,
        textAlign:'center',
        paddingTop:4,
        paddingBottom:4,
        borderRadius:8,
        width:123
    },
    changeaddPerButtonBg: {
        backgroundColor:'#f2f2f2',
        color:'#cccccc'
    },
    addPerColse: {
        fontSize:12,
        color:'#898989',
        position:'absolute',
        top:5,
        right:5
    },
    commentsItem: {
        paddingBottom:10,
        paddingLeft:5,
        paddingRight:10,
    },
    playNum: {
        fontSize:12,
        color:'#333333'
    },
    playText: {
        fontSize:12,
        color:'#333333',
        marginTop:6,
        marginBottom:2
    },
    playCont: {
        paddingRight:15
    },
    leftText: {
        fontSize:11,
        color:'#333333',
        marginTop:4
    },
    leftButton: {
        fontSize:11,
        color:'#898989',
        marginTop:4
    },
    commentNum: {
        fontSize:11,
        color:'#898989',
        marginTop:6,
        marginBottom:4
    },
    removeList:{
        flexDirection:'row',
        // justifyContent:'center',
        alignItems:'center'
    },
    removeCommentDay:{
        fontSize:10,
        color:'#E066FF',
        paddingLeft:20
    },
    commentDay: {
        fontSize:10,
        color:'#898989',
    },
    hideRemove: {
        display:'none'
    },
    max: {
        flex :1
    },
    items: {
        paddingLeft:4,
        paddingRight:4
    },
    listItem: {
        flex:1,
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
        
        position:'relative',
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
        fontSize:10,
        color:'#333333'
    },
    icon: {
        position:'absolute',
        top:9,
        right:8
    },
    perMaxImg: {
        flex:1,
        height:345
    },
    shareAndCollection: {
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:5,
        paddingRight:10,
        flexDirection:'row',
    },
    left: {
        flex:1,
        flexDirection:'row',
    },
    call: {
        
    },
    mas: {
        marginLeft:10,
        marginRight:10,
       
    },
    share: {

    },
    collect: {
        textAlign:'right'
    },
    right: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    love: {
        position:'absolute',
        left:'50%',
        top:'50%',
        marginLeft:-75,marginTop:-75
    },
    codeLine: {
        height:30,
        width:0,
        backgroundColor:"#ffffff"
    },
    code: {
        fontSize:13,
        color:'#000000',
        flex:10,
        paddingLeft:0,
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
        lineHeight:40,
        backgroundColor:'#ffffff'
    },
    noT: {
        fontSize:13,
        color:'#898989',
        paddingTop:30,
        paddingBottom:20,
        textAlign:'center',
        flex:1
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
    commentT:{
        fontSize:10,
        color:'#D3D3D3',
        paddingRight:10
    },
    commentTH:{
        display:'none'
    },
    closeShareCall:{
        color:'#ffffff',
        top:18,
        right:18
    },
});