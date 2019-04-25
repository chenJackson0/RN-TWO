import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
global.deviceWidth = Dimensions.get('window').width
export default class BackHeads extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    };
    go = () => {
        this.props.goBackPage()
    }
    render() {
        return (
            <View style={styles.max}>
                <View style={styles.headerP}>
                    <AntDesign name={'left'} size={22} color={'black'} />
                </View>
                <View style={styles.headerT}>
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
                <View style={styles.headerV}>

                </View>
                <View style={styles.headerS}>
                    {/* <Feather name = {'shopping-cart'} size = {22} color = {'black'}/> */}
                </View>
                <Text style={styles.goback} onPress={this.go.bind(this)}></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    goback: {
        width: 60,
        height: 30,
        position: 'absolute',
        left: 0,
        top: 40
    },
    max: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingBottom: 6,
        position: 'relative'
    },
    headerP: {
        width: 22,
        height: 22,
        marginLeft: 25,
        marginRight: 30,
    },
    headerT: {
        width: 244,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerV: {
        width: 22,
        height: 22,
        position: "relative"
    },
    cardNumber: {
        fontSize: 10,
        color: 'red',
        width: 30,
        height: 30,
        lineHeight: 30,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 30,
        position: 'absolute',
        top: -4,
        right: -20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    headerS: {
        width: 22,
        height: 22,
        marginRight: 20,
        marginLeft: 15,
    },
    line: {
        flex: 1,
        backgroundColor: 'red'
    }
});
