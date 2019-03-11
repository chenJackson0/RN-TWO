//czg data 2019-02-19
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    ScrollView
} from 'react-native';

 //引用插件
import Header from './component/personalCenterHeads'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo'
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
 export default class PersonalCenter extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '个人中心',
            avatarSource: 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            fadeAnim: new Animated.Value(-200),
            menuFlag : false,
            userName : '',
            publishedList : [],
            post : 0,
            fans : 0,
            FocusOn : 0,
            perItem : []
        }
    }
    
    //注册监听事件
    showData = () => {
        Constants.publishedListStorageF()//加载缓存获取数据
        Constants.getUserNameStorageF()
        Constants.getcommentsItemStorageF()
        Constants.getUserNameImgStorageF()
        this.setState({
            post : 0,
            fans : 0,
            FocusOn : 0,
            perItem : [],
            publishedList : []
        })
        setTimeout(()=>{
            this.init()
        },200)
    }
     //注册通知
     componentWillMount (){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.showData())]; //BottomTab路由改变时增加读取数据的监听事件 
    }  
    //加载数据
    init = () => {
        let userName = Constants.getUserName() ? Constants.getUserName() : ''
        let publishedList= Constants.getSublishedList() ? Constants.getSublishedList() : []
        let commentsItem = Constants.getcommentsItem() ? Constants.getcommentsItem() : []
        let userNameImg = Constants.getUserNameImg() ? Constants.getUserNameImg() : ''
        alert(JSON.stringify(commentsItem))
        for(let i = 0;i<commentsItem.length;i++){
            if(userName == commentsItem[i].userName){
                
                commentsItem[i].img = userNameImg
                alert(commentsItem[i].fensi)
                this.state.fans = commentsItem[i].fensi ? commentsItem[i].fensi.length : 0
                this.state.FocusOn = commentsItem[i].focusOns ? commentsItem[i].focusOns.length : 0
                break
            }
        }
        // alert(this.state.fans)
        Constants.storage.save({
            key : 'commentsItemFoucsOn',
            data : commentsItem,
            defaultExpires: true, 
        })
        //获取作品数量
        for(let i = 0;i<publishedList.length;i++){
            if(userName == publishedList[i].userName){
                this.state.post = this.state.post + 1
                //获取用户下的所有发布产品
                for(let j = 0;j<publishedList[i].publicHeadImg.length;j++){
                    this.state.perItem.push(publishedList[i].publicHeadImg[j])
                }
            }
        }
        //获取关注人数和粉丝人数
        // for(let i = 0;commentsItem.length;i++){
            
        // }
        this.setState({
            userName : userName,
            publishedList : publishedList,
            post : this.state.post,
            fans : this.state.fans,
            FocusOn : this.state.FocusOn,
            perItem : this.state.perItem
        })
    }
    //获取手机相册
    choosePicker=()=>{
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
               
            }
            else if (response.error) {
                
            }
            else if (response.customButton) {
                
            }
            else {
                let source = response.uri;
                this.setState({
                    avatarSource: source
                  });
            }
        });
    }
    //编辑主页跳转
    editPage = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('EditPage')
    }

    //展开菜单兰
    showMenuBar = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
              toValue: 0,
              duration: 200,
            }
          ).start();
          this.setState({
            menuFlag : true
          })
    }
    //收起菜单兰
    closeMenu = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
              toValue: -200,
              duration: 200,
            }
          ).start();
          this.setState({
            menuFlag : false    
          })
    }
    //作品展示
    perItem = () => {
        let imgs = []
        for(let i = 0;i<this.state.publishedList.length;i++){
            if(this.state.userName == publishedList[i].userName){
                let view = <Image source={{uri :'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.userConter4Img} key = {i}/>
                imgs.push(view)
            } 
        }
        return imgs
    }
    render() {
        let {fadeAnim}  = this.state;
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} choosePicker = {this.choosePicker.bind(this)} showMenuBar = {this.showMenuBar.bind(this)}/>
                <ScrollView>
                    <View style = {styles.userConter1}>
                        <View style = {styles.userConter1Left}>
                            <Image source={{uri :this.state.avatarSource}} style = {styles.userImg} />
                        </View>
                        <View style = {styles.userConter1Right}>
                            <View style = {styles.userConter1RightTop}>
                                <Text style = {styles.userConter1RightTop1}>{this.state.post}</Text>
                                <Text style = {styles.userConter1RightTop1}>{this.state.fans}</Text>
                                <Text style = {styles.userConter1RightTop1}>{this.state.FocusOn}</Text>
                            </View>
                            <View style = {styles.userConter1RightMidd}>
                                <Text style = {styles.userConter1RightMidd1}>帖子</Text>
                                <Text style = {styles.userConter1RightMidd1}>粉丝</Text>
                                <Text style = {styles.userConter1RightMidd1}>关注</Text>
                            </View>
                            <View style = {styles.userConter1RightBottom}>
                                <Text style = {styles.userConter1RightBottomText} onPress = {this.editPage.bind(this)}>编辑主页</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.userConter2}>
                        <Text style = {styles.userConterName}>{this.state.userName}</Text>
                    </View>
                    <View style = {styles.userConter3}>
                        <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.userConterTab} />
                        <EvilIcons name = {'credit-card'} size = {30} color = {'#898989'} style = {styles.userConterTab} />
                        <EvilIcons name = {'image'} size = {30} color = {'#898989'} style = {styles.userConterTab} />
                    </View>
                    <View style = {styles.userConter4}>
                        {this.perItem()}
                    </View>
                    <View style = {styles.userConter5}>
                        <Text style = {styles.userConter5Title}>完善个人主页</Text>
                        <Text style = {styles.userConter5Msg}>完成3/4项</Text>
                        <View style = {styles.userConter5Item}>
                            <View style = {[styles.userConter5ItemOne,styles.userConter5ItemOneR]}>
                                <EvilIcons name = {'comment'} size = {50} color = {'#E066FF'} style = {styles.userConterTab} />
                                <Text style = {styles.userConter5ItemOneT}>添加个人简历</Text>
                                <Text style = {styles.userConter5ItemOneS}>向粉丝介绍一下自己吧.</Text>
                                <Text style = {styles.userConter5ItemOneB}>添加个人简历</Text>
                            </View>
                            <View style = {styles.userConter5ItemOne}>
                                <EvilIcons name = {'link'} size = {50} color = {'#E066FF'} style = {styles.userConterTab} />
                                <Text style = {styles.userConter5ItemOneT}>查找用户并关注</Text>
                                <Text style = {styles.userConter5ItemOneS}>关注想了解的用户和感兴趣的内容.</Text>
                                <Text style = {[styles.userConter5ItemOneB,styles.userConter5ItemOneButB]}>查看更多</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style = {this.state.menuFlag ? styles.menuBarBg : ''}></View>
                <Animated.View style = {[styles.perMenuBar,{right:fadeAnim}]}>
                    <View style = {styles.menuBar}>
                        <View style = {styles.menuBarLeft}>
                            <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.menuBarIcon} />
                        </View>
                        <View style = {styles.menuBarRight}><Text style = {styles.menuBarRightT}>你的活动</Text></View>
                    </View>
                    <View style = {styles.menuBar}>
                        <View style = {styles.menuBarLeft}>
                            <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.menuBarIcon} /> 
                        </View>
                        <View style = {styles.menuBarRight}><Text style = {styles.menuBarRightT}>名片</Text></View>
                    </View>
                    <View style = {styles.menuBar}>
                        <View style = {styles.menuBarLeft}>
                            <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.menuBarIcon} />
                        </View>
                        <View style = {styles.menuBarRight}><Text style = {styles.menuBarRightT}>收藏夹</Text></View>
                    </View>
                    <View style = {styles.menuBar}>
                        <View style = {styles.menuBarLeft}>
                            <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.menuBarIcon} />
                        </View>
                        <View style = {styles.menuBarRight}><Text style = {styles.menuBarRightT}>特别关注好友</Text></View>
                    </View>
                    <View style = {styles.menuBar}>
                        <View style = {styles.menuBarLeft}>
                            <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.menuBarIcon} />
                        </View>
                        <View style = {styles.menuBarRight}><Text style = {styles.menuBarRightT}>发现用户</Text></View>
                    </View>
                    <Text style = {styles.menuClose} onPress = {this.closeMenu.bind(this)}>X</Text>
                </Animated.View> 
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    menuClose: {
        color:'#898989',
        fontSize:14,
        position:'absolute',
        top:10,
        right:15,
    },
    menuBarBg: {
        position:'absolute',
        left:0,
        bottom:0,
        top:0,
        right:0,
        opacity:0.5,
        backgroundColor:'#000000'
    },
    perMenuBar: {
        backgroundColor:"#ffffff",
        position:'absolute',
        top:69,
        bottom:0,
        width:200
    },
    menuBar: {
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
    },
    menuBarLeft: {
        width:30,
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarIcon: {
        
    },
    menuBarRight: {
        paddingLeft:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarRightT: {
        fontSize:13,
        color:'#000000'
    },
    userConter5: {
        // backgroundColor:'#f2f2f2',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:12,
        paddingBottom:12
    },
    userConter5Title: {
        fontSize:14,
        fontWeight:'700',
        color:'#000000'
    },
    userConter5Msg: {
        fontSize:9,
        color:'#898989',
        marginTop:5
    },
    userConter5Item: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:12
    },
    userConter5ItemOne: {
        flex:1,
        borderColor:'#EDEDED',
        borderWidth:1,
        borderRadius:4,
        paddingBottom:12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:15
    },
    userConter5ItemOneR: {
        marginRight:5
    },
    userConterTab: {
        // marginTop:15
    },
    userConter5ItemOneT: {
        fontSize:12,
        color:'#000000',
        marginTop:12,
        textAlign:'center'
    },
    userConter5ItemOneS: {
        fontSize:11,
        color:'#898989',
        paddingLeft:13,
        paddingRight:13,
        marginTop:6,
        textAlign:'center'
    },
    userConter5ItemOneB: {
        fontSize:12,
        color:'#ffffff',
        paddingBottom:5,
        paddingLeft:3,
        paddingRight:3,
        paddingTop:5,
        borderRadius:4,
        backgroundColor:'#AB82FF',
        marginTop:50,
        width:90,
        textAlign:'center',
        overflow:'hidden'
    },
    userConter4: {

    },
    userConter4Img: {
        width:100,
        height:100
    },
    userConter3: {
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1
    },
    userConterTab: {
        flex:1,
        textAlign:'center'
    },
    max: {
        flex :1
    },
    userConter1: {
        paddingTop:10,
        paddingBottom:10,
        paddingRight:8,
        paddingLeft:8,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1Left: {
        width:70,
        height:70,
        marginRight:8
    },
    userImg: {
        width:70,
        height:70,
        borderRadius:35,
    },
    userConter1Right: {
        width:281,
        marginTop:5,
    },
    userConter1RightTop: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1RightTop1: {
        flex:1,
        fontSize:12,
        color:'#000000',
        fontWeight:'700',
        textAlign:'center'
    },
    userConter1RightMidd: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1RightMidd1: {
        flex:1,
        fontSize:12,
        color:'#898989',
        textAlign:'center'
    },
    userConter1RightBottom: {
        marginTop:8
    },
    userConter1RightBottomText: {
        fontSize:12,
        color:'#000000',
        fontWeight:'700',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#EDEDED',
        paddingTop:5,
        paddingBottom:5,
        textAlign:'center'
    },
    userConter2: {
        borderBottomColor:'#EDEDED',
        borderBottomWidth:1,
        paddingBottom:10,
        paddingLeft:10
    },
    userConterName: {
        marginTop:0,
        fontSize:13,
        color:'#000000',
        fontWeight:'700',
    },
    userConter5ItemOneButB: {
        backgroundColor:'#ffffff',
        color:'#000000',
        width:60,
        borderColor:'#EDEDED',
        borderWidth:1,
    }
});