import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
global.deviceWidth = Dimensions.get('window').width
export default class PublishedHeads extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    };
    getPublishedF = () => {
        let data = this.props.publishedF()
    }
    render() {
        return (
            <View style={styles.max}>
                <View style={styles.headerP}>
                    <Text style={styles.cencal} onPress={() => {
                        this.props.goBackPage()
                    }}>取消</Text>
                </View>
                <View style={styles.headerT}>
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
                <View style={styles.headerV}>
                    <Text style={styles.ok} onPress={this.getPublishedF.bind(this)}>发表</Text>
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
        width: 32,
        marginLeft: 25,
        marginRight: 30,
    },
    cencal: {
        fontSize: 15,
        color: '#898989'
    },
    headerT: {
        width: 236,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ok: {
        fontSize: 15,
        color: '#B23AEE'
    },
    headerV: {
        width: 32,
        marginRight: 20,
        marginLeft: 15,
    },
});
