import axios from "axios";

const axiosapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// instance.interceptors.response.use(function(response) {
//         return response;
//     }, function(error) {
//         if(error.response && error.response.status && error.response.status==403) {
//             window.location.href = "/403";
//         } 
//         return Promise.reject(error);
//     }
// );

export default axiosapi;
