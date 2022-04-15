
import {Form,Col,Row} from 'react-bootstrap';

const Signup =({SignupForm,handleChange})=>{
    return(                <>
        <Row >
            <Col md={6}>
            First Name<Form.Control placeholder="First name" value={SignupForm.firstName} name="firstName" onChange={handleChange}  type="text"/>
            </Col>
            
            <Col md={6}>
            Last Name<Form.Control placeholder="Last name"  value={SignupForm.lastName} name="lastName" onChange={handleChange} type="text" />
            </Col>
        </Row>
        <br></br>
        </>

    );
}
export default Signup;