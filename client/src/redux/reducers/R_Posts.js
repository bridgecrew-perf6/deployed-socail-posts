import {FETCH_BY_CREATOR,COMMENT,FETCH_POST,END_LOADING,START_LOADING, FETCH_BY_SEARCH, FETCH_ALL,CREATE_POST,UPDATE_POST,DELETE_POST,LIKE_POST} from './../constants/actiontype.js';

const R_Posts= (state= { isLoading: true,posts: [] },action)=>{
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                if (post._id == +action.payload._id) {
                    return action.payload;
                }
                return post;
                }),
            };

        case FETCH_ALL:
            return {
                ...state ,
                posts:action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return { ...state, post: action.payload.post };    
        case CREATE_POST:
            return {...state, posts: [...state.posts, action.payload] };
        case UPDATE_POST:
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case LIKE_POST:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        
        case FETCH_BY_SEARCH:
            return { ...state, posts: [...action.payload] };
        case FETCH_BY_CREATOR:
            return { ...state, posts: [...action.payload.data] };

        default:
            return state;
    }
}
export default R_Posts;