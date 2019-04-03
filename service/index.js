
//注册用户
registered = async (data) => {
  return await get_fetch('http://127.0.0.1:3000/registered/registered',data,'application/json')
}
//查找用户
getUser = async (data) => {
  return await get_fetch('http://127.0.0.1:3000/registered/getUser',data,'application/json')
}
//登陆
login = async (data) => {
  return await get_fetch('http://127.0.0.1:3000/registered/login',data,'application/json')
}
//发布作品
published = async (data) => {
  return await get_fetch('http://127.0.0.1:3000/published/published',data,'application/json')
}
//查找作品
selectPublished = async (data) => {
  return await get_fetch('http://127.0.0.1:3000/published/selectPublished',data,'application/json')
}


//请求接口
get_fetch = async (url,data,type) => {
  return await fetch(url,{
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
        console.error(error);
      });
  }
  const getFetch = {
    registered : registered,
    getUser : getUser,
    login : login,
    published : published,
    selectPublished : selectPublished
  }
  export default getFetch