var part = 'http://127.0.0.1:3000/'
//注册用户
registered = async (data) => {
  return await get_fetch(part + 'registered/registered', data, 'application/json')
}
//查询注册用户名是否应被注册
getUser = async (data) => {
  return await get_fetch(part + 'registered/getUser', data, 'application/json')
}
//模糊查询用户列表
rearch = async (data) => {
  return await get_fetch(part + 'registered/rearch', data, 'application/json')
}
//登陆
login = async (data) => {
  return await get_fetch(part + 'registered/login', data, 'application/json')
}
//关注主播
focusOn = async (data) => {
  return await get_fetch(part + 'registered/focusOn', data, 'application/json')
}
//粉丝
fensi = async (data) => {
  return await get_fetch(part + 'registered/fensi', data, 'application/json')
}
//编辑个人信息时修改关注和主播的呢称
changeFocus = async (data) => {
  return await get_fetch(part + 'registered/changeFocus', data, 'application/json')
}
//编辑个人信息时修粉丝的呢称
changeFensi = async (data) => {
  return await get_fetch(part + 'registered/changeFensi', data, 'application/json')
}
//发布作品
published = async (data) => {
  return await get_fetch(part + 'published/published', data, 'application/json')
}
//查找作品
selectPublished = async (data) => {
  return await get_fetch(part + 'published/selectPublished', data, 'application/json')
}
//更新作品
updateOnePublished = async (data) => {
  return await get_fetch(part + 'published/updateOnePublished', data, 'application/json')
}
//删除作品
deletePublished = async (data) => {
  return await get_fetch(part + 'published/deletePublished', data, 'application/json')
}
//收藏作品
collection = async (data) => {
  return await get_fetch(part + 'collection/collection', data, 'application/json')
}
//评论作品
commentsWork = async (data) => {
  return await get_fetch(part + 'published/commentsWork', data, 'application/json')
}
//多级评论
eveyComments = async (data) => {
  return await get_fetch(part + 'published/eveyComments', data, 'application/json')
}
//更新个人信息时,更换用户之前发布的作品图
workPerImg = async (data) => {
  return await get_fetch(part + 'published/workPerImg', data, 'application/json')
}
//取消收藏
deleteCollection = async (data) => {
  return await get_fetch(part + 'collection/deleteCollection', data, 'application/json')
}
//查询收藏
findCollection = async (data) => {
  return await get_fetch(part + 'collection/findCollection', data, 'application/json')
}
//查找用户信息
selectPerUser = async (data) => {
  return await get_fetch(part + 'registered/selectPerUser', data, 'application/json')
}
//编辑用户信息
editPerUser = async (data) => {
  return await get_fetch(part + 'registered/editPerUser', data, 'application/json')
}
//查询礼品
projectlist = async (data) => {
  return await get_fetch(part + 'projects/projectlist', data, 'application/json')
}
//添加购物车
shoppingCart = async (data) => {
  return await get_fetch(part + 'shoppingCart/shoppingCart', data, 'application/json')
}
//购物车
getShoppingCart = async (data) => {
  return await get_fetch(part + 'shoppingCart/getShoppingCart', data, 'application/json')
}
//请求接口
get_fetch = async (url, data, type) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      Accept: type,
      'Content-Type': type,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((results) => {
      return results;
    })
    .catch((error) => {
      let errorDate = {
        code: 500,
        message: '网络连接失败或者服务器没有开启,请检查网络和服务是否启动.'
      }
      return errorDate
    });
}
const getFetch = {
  registered: registered,
  getUser: getUser,
  login: login,
  focusOn: focusOn,
  fensi: fensi,
  published: published,
  selectPublished: selectPublished,
  collection: collection,
  deleteCollection: deleteCollection,
  findCollection: findCollection,
  deletePublished: deletePublished,
  updateOnePublished: updateOnePublished,
  rearch: rearch,
  commentsWork: commentsWork,
  eveyComments: eveyComments,
  selectPerUser: selectPerUser,
  editPerUser: editPerUser,
  workPerImg: workPerImg,
  changeFocus: changeFocus,
  changeFensi: changeFensi,
  projectlist: projectlist,
  shoppingCart: shoppingCart,
  getShoppingCart: getShoppingCart
}
export default getFetch