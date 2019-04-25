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
import ImagePicker from 'react-native-image-picker'
const photoOptions = {
    title: '请选择',
    quality: 0.8,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class VideoImg extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.contTop}>
                    <Text style={styles.contTopLeft} onPress={
                        () => {
                            this.props.getVideo()
                        }
                    }>
                        视频
                        </Text>
                    <Text style={styles.contTopRight}>
                        照片或视频
                        </Text>
                </View>
                <View style={styles.contBottom}>
                    <Text style={styles.contBottomText} onPress={() => {
                        this.props.getImgs()
                    }}>照片</Text>
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
        paddingLeft: 20,
        paddingRight: 20
    },
    contTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingBottom: 12
    },
    contTopLeft: {
        flex: 2,
        fontSize: 14,
        color: '#000000'
    },
    contTopRight: {
        flex: 1,
        fontSize: 10,
        color: '#898989',
        textAlign: 'right',
    },
    contBottom: {
        borderTopColor: '#EDEDED',
        borderTopWidth: 1,
        paddingTop: 12,
        paddingBottom: 12
    },
    contBottomText: {
        fontSize: 14,
        color: '#000000'
    }
});