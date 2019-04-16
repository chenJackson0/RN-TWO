// //http://www.personalhealth.com.cn/voide/indexTv.mp4

// import React, {Component} from 'react';
// import {View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet} from 'react-native';
// import Video from 'react-native-video';
// import Orientation from 'react-native-orientation';

// const screenWidth = Dimensions.get('window').width;

// function formatTime(second) {
//   let h = 0, i = 0, s = parseInt(second);
//   if (s > 60) {
//     i = parseInt(s / 60);
//     s = parseInt(s % 60);
//   }
//   // 补零
//   let zero = function (v) {
//     return (v >> 0) < 10 ? "0" + v : v;
//   };
//   return [zero(h), zero(i), zero(s)].join(":");
// }

// export default class PlayVideo extends Component {
  
//   static navigationOptions = {
//     headerTitle: '测试视频播放'
//   };
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       videoUrl: "http://www.personalhealth.com.cn/voide/indexTv.mp4",
//       videoCover: "http://124.129.157.208:8889/data/uploads/kecheng/2018/01/18/5a600b2c99836.png@0o_0l_220w.png",
//       videoWidth: screenWidth,
//       videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
//       showVideoCover: true,    // 是否显示视频封面
//       showVideoControl: false, // 是否显示视频控制组件
//       isPlaying: false,        // 视频是否正在播放
//       currentTime: 0,        // 视频当前播放的时间
//       duration: 0,           // 视频的总时长
//       isFullScreen: false,     // 当前是否全屏显示
//       playFromBeginning: false, // 是否从头开始播放
//     };
//   }
  
//   render() {
//     return (
//       <View style={styles.container} onLayout={this._onLayout}>
//         <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'#000000' }}>
//           <Video
//             ref={(ref) => this.videoPlayer = ref}
//             source={{uri: this.state.videoUrl}}
//             rate={1.0}
//             volume={1.0}
//             muted={false}
//             paused={!this.state.isPlaying}
//             resizeMode={'contain'}
//             playWhenInactive={false}
//             playInBackground={false}
//             ignoreSilentSwitch={'ignore'}
//             progressUpdateInterval={250.0}
//             onLoadStart={this._onLoadStart}
//             onLoad={this._onLoaded}
//             onProgress={this._onProgressChanged}
//             onEnd={this._onPlayEnd}
//             onError={this._onPlayError}
//             onBuffer={this._onBuffering}
//             style={{width: this.state.videoWidth, height: this.state.videoHeight}}
//           />
//           {
//             this.state.showVideoCover ?
//               <Image
//                 style={{
//                   position:'absolute',
//                   top: 0,
//                   left: 0,
//                   width: this.state.videoWidth,
//                   height: this.state.videoHeight
//                 }}
//                 resizeMode={'cover'}
//                 source={{uri: this.state.videoCover}}
//               /> : null
//           }
//           <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
//             <View
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: this.state.videoWidth,
//                 height: this.state.videoHeight,
//                 backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
//                 alignItems:'center',
//                 justifyContent:'center'
//               }}>
//               {
//                 this.state.isPlaying ? null :
//                   <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
//                     <Image
//                       style={styles.playButton}
//                       source={require('../image/f.png')}
//                     />
//                   </TouchableWithoutFeedback>
//               }
//             </View>
//           </TouchableWithoutFeedback>
//           {
//             this.state.showVideoControl ?
//               <View style={[styles.control, {width: this.state.videoWidth}]}>
//                 <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
//                   <Image
//                     style={styles.playControl}
//                     source={this.state.isPlaying ? require('../image/love.png') : require('../image/f.png')}
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
//                 <Slider
//                   style={{flex: 1}}
//                   maximumTrackTintColor={'#999999'}
//                   minimumTrackTintColor={'#00c06d'}
//                   thumbImage={require('../image/logo.png')}
//                   value={this.state.currentTime}
//                   minimumValue={0}
//                   maximumValue={this.state.duration}
//                   onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
//                 />
//                 <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
//                 <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
//                   <Image
//                     style={styles.shrinkControl}
//                     source={this.state.isFullScreen ? require('') : require('')}
//                   />
//                 </TouchableOpacity>
//               </View> : null
//           }
//         </View>
//         <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
//           <Button title={'开始播放'} onPress={() => {this.playVideo()}}/>
//           <Button title={'暂停播放'} onPress={() => {this.pauseVideo()}}/>
//           <Button title={'切换视频'} onPress={() => {this.switchVideo("http://www.personalhealth.com.cn/voide/indexTv.mp4", 0)}}/>
//         </View>
//       </View>
//     )
//   }
  
