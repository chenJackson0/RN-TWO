get_fetch = (data) => {
    return fetch('mongodb://127.0.0.1:27017',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
  
  const results = {
    get_fetch:get_fetch
  }
  export default results