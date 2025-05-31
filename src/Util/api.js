// 1st version of api.js which uses localhost as base URL for development on local machine
// 4) Frontend: utils/api.js

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000", // ✅ Plain string, no Markdown
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

// 2nd version of api.js in which we used direct URL that was provided during backend deployment on render
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://pakcar-backend.onrender.com", // Updated to Render URL
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;
//3rd and final version of api.js which uses environment veriable as base URL and then we set remote url in our
// .env file like VITE_API_BASE_URL=https://pakcar-backend.onrender.com and set enviroment veriable on vercel

import axios from "axios";
export const BACKEND = import.meta.env.VITE_API_BASE_URL; // <= add this line
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ Uses environment variable
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
