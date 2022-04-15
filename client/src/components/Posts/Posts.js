
import {  useState } from 'react';
import { useSelector }from 'react-redux';

import Post from './Post/Post';
import { Container, Row ,Col,Spinner} from 'react-bootstrap';

const Posts=({ currentId,setCurrentId })=>{
  const {posts:allposts,isLoading} = useSelector((state) => state.R_Posts);
  const [user]=useState(JSON.parse(localStorage.getItem('profile')))
  //console.log(allposts);
  
    if (!allposts.length && !isLoading) {
      return ("NO POSTS")
    }
    return (
    isLoading ?<Spinner animation="grow" /> : (
      <><Container>
      <Row>
      {allposts.map((post) => (
        <Col key={post._id} xs={12} sm={6} md={6} lg={4}> <Post post={post}  setCurrentId={setCurrentId} user={user}  />   </Col>
      ))}</Row></Container></>
      )
   
  );
}
export default Posts;