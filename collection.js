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
    TouchableOpacity
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
import Constants from './global.js'
import getFetch from './service/index.js'
import ConfirmationWindow from './component/confirmationWindow'//弹窗选择组件
import PublicCommit from './component/publicCommit' //评论区组件
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
export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '说说',
            butText: '展开',
            userName: '',
            user: '',
            data: [],
            fadeAnim: new Animated.Value(0),
            sharefadeAnim: new Animated.Value(-110),
            widthfadeAnim: new Animated.Value(0),
            commentFlag: true,
            shareFlag: false,
            videoImgFlag: false,
            comments: '',
            addCommentItem: [],
            commentsItem: [],
            index: 0,
            commentNim: 0,
            userNameImg: 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            addCommentNum: 0,
            onTFlag: false,
            onTFlagF: true,
            replyToCommentText: '',
            replyToCommentMaxFlag: true,
            showShareIndex: 0,
            deleteCommentItems: [
                {
                    title: '确定要删除吗?',
                    leftT: '取消',
                    rightT: '确定',
                    type: 'delete'
                }
            ],
            deleteCommentItemsFlag: false,
            commentInputCallFlag: false,
            idArray: [],
            id: '',
            loveFlag: true,
            callId: '',
            callName: '',
            addId: 0,
            perId: '',
            nickName: ''
        }
    }
    //时间戳转时间

    changeTime = (date) => {
        let month = Math.floor(date / (3600 * 24 * 30))
        let day = Math.floor(date / (3600 * 24));
        let hour = Math.floor((date % (3600 * 24)) / 3600);
        let minute = Math.floor(((date % (3600 * 24)) % 3600) / 60);
        if (month > 0) {
            return month + '月前'
        } else if (day > 0) {
            return day + '天前'
        } else if (hour > 1) {
            return hour + '时前'
        } else if (minute > 1) {
            return minute + '分钟前'
        } else {
            return '刚刚'
        }
    }
    addPublised = async () => {
        const { navigation } = this.props;
        this.setState({
            user: '',
            data: [],
            userNameImg: '',
            addCommentItem: [],
            addCommentNum: 0,
            deleteCommentItemsFlag: false
        })
        let publishedList = await getFetch.selectPublished()
        if (publishedList.code == 200) {
            this.init(publishedList.list, publishedList.userList)
        } else if (publishedList.code == 400) {
            alert(publishedList.message)
        } else {
            alert(publishedList.message)
        }
    }
    //注册通知
    componentWillMount() {
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.addPublised())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //处理业务逻辑
    init = (publishedList, commentsItem) => {
        let TellMeAbout = []
        const { navigation } = this.props;
        let newTiem = Date.parse(new Date())
        let user = navigation.getParam("perUser") ? navigation.getParam("perUser") : ''
        let lastTime
        let getChangeTime
        //获取作品列表
        for (let i = 0; i < publishedList.length; i++) {
            lastTime = newTiem - publishedList[i].time
            if (lastTime >= 0) {
                getChangeTime = this.changeTime(lastTime / 1000)
                publishedList[i].timeText = getChangeTime
                if (publishedList[i].type == 'TellMeAbout') {
                    publishedList[i].showShareFlag = false
                    TellMeAbout.push(publishedList[i])
                    this.state.onTFlagF = false
                }
            } else {
                break
            }
        }
        for (let i = 0; i < commentsItem.length; i++) {
            if (user == commentsItem[i].userName) {
                this.state.userNameImg = commentsItem[i].img
                this.state.nickName = commentsItem[i].nickName ? commentsItem[i].nickName : user
                break
            }
        }
        //收藏和点赞初始化
        for (let i = 0; i < TellMeAbout.length; i++) {
            TellMeAbout[i].commentsFlag = true
            TellMeAbout[i].cllFlag = true
            TellMeAbout[i].flag = true
            TellMeAbout[i].butText = '查看更多点赞'
            //不同的用户需要判断,不同的作品是否被点赞
            for (let j = 0; j < TellMeAbout[i].giveALike.length; j++) {
                if (user == TellMeAbout[i].giveALike[j] || this.state.nickName == TellMeAbout[i].giveALike[j]) {
                    TellMeAbout[i].cllFlag = false
                }
            }
        }

        if (this.state.onTFlagF) {
            this.state.onTFlag = true
        } else {
            this.state.onTFlag = false
        }
        this.setState({
            data: TellMeAbout,
            user: user,
            nickName: this.state.nickName,
            userNameImg: this.state.userNameImg,
            addCommentItem: commentsItem,
            onTFlag: this.state.onTFlag,
            fadeAnim: new Animated.Value(0),
            sharefadeAnim: new Animated.Value(-110),
            commentFlag: true
        })
    }
    //跳转作者主页
    goPersonCenter = (userName, perNameImg) => {
        const { navigation } = this.props;
        this.props.navigation.navigate('DuthonPerCenter', {
            userName: userName, perNameImg: perNameImg
        })
    }
    //
    showShare = (j) => {
        for (let i = 0; i < this.state.data.length; i++) {
            if (i == j) {
                if (this.state.data[i].showShareFlag) {
                    this.state.data[i].showShareFlag = false
                } else {
                    this.state.data[i].showShareFlag = true
                }
            }
        }
        this.setState({
            data: this.state.data,
            showShareIndex: this.state.showShareIndex
        })
    }
    //删除自己发的作品或评论
    deleteItem = (id, type, perId) => {
        if (type == 'work') {
            this.type = 'work'
        } else if (type == 'commit') {
            this.type = 'commit'
        } else if (type == 'commitChild') {
            this.type = 'commitChild'
        }
        this.setState({
            deleteCommentItemsFlag: true,
            id: id,
            perId: perId
        })
    }
    //不删除
    noDelete = () => {
        this.setState({
            deleteCommentItemsFlag: false,
        })
    }
    //删除
    deleteI = async () => {
        let data = []
        let dataA = []
        let deteleCommit = { code: 0 }
        let publishedD = { code: 0 }
        let deteleCommitChild = { code: 0 }
        if (this.type == 'work') {
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.id == this.state.data[i].id) {
                    continue
                } else {
                    data.push(this.state.data[i])
                }
            }
            if (data.length == 0) {
                this.state.onTFlag = true
            } else {
                this.state.onTFlag = false
            }
            publishedD = await getFetch.deletePublished({ id: this.state.id }) //删除作品
        } else if (this.type == 'commit') {
            for (let i = 0; i < this.state.data[this.state.index].data.length; i++) {
                if (this.state.id == this.state.data[this.state.index].data[i].data[0].id) {
                    continue
                } else {
                    dataA.push(this.state.data[this.state.index].data[i])
                }
            }
            this.state.data[this.state.index].data = dataA
            this.state.data[this.state.index].commentsNum = this.state.data[this.state.index].commentsNum - 1
            data = this.state.data
            deteleCommit = await getFetch.commentsWork({ id: this.state.addId, data: dataA, commentsNum: this.state.data[this.state.index].commentsNum }) //删除评论
        } else if (this.type == 'commitChild') {
            for (let i = 0; i < this.state.data[this.state.index].data.length; i++) {
                if (this.state.perId == this.state.data[this.state.index].data[i].data[0].id) {
                    for (let j = 0; j < this.state.data[this.state.index].data[i].data[0].replyToComment.length; j++) {
                        if (this.state.id == this.state.data[this.state.index].data[i].data[0].replyToComment[j].id) {
                            continue
                        } else {
                            dataA.push(this.state.data[this.state.index].data[i].data[0].replyToComment[j])
                        }
                    }
                    this.state.data[this.state.index].data[i].data[0].replyToComment = dataA
                    deteleCommitChild = await getFetch.eveyComments({
                        id: this.state.addId, index: this.state.perId,
                        data: this.state.data[this.state.index].data[i].data[0].replyToComment,
                        replyToCommentMaxFlag: this.state.data[this.state.index].data[i].data[0].replyToCommentMaxFlag,
                        replyToCommentListFlag: this.state.data[this.state.index].data[i].data[0].replyToCommentListFlag,
                        replyToCommentListT: this.state.data[this.state.index].data[i].data[0].replyToCommentListT,
                    }) //删除多级评论
                }
            }
            data = this.state.data
        }

        if (publishedD.code == 200 || deteleCommit.code == 200 || deteleCommitChild.code == 200) {
            if (this.type == 'work') {
                await getFetch.deleteCollection({ id: this.state.id }) //取消
            }
            this.setState({
                data: data,
                commentsItem: this.state.data[this.state.index].data,
                deleteCommentItemsFlag: false,
                onTFlag: this.state.onTFlag,
                commentNim: this.state.data[this.state.index].commentsNum,
            })
        } else if (publishedD.code == 400 || deteleCommit.code == 400 || deteleCommitChild.code == 400) {

        } else {

        }
    }
    //删除作品选择
    confirmationWindowF = () => {
        if (this.state.deleteCommentItemsFlag) {
            return (
                <ConfirmationWindow confirmationWindowFlagData={this.state.deleteCommentItems} noDelete={this.noDelete.bind(this)} deleteI={this.deleteI.bind(this)} />
            )
        } else {
            return
        }
    }
    //加载已关注的用户发布的说说
    addTellMeAbout = ({ item, index }) => {
        let { widthfadeAnim } = this.state
        return (
            <View style={styles.perListItem} key={index}>
                <TouchableOpacity onPress={this.goPersonCenter.bind(this, item.userName, item.perImg)}>
                    <View style={styles.perTitle}>
                        <Image source={{ uri: item.perImg }} style={styles.perListImg} />
                        <Text style={styles.perName}>
                            {item.nickName ? item.nickName : item.userName}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.commentsItem}>
                    <Text style={styles.playNum}>{item.playNum}次播放 · {item.giveALike[item.giveALike.length - 1]}刚刚点赞了😊</Text>
                    <Text style={styles.playText}>{item.text}</Text>
                    <View style={styles.playCont}>
                        {this.moreCall(item.giveALike, item.flag)}
                        <Text style={styles.leftButton} onPress={this.showContent.bind(this, index)}>{item.butText}</Text>
                    </View>
                    <Text style={styles.commentNum} onPress={this.comment.bind(this, index, item.id)}>共{item.commentsNum}条评论</Text>
                    <View style={styles.removeList}>
                        <Text style={styles.commentDay}>{item.timeText} {item.address}</Text>
                        <Text style={[styles.removeCommentDay, item.userName == this.state.user ? '' : styles.hideRemove]} onPress={this.deleteItem.bind(this, item.id, 'work', item.id)}>删除</Text>
                        <Ionicons name={'ios-more'} size={16} color={'#000000'} style={styles.icon} onPress={this.showShare.bind(this, index)} />
                    </View>
                </View>
                {/* <View style = {styles.shareAndCollection}> */}
                <Animated.View style={[styles.left, item.showShareFlag ? '' : styles.leftHide]}>
                    <Entypo name={item.cllFlag ? 'heart-outlined' : 'heart'} size={18} color={'black'} style={styles.call} onPress={this.clickCall.bind(this, index, item.id)} />
                    <EvilIcons name={'comment'} size={22} color={'black'} style={styles.mas} onPress={this.comment.bind(this, index, item.id)} />
                    <EvilIcons name={'share-google'} size={22} color={'black'} style={styles.share} onPress={this.share.bind(this)} />
                </Animated.View>
                {/* <View style = {styles.right}>
                        <FontAwesome name = {'bookmark'} size = {25} color = {'black'} style = {styles.collect}/>
                    </View> */}
                {/* </View> */}
            </View>
        )
    }
    //更多点赞的人
    moreCall = (like, flag) => {
        let giveName = ''
        for (let i = 0; i < like.length; i++) {
            giveName = giveName + like[i] + ', '
        }
        if (!flag) {
            return (
                <Text style={styles.leftText}>{like.length}人都点赞了 {giveName}</Text>
            )
        } else {
            return
        }

    }
    //展示
    showContent = (j) => {
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].flag) {
                if (i == j) {
                    this.state.data[i].flag = false
                    this.state.data[i].butText = '收起'
                }
            } else {
                if (i == j) {
                    this.state.data[i].flag = true
                    this.state.data[i].butText = '查看更多点赞'
                }
            }
        }
        this.setState({
            data: this.state.data
        })
    }
    //点赞
    clickCall = async (j, id) => {
        let clickCallUpdata
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].cllFlag) {
                if (i == j) {
                    this.state.data[i].cllFlag = false
                    this.state.data[i].perUser = this.state.nickName
                    this.state.data[i].giveALike.push(this.state.nickName)
                    clickCallUpdata = await getFetch.updateOnePublished({ id: id, giveALike: this.state.data[i].giveALike })
                }
            } else {
                if (i == j) {
                    this.state.data[i].cllFlag = true
                    this.state.data[i].perUser = this.state.user + '取消'
                    this.state.data[i].giveALike.pop(this.state.user)
                    clickCallUpdata = await getFetch.updateOnePublished({ id: id, giveALike: this.state.data[i].giveALike })
                }
            }
        }
        if (clickCallUpdata.code == 200) {
            this.setState({
                loveFlag: false,
                data: this.state.data,
                loveWidth: 150
            })
        }
        setInterval(() => {
            this.setState({
                loveWidth: -100
            })
        }, 500)
        { this.showContent() }
    }

    //评论
    comment = (i, id) => {
        let commentsItem = this.state.data[i].data ? this.state.data[i].data : []
        for (let j = 0; j < commentsItem.length; j++) {
            commentsItem[j].data[0].replyToCommentListFlag = true
            commentsItem[j].data[0].replyToCommentListT = '查看'
            commentsItem[j].data[0].replyToCommentMaxFlag = true
            for (let k = 0; k < commentsItem[j].data[0].replyToComment.length; k++) {
                commentsItem[j].data[0].replyToComment[k].replyToCommentMaxFlag = true
            }
        }
        this.setState({
            commentsItem: commentsItem,
            commentNim: this.state.data[i].commentsNum,
            index: i,
            addId: id
        })
        if (this.state.commentFlag) {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 550,
                    duration: 500,
                }
            ).start();
            this.setState({
                commentFlag: false,
            })
        } else {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start();
            this.setState({
                commentFlag: true
            })
        }
    }
    //关闭发送评论
    closeSaveMsg = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();
        this.setState({
            commentFlag: true
        })
    }
    //发送评论
    saveMsg = async (comments) => {
        let num = 0
        if (comments) {
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.addId == this.state.data[i].id) {
                    num = this.state.data[i].data.length != 0 ? this.state.data[i].data[this.state.data[i].data.length - 1].data[0].id + 1 : num
                }
            }
            let data = {
                id: num,
                img: this.state.userNameImg,
                name: this.state.nickName,
                nameT: comments,
                replyToComment: [],
                replyToCommentMaxFlag: true,
                replyToCommentListFlag: true,
                replyToCommentListT: '查看'
            }
            let commentsItem =
            {
                id: num,
                data: []
            }

            commentsItem.data.unshift(data)
            this.state.data[this.state.index].data.unshift(commentsItem)
            this.state.data[this.state.index].commentsNum = this.state.data[this.state.index].commentsNum + 1
            let commentsSave = await getFetch.commentsWork({ id: this.state.addId, data: this.state.data[this.state.index].data, commentsNum: this.state.data[this.state.index].commentsNum })
            if (commentsSave.code == 200) {
                this.setState({
                    comments: '',
                    commentsItem: this.state.data[this.state.index].data,
                    commentNim: this.state.data[this.state.index].commentsNum
                })
            } else if (commentsSave.code == 400) {

            } else {

            }
        } else {
            alert("评论不能为空!")
        }
    }
    //拉取分享面板
    share = () => {
        if (!this.state.shareFlag) {
            Animated.timing(
                this.state.sharefadeAnim,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start();
            this.setState({
                shareFlag: true
            })
        }
    }
    //隐藏分享面板
    shareHide = () => {
        if (this.state.shareFlag) {
            Animated.timing(
                this.state.sharefadeAnim,
                {
                    toValue: -110,
                    duration: 500,
                }
            ).start();
            this.setState({
                shareFlag: false
            })
        }
    }
    //分享
    hideShareBg = () => {
        Animated.timing(
            this.state.sharefadeAnim,
            {
                toValue: -110,
                duration: 500,
            }
        ).start();
        this.setState({
            shareFlag: false
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
        this.props.navigation.navigate('ComList', {
            list: this.state.addCommentItem
        })
    }

    //发布作品不带图片
    videoImg = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Published', { imgFlag: false, user: this.state.user, userNameImg: this.state.userNameImg })
    }
    //发布作品带图片
    getImg = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Published', { imgFlag: false, user: this.state.user, userNameImg: this.state.userNameImg })
        // ImagePicker.showImagePicker(photoOptions, (response) => {
        //     if (response.didCancel) {

        //     }
        //     else if (response.error) {

        //     }
        //     else if (response.customButton) {

        //     }
        //     else {
        //         let source = response.uri;
        //         const { navigation } = this.props;
        //         this.props.navigation.navigate('Published',{imgFlag :true,avatarSource:source,user : this.state.user,userNameImg:this.state.userNameImg})
        //     }
        // });
    }
    //加载发布选择组件
    showAndHidw = () => {
        if (this.state.videoImgFlag) {
            return (
                <VideoImg />
            )
        } else {
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
            shareFlag: false,
            videoImgFlag: false
        })
    }
    //没有说说的时候ui
    onT = () => {
        if (this.state.onTFlag) {
            return (
                <Text style={styles.noT} key={1}>空空如也,还没有发布任何说说,快点击左上角的相机图标,发布您的第一条说说吧.</Text>
            )
        }
    }
    render() {
        let { fadeAnim } = this.state;
        let { sharefadeAnim } = this.state;
        return (
            <View style={styles.max}>
                <Header title={this.state.title} videoImg={this.videoImg.bind(this)} open={false} getNoImg={this.getImg.bind(this)} />
                <ScrollView style={styles.items}>
                    {/* {this.saveWorks()} */}
                    <SectionList style={styles.sectList}
                        renderItem={this.addTellMeAbout}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                        sections={[{ data: this.state.data }]
                        }>
                    </SectionList>
                    {this.onT()}
                </ScrollView>
                <Entypo name={'heart'} size={this.state.loveWidth} color={'red'} style={[styles.love, this.state.loveFlag ? styles.loveHide : '']} />
                <PublicCommit fadeAnim={fadeAnim}
                    data={this.state.data}
                    commentsItem={this.state.commentsItem}
                    commentNim={this.state.commentNim}
                    commentFlag={this.state.commentFlag}
                    userNameImg={this.state.userNameImg}
                    nickName={this.state.nickName}
                    index={this.state.index}
                    addId={this.state.addId}
                    saveMsg={this.saveMsg.bind(this)}
                    closeSaveMsg={this.closeSaveMsg.bind(this)}
                    deleteItem={this.deleteItem.bind(this)}
                />
                <View style={[styles.opacityBg, this.state.shareFlag ? styles.showopacityBg : '']} >
                    <Text style={styles.bindClick} onPress={this.hideF.bind(this)}></Text>
                </View>
                <Animated.View style={[styles.showShare, { bottom: sharefadeAnim }]}>
                    <View style={styles.shareItem}>
                        <AntDesign name={'wechat'} size={40} color={'black'} style={styles.shareLogo} onPress={this.hideShareBg.bind(this)} />
                        <Text style={styles.shareName}>微信</Text>
                    </View>
                    <View style={styles.shareItem}>
                        <AntDesign name={'QQ'} size={40} color={'black'} style={styles.shareLogo} onPress={this.hideShareBg.bind(this)} />
                        <Text style={styles.shareName}>QQ</Text>
                    </View>
                    <View style={styles.shareItem}>
                        <AntDesign name={'codepen-circle'} size={40} color={'black'} style={styles.shareLogo} onPress={this.hideShareBg.bind(this)} />
                        <Text style={styles.shareName}>微信朋友圈</Text>
                    </View>
                    <Text style={styles.closeShare} onPress={this.shareHide.bind(this)}>X</Text>
                </Animated.View>
                {/* {this.showAndHidw()} */}
                <View style={[styles.opacityBg, this.state.deleteCommentItemsFlag ? styles.showopacityBg : '']} ></View>
                {this.confirmationWindowF()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loveHide: {
        display: 'none'
    },
    replyToCommentListStyle: {
        display: 'none'
    },
    noT: {
        fontSize: 13,
        color: '#898989',
        paddingTop: 30,
        paddingBottom: 20,
        textAlign: 'center',
    },
    goDetail: {
        height: 345,
        position: 'absolute',
        left: 0,
        top: 45,
        zIndex: 9999,
        right: 0
    },
    sectList: {
        marginBottom: 30
    },
    commerCosle: {
        position: 'absolute',
        top: 15,
        right: 20
    },
    commentInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 15,
        bottom: -50,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
    },
    eplyToCommentMax: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,

    },
    eplyToCommentMaxB: {
        display: 'none'
    },
    commentInputB: {
        bottom: 0
    },
    commentInputBt: {
        bottom: -50
    },
    commentsTitle: {
        fontSize: 14,
        color: '#000000',
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center'
    },
    commentList: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    commentLeftPerImg: {
        flex: 1,
        paddingTop: 6
    },
    commentLeftPerListImg: {
        paddingTop: 10,
        width: 30,
        height: 30,
        borderRadius: 15
    },
    replyToComment: {
        marginTop: 10
    },
    commentRightPerText: {
        paddingLeft: 15,
        flex: 9
    },
    replyToCommentTitle: {
        marginTop: 10,
        fontSize: 14,
        color: '#EED5D2'
    },
    commentRIghtPerName: {
        flex: 6,
        fontSize: 14,
        color: '#EE82EE'
    },
    replyToCommentTitleHide: {
        display: 'none'
    },
    removeAndCall: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    commentRIghtPerText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 8
    },
    replayToCommentCallBack: {
        flex: 1
    },
    replayToCommentRemove: {
        flex: 1
    },
    replayToCommentRemoveHide: {
        display: 'none'
    },
    callBackMsg: {
        fontSize: 10,
        color: '#E066FF'
    },
    commentRIghtPerText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 8
    },
    bindClick: {
        flex: 1
    },
    closeShare: {
        position: 'absolute',
        top: 7,
        right: 7,
        fontSize: 14,
        color: '#898989'
    },
    opacityBg: {
        position: 'absolute',
        right: 0,
        top: -20,
        left: 0,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    showopacityBg: {
        bottom: 0,
    },
    showShare: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
    },
    shareItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareLogo: {
        flex: 1,
        width: 40,
        height: 40,
        borderRadius: 20
    },
    shareName: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        marginTop: 6,
    },
    adimatedView: {
        height: 0,
        // top:0,
        bottom: -2,
        right: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        position: 'absolute',
        left: 0,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderWidth: 1,
    },
    addItemPer: {
        backgroundColor: '#f8f8f8',
    },
    headerTitle: {
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    addPerLeft: {
        fontSize: 13,
        color: '#333333',
        flex: 1,
        fontWeight: '700'
    },
    addPerRight: {
        fontSize: 13,
        color: '#B23AEE',
        textAlign: 'right',
        flex: 1
    },
    addItemList: {
        paddingBottom: 12
    },
    childItem: {
        marginRight: 3,
        borderRadius: 3,
        borderColor: '#EAEAEA',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 135,
        paddingRight: 4,
        paddingLeft: 4,
        backgroundColor: '#ffffff'
    },
    childItemR: {
        marginRight: 0
    },
    addPerListImg: {
        width: 70,
        height: 70,
        borderColor: '#cccccc',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 35,
    },
    addPerName: {
        fontSize: 12,
        color: '#333333',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center'
    },
    addPerMsg: {
        fontSize: 10,
        color: '#898989',
        textAlign: 'center'
    },
    addPerButton: {
        fontSize: 12,
        color: '#ffffff',
        backgroundColor: '#AB82FF',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 8,
        width: 123
    },
    changeaddPerButtonBg: {
        backgroundColor: '#f2f2f2',
        color: '#cccccc'
    },
    addPerColse: {
        fontSize: 12,
        color: '#898989',
        position: 'absolute',
        top: 5,
        right: 5
    },
    commentsItem: {
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 10,
    },
    playNum: {
        fontSize: 12,
        color: '#121212'
    },
    playText: {
        fontSize: 12,
        color: '#333333',
        marginTop: 6,
        marginBottom: 2
    },
    playCont: {
        paddingRight: 15
    },
    leftText: {
        fontSize: 11,
        color: '#333333',
        marginTop: 4
    },
    leftButton: {
        fontSize: 11,
        color: '#898989',
        marginTop: 4
    },
    commentNum: {
        fontSize: 11,
        color: '#898989',
        marginTop: 6,
        marginBottom: 4
    },
    removeList: {
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        position: 'relative',
    },
    removeCommentDay: {
        fontSize: 10,
        color: '#E066FF',
        paddingLeft: 20
    },
    commentDay: {
        fontSize: 10,
        color: '#898989',
    },
    hideRemove: {
        display: 'none'
    },
    max: {
        flex: 1
    },
    items: {
        paddingLeft: 4,
        paddingRight: 4
    },
    listItem: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 6,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    perItem: {
        position: 'relative',
        zIndex: 9
    },
    per: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radius: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderRadius: 35,
    },
    add: {
        width: 20,
        height: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        left: 45,
        borderRadius: 10,
        zIndex: 999
    },
    perImg: {
        width: 50,
        height: 50,
    },
    perName: {
        width: 70,
        fontSize: 12,
        color: '#898989',
        paddingTop: 5,
        overflow: 'hidden',
        textAlign: 'center'
    },
    perListItem: {
        position: 'relative',
        paddingTop: 10,
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    perTitle: {
        // width:30,
        // height:30,
        // overflow:'hidden',
        // borderRadius:15,
        // justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 8,
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'row',
    },
    perListImg: {
        borderRadius: 15,
        width: 30,
        height: 30,
        marginRight: 5,
    },
    perName: {
        fontSize: 12,
        color: '#333333'
    },
    icon: {
        position: 'absolute',
        top: -1,
        right: 8
    },
    perMaxImg: {
        flex: 1,
        height: 345
    },
    shareAndCollection: {
        paddingTop: 0,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
    },
    left: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        right: 30,
        bottom: 4,
    },
    leftHide: {
        display: 'none'
    },
    call: {

    },
    mas: {
        marginLeft: 10,
        marginRight: 10,

    },
    share: {

    },
    collect: {
        textAlign: 'right'
    },
    right: {
        flex: 1,
    },
    love: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -75, marginTop: -75
    },
    codeLine: {
        height: 30,
        width: 0,
        backgroundColor: "#dddddd"
    },
    code: {
        fontSize: 13,
        color: '#000000',
        flex: 10,
        paddingLeft: 5,
        height: 40,
        backgroundColor: '#ffffff'
    },
    eplyToCommentCode: {

    },
    getCode: {
        fontSize: 11,
        color: '#000000',
        flex: 1,
        textAlign: 'center',
        height: 40,
        marginLeft: 10,
        lineHeight: 40
    },
});