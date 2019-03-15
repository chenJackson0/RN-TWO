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
    ScrollView,
    TextInput
} from 'react-native';

 //引用插件
import Header from './component/publishedHeads'
import ConfirmationWindow from './component/confirmationWindow'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons'
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
const options = {
    title: '选择视频',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '录制视频',
    chooseFromLibraryButtonTitle: '选择视频',
    mediaType: 'video',
    videoQuality: 'medium'
};

 export default class Published extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '发布作品',
            avatarSource: '',
            typeNameChange : false,
            typeNum : 0,//0 公开 1 私密 2 对粉丝可见
            text : '公开',
            imgFlag : false,
            item:[],
            data : [],
            publisedText : '',
            confirmationWindowFlag : false,
            deleteImgLastFlag : false,
            num : -1,
            userNameImg : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            publishedList: [],
            id : 0,
            address : '上海',
            addCommentNum : 0,
            confirmationWindowFlagData : [
                {
                    title : '保存此次编辑',
                    leftT : '不保存',
                    rightT : '保存',
                    type : 'cancel'
                }
            ],
            deleteImgLastFlagData : [
                {
                    title : '确定要删除次照片吗?',
                    leftT : '取消',
                    rightT : '确定',
                    type : 'delImg'
                }
            ]
        }
    }
    num = -1
    addPublised = () => {
        Constants.publishedListStorageF()//加载缓存获取数据
        Constants.getcommentsItemStorageF()
        this.setState({
            publishedList: [],
        })
        setTimeout(()=>{
            this.init()
        },300)
        
    }
    componentWillMount = () => {
        const { navigation } = this.props;
        let itemData = []
        let itemList = {}
        let imgFlag = navigation.getParam("imgFlag")
        let avatarSource = navigation.getParam("avatarSource")
        let user = navigation.getParam("user")
        let userNameImg = navigation.getParam("userNameImg")
        itemList.img = avatarSource
        itemData.push(itemList)
        this.setState({
            imgFlag : imgFlag,
            item : itemData,
            avatarSource : avatarSource,
            user: user,
            userNameImg : userNameImg,
        })
    }
    //处理业务
    init = () => {
        let published = Constants.getSublishedList() ? Constants.getSublishedList() : []
        this.setState({
            publishedList : published
        })
    }
    componentDidMount = () => {
        //注册监听事件
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.addPublised())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    

    //编辑发布作品时,点击不保留按钮
    noKeep = () => {
        const { navigation } = this.props;
        this.props.navigation.goBack()
    }
    //编辑发布作品时,点击保留按钮没,继续编辑
    keep = () => {
        this.setState({
            confirmationWindowFlag : false,
        })
    }
    //返回
   goBackPage = () =>{
    this.setState({
        confirmationWindowFlag : true
    })
   }
   //发布作品退出编辑时确定
   confirmationWindowF = () => {
       if(this.state.confirmationWindowFlag){
           return(
               <ConfirmationWindow confirmationWindowFlagData = {this.state.confirmationWindowFlagData} noKeep = {this.noKeep.bind(this)} keep = {this.keep.bind(this)}/>
           )
       }else{
           return
       }
   }
   //发布作品时,想删除不要的图片
   deleteImg = (num) => {
    this.setState({
        deleteImgLastFlag : true,
        num : num
    })
   }
   //取消删除图片
   noDeleteImg = () => {
    this.setState({
        deleteImgLastFlag : false,
    })
   }
   //确定删除图片
   yesDeleteImg = () => {
    let data = []
    for(let i = 0;i<this.state.item.length;i++){
        if(i == this.state.num){
            continue
        }else{
            data.push(this.state.item[i])
        }
    }
    this.setState({
        item : data,
        deleteImgLastFlag : false
    })
   }
   //删除图片确定
   deleteImgLast = () => {
       if(this.state.deleteImgLastFlag){
        return(
            <ConfirmationWindow confirmationWindowFlagData = {this.state.deleteImgLastFlagData} noDeleteImg = {this.noDeleteImg.bind(this)} yesDeleteImg = {this.yesDeleteImg.bind(this)}/>
        )
       }else{
           return
       }
   }
    //发布时,有图片
    showPublishImg = () => {
        if(this.state.imgFlag){
            return(
                <View style = {styles.publised2}>
                    <ScrollView horizontal = {true} showsHorizontalScrollIndicator={false}>
                        {/* <View style = {styles.add}>
                            <Image source={{uri :this.state.avatarSource}} style = {styles.publisedImg}/>
                            <Text style = {styles.addClick} onLongPress = {this.deleteImg.bind(this,-1)}></Text>
                        </View> */}
                        {this.addImgItem()}
                        <View style = {styles.add}>
                            <Image source={require('./image/addImg.png')} style = {styles.publisedImg} />
                            <Text style = {styles.addClick} onPress = {this.addGetImg.bind(this)}></Text>
                        </View>
                    </ScrollView>
                </View>
            )
        }else{
            return
        }
    }
    //发布作品时选择图片
    addGetImg = () => {
        let newItem = this.state.item
        let itemList = {}
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
               
            }
            else if (response.error) {
                
            }
            else if (response.customButton) {
                
            }
            else {
                let source = response.uri;
                itemList.img = source
                newItem.push(itemList)
                this.setState({
                    item : newItem
                })
            }
        });
    }

    //发布作品时添加图片
    addImgItem = () => {
        let itemView = []
        for(let i = 0;i<this.state.item.length;i++){
            let view = <View style = {styles.add} key = {i}>
                <Image source={{uri :this.state.item[i].img}} style = {styles.publisedImg} />
                <Text style = {styles.addClick} onLongPress = {this.deleteImg.bind(this,i)}></Text>
            </View>
            itemView.push(view)
        }
        return itemView
    }
    //发布时,选择对外的类型
    showChangeTypeView = () => {
        if(this.state.typeNameChange){
            return(
                <View style = {styles.typeName}>
                    <Text style = {styles.typeNameItem} onPress = {this.changName.bind(this,0,'公开')}>公开</Text>
                    <Text style = {styles.typeNameItem} onPress = {this.changName.bind(this,1,'私密')}>私密</Text>
                    <Text style = {styles.typeNameItem} onPress = {this.changName.bind(this,2,'仅粉丝可见')}>粉丝可见</Text>
                </View>
            )
        }else{
            return
        }
    }

    //选择对外类型的view
    showChangeType = () =>{
        if(!this.state.typeNameChange){
            this.setState({
                typeNameChange: true
            })
        }else{
            this.setState({
                typeNameChange: false
            })
        }
        
    }

    //选择对外开发的类型名称
    changName = (typeNum,text) => {
        this.setState({
            typeNum: typeNum,
            text : text,
            typeNameChange: false
        })
    }
    //发布提交
    publishedF = () => {
        let pageName = 'HomePage'
        if(!this.state.imgFlag&&!this.state.publisedText){
            alert("发布说说文字不能为空!")
            return
        }else if(!this.state.publisedText){
            alert("发布作品文字不能为空!")
            return
        }
        let publishedList = this.state.publishedList
        let date = Date.parse(new Date());
        const { navigation } = this.props;
        let data = {
            id : this.state.publishedList.length + 1,
            perImg : this.state.userNameImg,
            userName : this.state.user,
            publicHeadImg : [{img : this.state.item[0].img}],
            text : this.state.publisedText,
            flag : true,
            butText : '查看更多点赞',
            cllFlag : true,
            perUser : this.state.user,
            playNum : 1508124,
            commentsNum : 0,
            time : date,
            timeText : '刚刚',
            giveALike : ['jackson','chanmeg','maxmain'],
            data : [],
            address : this.state.address,
            type : '',
            commentsFlag : true,
            focusOnFlag : true,
            focusOn :'关注',
            typeNum : this.state.typeNum
        }
        if(this.state.imgFlag){
            data.type = 'works'
        }else{
            data.type = 'TellMeAbout'
        }
        data.publicHeadImg = this.state.item
        publishedList.unshift(data)
        Constants.storage.save({
            key : 'publishedLi',
            data : publishedList,
            defaultExpires: true, 
        })
        if(this.state.imgFlag){
            pageName = 'HomePage'//跳首页
        }else{
            pageName = 'Collection'//跳说说
        }
        this.props.navigation.navigate(pageName,{
            publisedList : data
        })
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)} publishedF = {this.publishedF.bind(this)}/>
                <ScrollView style = {styles.publisedMsx}>
                    <View style = {styles.publised1}>
                        <TextInput
                        style = {styles.inputText}
                        onChangeText={(publisedText) => {
                            this.setState({
                                publisedText : publisedText
                            })
                        }}
                        value={this.state.publisedText}
                        autoCapitalize = "none"
                        placeholder = "这一刻的想法……"
                        clearButtonMode = "while-editing"
                        multiline = {true}
                        />
                    </View>
                    {this.showPublishImg()}
                    <View style = {styles.publised3}>
                        <EvilIcons name = {'location'} size = {25} color = {'black'} style = {styles.collect}/>
                        <Text style = {styles.publisedTitle}>所在位置</Text>
                        <Text style = {styles.publisedMsg}>{this.state.address}</Text>
                        <EvilIcons name = {'chevron-right'} size = {25} color = {'#898989'} style = {styles.collect}/>
                    </View>
                    <View style = {styles.publised3}>
                        <EvilIcons name = {'user'} size = {25} color = {'black'} style = {styles.collect}/>
                        <Text style = {styles.publisedTitle}>谁可以看</Text>
                        <Text style = {[styles.publisedMsg,styles.publisedMsg1]} onPress = {this.showChangeType.bind(this)}>{this.state.text}</Text>
                        <EvilIcons name = {'chevron-right'} size = {25} color = {'#898989'} style = {styles.collect}/>
                    </View>
                    {this.showChangeTypeView()}
                    <View style = {styles.publised3}>
                        <EvilIcons name = {'pointer'} size = {25} color = {'black'} style = {styles.collect}/>
                        <Text style = {styles.publisedTitle}>提醒谁看</Text>
                        <Image source={{uri :this.state.avatarSource}} style = {styles.publised3Img} />
                        <EvilIcons name = {'chevron-right'} size = {25} color = {'#898989'} style = {styles.collect}/>
                    </View>
                </ScrollView>
                <View style = {[styles.opacityBg,this.state.confirmationWindowFlag ? styles.showopacityBg : '']} ></View>
                {this.confirmationWindowF()}
                <View style = {[styles.opacityBg,this.state.deleteImgLastFlag ? styles.showopacityBg : '']} ></View>
                {this.deleteImgLast()}
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
    add: {
        position:'relative'
    },
    addClick: {
        width:90,
        height:90,
        position:'absolute',
        top:0,
        left:0
    },
    typeName: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:15,
        paddingBottom:15,
    },
    typeNameItem: {
        fontSize:13,
        color:'#898989',
        flex:1,
        textAlign:'center'
    },
    publised3: {
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
        borderTopColor:'#EDEDED',
        borderTopWidth:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    publised3Img: {
        width:30,
        height:30
    },
    collect: {
        flex:1
    },
    publisedTitle: {
        flex:6,
        fontSize:15,
        color:'#000000',
    },
    publisedMsg: {
        flex:3,
        fontSize:15,
        color:'#898989',
        textAlign:'right',
    },
    max: {
        flex :1
    },
    publisedMsx: {
        marginTop:20,
        paddingLeft:15,
        paddingRight:15
    },
    publised1: {
        height:100
    },
    inputText: {
        fontSize:16,
        color:'#898989',
        height:100
    },
    publised2: {
        marginTop:20,
        flexDirection:'row',
        marginBottom:50
    },
    publisedImg: {
        width:90,
        height:90,
        marginRight:6
    }
});