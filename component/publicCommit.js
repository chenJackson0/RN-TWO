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

// 取得屏幕的宽高Dimensions
let windowsSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
};
import getFetch from '../service/index.js'
import ConfirmationWindow from './component/confirmationWindow'
export default class PublicCommit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '首页',
            butText : '展开',
            userName : '',
            user : '',
            data : [],
            fadeAnim: this.props.fadeAnim,
            commentFlag : true,
            shareFlag : false,
            videoImgFlag : false,
            comments : '',
            addCommentItem : [],
            commentsItem : this.props.commentsItem,
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
            perId : '',
            nickName :''
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

            }else{

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
    //删除哦评论选择
    confirmationWindowF = () => {
        if(this.state.deleteCommentItemsFlag){
            return(
                <ConfirmationWindow confirmationWindowFlagData = {this.state.deleteCommentItems} noDelete = {this.noDelete.bind(this)} deleteI = {this.deleteI.bind(this)}/>
            )
        }else{
            return
        }
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
    render() {
        let {fadeAnim}  = this.state;
        return(
            <View style = {styles.max}>
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
                <View style = {[styles.opacityBg,this.state.deleteCommentItemsFlag ? styles.showopacityBg : '']} ></View>
                {this.confirmationWindowF()}
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
    },
    perTitle: {
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