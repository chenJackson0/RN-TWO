import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions, Image, TextInput, SectionList,TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
global.deviceWidth = Dimensions.get('window').width
import getFetch from '../service/index.js'
export default class PublicCommit extends Component{

  constructor(props){
      super(props)
      this.state = {
        fadeAnim: new Animated.Value(0),
        callName : '',
        comments : '',
        replyToCommentText : '',
        commentNim : '',
      }
  };
  type = 'work'
  //关闭发送评论
  closeSaveMsg = () => {
    this.props.closeSaveMsg()
  }
  //发送评论
  saveMsg = async () => {
    this.props.saveMsg(this.state.comments)
    this.setState({
        comments : ''
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
                    <Text style = {[styles.callBackMsg,styles.replayToCommentRemove,item.name == this.props.user || item.name == this.props.nickName ? '' : styles.replayToCommentRemoveHide]} onPress = {this.deleteItem.bind(this,item.id,'commit',item.id)}>删除</Text>
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
//评论可回复
eplyToCommentT = (index) => {
    for(let i = 0;i<this.props.data[this.props.index].data.length;i++){
        if(index == this.props.data[this.props.index].data[i].data[0].id){
            if(this.props.data[this.props.index].data[i].data[0].replyToCommentMaxFlag){
                this.props.data[this.props.index].data[i].data[0].replyToCommentMaxFlag = false
            }else{
                this.props.data[this.props.index].data[i].data[0].replyToCommentMaxFlag = true
            }
            this.setState({
                commentsItem : this.props.data[this.props.index].data,
                replyToCommentText : '',
            })
        }else{
            this.props.data[this.props.index].data[i].data[0].replyToCommentMaxFlag = true
        }
    }
    
}
//删除自己发的作品或评论
deleteItem = (id,type,perId) => {
    this.props.deleteItem(id,type,perId)
}
//回复评论
replyToCommentSaveMsg = async (id,name,callFlag,childId) => {
    let itemName = null
    if(callFlag){
        itemName = name
    }else{
        itemName = this.state.callName
    }
    for(let i = 0;i<this.props.data[this.props.index].data.length;i++){
        if(id == this.props.data[this.props.index].data[i].data[0].id){
            let replyToCommentId = this.props.data[this.props.index].data[i].data[0].replyToComment.length == 0 ? 0 : this.props.data[this.props.index].data[i].data[0].replyToComment[this.props.data[this.props.index].data[i].data[0].replyToComment.length-1].id + 1
            if(this.state.replyToCommentText){
                let replyToComment = {
                    id : replyToCommentId,
                    img:this.props.userNameImg,
                    name : this.props.nickName,
                    itemName : itemName,
                    nameT : this.state.replyToCommentText,
                    replyToCommentMaxFlag : true
                }
                this.props.data[this.props.index].data[i].data[0].replyToComment.push(replyToComment)
                this.props.data[this.props.index].data[i].data[0].replyToCommentMaxFlag = true
                if(childId != -1){
                    this.props.data[this.props.index].data[i].data[0].replyToComment[childId].replyToCommentMaxFlag = true
                }
                this.props.data[this.props.index].data[i].data[0].replyToCommentListFlag = false
                this.props.data[this.props.index].data[i].data[0].replyToCommentListT = '收起'
                let eveyComments = await getFetch.eveyComments({id:this.props.addId,index:id,
                    data:this.props.data[this.props.index].data[i].data[0].replyToComment,
                    replyToCommentMaxFlag:this.props.data[this.props.index].data[i].data[0].replyToCommentMaxFlag,
                    replyToCommentListFlag:this.props.data[this.props.index].data[i].data[0].replyToCommentListFlag,
                    replyToCommentListT : this.props.data[this.props.index].data[i].data[0].replyToCommentListT,
                })
                if(eveyComments.code == 200){
                    this.setState({
                        commentsItem : this.props.data[this.props.index].data,
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
//查看更多回复
showReplyToComment = (index) => {
    for(let i = 0;i<this.props.data[this.props.index].data.length;i++){
        if(index == this.props.data[this.props.index].data[i].data[0].id){
            if(this.props.data[this.props.index].data[i].data[0].replyToCommentListFlag){
                this.props.data[this.props.index].data[i].data[0].replyToCommentListFlag = false
                this.props.data[this.props.index].data[i].data[0].replyToCommentListT = '收起'
                this.setState({
                    commentsItem : this.props.data[this.props.index].data,
                })
            }else{
                this.props.data[this.props.index].data[i].data[0].replyToCommentListFlag = true
                this.props.data[this.props.index].data[i].data[0].replyToCommentListT = '查看'
                this.setState({
                    commentsItem : this.props.data[this.props.index].data,
                })
            }
        }
    }
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
                    <Text style = {[styles.callBackMsg,styles.replayToCommentRemove,item.replyToComment[i].name == this.props.user || item.replyToComment[i].name == this.props.nickName ? '' : styles.replayToCommentRemoveHide]} onPress = {this.deleteItem.bind(this,item.replyToComment[i].id,'commitChild',item.id)}>删除</Text>
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
//多级回复
callBackCall = (id,name,perId) => {
    for(let i = 0;i<this.props.data[this.props.index].data.length;i++){
        if(perId == this.props.data[this.props.index].data[i].data[0].id){
            for(j = 0;j<this.props.data[this.props.index].data[i].data[0].replyToComment.length;j++){
                if(id == this.props.data[this.props.index].data[i].data[0].replyToComment[j].id){
                    if(this.props.data[this.props.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag){
                        this.props.data[this.props.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag = false
                    }else{
                        this.props.data[this.props.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag = true
                    }
                    this.setState({
                        commentsItem : this.props.data[this.props.index].data,
                        replyToCommentText : ''
                    })
                }else{
                    this.props.data[this.props.index].data[i].data[0].replyToComment[j].replyToCommentMaxFlag = true
                }
            }
        }
    }
    this.setState({
        callName : name,
        replyToCommentText : ''
    })
}
render() {
    return (
        <Animated.View style = {[styles.adimatedView,{height:this.props.fadeAnim}]}>
            <Text style = {styles.commentsTitle}>{this.props.commentNim}条评论</Text>
            <Text style = {styles.commerCosle} onPress = {this.closeSaveMsg.bind(this)}>X</Text>
            <SectionList style = {styles.sectList}
                renderItem={this.addcommentsItem}
                showsVerticalScrollIndicator={false}
                keyExtractor = {(item,index) => item + index}
                sections={
                    this.props.commentsItem
                }>
            </SectionList>
            <View style = {[styles.commentInput,this.props.commentFlag ? '' : styles.commentInputB]}>
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
    );
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
