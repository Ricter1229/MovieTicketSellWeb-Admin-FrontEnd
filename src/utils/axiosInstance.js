import axios from "axios";
const path = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: path, // 后端基礎路徑
  timeout: 5000, // request 超時時間
  headers: { "Content-Type": "application/json" },
})

// response 攔截器
axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response; // 解包 response.data
    // 检查 code 是否为成功状态（根据业务逻辑）
    // if (data.code !== 200) {
    //   // console.error('API Error:', data.errroDetail);
    //   return Promise.reject(new Error(data.message || 'Unknown Error'));
    // }
    // console.log(data.code);
    
    // 正常返回 data.data（即最终需要的核心数据）
    return response
  },
  (error) => {
    if(error.response && error.response.status && error.response.status==403) {
      console.log('API Error:', error.response?.data.errorDetail);
      window.location.href = "/403";
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;