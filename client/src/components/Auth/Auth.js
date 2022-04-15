import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import {Container,Form,Button,Col,Row} from 'react-bootstrap';

import Signup from './Signup';
import Password from './Password';
import Signin from './Signin';

import {SignIn,SignUp} from './../../redux/actions/A_Auth.js'
const Auth=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const [SignupForm,setSignupForm]=useState(initialState);
    const handleChange=(e)=>{
        setSignupForm({...SignupForm,[e.target.name]:e.target.value});
    }


    const [isSignup,setisSignup]=useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const switchMode = () => {
        setSignupForm(initialState);
        setisSignup((previsSignup) => !previsSignup);
        setShowPassword(false);
    };


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(SignUp(SignupForm,navigate));
        }else{
            dispatch(SignIn(SignupForm,navigate));
        }
    }

    
    return(
    <>
    {!isSignup?'SignUp Form here ':'already have account! '}
    <Button variant="primary"  size="lg" onClick={switchMode}>{!isSignup?'signup':'signin'}</Button>
    
    <Container className="position-absolute top-10 start-10  bg-dark text-white rounded p-3" style={{width:'auto',height:'auto'}}  >
    <Row>
        <Form >
            {isSignup&&( <Signup SignupForm={SignupForm} handleChange={handleChange} />)}

    Email   <Form.Control placeholder="Email" value={SignupForm.email} name="email" onChange={handleChange}  type="email"/>
    Password<Form.Control placeholder="Password"  value={SignupForm.password} name="password" onChange={handleChange} type="password" />
            <br></br>

            {isSignup&&(<Password SignupForm={SignupForm} handleChange={handleChange} handleShowPassword={handleShowPassword} showPassword={showPassword} />  )}

            { !isSignup ? (<Signin handleSubmit={handleSubmit}/>)
            :(<Row><Col lg={12} className="d-grid gap-2"><Button variant="primary" size="md" onClick={handleSubmit} >Signup</Button></Col></Row>  )}  

        </Form>
    </Row>
    </Container>
    </>
    );
}
export default Auth;    

