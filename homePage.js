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
    Share
} from 'react-native';

 //引用插件
import Header from './component/publicHeads'
import VideoImg from './component/videoImg'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-picker'
import Constants from './global.js'
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
 export default class HomePage extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '首页',
            butText : '展开',
            userName : '',
            user : '',
            data : [],
            fadeAnim: new Animated.Value(-180),
            sharefadeAnim: new Animated.Value(-110),
            commentFlag : true,
            shareFlag : false,
            videoImgFlag : false,
            addCommentItem : [
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '花样年画 / HARU',commeName : 'kanon_fukuda',addCommentNum : 2,focusOn :'关注',focusOnFlag : true},
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雾里看花 / HI',commeName : 'evliac_kio',addCommentNum : 1,focusOn :'关注',focusOnFlag : true},
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雪中送腿 / FA',commeName : 'alian_li',addCommentNum : 4,focusOn :'关注',focusOnFlag : true},
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '春夏秋冬 / SHYUANF',commeName : 'fames_si',addCommentNum : 5,focusOn :'关注',focusOnFlag : true},
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '别来无恙 / HAO',commeName : 'li_shuai',addCommentNum : 3,focusOn :'关注',focusOnFlag : true},
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '换看春秋 / WEI',commeName : 'kang_wei',addCommentNum : 1,focusOn :'关注',focusOnFlag : true},
                {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '人来人往 / KAN',commeName : 'jacksonChen',addCommentNum : 9,focusOn :'关注',focusOnFlag : true},
            ]
        }
    }
    //时间戳转时间

    changeTime = (date) => {
        let month = Math.floor(date / (3600*24*30))
        let day = Math.floor(date / (3600*24));
        let hour =  Math.floor((date % (3600*24)) / 3600);
        let minute = Math.floor(((date % (3600*24)) % 3600) / 60);
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
    addPublised = () => {
        const { navigation } = this.props;
        let data = this.state.data
        let publisedList = navigation.getParam("publisedList")
        if(publisedList){
            data.unshift(publisedList)
            this.setState({
                data:data
            })
        }
    }
     //注册通知
    componentDidMount(){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.addPublised())]; //BottomTab路由改变时增加读取数据的监听事件 
    }   
    
    //加载页面
    componentWillMount = () =>{
        Constants.publishedListStorageF()//加载缓存获取数据
        setTimeout(()=>{
            this.init()
        },100)
    }
    //处理业务逻辑

    init = () => {
        let publishedList = Constants.getSublishedList() ? Constants.getSublishedList() : []
        const { navigation } = this.props;
        let newTiem = Date.parse(new Date())
        let user = navigation.getParam("perUser")
        let lastTime
        let getChangeTime
        for(let i = 0;i<publishedList.length;i++){
            lastTime = newTiem - publishedList[i].time
            if(lastTime>0){
                getChangeTime = this.changeTime(lastTime)
                publishedList[i].timeText = getChangeTime
            }else{
                return
            }
        }
        this.setState({
            data : publishedList,
            user:user
         })
    }
    //加载待关注用户
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
    };
    //加载推荐用户
    addPerItem = () =>{
        let array = {
            perItem:[]
        }
        for(let i = 0;i<this.state.addCommentItem.length;i++){
           let item =  <View style = {[styles.childItem,i == this.state.addCommentItem.length ? styles.childItemR : '']} key = {i}>
                <Image source={{uri:this.state.addCommentItem[i].img}} style = {styles.addPerListImg} />
                <Text style = {styles.addPerName}>{this.state.addCommentItem[i].name}</Text>
                <Text style = {styles.addPerMsg}>{this.state.addCommentItem[i].commeName}和其他{this.state.addCommentItem[i].addCommentNum}位用户关注了</Text>
                <Text style = {[styles.addPerButton,this.state.addCommentItem[i].focusOnFlag ? '' : styles.changeaddPerButtonBg]} onPress = {this.focusOn.bind(this,i)}>{this.state.addCommentItem[i].focusOn}</Text>
                <Text style = {styles.addPerColse} onPress = {this.closeCommentItem.bind(this,i)}>X</Text>
            </View>
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
    //加载已关注的用户发不的作品
    saveWorks = () =>{
        let array = {
            works:[]
        }
        for(let i = 0;i<this.state.data.length;i++){
           let item =   <View style = {styles.perListItem} key = {i} ref = {i}>
           <View style = {styles.perTitle}>
                    <Image source={{uri:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.perListImg} />
                    <Text style = {styles.perName}>
                        {this.state.data[i].userName}
                    </Text>
                    <Ionicons name = {'ios-more'} size = {16} color = {'#000000'} style = {styles.icon}/>
                </View>
                {this.isImg(this.state.data[i].publicHeadImg[0].img)}
                <View style = {styles.shareAndCollection}>
                    <View style = {styles.left}>
                        <Entypo name = {this.state.data[i].cllFlag ? 'heart-outlined' : 'heart'} size = {26} color = {'black'} style = {styles.call} onPress = {this.clickCall.bind(this,i)}/>
                        <EvilIcons name = {'comment'} size = {30} color = {'black'} style = {styles.mas} onPress = {this.comment.bind(this)}/>
                        <EvilIcons name = {'share-google'} size = {30} color = {'black'} style = {styles.share} onPress = {this.share.bind(this)}/>
                    </View>
                    <View style = {styles.right}>
                        <FontAwesome name = {'bookmark'} size = {25} color = {'black'} style = {styles.collect}/>
                    </View>
                </View>
                <View style = {styles.commentsItem}>
                    <Text style = {styles.playNum}>{this.state.data[i].playNum}次播放 · {this.state.data[i].perUser}赞了</Text>
                    <Text style = {styles.playText}>{this.state.data[i].text}</Text>
                    <View style = {styles.playCont}>
                        <Text style = {styles.leftText}>{this.state.data[i].giveALikeList}</Text>
                        <Text style = {styles.leftButton} onPress = {this.showContent.bind(this,i)}>{this.state.data[i].butText}</Text>
                    </View>
                    <Text style = {styles.commentNum}>共{this.state.data[i].commentsNum}条评论</Text>
                    <Text style = {styles.commentDay}>{this.state.data[i].timeText}</Text>
                </View>
            </View>
            array.works.push(item)
        }
        return array.works
    }
    //展示
    showContent =  (j) =>{
        let giveName = ''
        for(let i = 0;i<this.state.data.length;i++){
            if(this.state.data[i].flag){
                if( i == j){
                    for(let j = 0;j<this.state.data[i].giveALike.length;j++){
                        giveName = giveName + this.state.data[i].giveALike[j] + ', '
                    }
                    this.state.data[i].giveALikeList = '他们都点赞了 ' + giveName
                    this.state.data[i].flag = false
                    this.state.data[i].butText = '收起'
                }
            }else{
                if( i == j){
                    this.state.data[i].giveALikeList = ''
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
    focusOn = (j) => {
        for(let i = 0;i<this.state.addCommentItem.length;i++){
            if(this.state.addCommentItem[i].focusOnFlag){
                if(i == j){
                    this.state.addCommentItem[i].focusOn = '已关注'
                    this.state.addCommentItem[i].focusOnFlag = false
                }
            }else{
                if(i == j){
                    this.state.addCommentItem[i].focusOn = '关注'
                    this.state.addCommentItem[i].focusOnFlag = true
                }
            }
        }
        this.setState({
            addCommentItem : this.state.addCommentItem
        })
    }
    //点赞
    clickCall = (j) => {
        for(let i = 0;i<this.state.data.length;i++){
            if( i == j){
                this.state.data[i].cllFlag = false
                this.state.data[i].perUser = this.state.user
            }
        }
        this.setState({
            data : this.state.data,
            loveWidth : 150
        })
        setInterval(() => {
            this.setState({
                loveWidth : -100
            })
        },500)
    }

    //评论
    comment = () => {
        if(this.state.commentFlag){
            Animated.timing(
                this.state.fadeAnim,
                {
                  toValue: 0,
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
                  toValue:-180,
                  duration: 500,
                }
              ).start();
              this.setState({
                commentFlag : true
              })
        }
    }
    //发送评论
    saveMsg = () => {
        Animated.timing(   
            this.state.fadeAnim,
            {
              toValue:-180,
              duration: 500,
            }
          ).start();
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
            list : this.state.addCommentItem
        })
    }

    //发布作品不带图片
    videoImg = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Published',{imgFlag : false,user : this.state.user})
    }
    //发布作品选择图片
    getImg = () => {
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
                this.props.navigation.navigate('Published',{imgFlag :true,avatarSource:source,user : this.state.user})
            }
        });
    }
    //加载发布选择组件
    showAndHidw = () => {
        if(this.state.videoImgFlag){
            return (
                <VideoImg/>
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
    render() {
        let {fadeAnim}  = this.state;
        let {sharefadeAnim}  = this.state;
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} videoImg = {this.videoImg.bind(this)} getImg = {this.getImg.bind(this)}/>
                <ScrollView style = {styles.items}>
                    <View style = {styles.listItem}>
                        <ScrollView style = {styles.perItem} horizontal = {true} showsHorizontalScrollIndicator={false}>
                            {this.personItem()}
                            <View style = {styles.add}>
                                <Entypo name = {'circle-with-plus'} size = {16} color = {'#BF3EFF'}/>
                            </View>
                        </ScrollView>
                    </View>
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
                <Entypo name = {'heart'} size = {this.state.loveWidth} color = {'red'} style = {styles.love}/>
                <Animated.View style = {[styles.adimatedView,{top:fadeAnim}]}>
                    <TextInput
                        ref = "code"
                        style = {styles.code}
                        placeholder = '请输入您想说的话……'
                        maxLength = {20}
                        autoCapitalize = "none"
                        clearButtonMode = "while-editing"
                        keyboardType='numeric'
                    />
                    <Text style = {styles.codeLine}></Text>
                    <Text style = {styles.getCode} onPress = {this.saveMsg.bind(this)}>发送</Text>
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
                {/* {this.showAndHidw()} */}
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
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
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:100,
        borderBottomColor:'#dddddd',
        borderBottomWidth:1,
        borderRadius:2,
        paddingLeft:15,
        paddingRight:15,
        position:'absolute',
        left:0,
        backgroundColor:'#AB82FF',
        paddingBottom:30
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
        flexDirection:'row',
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
    commentDay: {
        fontSize:8,
        color:'#898989',
    },
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
        backgroundColor:"#dddddd"
    },
    code: {
        fontSize:13,
        color:'#000000',
        flex:10,
        paddingLeft:5,
        // borderColor:'#666666',
        // borderWidth:1,
        height:30,
        backgroundColor:'#ffffff'
    },
    getCode: {
        fontSize:11,
        color:'#ffffff',
        flex:1,
        textAlign:'center',
        paddingTop:8.5,
        paddingBottom:8,
        marginLeft:10
        // borderColor:'#666666',
        // borderWidth:1,
        
    },
});