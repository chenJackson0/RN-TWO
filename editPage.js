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
    ScrollView
} from 'react-native';

 //引用插件
import Header from './component/editPageHeads'
// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker'
import Constants from './global.js'
import getFetch from './service/index.js'
import ConfirmationWindow from './component/confirmationWindow'
const photoOptions = {
    title:'请选择',
    quality: 0.8,
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
 export default class EditPage extends Component {
  constructor(props) {
   super(props);
    this.state = {
            title : '编辑主页',
            avatarSource: 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
            userName:'',
            account : '',
            webSite : '',
            personalResume : '',
            email : '',
            phone : '',
            sex : '',
            confirmationWindowFlag : false,
            confirmationWindowFlagData : [
                {
                    title : '保存此次编辑?',
                    leftT : '不保存',
                    rightT : '保存',
                    type : 'cancel'
                }
            ],
        }
    }
    getUserEdit = async () => {
        const { navigation } = this.props;
        let account = navigation.getParam("account")
        let getFetchData = await getFetch.selectPerUser({userName : account})
        if(getFetchData.code == 200){
            this.setState({
                avatarSource : getFetchData.userMessage.img,
                userName:getFetchData.userMessage.nickName,
                account : getFetchData.userMessage.userName,
                webSite : getFetchData.userMessage.webSite,
                personalResume : getFetchData.userMessage.personalResume,
                email : getFetchData.userMessage.email,
                phone : getFetchData.userMessage.phone,
                sex : getFetchData.userMessage.sex,
            })
        }else if(getFetchData.code == 400){

        }else{
            
        }
    }
    //注册通知
    componentWillMount(){
        this.Is_GoodsRefreshed = [this.props.navigation.addListener('willFocus', () => this.getUserEdit())]; //BottomTab路由改变时增加读取数据的监听事件 
    }
    //获取手机相册
    choosePicker=()=>{
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
               
            }
            else if (response.error) {
                
            }
            else if (response.customButton) {
                
            }
            else {
                let source = response.uri;            
                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    //返回
    goBackPage = () =>{
        this.setState({
            confirmationWindowFlag : true
        })
    }
    //编辑时,点击不保留按钮
    noKeep = () => {
        const { navigation } = this.props;
        this.props.navigation.goBack()
    }
    //编辑发时,点击保留按钮没,继续编辑
    keep = () => {
        this.setState({
            confirmationWindowFlag : false,
        })
    }
    //个人信息退出编辑时确定
    confirmationWindowF = () => {
        if(this.state.confirmationWindowFlag){
            return(
                <ConfirmationWindow confirmationWindowFlagData = {this.state.confirmationWindowFlagData} noKeep = {this.noKeep.bind(this)} keep = {this.keep.bind(this)}/>
            )
        }else{
            return
        }
    }
    //编辑完成提交
    successSet = async () =>{
        let data = {
            userName : this.state.account,
            nickName : this.state.userName ? this.state.userName : '',
            img : this.state.avatarSource,
            webSite : this.state.webSite ? this.state.webSite : '',
            personalResume : this.state.personalResume ? this.state.personalResume : '',
            email : this.state.email ? this.state.email : '',
            phone : this.state.phone ? this.state.phone : '',
            sex : this.state.sex ? this.state.sex : ''
        }
        var editPerUser = await getFetch.editPerUser(data)
        let updataPublishList = await getFetch.workPerImg({userName : this.state.account,img:this.state.avatarSource,nickName:this.state.userName})
        if(editPerUser.code == 200 || updataPublishList.code == 200){
            const { navigation } = this.props;
            this.props.navigation.goBack()
        }else if(editPerUser.code == 400 || updataPublishList.code == 400){
            alert(editPerUser.message)
        }else{
            alert(editPerUser.message)
        }
    }
    render() {
        return(
            <View style = {styles.max}>
                <Header title = {this.state.title} goBackPage = {this.goBackPage.bind(this)} successSet = {this.successSet.bind(this)}/>
                <View style = {styles.editHead}>
                    <Image source={{uri :this.state.avatarSource}} style = {styles.editImg} />
                    <Text style = {styles.changeT} onPress = {this.choosePicker.bind(this)}>更换头像</Text>
                </View>
                <View style = {styles.inputMsg}>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>昵称</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                onChangeText={(userName) => {
                                    this.setState({
                                        userName : userName
                                    })
                                }}
                                value={this.state.userName}
                                autoCapitalize = "none"
                                placeholder = "用户名"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>账号</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                editable = {false}
                                onChangeText={(account) => {
                                    this.setState({
                                        account : account
                                    })
                                }}
                                value={this.state.account}
                                autoCapitalize = "none"
                                placeholder = "账号"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>网站</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                onChangeText={(webSite) => {
                                    this.setState({
                                        webSite : webSite
                                    })
                                }}
                                value={this.state.webSite}
                                autoCapitalize = "none"
                                placeholder = "网站"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>个人简介</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                onChangeText={(personalResume) => {
                                    this.setState({
                                        personalResume : personalResume
                                    })
                                }}
                                value={this.state.personalResume}
                                autoCapitalize = "none"
                                placeholder = "个人简介"
                                maxLength = {50}
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>邮箱</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                onChangeText={(email) => {
                                    this.setState({
                                        email : email
                                    })
                                }}
                                value={this.state.email}
                                autoCapitalize = "none"
                                placeholder = "邮箱"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>电话</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                onChangeText={(phone) => {
                                    this.setState({
                                        phone : phone
                                    })
                                }}
                                value={this.state.phone}
                                maxLength = {11}
                                autoCapitalize = "none"
                                placeholder = "电话"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                    <View style = {styles.perInput}>
                        <View style = {styles.inputLeft}>
                            <Text style = {styles.leftT}>性别</Text>
                        </View>
                        <View style = {styles.inputRight}>
                            <TextInput
                                style = {styles.inputText}
                                onChangeText={(sex) => {
                                    this.setState({
                                        sex : sex
                                    })
                                }}
                                value={this.state.sex}
                                maxLength = {1}
                                autoCapitalize = "none"
                                placeholder = "性别"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                </View>
                <View style = {[styles.opacityBg,this.state.confirmationWindowFlag ? styles.showopacityBg : '']} ></View>
                {this.confirmationWindowF()}
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
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
    inputMsg: {
        paddingLeft:13,
        paddingRight:13,
        paddingBottom:15
    },
    perInput: {
        flexDirection:'row',
    },
    inputLeft: {
        flex:2,
        paddingTop:13,
        paddingBottom:13
    },
    leftT: {
        fontSize:14,
        color:'#333333'
    },
    inputRight: {
        flex:6,
        borderBottomColor:'#EDEDED',
        borderBottomWidth:1,
        paddingTop:13,
        paddingBottom:13
    },
    inputText: {
        fontSize:14,
        color:'#333333'
    },
    max: {
        flex :1
    },
    editHead: {
        paddingTop:15,
        paddingBottom:14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f8f8f8',
        borderBottomColor:'#EDEDED',
        borderBottomWidth:1
    },
    editImg: {
        width:80,
        height:80,
        borderRadius:40
    },
    changeT: {
        fontSize:13,
        color:'#B23AEE',
        paddingTop:14
    }
});