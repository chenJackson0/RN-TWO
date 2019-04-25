import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
global.deviceWidth = Dimensions.get('window').width
export default class PersonalCenterHeads extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    };

    render() {
        return (
            <View style={styles.max}>
                <View style={styles.headerP}>
                    {/* <SimpleLineIcons name = {'camera'} size = {22} color = {'black'} onPress = {()=>{
                    this.props.choosePicker()
                }}/> */}
                </View>
                <View style={styles.headerT}>
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
                <View style={styles.headerV}>
                    <EvilIcons name={'navicon'} size={30} color={'black'} onPress={() => {
                        this.props.showMenuBar()
                    }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    headerP: {
        width: 22,
        height: 22,
        marginLeft: 25,
        marginRight: 30,
    },
    cencal: {
        height: 22,
        color: '#898989'
    },
    headerT: {
        width: 248,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ok: {
        fontSize: 15,
        color: '#B23AEE'
    },
    headerV: {
        width: 30,
        height: 22,
        marginRight: 20,
        marginLeft: 15,
    },
});
