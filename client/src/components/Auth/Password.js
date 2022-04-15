
import {Form,Button,Col,Row} from 'react-bootstrap';
import {BsEyeFill} from "react-icons/bs";
const Password=({SignupForm,handleChange,handleShowPassword,showPassword})=>{
    return(
        <>
        <Row>
            <Col xs={9}>
            Confirm Password<Form.Control placeholder="Confirm Password"  value={SignupForm.confirmPassword} name="confirmPassword" onChange={handleChange} type={showPassword?'text':'password'} />
            </Col>
            <Col xs={2}>
                <br></br>
            <Button onClick={handleShowPassword} ><BsEyeFill/></Button>
            </Col>
        </Row>
            <br></br>
        </>
    );
}

export default Password;