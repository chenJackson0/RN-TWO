//czg data 2019-02-19
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    SectionList,
    TouchableOpacity
} from 'react-native';

 //引用插件
import Header from './component/reachHeads'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Constants from './global.js'
import getFetch from './service';
 export default class Rearch extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '搜索',
            reactInputT : '',
            changeBcolor : true,
            addCommentItem : [],
            user : '',
            onTFlag : false,
        }
    }
    //绑定事件
    rearchList = () => {
        this.init()
    }
    //注册通知
    componentWillMount(){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.rearchList())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //获取数据
    init = () => {
        const { navigation } = this.props;
        let user = navigation.getParam("perUser") ? navigation.getParam("perUser") : ''
        this.setState({
            user : user,
            onTFlag : false
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
    //点击关注
    focusOn = async (j,name,img) => {
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
        let focusOnIn = await getFetch.focusOn({userName : this.state.user,focusOns:this.state.addCommentItem[deteleFochsIndex].focusOns})
        let fensi = await getFetch.fensi({userName : name,fensi:this.state.addCommentItem[deteleFensiIndex].fensi})
        if(focusOnIn.code == 200 && fensi.code == 200){
            this.setState({
                addCommentItem : this.state.addCommentItem,
            })
        }else if(focusOnIn.code == 400 || fensi.code == 400){

        }else{
            
        }
    }
    //没有关注主播的时候ui
    onF = () => {
        if(this.state.onTFlag){
            return(
                <Text style = {styles.noT} key = {1}>没有找到包含“{this.state.reactInputT}”关键字的主播</Text>
            )
        }
    }
    //搜索
    goToRearch = async () => {
        this.state.addCommentItem = []
        if(this.state.reactInputT){
            let commentsItem = await getFetch.rearch({userName : this.state.reactInputT})
            if(commentsItem.code == 200 && commentsItem.commitList.length!=0){
                this.state.reactInputT = ''
                this.state.onTFlag = false
                this.setState({
                    addCommentItem : commentsItem.commitList,
                    reactInputT : this.state.reactInputT
                })
            }else if(commentsItem.code == 400){
                this.state.onTFlag = true
            }else{
                this.state.onTFlag = true
            }
            this.setState({
                onTFlag : this.state.onTFlag
            })
        }else{
            alert('搜索内容不能为空!')
        }
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title}/>
                <View style = {styles.reactInput}>
                    <EvilIcons name = {'search'} size = {23} color = {'black'} style={styles.seachImg}/>
                    <TextInput
                        style = {styles.reactInputText}
                        onChangeText={(reactInputT) => {
                            this.setState({
                                reactInputT : reactInputT,
                                onTFlag : false
                            })
                        }}
                        value={this.state.reactInputT}
                        placeholder = '请输入您想要查找的主播……'
                        maxLength = {50}
                        autoCapitalize = "none"
                        clearButtonMode = "while-editing"
                    />
                    <Text style={styles.goSearch} onPress = {this.goToRearch.bind(this)}>搜索</Text>
                </View>
                <ScrollView>
                <View style = {styles.addCommList}>
                    {this.onF()}
                        <SectionList style = {styles.sectList}
                            renderItem={this.addPerItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor = {(item,index) => item + index}
                            sections={[{data:this.state.addCommentItem}]}>
                        </SectionList>
                </View>
                </ScrollView>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    max: {
        flex :1
    },
    reactInput: {
        flexDirection:'row',
        paddingTop:15,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#EDEDED',
        borderBottomWidth:1,
        marginTop:3
    },
    seachImg: {
        flex:1
    },
    reactInputText: {
        flex:7,
        fontSize:13,
        color:'#000000'
    },
    goSearch: {
        flex:2,
        fontSize:13,
        color:'#ffffff',
        backgroundColor:'#AB82FF',
        paddingTop:5,
        paddingBottom:5,
        textAlign:'center',
        borderRadius:6,
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
        marginLeft:12,
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
        paddingLeft:2,
        paddingRight:5,
        fontWeight:'700'
    },
    noT: {
        fontSize:13,
        color:'#898989',
        paddingTop:30,
        paddingBottom:20,
        textAlign:'center',
        flex:1
    },
});