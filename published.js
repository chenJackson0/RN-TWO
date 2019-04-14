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
const { width, height } = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import ImagePicker from 'react-native-image-picker'
import Constants from './global.js'
import AddressJsonData from './addressJson.json'
import getFetch from './service/index.js'
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

 export default class Published extends Component {
  constructor(props) {
   super(props);
    this.state = {
        title : '发布作品',
        avatarSource: 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
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
        changeAddessHide : true,
        offsetYNum : 3,
        confirmationWindowFlagData : [
            {
                title : '保存此次编辑?',
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
    id = 0
    addPublised = async () => {
        let published = await getFetch.selectPublished()
        if(published.code == 200){
            this.id = published.list.length!=0 ? published.list[0].id + 1 : 0
            this.init(published.userList)
        }else if(published.code == 400){
            
        }else{

        }
        
    }
    componentWillMount = () => {
        //注册监听事件
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.addPublised())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    
    init = (commentsItem) => {
        const { navigation } = this.props;
        let itemData = []
        let itemList = {}
        let imgFlag = navigation.getParam("imgFlag")
        let avatarSource = navigation.getParam("avatarSource")
        let user = navigation.getParam("user")
        itemList.img = avatarSource
        itemData.push(itemList)
        for(let i = 0;i<commentsItem.length;i++){
            if(user == commentsItem[i].userName){
                this.state.userNameImg = commentsItem[i].img
                user = commentsItem[i].nickName ? commentsItem[i].nickName : user
                break
            }
        }
        this.setState({
            imgFlag : imgFlag,
            item : itemData,
            avatarSource : avatarSource,
            user: user,
            userNameImg : this.state.userNameImg,
            publishedList : published
        })
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
    publishedF = async () => {
        let pageName = 'HomePage'
        if(!this.state.imgFlag&&!this.state.publisedText){
            alert("发布说说文字不能为空!")
            return
        }else if(!this.state.publisedText){
            alert("发布作品文字不能为空!")
            return
        }else{
            let date = Date.parse(new Date());
            const { navigation } = this.props;
            let data = {
                id : this.id,
                perImg : this.state.userNameImg,
                userName : this.state.user,
                nickName : this.state.user,
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
                giveALike : [],
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
            let setPublic = await getFetch.published(data)
            if(this.state.imgFlag){
                pageName = 'HomePage'//跳首页
            }else{
                pageName = 'Collection'//跳说说
            }
            if(setPublic.code == 200){
                this.props.navigation.navigate(pageName,{
                    publisedList : data
                })
            }else if(setPublic.code == 400){
                alert(setPublic.message)
            }else{
                alert(setPublic.message)
            }
        }
    }
    //发布作品时选择地址--------
    changeAddess = () => {
        this.setState({
            changeAddessHide : false
        })
    }
    closeChangeAdderss = () =>{
        this.setState({
            changeAddessHide : true
        })
    }
    //提交
    submitChangeAdderss = ()=>{
        this.setState({
            changeAddessHide : true,
            address : AddressJsonData[this.state.offsetYNum].provinceName
        })
    }
    //end--------

    addAdderss = () => {
        let data = []
        for(let i = 0;i<AddressJsonData.length;i++){
            let view = <Text style = {[styles.addressItem,i==this.state.offsetYNum ? styles.addressItems : '']} key = {i}>{AddressJsonData[i].provinceName}</Text>
            data.push(view)
        }
        return data
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
                        <Text style = {styles.publisedMsg} onPress = {this.changeAddess.bind(this)}>{this.state.address}</Text>
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
                <View style = {[styles.changeAddess,this.state.changeAddessHide ? styles.changeAddessHide : '']}>
                    <View style = {styles.addressBg}></View>
                    <View style = {styles.addressCont}>
                        <View style = {styles.addressTitle}>
                            <Text style = {styles.title}>切换地址</Text>
                            <Text style = {styles.colse} onPress={this.closeChangeAdderss.bind(this)}>X</Text>
                        </View>
                        <View style = {styles.addressList}>
                            <ScrollView
                                ref = 'scrollviewS'
                                onMomentumScrollEnd={(e) => {
                                    // alert(e.nativeEvent.contentOffset.y)
                                }}
                                onScrollEndDrag = {(e)=>{
                                    let offsetY = e.nativeEvent.contentOffset.y
                                    let topNum = Math.floor(offsetY/30 + 0.5)
                                    if(topNum<0){
                                        offsetYNum = topNum + 3
                                    }else{
                                        offsetYNum = topNum + 3
                                    }
                                    this.setState({
                                        offsetYNum : offsetYNum
                                    })
                                    this.refs.scrollviewS.scrollTo({x: 0, y: topNum*30, animated: true})
                                }}
                            >
                                {this.addAdderss()}
                            </ScrollView>
                        </View>
                        <View style = {styles.submitButton}>
                            <Text style = {styles.submitButtonT} onPress = {this.submitChangeAdderss.bind(this)}>提交</Text>
                        </View>
                        <View style = {styles.lineT}></View>
                        <View style = {styles.lineB}></View>
                    </View>
                </View>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    lineT: {
        position:'absolute',
        top:120,
        left:0,
        width:230,
        height:1,
        backgroundColor:'#dddddd'
    },
    lineB: {
        position:'absolute',
        top:150,
        left:0,
        width:230,
        height:1,
        backgroundColor:'#dddddd'
    },
    changeAddessHide: {
        display:'none'
    },
    changeAddess: {
        position:'absolute',
        // right:0,
        // left:0,
        // top:0,
        // bottom:0,
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressBg: {
        height:height,
        width:width,
        backgroundColor:'#000000',
        opacity:0.7
    },
    addressCont: {
        borderRadius:8,
        position:'absolute',
        top:'50%',
        left:'50%',
        backgroundColor:'#ffffff',
        height:270,
        width:230,
        marginTop:-135,
        marginLeft: - 115
    },
    addressTitle :{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#dddddd',
        borderBottomWidth:1
    },
    title: {
        fontSize:13,
        color:'#000000',
        height:30,
        flex:10,
        textAlign:'center',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:17
    },
    colse: {
        fontSize:16,
        color:'#898989',
        flex:1
    },
    addressList: {
        height:210,
    },
    addressItem: {
        height:30,
        fontSize:13,
        color:'#dddddd',
        textAlign:'center',
        lineHeight:30
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor:'#dddddd',
        borderTopWidth:1
    },
    submitButtonT: {
        fontSize:15,
        color:'#000000',
        width:230,
        height:30,
        textAlign:'center',
        lineHeight:30
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
    },
    addressItems:{
        color:'#000000'
    },
});