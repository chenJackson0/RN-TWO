//czg data 2019-02-19
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    SectionList,
    PanResponder
} from 'react-native';
global.addFlag = true
global.reductionFlag = true
 //引用插件
import Header from './component/backHeads'
// 取得屏幕的宽高Dimensions
global.ScreenWidth = Dimensions.get('window').width
global.ScreenHeight = Dimensions.get('window').height
import getFetch from './service/index.js'
export default class Projuct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '购物车',
            number : 0,
            userName : '',
            cartData : [],
            cartFlag : false,
            changeNumberFlag : false,
            index : -1
        }
    }
    //绑定监听事件
    showProjuct = async (type) => {
        const { navigation } = this.props;
        let userName = navigation.getParam("userName")
        let data = {
            userName : userName
        }
        this.setState({
            cartData : [],
        })
        let getShoppingCartData = await getFetch.getShoppingCart(data)
        if(getShoppingCartData.code == 200){
            this.init(getShoppingCartData.cartData)
        }else if(getShoppingCartData.code == 400){
            alert(getShoppingCartData.message)
        }else{
            alert(getShoppingCartData.message)
        }
    }
    //注册通知
    componentWillMount (){
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.showProjuct())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //加载数据
    init = (cartData) => {
        if(cartData.length != 0){
            this.setState({
                cartData : cartData
            })
        }else{
            this.setState({
                cartFlag : true
            })
        }
    }
    //数量减
    reduction = (number,index) => {
        if(reductionFlag){
            this.setState({
                number : number - 1,
                index : index,
                changeNumberFlag : true
            })
            reductionFlag = false
        }else{
            this.setState({
                number : this.state.number - 1,
                index : index
            })
        }
    }
    //数量加
    add = (number,index) => {
        if(addFlag){
            this.setState({
                number : number + 1,
                index : index,
                changeNumberFlag : true
            })
            addFlag = false
        }else{
            this.setState({
                number : this.state.number + 1,
                index : index
            })
        }
    }
    cartList = ({item,index}) => {
        return(
            <View style={styles.projectRightList}>
                <View style = {styles.ProjectImg}>
                    <Image style = {styles.img} source = {{uri : item.img ? item.img : '......'}}/>
                </View>
                <View style = {styles.ProjectMessage}>
                    <Text style = {styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                    <Text style = {styles.price}>¥{item.price}.00</Text>
                    <View style = {styles.addCart}>
                        <Text style = {styles.number}>销量 : {item.number}</Text>
                        <View style = {styles.addNumber}>
                            <Text style = {styles.reduction} onPress = {this.reduction.bind(this,item.number,index)}>-</Text>
                            {/* <TextInput
                                   ref = {index}
                                    style = {styles.inputText}
                                    onChangeText={(number) => {
                                        this.setState({
                                            number : number,
                                            changeNumberFlag : true
                                        })
                                    }}
                                    value={this.state.index == index ? this.state.number.toString() : item.number.toString()}
                                    autoCapitalize = "none"
                                    // clearButtonMode = "while-editing"
                            /> */}
                            <Text style = {styles.inputText}>
                                {this.state.changeNumberFlag ? this.state.number : item.number}
                            </Text>
                            <Text style = {styles.add} onPress = {this.add.bind(this,item.number,index)}>+</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    //返回
    goBackPage = () =>{
        const { navigation } = this.props;
        this.props.navigation.goBack()
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)}/>
                <View style={styles.perList}>
                    <View style = {styles.proRight}>
                        <SectionList
                            renderItem={this.cartList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor = {(item,index) => item + index}
                            sections={[{data:this.state.cartData}]}
                        />
                    </View>
                </View>
                <View style = {styles.maxPirce}>
                    <Text style = {styles.maxP}>
                        总价 : ¥999.00
                    </Text>
                    <Text style = {styles.maxNum}>
                        结算 (99)
                    </Text>
                </View>
            </View>
        )
    }
}

 const styles = StyleSheet.create({
    tmpBtn: {
        position: "absolute",
        backgroundColor:'red',
        width:20,
        height:20,
        borderRadius:20
    },
    max : {
        flex:1
    },
    proLeft :{
        width:120,
        backgroundColor:'#dddddd',
    },
    proRight:{
        flex:1
    },
    perList :{
        flexDirection:'row',
        paddingBottom:118,
        minHeight : ScreenHeight
    },
    leftTitle : {
        fontSize:15,
        color:'#898989',
        textAlign:'center',
        paddingTop:10,
        paddingBottom:10,
    },
    clickLeftTitle : {
        backgroundColor:'#666666',
        color:'#ffffff'
    },
    projectRightList : {
        flexDirection:'row',
        marginBottom:10,
    },
    ProjectImg:{
        width:100,
        height:100,
        borderWidth:1,
        borderColor:'#cccccc',
        marginLeft:0
    },
    img:{
        flex:1
    },
    ProjectMessage:{
        marginLeft:10,
        width:250
    },
    title:{
        fontSize:15,
        color:'#000000',
        paddingTop:10,
        paddingRight:10,
    },
    price:{
        fontSize:14,
        color:'red',
        paddingTop:10
    },
    number:{
        fontSize:13,
        color:'#333333',
        paddingTop:10,
        flex:1
    },
    cart:{
        textAlign:'right',
        flex:1
    },
    addCart:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addNumber:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#dddddd',
        borderWidth:1,
        borderRadius:4
    },
    reduction : {
        textAlign:'center',
        fontSize:14,
        color:'#898989',
        width:30,
        height:25,
        borderRightWidth:1,
        borderRightColor:'#dddddd',
        lineHeight:25,
        backgroundColor:'#dddddd'
    },
    inputText:{
        width:50,
        // height:25,
        textAlign:'center',
        fontSize:15,
        color:'#000000',
    },
    add:{
        textAlign:'center',
        fontSize:14,
        color:'#898989',
        width:30,
        height:25,
        borderLeftWidth:1,
        borderLeftColor:'#dddddd',
        lineHeight:25,
        backgroundColor:'#dddddd'
    },
    maxPirce:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#ffffff',
        borderTopColor:'#dddddd',
        borderTopWidth:1,
        position:'absolute',
        left:0,
        bottom:0
    },
    maxP:{
        fontSize:13,
        color:'#898989',
        textAlign:'left',
        width:275,
        paddingLeft:15
    },
    maxNum:{
        width:120,
        fontSize:15,
        height:50,
        color:'#ffffff',
        textAlign:'center',
        backgroundColor:'red',
        lineHeight:50
    }
});