/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, View, Dimensions, Image, ScrollView, Animated,TouchableOpacity} from 'react-native';
 //引用插件
import Header from './component/backHeads'
global.deviceWidth = Dimensions.get('window').width
import AntDesign from 'react-native-vector-icons/AntDesign'
import Constants from './global.js'
export default class ComList extends Component{

  constructor(props){
      super(props)
      this.state = {
        title : '用户列表',
        changeBcolor : true,
        addCommentItem : [],
        fadeAnim: new Animated.Value(375),
        fensi : 0,
        foncsOn : 0,
        showFensiList : [],
        foucsOnList : []
      }
  }
  //绑定事件
    commentList = () => {
        Constants.getcommentsItemStorageF()
        this.setState({
            showFensiList : [],
            foucsOnList : []
        })
        setTimeout(()=>{
            this.init()
        },500)
    }
    //注册通知
    componentWillMount(){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.commentList())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //获取数据
    init = () => {
        const { navigation } = this.props;
        let user = navigation.getParam("perUser") ? navigation.getParam("perUser") : ''
        let commentsItem = Constants.getcommentsItem() ? Constants.getcommentsItem() : []
        //获取关注人数和粉丝人数
        for(let i = 0;i<commentsItem.length;i++){
            if(user == commentsItem[i].userName){
                this.state.fensi = commentsItem[i].fensi ? commentsItem[i].fensi.length : 0
                this.state.foncsOn = commentsItem[i].focusOns ? commentsItem[i].focusOns.length : 0
                for(let j = 0;j<commentsItem[i].focusOns.length;j++){
                    this.state.foucsOnList.push(commentsItem[i].focusOns[j])
                }
                for(let k = 0;k<commentsItem[i].fensi.length;k++){
                    this.state.showFensiList.push(commentsItem[i].fensi[k])
                }
                break
            }
        }
        this.setState({
            user : user,
            addCommentItem : commentsItem,
            fensi : this.state.fensi,
            foncsOn : this.state.foncsOn,
            foucsOnList : this.state.foucsOnList,
            showFensiList : this.state.showFensiList
        })
    }
    //跳转作者主页
    goPersonCenter = (userName) => {
        const { navigation } = this.props;
        this.props.navigation.navigate('DuthonPerCenter',{
            userName : userName
        })
    }
  //加载推荐用户
  addPerItem = ({item,index}) =>{
    return (
        <TouchableOpacity style = {styles.addList} key = {index} onPress = {this.goPersonCenter.bind(this,item.userName)}>
            <View style = {styles.addOne}>
                <Image source={{uri:item.img?item.img:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.addListImg} />
            </View>
            <View style = {styles.addTwo}>
                <Text style = {styles.lNameO}>{item.userName}</Text>
                {/* <Text style = {styles.lNameT}>{item.commeName}</Text> */}
                <Text style = {styles.lNameS}>{item.commeName}和其他{item.addCommentNum}位用户关注了</Text>
            </View>
            <View style = {styles.addThree}>
                <Text style = {[styles.guanzhu,item.focusOnFlag ? '' : styles.changeaddPerButtonBg]} onPress = {this.focusOn.bind(this,index,item.userName,item.img)}>{item.focusOn}</Text>
                {/* <Text style = {styles.lClose} onPress = {this.closeCommentItem.bind(this,index)}>X</Text> */}
            </View>
        </TouchableOpacity>
    )
  }
  //点击删除commentItem
  closeCommentItem = (num) => {
    let data = []
    for(let i = 0;i<this.state.addCommentItem[0].data.length;i++){
        if(i == num){
            continue
        }else{
            data.push(this.state.addCommentItem[0].data[i])
        }
    }
    let maxData = [{
        data : data
    }]
    this.setState({
        addCommentItem : maxData
    })
  }
  //点击关注
  focusOn = (j,name,img) => {
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
    this.setState({
        addCommentItem : this.state.addCommentItem
    })
    this.init()
    Constants.storage.save({
        key : 'commentsItemFoucsOn',
        data : this.state.addCommentItem,
        defaultExpires: true, 
    })
  }
  //点击tab切换
  changeTab = (i) => {
    if(i == 0){
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 375,
                duration: 500,
            }
            ).start();
        this.setState({
            changeBcolor : true
        })
    }else if(i == 1){
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 500,
            }
            ).start();
        this.setState({
            changeBcolor : false
        })
    }
  }
   //返回
   goBackPage = () =>{
    const { navigation } = this.props;
    this.props.navigation.goBack()
  }
  //粉丝
  showFensi = () => {
    if(this.state.fensi == 0){
        return(
            <View style = {styles.myCommit}>
                    <AntDesign name = {'wechat'} size = {40} color = {'black'} style = {styles.addLogo} />
                    <Text style = {styles.titleName}>粉丝</Text>
                    <Text style = {styles.titleMsg}>这里会显示所有关注你的用户.</Text>
            </View>
        )
    }else{
        let array = {
            fensi:[]
        }
        for(let i = 0;i<this.state.showFensiList.length;i++){
            let item =  <ScrollView style = {styles.perItem} key = {i} horizontal = {true} showsHorizontalScrollIndicator={false}><TouchableOpacity style = {styles.per} key = {i} onPress = {this.goPersonCenter.bind(this,this.state.showFensiList[i].name)}>
                <View style = {styles.radius}>
                    <Image source={{uri:this.state.showFensiList[i].img?this.state.showFensiList[i].img:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.perImg} />
                </View> 
                <Text style = {styles.perName}>{this.state.showFensiList[i].name}</Text>
            </TouchableOpacity></ScrollView>
            array.fensi.push(item)
        }
        return array.fensi
    }
  }
  //关注的主播
  showFoucsOn = () => {
    let {fadeAnim}  = this.state;
    if(this.state.foncsOn == 0){
        return(
            <Animated.View style = {[styles.myCommit,styles.myCommitT,{left:fadeAnim}]}>
                <AntDesign name = {'wechat'} size = {40} color = {'black'} style = {styles.addLogo} />
                <Text style = {styles.titleName}>关注的用户</Text>
                <Text style = {styles.titleMsg}>这里会显示您关注的所有用户.</Text>
            </Animated.View>
        )
    }else{
        let array = {
            foncsOn:[]
        }
        for(let i = 0;i<this.state.foucsOnList.length;i++){
            let item =  <Animated.View key = {i} style = {[styles.myCommits,styles.myCommitT,{left:fadeAnim}]}><ScrollView style = {styles.perItem} horizontal = {true} showsHorizontalScrollIndicator={false}><TouchableOpacity style = {styles.per}  onPress = {this.goPersonCenter.bind(this,this.state.foucsOnList[i].name)}>
                <View style = {styles.radius}>
                    <Image source={{uri:this.state.foucsOnList[i].img?this.state.foucsOnList[i].img:'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}} style = {styles.perImg} />
                </View> 
                <Text style = {styles.perName}>{this.state.foucsOnList[i].name}</Text>
            </TouchableOpacity></ScrollView></Animated.View>
            array.foncsOn.push(item)
        }
        return array.foncsOn
    }
  }
  render() {
    let {fadeAnim}  = this.state;
    return (
        <View style = {styles.max}>
           <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)}/>
           <View style = {styles.comTab}>
                <TouchableOpacity style = {styles.touchLeft} onPress = {this.changeTab.bind(this,0)}>
                    <View style = {[styles.comLeft,this.state.changeBcolor ? styles.changBottomColor : '']}>
                        <Text style = {[styles.comNum,this.state.changeBcolor ? styles.changColor : '']}>{this.state.fensi}</Text>
                        <Text style = {[styles.comText,this.state.changeBcolor ? styles.changColor : '']}>粉丝</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.touchRight} onPress = {this.changeTab.bind(this,1)}>
                    <View style = {[styles.comRight,this.state.changeBcolor ? '' :styles.changBottomColor]}>
                        <Text style = {[styles.comNum,this.state.changeBcolor ? '' : styles.changColor]}>{this.state.foncsOn}</Text>
                        <Text style = {[styles.comText,this.state.changeBcolor ? '' : styles.changColor]}>已关注</Text>
                    </View>
                </TouchableOpacity>
           </View>
           <View style = {styles.animates}>
                {this.showFensi()}
                {this.showFoucsOn()}
           </View>
           
           <View style = {styles.addCommList}>
                <Text style = {styles.addCommListTitle}>推荐用户</Text>
           </View>
           <ScrollView>
           <View style = {styles.addCommList}>
                <SectionList style = {styles.sectList}
                    renderItem={this.addPerItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor = {(item,index) => item + index}
                    sections={[{data:this.state.addCommentItem}]}>
                </SectionList>
           </View>
           </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    animates: {
        position:'relative',
        paddingLeft:15,
        paddingRight:15,
        // paddingTop:10,
        // paddingBottom:10,
        width:deviceWidth
    },
    myCommitT: {
        position:'absolute',
        top:0,
        width:375
    },
    touchLeft: {
        flex:1
    },
    touchRight: {
        flex:1
    },
    addCommList: {
        paddingLeft:15,
        paddingRight:15,
        marginBottom:15
    },
    addCommListTitle: {
        paddingTop:12,
        paddingBottom:12,
        fontSize:14,
        color:'#000000',
        fontWeight:'700'
    },
    addList: {
        flexDirection:'row',
        marginTop:12,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    changeaddPerButtonBg: {
        backgroundColor:'#f2f2f2',
        color:'#cccccc'
    },
    addOne: {
        flex:2,
        height:50,
        marginRight:8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:12
    },
    addListImg: {
        width:50,
        height:50,
        borderRadius:25,
    },
    addTwo: {
        flex:6
    },
    lNameO: {
        fontSize:10,
        color:'#000000',
        marginTop:8
    },
    lNameT: {
        fontSize:11,
        color:'#898989'
    },
    lNameS: {
        fontSize:9,
        color:'#898989',
        marginTop:3
    },
    addThree: {
        flex:2,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guanzhu: {
        fontSize:13,
        color:'#ffffff',
        backgroundColor:'#AB82FF',
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:6
    },
    lClose: {
        fontSize:13,
        color:'#898989',
        backgroundColor:'#ffffff',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:5,
        fontWeight:'700'
    },
    myCommit: {
        backgroundColor:'#FFFAFA',
        paddingBottom:70,
        paddingTop:50,
        justifyContent: 'center',
        alignItems: 'center',
        width:deviceWidth
    },
    myCommits: {
        backgroundColor:'#FFFAFA',
        // paddingBottom:70,
        // paddingTop:50,
        width:deviceWidth,
    },
    addLogo: {

    },
    titleName: {
        fontSize:18,
        color:'#000000',
        marginTop:20
    },
    titleMsg: {
        fontSize:12,
        color:'#000000',
        marginTop:20
    },
    max: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor:'#ffffff',
    },
    comTab: {
        flexDirection:'row',
        marginTop:10
    },
    comLeft: {
        // flex:1,
        paddingTop:6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:5,
    },
    comRight: {
        // flex:1,
        paddingTop:6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:5,
    },
    comNum: {
        fontSize:12,
        color:'#898989',
        
    },
    comText: {
        fontSize:10,
        color:'#898989',
        paddingTop:2
    },
    changBottomColor: {
        borderBottomColor:'#000000',
        borderBottomWidth:1
    },
    changColor: {
        color:'#000000'
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
    perItem: {
        paddingBottom:70,
        paddingTop:50,
    }
});
