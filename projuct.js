//czg data 2019-02-19
import React, { Component } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    SectionList,
    ScrollView,
    TextInput,
    TouchableOpacity,
    UIManager,
    findNodeHandle,
    Easing,
} from 'react-native';

//引用插件
import Header from './component/projectBackHeades'
// 取得屏幕的宽高Dimensions
global.ScreenWidth = Dimensions.get('window').width
global.ScreenHeight = Dimensions.get('window').height
import Video from 'react-native-video';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import getFetch from './service/index.js'
class ProjectList extends Component {
    addCard(i, item) {
        var cut = this.refs[i];
        this.props.updateParentState(cut, item);
    };

    render() {
        return (
            <View style={styles.projectRightList} ref={this.props.refIndex}>
                <View style={styles.ProjectImg}>
                    <Image style={styles.img} source={{ uri: this.props.data.img ? this.props.data.img : '......' }} />
                </View>
                <View style={styles.ProjectMessage}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{this.props.data.name}</Text>
                    <Text style={styles.price}>¥{this.props.data.price}.00</Text>
                    <View style={styles.addCart}>
                        <Text style={styles.number}>销量 : {this.props.data.sales}</Text>
                        <EvilIcons name={'cart'} size={30} color={'#cccccc'} style={styles.cart} onPress={this.addCard.bind(this, this.props.refIndex, this.props.data)} />
                    </View>
                </View>
            </View>
        )
    };
};
export default class Projuct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '礼品列表',
            projectTitleData: [],//礼品大类
            projectData: [], //礼品列表
            index: 0,
            animateBtnX: 0,
            animateBtnY: -999,
            addBtnY: -999,
            addBtnX: 0,
            runAnim: new Animated.Value(0),
            endX: 310,// 购物车的位置 在距屏幕的左侧26像素
            endY: 65, // 购物车的位置 在距屏幕的底部44像素
            curvature: .003, // 动画抛高系数，值越大抛的越高
            duration: 800, // 动画运动时间
            springValue: new Animated.Value(0),
            number: 0,
            addCartData: [],
            userName: ''
        }
    }
    //绑定监听事件
    showProjuct = async (type) => {
        let data = {
            type: type
        }
        this.setState({
            // projectData : [],
            index: 0
        })

        const { navigation } = this.props;
        let userName = navigation.getParam("userName")
        let userData = {
            userName: userName
        }
        let projectData = await getFetch.projectlist(data)
        let getShoppingCartData = await getFetch.getShoppingCart(userData)
        if (projectData.code == 200 && getShoppingCartData.code == 200) {
            this.init(projectData.projectlist, projectData.projectTitle, getShoppingCartData.number)
        } else if (projectData.code == 400 && getShoppingCartData.code == 400) {
            alert(projectData.message)
        } else {
            alert(projectData.message)
        }
    }
    //注册通知
    componentWillMount() {
        this.addPublisedList = [this.props.navigation.addListener('willFocus', () => this.showProjuct())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //加载数据
    init = (projectlist, projectTitle, number) => {
        const { navigation } = this.props;
        let userName = navigation.getParam("userName")
        this.setState({
            projectData: projectlist,
            projectTitleData: projectTitle,
            userName: userName,
            number: number
        })
    }


    //返回
    goBackPage = () => {
        const { navigation } = this.props;
        this.props.navigation.goBack()
    }
    //点击不同的按钮获取不同的礼品列表
    changeProject = (index, type) => {
        this.showProjuct(type)
        this.setState({
            index: index
        })
    }
    //添加购物车
    getScreenXY = (cut, item) => {
        const handle = findNodeHandle(cut);
        UIManager.measure(handle, async (x, y, width, height, pageX, pageY) => {
            let data = item
            let pos = [pageX, pageY, this.state.endX, this.state.endY]
            this.setState({
                addBtnY: pageY,
                addBtnX: pageX
            })
            shoppingCartData = data
            shoppingCartData.userName = this.state.userName
            shoppingCartData.number = 1
            let shoppingCartData = await getFetch.shoppingCart(shoppingCartData)
            if (shoppingCartData.code == 200) {
                this.run(pos, data)
            } else if (shoppingCartData.code == 400) {
                alert(shoppingCartData.message)
            } else {
                alert(shoppingCartData.message)
            }

        })
    };
    //运行动画
    run(position = [], data = {}) {
        if (position.length != 4) {
            return
        }
        this.state.runAnim.setValue(0)
        const { inputRange, outputX, outputY } = this.getPaths(position)
        this.setState({
            animateBtnX: this.state.runAnim.interpolate({
                inputRange: inputRange, outputRange: outputX
            }),
            animateBtnY: this.state.runAnim.interpolate({
                inputRange: inputRange, outputRange: outputY
            })
        })
        Animated.timing(this.state.runAnim, {
            toValue: inputRange.length,
            duration: this.state.duration,
            easing: Easing.linear // 缓动函数
        }).start(() => {
            this.state.runAnim.setValue(0)
            this.state.springValue.setValue(0);
            Animated.spring(
                this.state.springValue,
                {
                    toValue: 1,
                    firction: 1
                }).start();
            if (this.state.number + 1 > 99) {
                this.state.number = '99+'
            } else {
                this.state.number = this.state.number + 1
            }
            this.setState({
                addBtnY: -999,
                addBtnX: 0,
                number: this.state.number
            })
        })
    };
    // 获得路径
    getPaths(position) {
        const [startX, startY, endX, endY] = position
        const { curvature } = this.state, speed = 500//166.67
        let diffX = endX - startX,
            diffY = endY - startY;
        let b = (diffY - curvature * diffX * diffX) / diffX,
            start_x = 0,
            rate = diffX > 0 ? 1 : -1,
            inputRange = [], outputX = [], outputY = [];
        let step = () => {
            let tangent = 2 * curvature * start_x + b;
            start_x = start_x + rate * Math.sqrt(speed / (tangent * tangent + 1));
            if ((rate == 1 && start_x > diffX) || (rate == -1 && start_x < diffX)) {
                start_x = diffX;
            }
            let x = start_x, y = curvature * x * x + b * x;
            inputRange.push(outputX.length)
            outputX.push(x)
            outputY.push(y)
            if (start_x !== diffX) {
                step()
            }
        }
        step()
        return { inputRange, outputX, outputY }
    };
    //礼品title
    projectTitle = ({ item, index }) => {
        return (
            <Text style={[styles.leftTitle, index == this.state.index ? styles.clickLeftTitle : '']} onPress={this.changeProject.bind(this, index, item.type)}>{item.title}</Text>
        )
    }
    //礼品列表
    projectList = ({ item, index }) => {
        return (
            <ProjectList data={item} refIndex={index} updateParentState={this.getScreenXY.bind(this)} />
        )
    }
    //跳购物车列表
    goShopping = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('CartShopping', {
            userName: this.state.userName
        })
    }
    render() {
        const springBig = this.state.springValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.5, 1]
        });
        return (
            <View style={styles.max}>
                <Header title={this.state.title} goBackPage={this.goBackPage.bind(this)} springBig={springBig} number={this.state.number} goShopping={this.goShopping.bind(this)} />
                <View style={styles.perList}>
                    <View style={styles.proLeft}>
                        <SectionList ref="a"
                            renderItem={this.projectTitle}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item + index}
                            sections={[{ data: this.state.projectTitleData }]}
                        />
                    </View>
                    <View style={styles.proRight}>
                        <SectionList
                            renderItem={this.projectList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item + index}
                            sections={[{ data: this.state.projectData }]}
                        />
                    </View>
                </View>
                <Animated.View style={[styles.tmpBtn, {
                    top: this.state.addBtnY,
                    left: this.state.addBtnX,
                    transform: [
                        { translateX: this.state.animateBtnX },
                        { translateY: this.state.animateBtnY },
                    ]
                }]}>
                    <View style={{ width: 20, height: 20, backgroundColor: "#000000", borderRadius: 20 }}></View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tmpBtn: {
        position: "absolute",
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 20
    },
    max: {
        flex: 1
    },
    proLeft: {
        width: 120,
        backgroundColor: '#f2f2f2',
    },
    proRight: {
        width: 255
    },
    perList: {
        flexDirection: 'row',
        paddingBottom: 68,
        minHeight: ScreenHeight
    },
    leftTitle: {
        fontSize: 15,
        color: '#898989',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    clickLeftTitle: {
        backgroundColor: '#000000',
        color: '#ffffff'
    },
    projectRightList: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    ProjectImg: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
        marginLeft: 0
    },
    img: {
        flex: 1
    },
    ProjectMessage: {
        marginLeft: 10,
        width: 140,
    },
    title: {
        fontSize: 15,
        color: '#000000',
        paddingTop: 10,
        paddingRight: 10,
    },
    price: {
        fontSize: 14,
        color: 'red',
        paddingTop: 10
    },
    number: {
        fontSize: 13,
        color: '#333333',
        paddingTop: 10,
        flex: 2
    },
    cart: {
        textAlign: 'right',
        flex: 1
    },
    addCart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});