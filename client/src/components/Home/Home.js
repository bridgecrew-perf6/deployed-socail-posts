import React from "react";
import { Row ,Col} from "react-bootstrap";
import Postform from './../Form/Postform.js';
import Search from './../Search/Search.js'
import Posts from './..//Posts/Posts.js';
import Paginations  from "./../Pagination.js";

import { useState } from "react";
import { useLocation } from "react-router-dom";
const Home=()=>{
        
    const useQuery=()=>{
        return new URLSearchParams(useLocation().search)
    }
    const query=useQuery(); 
    const page=query.get('page')||1;
    
    const searchQuery=query.get('searchQuery');
  
    const [currentId, setCurrentId] = useState(0);
        return(
            <Row>
                <Col xs={12} md={2}>
                <Row>
                    <Col  >NewPost{' '}<Postform currentId={currentId} setCurrentId={setCurrentId} /></Col>{' '}
                    <Col  >Search{' '}<Search /></Col>
                </Row>
                </Col>
                <Col xs={12} md={10} >    
                    <Row xs={8} ><Paginations page={page}/></Row>
                    <Row xs={12} ><Posts setCurrentId={setCurrentId}  currentId={currentId} page={page} /></Row>
                </Col>
            </Row>
        );
    }
    export default Home;