//   /// -------Video组件回调事件-------
  
//   _onLoadStart = () => {
//     console.log('视频开始加载');
//   };
  
//   _onBuffering = () => {
//     console.log('视频缓冲中...')
//   };
  
//   _onLoaded = (data) => {
//     console.log('视频加载完成');
//     this.setState({
//       duration: data.duration,
//     });
//   };
  
//   _onProgressChanged = (data) => {
//     console.log('视频进度更新');
//     if (this.state.isPlaying) {
//       this.setState({
//         currentTime: data.currentTime,
//       })
//     }
//   };
  
//   _onPlayEnd = () => {
//     console.log('视频播放结束');
//     this.setState({
//       currentTime: 0,
//       isPlaying: false,
//       playFromBeginning: true
//     });
//   };
  
//   _onPlayError = () => {
//     console.log('视频播放失败');
//   };
  
//   ///-------控件点击事件-------
  
//   /// 控制播放器工具栏的显示和隐藏
//   hideControl() {
//     if (this.state.showVideoControl) {
//       this.setState({
//         showVideoControl: false,
//       })
//     } else {
//       this.setState(
//         {
//           showVideoControl: true,
//         },
//         // 5秒后自动隐藏工具栏
//         () => {
//           setTimeout(
//             () => {
//               this.setState({
//                 showVideoControl: false
//               })
//             }, 5000
//           )
//         }
//       )
//     }
//   }
  
//   /// 点击了播放器正中间的播放按钮
//   onPressPlayButton() {
//     let isPlay = !this.state.isPlaying;
//     this.setState({
//       isPlaying: isPlay,
//       showVideoCover: false
//     });
//     if (this.state.playFromBeginning) {
//       this.videoPlayer.seek(0);
//       this.setState({
//         playFromBeginning: false,
//       })
//     }
//   }
  
//   /// 点击了工具栏上的播放按钮
//   onControlPlayPress() {
//     this.onPressPlayButton();
//   }
  
//   /// 点击了工具栏上的全屏按钮
//   onControlShrinkPress() {
//     if (this.state.isFullScreen) {
//       Orientation.lockToPortrait();
//     } else {
//       Orientation.lockToLandscape();
//     }
//   }
  
//   /// 进度条值改变
//   onSliderValueChanged(currentTime) {
//     this.videoPlayer.seek(currentTime);
//     if (this.state.isPlaying) {
//       this.setState({
//         currentTime: currentTime
//       })
//     } else {
//       this.setState({
//         currentTime: currentTime,
//         isPlaying: true,
//         showVideoCover: false
//       })
//     }
//   }
  
//   /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
//   _onLayout = (event) => {
//     //获取根View的宽高
//     let {width, height} = event.nativeEvent.layout;
//     console.log('通过onLayout得到的宽度：' + width);
//     console.log('通过onLayout得到的高度：' + height);
    
//     // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
//     let isLandscape = (width > height);
//     if (isLandscape){
//       this.setState({
//         videoWidth: width,
//         videoHeight: height,
//         isFullScreen: true,
//       })
//     } else {
//       this.setState({
//         videoWidth: width,
//         videoHeight: width * 9/16,
//         isFullScreen: false,
//       })
//     }
//     Orientation.unlockAllOrientations();
//   };
  
//   /// -------外部调用事件方法-------
  
//   ///播放视频，提供给外部调用
//   playVideo() {
//     this.setState({
//       isPlaying: true,
//       showVideoCover: false
//     })
//   }
  
//   /// 暂停播放，提供给外部调用
//   pauseVideo() {
//     this.setState({
//       isPlaying: false,
//     })
//   }
  
//   /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
//   switchVideo(videoURL, seekTime) {
//     this.setState({
//       videoUrl: videoURL,
//       currentTime: seekTime,
//       isPlaying: true,
//       showVideoCover: false
//     });
//     this.videoPlayer.seek(seekTime);
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0'
//   },
//   playButton: {
//     width: 50,
//     height: 50,
//   },
//   playControl: {
//     width: 24,
//     height: 24,
//     marginLeft: 15,
//   },
//   shrinkControl: {
//     width: 15,
//     height: 15,
//     marginRight: 15,
//   },
//   time: {
//     fontSize: 12,
//     color: 'white',
//     marginLeft: 10,
//     marginRight: 10
//   },
//   control: {
//     flexDirection: 'row',
//     height: 44,
//     alignItems:'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     position: 'absolute',
//     bottom: 0,
//     left: 0
//   },
// });

