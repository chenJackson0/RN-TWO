import React, {Component} from 'react';
import {SectionList,TextInput, FlatList,StyleSheet, Text, View, Dimensions, Image, ScrollView, Animated,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from './component/backHeads';
import { GiftedChat , Bubble ,Send,InputToolbar} from 'react-native-gifted-chat'
import ConfirmationWindow from './component/confirmationWindow'
import ImagePicker from 'react-native-image-picker'
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height

var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
export default class dialogPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            dialogName:"",
            messages:[],
            sendText:""
        }
    }
    componentWillMount(){
        const {navigation} = this.props
        this.setState({
            dialogName:navigation.getParam("dialogName"),
            messages: [
                {
                  _id: 2,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
              ],
        })
    }
    goBackPage = () =>{
        const { navigation } = this.props;
        this.props.navigation.goBack()
      }

    onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    renderBubble(props){
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  left: { //对方的气泡
                    backgroundColor: '#F5F7F7',
                    borderRadius:2,
                  },
                  right:{ //我方的气泡
                    backgroundColor:'pink',
                    borderRadius:2,
                    margin:5,
                  }
                }}
              />
            );
    }
    renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style = {{marginBottom:15,marginRight:5}}>
                    <Feather
                        name = 'send'
                        size = {22}
                        color = 'black'
                    >
                    </Feather>
                </View>
            </Send>
        );
    }
    onPhotoFunction(){
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
            //   let source = { uri: 'data:image/jpeg;base64,' + response.data };
            //   alert(JSON.stringify(response.uri))
              this.setState({
                avatarSource: source
              });
            }
          });
    }
    onCameraFunction(){
        alert("2")
    }
    renderAccessory(){
        return(
            <View style = {{flex:1,height:(deviceHeight)/4,flexDirection:'row',flexWrap:'wrap',backgroundColor:'#F4F4F4'}}>
                <TouchableOpacity
                    style = {styles.functionBtnContainer}
                    activeOpacity={0.2} //透明度
                    onPress = {()=>this.onPhotoFunction()}
                >
                <View style={styles.functionPicContainer}>
                    <MaterialIcons
                        name= 'photo'
                        size={30}
                        color= '#7D7D7D'
                    >
                    </MaterialIcons>
                </View>
                <View style = {styles.functionTextContainer}>
                    <Text style = {styles.functionText}>照片</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.functionBtnContainer}
                    activeOpacity={0.2} //透明度
                    onPress = {()=>this.onCameraFunction()}
                >
                <View style={styles.functionPicContainer}>
                    <MaterialIcons
                        name= 'photo-camera'
                        size={30}
                        color= '#7D7D7D'
                    >
                    </MaterialIcons>
                </View>
                <View style = {styles.functionTextContainer}>
                    <Text style = {styles.functionText}>拍摄</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        return(
            <View style = {styles.chatListpageContainer}>
                <Header title = {this.state.dialogName} goBackPage = {this.goBackPage.bind(this)}/>
                <GiftedChat
                    messages={this.state.messages}
                    renderAvatarOnTop={true}
                    showUserAvatar={true}
                    // renderChatFooter={this.renderFooter}
                    // textInputProps={this.propsEdit}
                    listViewProps = {{
                        backgroundColor:'yellow',
                    }}
                    user = {{
                        _id:1,
                        name: 'React',
                        avatar: 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',
                    }}
                    
                    textInputProps={{
                        placeholder : '请输入您想回复的话……',
                    }}
                    renderAccessory = {this.renderAccessory.bind(this)}
                    // onInputTextChanged = {this.onInputTextChanged.bind(this)}
                    // renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderSend = {this.renderSend.bind(this)}
                    accessoryStyle={{height: (deviceHeight)/3}}
                    renderBubble = {this.renderBubble}
                    showAvatarForEveryMessage={true}
                    // minInputToolbarHeight={22}
                    onSend={messages => this.onSend(messages)}
                />
            </View>
                
            
        )
    }
}


const styles = StyleSheet.create({
    chatListpageContainer: {
        flex:1,
    },
    leftPic:{
        height:44,
        width:50,
        justifyContent:'center',
        alignItems:'center',
    },
    functionBtnContainer:{
        height:(deviceHeight)/6,
        width:(deviceWidth)/4,
        flexDirection:'column',
        padding:16,
        paddingBottom:5,
    },
    functionPicContainer:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6,
        backgroundColor:'white',
        width:(deviceWidth)/6.5,
        height:(deviceWidth)/6.5
    },
    functionTextContainer:{
        alignItems:'center',
        justifyContent:'center',
        height:(deviceHeight)/7.5-(deviceWidth)/6.5,
        width:(deviceWidth)/6.5,
    },
    functionText:{
        fontSize:12,
        color:'#858585'
    }
})





 


