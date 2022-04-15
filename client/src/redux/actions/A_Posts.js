
import *as  api from './../../api/index.js';
import { FETCH_BY_CREATOR,COMMENT,FETCH_POST,END_LOADING,START_LOADING, FETCH_BY_SEARCH,FETCH_ALL,CREATE_POST,UPDATE_POST,DELETE_POST,LIKE_POST} from './../constants/actiontype.js';


export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.apifetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
      console.log(error);
    }
};

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.fetchPostsByCreator(name);
  
      dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
  


export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.apicomment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };
  
export const GetPosts=(page)=>async (dispatch)=>{
    try{
        
        dispatch({ type: START_LOADING })
        const {data}=await api.apifetchposts(page);
        //console.log(data);
        const action={
            type:FETCH_ALL,
            payload:data
        }
        //console.log("FETCHED",data);
        dispatch(action);
        dispatch({ type: END_LOADING });
    }
    catch (error){
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        const action={
        type:FETCH_BY_SEARCH,
        payload:data
        }
    dispatch(action);
    dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const CreatePost=(postdata)=>async (dispatch)=>{
    try{
        dispatch({ type: START_LOADING });

        const {data}=await api.apicreatepost(postdata);
        const action={
            type:CREATE_POST,
            payload:data
        }
        //console.log("ADDED",data);
        dispatch(action);
        dispatch({ type: END_LOADING });

    }
    catch (error){
        console.log(error);
    }
}
export const UpdatePost=(id,updatedpostdata)=>async (dispatch)=>{
    try{
        const {data}=await api.apiupdatepost(id,updatedpostdata);
        const action={
            type:UPDATE_POST,
            payload:data
        }
        //console.log("UPDATED",data);
        dispatch(action);
    }
    catch (error){
        console.log(error);
    }
}

export const DeletePost=(id)=>async (dispatch)=>{
    try {
        await api.apideletepost(id);
        const action={
            type:DELETE_POST,
            payload:id
        }
        dispatch(action)
    } catch (error) {
        console.log(error);       
    }
}

export const LikePost=(id)=>async (dispatch)=>{
    try {
        const {data}=await api.apilikepost(id);
        const action={
            type:LIKE_POST,
            payload:data,
        }
        dispatch(action)
    } catch (error) {
        console.log(error);       
    }
}

