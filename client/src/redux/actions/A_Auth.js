import { AUTH } from "../constants/actiontype"
import * as api from './../../api/index.js'

export const SignIn=(SignupForm,navigate)=>async (dispatch)=>{
    try {
        const {data}=await api.apisignin(SignupForm);
        const action={
            type:AUTH,
            data:data
        }
        dispatch(action);
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const SignUp=(SignupForm,navigate)=>async (dispatch)=>{
    try {
        const {data}=await api.apisignup(SignupForm)
        const action={
            type:AUTH,
            data:data
        }
        dispatch(action);
        
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}


