import axios from 'axios';
const API=axios.create({baseURL:'https://serverforposts.herokuapp.com'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const apifetchposts=(page)=>API.get(`/posts?page=${page}`);
export const apicreatepost=(postdata)=>API.post('/posts',postdata);
export const apiupdatepost=(id,updatedpostdata)=>API.patch(`/posts/${id}`,updatedpostdata);
export const apideletepost=(id)=>API.delete(`/posts/${id}`);
export const apilikepost=(id)=>API.patch(`/posts/${id}/LikePost`);

export const apifetchPost=(id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/query?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const apicomment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);


export const apisignin=(SignupForm)=>API.post('/user/signin',SignupForm);
export const apisignup=(SignupForm)=>API.post('/user/signup',SignupForm);
