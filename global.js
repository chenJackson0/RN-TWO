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
    defaultExpires: 1000 * 24 * 360000000000000000,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
})
accountList = []//所以注册用户列表
publishedList = [] //发表的作品
userNameImg = ''
userName = ''
commentsItemFoucsOn = [] //粉丝和关注粉丝表
commentsItem = [] //评论列表
collectionItems = [] //用户作品收藏表
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
        key: 'userName',
        autoSync: true
    }).then(ret => {
        this.userName = ret
    }).catch(err => {
        console.log()
    })
}
//模拟登录用户个人图像api
getUserNameImgStorageF = () => {
    storage.load({
        key: 'userNameImg',
        autoSync: true
    }).then(ret => {
        this.userNameImg = ret
    }).catch(err => {
        console.log()
    })
}

//收藏作品
getCollectionItems = () => {
    return this.collectionItems
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
//模拟获取收藏作品api
getCollectionItemsStorageF = () => {
    storage.load({
        key: 'collectionItem',
        autoSync: true
    }).then(ret => {
        this.collectionItems = ret
    }).catch(err => {
        console.log()
    })
}

//模拟获取粉丝和不关注关联表api
getcommentsItemStorageF = () => {
    storage.load({
        key: 'commentsItemFoucsOn',
        autoSync: true
    }).then(ret => {
        this.commentsItemFoucsOn = ret
    }).catch(err => {
        console.log()
    })
}

//清除数据用的,到时候删--------------------
removeNameList = ['account', 'commentsItemFoucsOn', 'publishedLi', 'userName', 'userNameImg', 'collectionItem']
removeName = () => {
    for (let i = 0; i < this.removeNameList.length; i++) {
        storage.remove({
            key: this.removeNameList[i]
        });
    }
}
// this.removeName()
//----------------------------------

//模拟获取api用户表
storageF = () => {
    storage.load({
        key: 'account',
        autoSync: true
    }).then(ret => {
        this.accountList = ret
    }).catch(err => {
        console.log()
    })
}

//模拟获取api用户发布作品表
publishedListStorageF = () => {
    storage.load({
        key: 'publishedLi',
        autoSync: true
    }).then(ret => {
        this.publishedList = ret
    }).catch(err => {
        console.log()
    })
}
const storageG = {
    storage: storage,
    storageF: storageF,
    publishedListStorageF: publishedListStorageF,
    getcommentsItemStorageF: getcommentsItemStorageF,
    getStorageAccount: getStorageAccount,
    getSublishedList: getSublishedList,
    getcommentsItem: getcommentsItem,
    getUserNameImg: getUserNameImg,
    getCollectionItems: getCollectionItems,
    getCollectionItemsStorageF: getCollectionItemsStorageF,
    getUserNameImgStorageF: getUserNameImgStorageF,
    getUserName: getUserName,
    getUserNameStorageF: getUserNameStorageF,
}
export default storageG
