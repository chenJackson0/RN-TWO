//czg data 2019-02-19
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    RefreshControl,
    ScrollView
} from 'react-native';

// 取得屏幕的宽高Dimensions
const { ScreenWidth, height } = Dimensions.get('window');
export default class ConfirmationWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: this.props.confirmationWindowFlagData[0].title,
                    leftT: this.props.confirmationWindowFlagData[0].leftT,
                    rightT: this.props.confirmationWindowFlagData[0].rightT,
                    type: this.props.confirmationWindowFlagData[0].type,
                }
            ]
        }
    }
    componentWillMount = () => {

    }
    //编辑发布作品时,点击不保留按钮
    noKeep = () => {
        if (this.state.data[0].type == 'cancel') {
            this.props.noKeep()
        } else if (this.state.data[0].type == 'delImg') {
            this.props.noDeleteImg()
        } else if (this.state.data[0].type == 'delete') {
            this.props.noDelete()
        }
    }
    //编辑发布作品时,点击保留按钮没,继续编辑
    keep = () => {
        if (this.state.data[0].type == 'cancel') {
            this.props.keep()
        } else if (this.state.data[0].type == 'delImg') {
            this.props.yesDeleteImg()
        } else if (this.state.data[0].type == 'delete') {
            this.props.deleteI()
        }
    }
    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.contBottom}>
                    <Text style={styles.contBottomText}>{this.state.data[0].title}</Text>
                </View>
                <View style={styles.contTop}>
                    <View style={styles.contTopLeft}>
                        <Text style={styles.contTopLefts}
                            onPress={this.noKeep.bind(this)}
                        >
                            {this.state.data[0].leftT}
                        </Text>
                    </View>
                    <View style={styles.contTopRight}>
                        <Text style={styles.contTopRights}
                            onPress={this.keep.bind(this)}
                        >
                            {this.state.data[0].rightT}
                        </Text>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    cont: {
        position: 'absolute',
        width: '80%',
        left: '10%',
        top: '50%',
        marginTop: -38,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    contTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contTopLeft: {
        flex: 1,
        borderRightColor: '#EDEDED',
        borderRightWidth: 1,
    },
    contTopLefts: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    contTopRight: {
        flex: 1,
    },
    contTopRights: {
        flex: 1,
        fontSize: 14,
        color: '#B23AEE',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    contBottom: {
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
        paddingTop: 30,
        paddingBottom: 30,
    },
    contBottomText: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'center'
    }
});