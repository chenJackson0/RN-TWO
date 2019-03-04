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
            sex : ''

        }
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
        const { navigation } = this.props;
        this.props.navigation.goBack()
    }
    //编辑完成提交
    successSet = () =>{
        let data = {
            userImg : this.state.avatarSource,
            userName:this.state.userName,
            account : this.state.account,
            webSite : this.state.webSite,
            personalResume : this.state.personalResume,
            email : this.state.email,
            phone : this.state.phone,
            sex : this.state.sex
        }
        alert(JSON.stringify(data))
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
                            <Text style = {styles.leftT}>姓名</Text>
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
                                autoCapitalize = "none"
                                placeholder = "性别"
                                clearButtonMode = "while-editing"
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
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