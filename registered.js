/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
global.deviceWidth = Dimensions.get('window').width
export default class Registered extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'CN + 86',
            placeholderT: '手机号',
            flag: true,
            telNumber: null
        }
    };
    index = 0
    //点击登录按钮
    login = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Login')
    };

    //切换导航栏
    changeTab = (index) => {
        if (index === 0) {
            this.setState({
                flag: true,
                title: 'CN + 86',
                placeholderT: '手机号',
                telNumber: null
            })
        } else if (index === 1) {
            this.setState({
                flag: false,
                title: 'Email',
                placeholderT: '电子邮箱',
                telNumber: null
            })
        }
        this.index = index
    };

    //点击下一步按钮
    verificationCode = () => {
        const { navigation } = this.props;
        let text;
        let msg;
        if (this.index === 0) {
            text = /^1[3|5|6|7|8|9][0-9]{9}$/;
            msg = '手机号码格式不对,请重新输入'
        } else if (this.index === 1) {
            text = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            msg = '邮箱格式不对,请重新输入'
        }
        if (text.test(this.state.telNumber)) {
            this.props.navigation.navigate('VerificationCode', {
                telNumber: this.state.telNumber
            })
        } else {
            alert(msg)
        }
    };

    //获取输入框中的电话号码
    getPhoNumber = (telNumber) => {
        this.setState({
            telNumber: telNumber
        })
    };
    render() {
        return (
            <View style={styles.max}>
                <View style={styles.tab}>
                    <Text style={[styles.phone, this.state.flag ? styles.changeColor : '']} onPress={this.changeTab.bind(this, 0)}>电话</Text>
                    <Text style={[styles.meai, this.state.flag ? '' : styles.changeColor]} onPress={this.changeTab.bind(this, 1)}>电子邮箱</Text>
                </View>
                <View style={styles.tabl}>
                    <Text style={[styles.phonel, this.state.flag ? styles.changeBgColor : '']}></Text>
                    <Text style={[styles.meail, this.state.flag ? '' : styles.changeBgColor]}></Text>
                </View>
                <View style={styles.inputPhone}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <Text style={styles.line}></Text>
                    <TextInput
                        style={styles.telNumber}
                        onChangeText={this.getPhoNumber.bind(this)}
                        value={this.state.telNumber}
                        placeholder={this.state.placeholderT}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.verificationCode.bind(this)}>
                    <Text style={styles.buttonText}>下一步</Text>
                </TouchableOpacity>
                <View style={styles.msg}>
                    <Text style={styles.msgText}>你可以接收来自Instagram的短信更新,也可以随时退订.</Text>
                </View>
                <View style={styles.registered}>
                    <Text style={styles.registerMsg}>有账户了?</Text>
                    <Text style={styles.registerButton} onPress={this.login.bind(this)}>登录.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    max: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingRight: 30,
        paddingLeft: 30,
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    phone: {
        flex: 1,
        fontSize: 16,
        color: '#999999',
        textAlign: 'center',
        fontWeight: "700",
        paddingBottom: 7,
    },
    meai: {
        flex: 1,
        fontSize: 16,
        color: '#999999',
        paddingBottom: 7,
        textAlign: 'center',
        fontWeight: "700"
    },
    tabl: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phonel: {
        flex: 1,
        height: 1,
        backgroundColor: '#999999'
    },
    changeColor: {
        color: "#000000",
    },
    changeBgColor: {
        backgroundColor: "#000000"
    },
    meail: {
        flex: 1,
        height: 1,
        backgroundColor: '#999999'
    },
    inputPhone: {
        borderColor: '#f2f2f2',
        borderWidth: 1,
        height: 38,
        marginTop: 11,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: 80,
        fontSize: 12,
        color: '#B23AEE',
        textAlign: 'center',
    },
    line: {
        height: 27,
        width: 1,
        backgroundColor: '#dddddd'
    },
    telNumber: {
        fontSize: 12,
        paddingLeft: 15,
        width: 234,
        fontSize: 12
    },
    button: {
        height: 38,
        backgroundColor: '#87CEFA',
        borderRadius: 5,
        color: '#ffffff',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 11
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14
    },
    msg: {
        marginTop: 13,
        alignItems: 'center',
        paddingLeft: 55,
        paddingRight: 55,
    },
    msgText: {
        fontSize: 10,
        color: '#999999',
        textAlign: 'center'
    },
    registered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderColor: '#dddddd',
        borderWidth: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
    },
    registerMsg: {
        fontSize: 12,
        color: '#666666'
    },
    registerButton: {
        fontSize: 12,
        color: '#B23AEE',
        marginLeft: 10
    }
});
