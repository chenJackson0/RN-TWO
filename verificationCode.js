/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, Button } from 'react-native';

global.deviceWidth = Dimensions.get('window').width

export default class VerificationCode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phoNumber: '',
            code: '',
            newCode: '',
            flag: false,
            codeMsg: '获取验证码',
            dis: false
        }
    };
    timeCode = null
    //页面加载获取前一个页面传来的手机号码
    componentWillMount = () => {
        const { navigation } = this.props;
        this.setState({
            phoNumber: navigation.getParam("telNumber")
        })
    };
    //销毁计时器
    componentWillUnmount = () => {
        clearInterval(this.timeCode)
    }
    //检验验证码是否正确并跳转
    setPassWord = () => {
        const { navigation } = this.props;
        if (this.state.code === '') {
            alert("验证码不能为空!")
            return
        }
        if (this.state.flag) {
            if (this.state.code === this.state.newCode) {
                this.props.navigation.navigate('SetPassWord', {
                    account: this.state.phoNumber
                })
            } else {
                alert("验证码不正确")
            }
        } else {
            this.props.navigation.navigate('SetPassWord', {
                account: this.state.phoNumber
            })
        }
    };
    //输入框获取焦点时
    foucs = () => {
        this.setState({
            flag: true
        })
    };
    //输入框值改变时
    getCode = (newCode) => {
        this.setState({
            newCode: newCode
        })
    };
    //获取验证码
    getcodeNumber = () => {
        let min = 60;
        let getC = ''
        if (!this.state.dis) {
            for (let i = 0; i < 3; i++) {
                getC += Math.round(Math.random() * 9) + getC
            }
            this.setState({
                code: getC,
                newCode: getC,
            })
            this.timeCode = setInterval(() => {
                min--
                this.setState({
                    codeMsg: '(' + min + '秒)后重发',
                    dis: true
                })
                if (min == 0) {
                    this.setState({
                        codeMsg: '重新获取验证码',
                        dis: false
                    })
                    clearInterval(this.timeCode)
                }
            }, 1000)
        }
    };
    render() {
        return (
            <View style={styles.max}>
                <View style={styles.title}>
                    <Text style={styles.titleMsg}>点击获取验证码按钮,请查看手机,在下面输入框中输入来自账号为{this.state.phoNumber}的的短信验证码</Text>
                </View>
                <View style={styles.number}>
                    <TextInput
                        ref="code"
                        style={styles.code}
                        onFocus={this.foucs.bind(this)}
                        onChangeText={this.getCode.bind(this)}
                        value={this.state.flag ? this.state.newCode : this.state.code}
                        placeholder='验证码'
                        maxLength={7}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        keyboardType='numeric'
                    />
                    <Text style={styles.codeLine}></Text>
                    <Text style={styles.getCode} onPress={this.getcodeNumber.bind(this)}>{this.state.codeMsg}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.setPassWord.bind(this)}>
                    <Text style={styles.buttonText}>下一步</Text>
                </TouchableOpacity>
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
    title: {
        marginTop: 10
    },
    titleMsg: {
        fontSize: 14,
        color: '#999999',
    },
    number: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 5
    },
    codeLine: {
        height: 30,
        width: 1,
        backgroundColor: "#dddddd"
    },
    code: {
        fontSize: 13,
        color: '#000000',
        flex: 2,
        paddingLeft: 5,
    },
    getCode: {
        fontSize: 11,
        color: '#B23AEE',
        flex: 1,
        textAlign: 'center',
        paddingTop: 8.5,
        paddingBottom: 8.5,
    },
    button: {
        height: 38,
        backgroundColor: '#87CEFA',
        borderRadius: 5,
        color: '#ffffff',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14
    },
});
