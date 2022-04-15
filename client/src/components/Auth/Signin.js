
import {Button,Col,Row} from 'react-bootstrap';
import {BsGoogle} from "react-icons/bs";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../redux/constants/actiontype';

const Signin=({handleSubmit})=>{    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const GoogleSuccess =async (res)=>  {
        const result=res?.profileObj;
        const token=res?.tokenId
        try {
            dispatch({type:AUTH,data:{result,token}});//action type and action both defined here itself
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    const GoogleFail =(error)=>{
        console.log("error from googleFail",error)
    }

    return(
        <>
        <Row>
            <Col lg={12} className="d-grid gap-1"><Button variant="primary" size="md" onClick={handleSubmit}>Sign-in</Button></Col>
        </Row>
        <br></br>
        <Row>
            <Col lg={12} className="d-grid gap-1">    
                <GoogleLogin
                clientId="1000217290177-iq6o0uvq8mp0r62bdsfs3fa4kjhntdfk.apps.googleusercontent.com"
                render={renderProps => (
                    <Button variant="primary" size="md" onClick={renderProps.onClick} ><BsGoogle /> Google Sign-in</Button>
                )}
                buttonText="Login"
                onSuccess={GoogleSuccess}
                onFailure={GoogleFail}
                cookiePolicy={'single_host_origin'}
                />
            </Col>  
        </Row>
    </>
    );
}
export default Signin