global.deviceWidth = Dimensions.get('window').width
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    Slider,
    UIManager
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
export default class BackHeads extends Component{
    constructor(props){
        super(props)
        this.state = {
            isPlaying : true,
            showVideoControl : false,
            isMune : true,
            startTime : 0,
            endTime : 0,
        }
    };
    //播放和暂停视频
    playVideo = ()=>{
        if(this.state.isPlaying){
            this.setState({
                isPlaying : false
            })
        }else{
            this.setState({
                isPlaying : true
            })
        }
        
    }
    //显示视频菜单栏
    showMune = () => {
        if(this.state.isMune){
            this.setState({
                isMune : false
            })
        }else{
            this.setState({
                isMune : true
            })
        }
        // setTimeout(()=>{
        //     this.setState({
        //         isMune : true
        //     })
        // },5000)
    }
    //获取视频时长
    onLoad = (data) => {
        this.setState({
            endTime : data.duration
        })
    }
    //将视频时长转换成时分秒
    changTime = (time) => {
        let hour =  parseInt((time % (3600*24)) / 3600);
        let minute = parseInt((time % 3600)/60);
        let s = parseInt(time % 60);
        // 补零
        let zero = function (v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };
        return [zero(hour), zero(minute), zero(s)].join(":");
    }
    //视频进度更新
    onProgressChanged = (data) => {
        if (!this.state.isPlaying) {
            this.setState({
                startTime: data.currentTime,
            })
        }
    };
    //视频播放结束
    onPlayEnd = () => {
        this.setState({
            startTime: this.state.startTime,
            isPlaying: true
        });
    };
    //进度条
    onSliderValueChanged(startTime) {
        this.videoPlayer.seek(startTime);
    }
    render() {
        return (
            <View style = {styles.playButton} >
                 <TouchableWithoutFeedback style = {[styles.video]} onPress = {this.showMune.bind(this)}>
                    <Video style = {styles.video} source = {{uri : this.props.video}}
                    resizeMode={'contain'}
                    ref={(ref) => this.videoPlayer = ref}
                    paused={this.state.isPlaying}
                    onLoad = {this.onLoad.bind(this)}
                    onProgress = {this.onProgressChanged.bind(this)}
                    onEnd = {this.onPlayEnd.bind(this)}
                    />
                </TouchableWithoutFeedback>
                <AntDesign name = {'play'} style={[styles.playIcon,this.state.isPlaying ? '' : styles.disPlayIcon]} size = {30} color = {'black'} onPress = {this.playVideo.bind(this)}/>
                <View style = {[styles.mnueVideo,this.state.isMune ? styles.isMuneDis : '']}>
                    <Entypo name = {this.state.isPlaying ? 'controller-play' : 'controller-paus'} size = {30} style = {styles.icon} color = {'white'} onPress = {this.playVideo.bind(this)}/>
                    <Text style = {styles.time}>{this.changTime(this.state.startTime)}</Text>
                    <Slider
                        style = {styles.duration}
                        maximumTrackTintColor={'#999999'}
                        minimumTrackTintColor={'#ffffff'}
                        value={this.state.startTime}
                        minimumValue={0}
                        maximumValue={this.state.endTime}
                        onValueChange={(startTime) => { this.onSliderValueChanged(startTime) }}
                    />
                    <Text style = {styles.time}>{this.changTime(this.state.endTime)}</Text>
                    <MaterialIcons name = {'crop-free'} size = {30} style = {styles.icon} color = {'white'}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    isMuneDis:{
        display:'none'
    },
    mnueVideo:{
        flexDirection:'row',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        left:0,
        bottom:-2,
        backgroundColor:'#000000',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        opacity:0.6
    },
    icon:{
        flex:1
    },
    time:{
        flex:2,
        fontSize:12,
        color:'#ffffff',
        textAlign:'center'
    },
    duration:{
        flex:4,
        // backgroundColor:'#FFFAFA',
        // borderRadius:1
    },
    playButton:{
        justifyContent:'center',
        alignItems:'center',
        height:272,
        width:'100%',
        position:'relative',
    },
    video:{
        height:280,
        width:'100%',
        marginTop:30,
        position:'absolute',
        top:-32,
        left:0
    },
    playIcon:{
        width:30,
        height:30,
        position:'absolute',
        top:'50%',
        marginTop:-15
    },
    disPlayIcon:{
        display:'none'
    }
});
