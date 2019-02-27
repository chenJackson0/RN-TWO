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
export default class ComList extends Component{

  constructor(props){
      super(props)
      this.state = {
        title : '用户列表',
        changeBcolor : true,
        addCommentItem : [{
            data: [{img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '花样年画 / HARU',nameT : 'HARU',commeName : 'kanon_fukuda',addCommentNum : 2,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雾里看花 / HI',nameT : 'HI',commeName : 'evliac_kio',addCommentNum : 1,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雪中送腿 / FA',nameT : 'FA',commeName : 'alian_li',addCommentNum : 4,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '春夏秋冬 / SHYUANF',nameT : 'SHYUANF',commeName : 'fames_si',addCommentNum : 5,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '别来无恙 / HAO',nameT : 'HAO',commeName : 'li_shuai',addCommentNum : 3,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '换看春秋 / WEI',nameT : 'WEI',commeName : 'kang_wei',addCommentNum : 1,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '人来人往 / KAN',nameT : 'KAN',commeName : 'jacksonChen',addCommentNum : 9,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '花样年画 / HARU',nameT : 'HARU',commeName : 'kanon_fukuda',addCommentNum : 2,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雾里看花 / HI',nameT : 'HI',commeName : 'evliac_kio',addCommentNum : 1,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雪中送腿 / FA',nameT : 'FA',commeName : 'alian_li',addCommentNum : 4,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '春夏秋冬 / SHYUANF',nameT : 'SHYUANF',commeName : 'fames_si',addCommentNum : 5,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '别来无恙 / HAO',nameT : 'HAO',commeName : 'li_shuai',addCommentNum : 3,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '换看春秋 / WEI',nameT : 'WEI',commeName : 'kang_wei',addCommentNum : 1,focusOn :'关注',focusOnFlag : true},
            {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '人来人往 / KAN',nameT : 'KAN',commeName : 'jacksonChen',addCommentNum : 9,focusOn :'关注',focusOnFlag : true}]
        }],
        fadeAnim: new Animated.Value(375),
      }
  }
  //页面加载获取前一个页面传来的list
  componentWillMount = () => {
    const { navigation } = this.props;
    this.setState({
        list : navigation.getParam("list")
    })
  };
  //加载推荐用户
  addPerItem = ({item,index}) =>{
    return (
     <View style = {styles.addList} key = {index}>
       <View style = {styles.addOne}>
           <Image source={{uri:item.img}} style = {styles.addListImg} />
       </View>
       <View style = {styles.addTwo}>
           <Text style = {styles.lNameO}>{item.name}</Text>
           <Text style = {styles.lNameT}>{item.nameT}</Text>
           <Text style = {styles.lNameS}>{item.commeName}和其他{item.addCommentNum}位用户关注了</Text>
       </View>
       <View style = {styles.addThree}>
           <Text style = {[styles.guanzhu,item.focusOnFlag ? '' : styles.changeaddPerButtonBg]} onPress = {this.focusOn.bind(this,index)}>{item.focusOn}</Text>
           <Text style = {styles.lClose} onPress = {this.closeCommentItem.bind(this,index)}>X</Text>
       </View>
    </View>
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
  focusOn = (j) => {
    for(let i = 0;i<this.state.addCommentItem[0].data.length;i++){
        if(this.state.addCommentItem[0].data[i].focusOnFlag){
            if(i == j){
                this.state.addCommentItem[0].data[i].focusOn = '已关注'
                this.state.addCommentItem[0].data[i].focusOnFlag = false
            }
        }else{
            if(i == j){
                this.state.addCommentItem[0].data[i].focusOn = '关注'
                this.state.addCommentItem[0].data[i].focusOnFlag = true
            }
        }
    }
    this.setState({
        addCommentItem : this.state.addCommentItem
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
  render() {
    let {fadeAnim}  = this.state;
    return (
        <View style = {styles.max}>
           <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)}/>
           <View style = {styles.comTab}>
                <TouchableOpacity style = {styles.touchLeft} onPress = {this.changeTab.bind(this,0)}>
                    <View style = {[styles.comLeft,this.state.changeBcolor ? styles.changBottomColor : '']}>
                        <Text style = {[styles.comNum,this.state.changeBcolor ? styles.changColor : '']}>0</Text>
                        <Text style = {[styles.comText,this.state.changeBcolor ? styles.changColor : '']}>粉丝</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.touchRight} onPress = {this.changeTab.bind(this,1)}>
                    <View style = {[styles.comRight,this.state.changeBcolor ? '' :styles.changBottomColor]}>
                        <Text style = {[styles.comNum,this.state.changeBcolor ? '' : styles.changColor]}>10</Text>
                        <Text style = {[styles.comText,this.state.changeBcolor ? '' : styles.changColor]}>已关注</Text>
                    </View>
                </TouchableOpacity>
           </View>
           <View style = {styles.animates}>
                <View style = {styles.myCommit}>
                        <AntDesign name = {'wechat'} size = {40} color = {'black'} style = {styles.addLogo} />
                        <Text style = {styles.titleName}>粉丝</Text>
                        <Text style = {styles.titleMsg}>这里会显示所有关注你的用户.</Text>
                </View>
                <Animated.View style = {[styles.myCommit,styles.myCommitT,{left:fadeAnim}]}>
                    <AntDesign name = {'wechat'} size = {40} color = {'black'} style = {styles.addLogo} />
                    <Text style = {styles.titleName}>关注的用户</Text>
                    <Text style = {styles.titleMsg}>这里会显示您关注的所有用户.</Text>
                </Animated.View>
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
                    sections={
                        this.state.addCommentItem
                    }>
                </SectionList>
           </View>
           </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    animates: {
        position:'relative'
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
        width:50,
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
        width:200,
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
        width:91,
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
    }

});
