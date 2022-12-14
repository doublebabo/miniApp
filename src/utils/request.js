import Taro from '@tarojs/taro';


const baseUrl = 'https://115.236.17.59:9021/';
/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    Taro.request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        // 'X-Litemall-Token': Taro.getStorageSync('token')
      },
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

request.get = (url, data) => {
  return request(url, data, 'GET');
}

request.post = (url, data) => {
  return request(url, data, 'POST');
}

export default request;
