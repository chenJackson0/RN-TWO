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
publishedList = [//发表的作品
    // {   userName : 'jackson',
    //     publicHeadImg : [{img : 'http://p1.meituan.net/deal/849d8b59a2d9cc5864d65784dfd6fdc6105232.jpg'}],
    //     text : 'Madrid MadridAtletico Madri',
    //     flag : true,
    //     butText : '查看更多点赞',
    //     cllFlag : true,
    //     perUser : 'lukamodric10',
    //     playNum : 1508124,
    //     commentsNum : 989,
    //     time : 1551841668000,
    //     timeText : '',
    //     giveALike : ['jackson','chanmeg','maxmain'],
    //     giveALikeList : ''
    // }
] 

getSublishedList = () => {
    return this.publishedList
}
getStorageAccount = () => {
    return this.accountList
}
//模拟获取api用户列表
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

//模拟获取api用户发布作品列表
publishedListStorageF = () => {
    storage.load({
        key : 'publishedLis',
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
  getStorageAccount : getStorageAccount,
  getSublishedList : getSublishedList
}
export default storageG
