//czg data 2019-02-19
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

//引用插件
import Header from './component/personalCenterHeads'
// 取得屏幕的宽高Dimensions
let windowsSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
};
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import ImagePicker from 'react-native-image-picker'
import Constants from './global.js'
import Video from 'react-native-video';
import getFetch from './service/index.js'
const photoOptions = {
    title: '请选择',
    quality: 0.8,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
class Row extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.row}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#dddddd" }}>
                    <Image source={{ uri: this.props.data.img }} style={styles.userConter4Img} />
                </View>
            </TouchableOpacity>
        )
    };
};
export default class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '个人中心',
            avatarSource: 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            fadeAnim: new Animated.Value(-200),
            menuFlag: false,
            userName: '',
            nickName: '',
            publishedList: [],
            post: 0,
            fans: 0,
            FocusOn: 0,
            TellMeAbout: 0,
            perItem: [],
            saysayItem: [],
            changeTabNum: 0,
            playNum: 4533,
            address: '上海',
            perItemComment: []
        }
    }


    //注册监听事件
    showData = async () => {
        this.setState({
            post: 0,
            fans: 0,
            FocusOn: 0,
            TellMeAbout: 0,
            perItem: [],
            publishedList: [],
            saysayItem: [],
            perItemComment: []
        })
        Constants.getUserNameStorageF()
        let publishedList = await getFetch.selectPublished()
        if (publishedList.code == 200) {
            this.init(publishedList.list, publishedList.userList, publishedList.collectionList)
        } else if (publishedList.code == 400) {
            alert(publishedList.message)
        } else {
            alert(publishedList.message)
        }

    }
    //注册通知
    componentWillMount() {
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.showData())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //加载数据
    init = (publishedList, commentsItem, collectionList) => {
        let userName = Constants.getUserName() ? Constants.getUserName() : ''
        let works = []
        let editPerUserA = 2
        //获取关注人数和粉丝人数
        for (let i = 0; i < commentsItem.length; i++) {
            if (userName == commentsItem[i].userName) {
                this.state.avatarSource = commentsItem[i].img
                this.state.address = commentsItem[i].address
                this.state.fans = commentsItem[i].fensi ? commentsItem[i].fensi.length : 0
                this.state.FocusOn = commentsItem[i].focusOns ? commentsItem[i].focusOns.length : 0
                this.state.nickName = commentsItem[i].nickName ? commentsItem[i].nickName : userName
                this.state.nickNameCheck = commentsItem[i].nickName ? commentsItem[i].nickName : ''
                this.state.webSite = commentsItem[i].webSite ? commentsItem[i].webSite : ''
                this.state.personalResume = commentsItem[i].personalResume ? commentsItem[i].personalResume : '作者什么都没有说……'
                this.state.email = commentsItem[i].email ? commentsItem[i].email : ''
                this.state.phone = commentsItem[i].phone ? commentsItem[i].phone : ''
                this.state.sex = commentsItem[i].sex ? commentsItem[i].sex : ''
                break
            }
        }
        //判断用户资料是否都填写了
        if (this.state.nickNameCheck) {
            editPerUserA += 1
        }
        if (this.state.webSite) {
            editPerUserA += 1
        }
        if (this.state.personalResume) {
            editPerUserA += 1
        }
        if (this.state.email) {
            editPerUserA += 1
        }
        if (this.state.phone) {
            editPerUserA += 1
        }
        if (this.state.sex) {
            editPerUserA += 1
        }
        this.state.successPerMessage = editPerUserA + '/8'
        //获取作品数量
        for (let i = 0; i < publishedList.length; i++) {
            if (userName == publishedList[i].userName || userName == publishedList[i].nickName) {
                if (publishedList[i].type == 'works') {
                    //获取用户下的所有发布产品
                    this.state.post = this.state.post + 1
                    works.push(publishedList[i])
                    for (let j = 0; j < publishedList[i].publicHeadImg.length; j++) {
                        let data = {
                            id: publishedList[i].id,
                            img: publishedList[i].publicHeadImg[j].img,
                            type: publishedList[i].publicHeadImg[j].type
                        }
                        this.state.perItem.push(data)
                        break //如果一个作品中有多张图,需要全部显示的话,去掉break
                    }
                } else {
                    //获取用户下的所有发布的说说
                    this.state.saysayItem.push(publishedList[i])
                    this.state.TellMeAbout = this.state.TellMeAbout + 1
                }
            }
        }
        //获取收藏作品
        for (let i = 0; i < collectionList.length; i++) {
            if (userName == collectionList[i].perUserName) {
                for (let j = 0; j < collectionList[i].img.length; j++) {
                    let data = {
                        id: collectionList[i].id,
                        img: collectionList[i].img[j].img,
                        type: publishedList[i].publicHeadImg[j].type
                    }
                    this.state.perItemComment.push(data)
                    break //如果一个作品中有多张图,需要全部显示的话,去掉break
                }
            }
        }
        this.setState({
            userName: userName,
            nickName: this.state.nickName,
            publishedList: works,
            post: this.state.post,
            fans: this.state.fans,
            TellMeAbout: this.state.TellMeAbout,
            FocusOn: this.state.FocusOn,
            perItem: this.state.perItem,
            avatarSource: this.state.avatarSource,
            saysayItem: this.state.saysayItem,
            address: this.state.address,
            perItemComment: this.state.perItemComment,
            changeTabNum: 0
        })
    }
    //编辑主页跳转
    editPage = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('EditPage', {
            account: this.state.userName
        })
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
            menuFlag: true
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
            menuFlag: false
        })
    }
    //判断是否有图片或者视频
    isImg = (img, type) => {
        if (type == 'img') {
            return (
                <Image source={{ uri: img }} style={styles.userConter4Img} />
            )
        } else if (type == 'video') {
            return (
                <Video style={styles.video} source={{ uri: img }} />
            )
        }
    }
    //作品展示
    getAll = () => {
        let data = []
        if (this.state.changeTabNum == 0) {
            if (this.state.perItem.length != 0) {
                for (let i = 0; i < this.state.perItem.length; i++) {
                    let view = <TouchableOpacity style={styles.userConter4Img} key={i} onPress={this.goDetail.bind(this, this.state.perItem[i].id, this.state.perItem[i].type)}>
                        {this.isImg(this.state.perItem[i].img, this.state.perItem[i].type)}
                    </TouchableOpacity>
                    data.push(view)
                }
            } else {
                let view = <Text style={styles.noT} key={1}>空空如也,还没有发布任何作品.</Text>
                data.push(view)
            }
        } else if (this.state.changeTabNum == 1) {
            if (this.state.saysayItem.length != 0) {
                for (let i = 0; i < this.state.saysayItem.length; i++) {
                    let view = <TouchableOpacity style={styles.saysayBg} key={i} onPress={this.goDetail.bind(this, this.state.saysayItem[i].id)}><View style={styles.detailMsg}>
                        <Image source={{ uri: this.state.saysayItem[i].perImg }} style={styles.authorImg} />
                        <Text style={styles.playName} >该作品由《{this.state.saysayItem[i].nickName ? this.state.saysayItem[i].nickName : this.state.saysayItem[i].userName}》发布</Text>
                    </View>
                        <View style={styles.detailT}>
                            <Text style={styles.playNum}>最近浏览了{this.state.playNum}次</Text>
                            <Text style={styles.authorText}>{this.state.saysayItem[i].text}</Text>
                            <Text style={styles.commentsTitle}>{this.state.saysayItem[i].commentsNum}条评论</Text>
                        </View></TouchableOpacity>
                    data.push(view)
                }
            } else {
                let view = <Text style={styles.noT} key={1}>空空如也,还没有发布任何说说.</Text>
                data.push(view)
            }
        } else if (this.state.changeTabNum == 2) {
            if (this.state.perItemComment.length != 0) {
                for (let i = 0; i < this.state.perItemComment.length; i++) {
                    let view = <TouchableOpacity style={styles.userConter4Img} key={i} onPress={this.goDetail.bind(this, this.state.perItemComment[i].id, this.state.perItemComment[i].type)}>
                        {this.isImg(this.state.perItemComment[i].img, this.state.perItemComment[i].type)}
                    </TouchableOpacity>
                    data.push(view)
                }
            } else {
                let view = <Text style={styles.noT} key={1}>空空如也,还没有收藏任何作品和说说.</Text>
                data.push(view)
            }
        }
        return data
    }
    //跳作品想情
    goDetail = (id, type) => {
        const { navigation } = this.props;
        let changeTabNum = 0
        if (type == 'img') {
            changeTabNum = 0
        } else if (type == 'video') {
            changeTabNum = 4
        } else {
            changeTabNum = 9
        }
        this.props.navigation.navigate('Detail', {
            id: id, changeTabNum: changeTabNum
        })
    }
    //切换作品,说说,收藏
    changeTab = (type) => {
        let changeTabNum = 0
        if (type == 'work') {
            changeTabNum = 0
        } else if (type == 'saysay') {
            changeTabNum = 1
        } else if (type == 'collection') {
            changeTabNum = 2
        }
        this.setState({
            changeTabNum: changeTabNum
        })
    }
    _renderItem = ({ item }) => {
        return (
            <View style={styles.userConterSection4}>
                <Row key={item.index} data={item} />
            </View>
        )
    };
    //查看粉丝和关注的主播
    goTofensiAndFoucsOn = (name) => {
        const { navigation } = this.props;
        this.props.navigation.navigate('ComList', {
            perUser: name
        })
    }
    //退出登陆
    blackLogin = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Login', {
            account: this.state.userName
        })
    }
    //跳转搜索页面
    rearch = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Rearch')
    }
    //跳转礼品页面
    projuctList = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Projuct', {
            userName: this.state.userName
        })
    }
    render() {
        let { fadeAnim } = this.state;
        return (
            <View style={styles.max}>
                <Header title={this.state.title} showMenuBar={this.showMenuBar.bind(this)} />
                <View style={styles.userConter1}>
                    <View style={styles.userConter1Left}>
                        <Image source={{ uri: this.state.avatarSource }} style={styles.userImg} />
                    </View>
                    <View style={styles.userConter1Right}>
                        <View style={styles.userConter1RightTop}>
                            <Text style={styles.userConter1RightTop1}>{this.state.post}</Text>
                            <Text style={styles.userConter1RightTop1}>{this.state.TellMeAbout}</Text>
                            <Text style={styles.userConter1RightTop1} onPress={this.goTofensiAndFoucsOn.bind(this, this.state.userName)}>{this.state.fans}</Text>
                            <Text style={styles.userConter1RightTop1} onPress={this.goTofensiAndFoucsOn.bind(this, this.state.userName)}>{this.state.FocusOn}</Text>
                        </View>
                        <View style={styles.userConter1RightMidd}>
                            <Text style={styles.userConter1RightMidd1}>作品</Text>
                            <Text style={styles.userConter1RightMidd1}>说说</Text>
                            <Text style={styles.userConter1RightMidd1} onPress={this.goTofensiAndFoucsOn.bind(this, this.state.userName)}>粉丝</Text>
                            <Text style={styles.userConter1RightMidd1} onPress={this.goTofensiAndFoucsOn.bind(this, this.state.userName)}>关注</Text>
                        </View>
                        <View style={styles.userConter1RightBottom}>
                            <Text style={styles.userConter1RightBottomText} onPress={this.editPage.bind(this)}>编辑主页</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.userConter2}>
                    <Text style={styles.userConterName}>{this.state.nickName}  {this.state.address}</Text>
                    <Text style={styles.personalResume}>{this.state.personalResume}</Text>
                </View>
                <View style={styles.userConter3}>
                    {/* <EvilIcons name = {'archive'} size = {30} color = {'#E066FF'} style = {styles.userConterTab} />
                    <EvilIcons name = {'credit-card'} size = {30} color = {'#898989'} style = {styles.userConterTab} />
                    <EvilIcons name = {'image'} size = {30} color = {'#898989'} style = {styles.userConterTab} /> */}
                    <Text style={[styles.tabText, this.state.changeTabNum == 0 ? styles.changText : '']} onPress={this.changeTab.bind(this, 'work')} >作品</Text>
                    <Text style={[styles.tabText, this.state.changeTabNum == 1 ? styles.changText : '']} onPress={this.changeTab.bind(this, 'saysay')}>说说</Text>
                    <Text style={[styles.tabText, this.state.changeTabNum == 2 ? styles.changText : '']} onPress={this.changeTab.bind(this, 'collection')}>收藏</Text>
                </View>
                <ScrollView>
                    <View style={styles.userConterSection4}>
                        {/* <SectionList style = {styles.userConter4}
                            renderItem={this._renderItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor = {(item,index) => item + index}
                            sections={
                                this.state.perItem
                            }>
                        </SectionList> */}
                        {this.getAll()}
                    </View>
                    <View style={styles.userConter5}>
                        <Text style={styles.userConter5Title} onPress={this.editPage.bind(this)}>完善个人主页</Text>
                        <Text style={styles.userConter5Msg}>完成{this.state.successPerMessage}项</Text>
                        <View style={styles.userConter5Item}>
                            <View style={[styles.userConter5ItemOne, styles.userConter5ItemOneR]}>
                                <EvilIcons name={'comment'} size={50} color={'#E066FF'} style={styles.userConterTab} />
                                <Text style={styles.userConter5ItemOneT}>添加个人简历</Text>
                                <Text style={styles.userConter5ItemOneS}>向粉丝介绍一下自己吧.</Text>
                                <Text style={styles.userConter5ItemOneB}>添加个人简历</Text>
                            </View>
                            <View style={styles.userConter5ItemOne}>
                                <EvilIcons name={'link'} size={50} color={'#E066FF'} style={styles.userConterTab} />
                                <Text style={styles.userConter5ItemOneT}>查找用户并关注</Text>
                                <Text style={styles.userConter5ItemOneS}>关注想了解的用户和感兴趣的内容.</Text>
                                <Text style={[styles.userConter5ItemOneB, styles.userConter5ItemOneButB]} onPress={this.rearch.bind(this)}>查看更多</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={this.state.menuFlag ? styles.menuBarBg : ''}>
                    <Text style={styles.bindClick} onPress={this.closeMenu.bind(this)}></Text>
                </View>
                <Animated.View style={[styles.perMenuBar, { right: fadeAnim }]}>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarLeft}>
                            <EvilIcons name={'archive'} size={30} color={'#E066FF'} style={styles.menuBarIcon} />
                        </View>
                        <View style={styles.menuBarRight}><Text style={styles.menuBarRightT}>你的活动</Text></View>
                    </View>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarLeft}>
                            <EvilIcons name={'archive'} size={30} color={'#E066FF'} style={styles.menuBarIcon} />
                        </View>
                        <View style={styles.menuBarRight}><Text style={styles.menuBarRightT}>名片</Text></View>
                    </View>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarLeft}>
                            <EvilIcons name={'archive'} size={30} color={'#E066FF'} style={styles.menuBarIcon} />
                        </View>
                        <View style={styles.menuBarRight}>
                            <Text style={styles.menuBarRightT} onPress={this.projuctList.bind(this)}>
                                积分兑换礼品
                            </Text>
                        </View>
                    </View>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarLeft}>
                            <EvilIcons name={'archive'} size={30} color={'#E066FF'} style={styles.menuBarIcon} />
                        </View>
                        <View style={styles.menuBarRight}><Text style={styles.menuBarRightT}>特别关注好友</Text></View>
                    </View>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarLeft}>
                            <EvilIcons name={'archive'} size={30} color={'#E066FF'} style={styles.menuBarIcon} />
                        </View>
                        <View style={styles.menuBarRight}><Text style={styles.menuBarRightT}>发现用户</Text></View>
                    </View>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarLeft}>
                            <EvilIcons name={'archive'} size={30} color={'#E066FF'} style={styles.menuBarIcon} />
                        </View>
                        <View style={styles.menuBarRight}><Text style={[styles.menuBarRightT, styles.blackLogin]} onPress={this.blackLogin.bind(this)}>退出登陆</Text></View>
                    </View>
                    <Text style={styles.menuClose} onPress={this.closeMenu.bind(this)}>X</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    personalResume: {
        fontSize: 13,
        color: '#7A7A7A',
        paddingTop: 5,
        paddingBottom: 0
    },
    bindClick: {
        flex: 1
    },
    noT: {
        fontSize: 13,
        color: '#898989',
        paddingTop: 30,
        paddingBottom: 20,
        textAlign: 'center',
        width: windowsSize.width
    },
    tabText: {
        flex: 1,
        fontSize: 13,
        color: '#898989',
        textAlign: 'center',
        paddingTop: 13,
        paddingBottom: 13
    },
    changText: {
        color: '#FF00FF',
        borderBottomColor: '#262626',
        borderBottomWidth: 1,
        backgroundColor: '#FDF5E6'
    },
    row: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        // alignItems: 'center',
        width: windowsSize.width / 4,
        height: windowsSize.width / 4,
    },
    menuClose: {
        color: '#898989',
        fontSize: 14,
        position: 'absolute',
        top: 10,
        right: 15,
    },
    menuBarBg: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
        opacity: 0.5,
        backgroundColor: '#000000'
    },
    perMenuBar: {
        backgroundColor: "#ffffff",
        position: 'absolute',
        top: 69,
        bottom: 0,
        width: 200
    },
    menuBar: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
    },
    menuBarLeft: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarIcon: {

    },
    menuBarRight: {
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarRightT: {
        fontSize: 13,
        color: '#000000'
    },
    userConter5: {
        // backgroundColor:'#f2f2f2',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 12,
        paddingBottom: 12
    },
    userConter5Title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000'
    },
    userConter5Msg: {
        fontSize: 9,
        color: '#898989',
        marginTop: 5
    },
    userConter5Item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    userConter5ItemOne: {
        flex: 1,
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 4,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
    userConter5ItemOneR: {
        marginRight: 5
    },
    userConterTab: {
        // marginTop:15
    },
    userConter5ItemOneT: {
        fontSize: 12,
        color: '#000000',
        marginTop: 12,
        textAlign: 'center'
    },
    userConter5ItemOneS: {
        fontSize: 11,
        color: '#898989',
        paddingLeft: 13,
        paddingRight: 13,
        marginTop: 6,
        textAlign: 'center'
    },
    userConter5ItemOneB: {
        fontSize: 12,
        color: '#ffffff',
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 5,
        borderRadius: 4,
        backgroundColor: '#AB82FF',
        marginTop: 50,
        width: 90,
        textAlign: 'center',
        overflow: 'hidden'
    },
    userConterSection4: {
        flexDirection: 'row', //这里的属性很重要，可以学习下flex布局
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    video: {
        width: windowsSize.width / 4,
        height: windowsSize.width / 4,
    },
    userConter4Img: {
        width: windowsSize.width / 4,
        height: windowsSize.width / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1
    },
    userConterTab: {
        flex: 1,
        textAlign: 'center'
    },
    max: {
        flex: 1
    },
    userConter1: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 8,
        paddingLeft: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1Left: {
        flex: 2,
        height: 70,
        marginRight: 8
    },
    userImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    userConter1Right: {
        flex: 8,
        marginTop: 5,
    },
    userConter1RightTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1RightTop1: {
        flex: 1,
        fontSize: 12,
        color: '#000000',
        fontWeight: '700',
        textAlign: 'center'
    },
    userConter1RightMidd: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userConter1RightMidd1: {
        flex: 1,
        fontSize: 12,
        color: '#898989',
        textAlign: 'center'
    },
    userConter1RightBottom: {
        marginTop: 8
    },
    userConter1RightBottomText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '700',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EDEDED',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center'
    },
    userConter2: {
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 10
    },
    userConterName: {
        marginTop: 0,
        fontSize: 13,
        color: '#000000',
        fontWeight: '700',
    },
    userConter5ItemOneButB: {
        backgroundColor: '#ffffff',
        color: '#000000',
        width: 60,
        borderColor: '#EDEDED',
        borderWidth: 1,
    },
    detailMsg: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15
    },
    authorImg: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10
    },
    playName: {
        fontSize: 13,
        color: '#ffffff'
    },
    detailT: {
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1
    },
    playNum: {
        fontSize: 14,
        color: '#898989',
        marginTop: 10
    },
    authorText: {
        fontSize: 14,
        color: '#898989',
        marginTop: 6
    },
    commentsTitle: {
        fontSize: 13,
        color: '#898989',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'left',
    },
    saysayBg: {
        backgroundColor: '#2F4F4F',
        width: windowsSize.width
    },
    blackLogin: {
        color: '#FF3E96'
    },
});