
import { useEffect, useState } from "react";
import { Button,Offcanvas,Container,FloatingLabel,Form, } from "react-bootstrap";
import {BsPlusCircle} from "react-icons/bs";
import FileBase from 'react-file-base64';

import {CreatePost,UpdatePost,GetPosts} from './../../redux/actions/A_Posts.js'

import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';


const Postform=({ currentId, setCurrentId })=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const dispatch = useDispatch();

    const [PostData,setPostData]=useState({ title: '', message: '', tags: [], selectedFile: '' });
    const handlePostchange=(e)=>{
      setPostData({...PostData,[e.target.name]:e.target.value});
    }

    var post = useSelector((state) =>(currentId?state.R_Posts.posts.find((message) => message._id === currentId) : null));
    useEffect(() => {
      if (!post?.title) {
          clear();
          //console.log(post);
      }
      if (post?._id===currentId){
        setPostData(post);
        setShow(true);
        post=null;
        }
    }, [post]);


    const user=JSON.parse(localStorage.getItem('profile'));

    const AddPost=(e)=>{
      e.preventDefault();
        if (currentId === 0) {        
          dispatch(CreatePost( {...PostData,name:user?.result?.name} ));
          currentId =0;

        } else {
          dispatch(UpdatePost(currentId, PostData));
          dispatch(GetPosts());
          currentId =0;
        }
        clear();
        setShow(false)
    }

    const handleAddChip = (tag) => {
      setPostData({ ...PostData, tags: [...PostData.tags, tag] });
    };
    const handleDeleteChip = (chipToDelete) => {
      setPostData({ ...PostData, tags: PostData.tags.filter((tag) => tag !== chipToDelete) });
    };



   const clear=()=>{
      setCurrentId(0);
      setPostData({
          title:'',
          message:'',
          tags:[],
          selectedFile:'',});
          setShow(false);
  }
  return(
    <> 
  <Button variant="primary" onClick={handleShow} className="me-2"><BsPlusCircle /></Button>
  <br/><br/>
  {!user?.result?.name && (<Offcanvas show={show} onHide={handleClose} >
    <Offcanvas.Header closeButton> <Offcanvas.Title>SIGN UP FOR FULL UTILIZATION</Offcanvas.Title> </Offcanvas.Header>
        </Offcanvas>)}

  {user?.result?.name && (
      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton> <Offcanvas.Title>{currentId?'Update Post':'Create Post'}</Offcanvas.Title> </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Form onSubmit={AddPost}>
              
            <FloatingLabel label="Title" className="mb-3">
                <Form.Control name="title" type="text" placeholder="Title" value={PostData.title}  onChange={handlePostchange}/>
            </FloatingLabel>
            
              <ChipInput
              
                style={{margin:'10px 0'}}
                name ="tags"
                value={PostData.tags}
                fullWidth
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                label="Tags"
                variant="outlined"
              />

            
            <Form.Group className="mb-3">
                <Form.Label>Post Image</Form.Label>
                <FileBase
                  type="file"
                  mutliple={false}
                  onDone={({base64})=>setPostData({...PostData,selectedFile:base64})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>message</Form.Label>
                <Form.Control name="message" as="textarea" rows={3}  value={PostData.message} onChange={handlePostchange}/>
            </Form.Group>

            <Button variant="primary" onClick={clear}>clear</Button>{'   '}
            <Button type="submit" onSubmit={AddPost} >ADD</Button>

          </Form>

          </Container>
        </Offcanvas.Body> 

     </Offcanvas>
  )}


    </>
  );
}
export default Postform;
