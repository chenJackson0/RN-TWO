import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 24 * 3600,
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
})
accountList = []//所以注册用户列表
publishedList = [] //发表的作品
userNameImg = ''
userName = ''
commentsItemFoucsOn = []
commentsItem = [//评论列表
    {
        data: [{img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '花样年画 / HARU',nameT : '今天心情大号,你们嗯?'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雾里看花 / HI',nameT : '嗨,朋友,你好'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雪中送腿 / FA',nameT : 'FA'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '春夏秋冬 / SHYUANF',nameT : 'SHYUANF'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '别来无恙 / HAO',nameT : 'HAO'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '换看春秋 / WEI',nameT : 'WEI'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '人来人往 / KAN',nameT : 'KAN'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '花样年画 / HARU',nameT : 'HARU'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雾里看花 / HI',nameT : 'HI'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '雪中送腿 / FA',nameT : 'FA'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '春夏秋冬 / SHYUANF',nameT : 'SHYUANF'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '别来无恙 / HAO',nameT : '嗨,朋友,你好,一起王者啊,一起i 开黑啊,以前淀粉放假了就啊发个卡就赶快来撒额经过两个刚放假啦上课'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '换看春秋 / WEI',nameT : 'WEI'},
        {img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg',name : '人来人往 / KAN',nameT : 'KAN'}]
    }
] 
//登录用户个人图像
getUserNameImg = () => {
    return this.userNameImg
}
//登录用户名
getUserName = () => {
    return this.userName
}
//模拟api获取用户名
getUserNameStorageF = () => {
    storage.load({
        key : 'userName',
        autoSync : true
    }).then(ret => {
        this.userName = ret
    }).catch(err => {
        console.log()
    })
}
//模拟登录用户个人图像api
getUserNameImgStorageF = () => {
    storage.load({
        key : 'userNameImg',
        autoSync : true
    }).then(ret => {
        this.userNameImg = ret
    }).catch(err => {
        console.log()
    })
}

//发表的作品
getSublishedList = () => {
    return this.publishedList
}
//所以注册用户表
getStorageAccount = () => {
    return this.accountList
}
//粉丝和不关注关联表
getcommentsItem = () => {
    return this.commentsItemFoucsOn
}

//模拟获取粉丝和不关注关联表api
getcommentsItemStorageF = () => {
    storage.load({
        key : 'commentsItemFoucsOn',
        autoSync : true
    }).then(ret => {
        this.commentsItemFoucsOn = ret
    }).catch(err => {
        console.log()
    })
}
a = () => {
    storage.remove({
        key: 'publishedLi'
    });
}
//模拟获取api用户表
storageF = () => {
    storage.load({
        key : 'account',
        autoSync : true
    }).then(ret => {
        this.accountList = ret
    }).catch(err => {
        console.log()
    })
}

//模拟获取api用户发布作品表
publishedListStorageF = () => {
    storage.load({
        key : 'publishedLi',
        autoSync : true
    }).then(ret => {
        this.publishedList = ret
    }).catch(err => {
        console.log()
    })
}
const storageG = {
  storage : storage,
  storageF : storageF,
  publishedListStorageF : publishedListStorageF,
  getcommentsItemStorageF : getcommentsItemStorageF,
  getStorageAccount : getStorageAccount,
  getSublishedList : getSublishedList,
  getcommentsItem : getcommentsItem,
  getUserNameImg : getUserNameImg,
  getUserNameImgStorageF : getUserNameImgStorageF,
  getUserName : getUserName,
  getUserNameStorageF : getUserNameStorageF,
    // a:a()
}
export default storageG
