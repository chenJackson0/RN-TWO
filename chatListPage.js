import React, {Component} from 'react';
import {SectionList, FlatList,StyleSheet, Text, View, Dimensions, Image, ScrollView, Animated,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from './component/backHeads'
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default class chatListpage extends Component{
    constructor(props){
        super(props)
        this.state = {
            newsAmount : 10, //顶部消息数量
            newsList : [{dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"陈氏家族",talkUserName:"母亲",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"Lua Native",talkUserName:"summer",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"超人群",talkUserName:"同学",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"超人群",talkUserName:"同学",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"办公群",talkUserName:"后台人员",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"其他群",talkUserName:"XXX",ShowSentence:"我回来了"},
            {dialogUserPic:"http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg",dialogTitleUsername:"公司群",talkUserName:"XXX",ShowSentence:"我回来了"},
            ]  //消息列表展示
        }
    }
    static navigationOptions = {
        tabBarLabel: '聊天列表',
        tabBarIcon: ({focused}) => {
            if(focused){
                return (
                    <AntDesign
                        name = 'home'
                        size = {26}
                        color = '#B23AEE'
                    >
                    </AntDesign>
                );
            }
            else{
                return (
                    <AntDesign
                        name = 'home'
                        size = {26}
                        color = 'black'
                    >
                    </AntDesign>
                );
            }      
        },
    };
    goBackPage = () =>{
        const { navigation } = this.props;
        this.props.navigation.goBack()
      }
    _chatListRenderItem = (Info) =>{
        return(
            <TouchableOpacity 
                // activeOpacity = {1}
                onPress = {this._onChatListBtnPress.bind(this,Info.item.Index)}
                // style = {styles.chatListBtnContainer}
            >
            <View style = {styles.chatListBtnContainer}>
                <View style = {styles.leftPicContainer}>
                    <Image style = {styles.leftPic} source = {{uri:Info.item.key.dialogUserPic}}></Image>
                </View>
                <View style = {styles.rightItemContainer}>
                    <View style = {styles.rightTextAreaContainer}>
                        <Text style = {styles.rightTitleText}>{Info.item.key.dialogTitleUsername}</Text>
                    </View>
                    <View style = {styles.rightTextAreaContainer}>
                        <Text style = {styles.rightBottomText} >{Info.item.key.talkUserName} : {Info.item.key.ShowSentence}</Text>
                    </View>
                </View>
            </View>
                 {/* <Text style = {{fontSize:16,color:"black"}}>{Info.item.key.dialogTitleUsername}</Text> */}
            </TouchableOpacity>
        )
    }
    _onChatListBtnPress(i){
        const {navigation} = this.props
        navigation.navigate("dialogPage",{
            dialogName:this.state.newsList[i].dialogTitleUsername
        })
    }
    render(){
        let titleContent = "聊天("+this.state.newsAmount+")"
        chatListData = this.state.newsList.map((item,index)=>{
            let newItem = {}
            newItem.key = item
            newItem.Index = index
            return newItem
        })
        return(
            <View styles = {styles.chatListpageContainer}>
                <Header title = {titleContent} goBackPage = {this.goBackPage.bind(this)}></Header>
                <View style = {{height:(deviceHeight)-140,flexDirection:'column'}}> 
                    <FlatList
                        data = {chatListData}
                        // getItemLayout = {(data,index)=>({length:FlatListBtnHeight,offset:index*FlatListBtnHeight,index})}
                        renderItem = {this._chatListRenderItem}
                        keyExtractor = {(item) => item.key + item.Index}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    chatListpageContainer: {
        flex:1,
    },
    chatListBtnContainer:{
        height:(deviceHeight)/10,
        flexDirection:"row",
        padding:10,
        borderTopColor:'#F4F4F4',
        borderTopWidth:0.5,
        borderBottomColor:'#F4F4F4',
        borderBottomWidth:0.5
    },
    leftPicContainer:{
        flex:1,
        padding:5
    },
    leftPic:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
    },
    rightItemContainer:{
        flex:5,
        flexDirection:"column"
    },
    rightTextAreaContainer:{
        flex:1,
        justifyContent:'center',
    },
    rightTitleText:{
        fontSize:20,
        color:"black"
    },
    rightBottomText:{
        fontSize:16,
        color:"#cccccc"
    }
})