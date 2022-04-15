
import { useState } from "react";
import { Button,Offcanvas,FloatingLabel,Form } from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import { useNavigate} from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from "../../redux/actions/A_Posts";
import { useDispatch } from "react-redux";


const Search=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [search,setsearch]=useState('');
  const [tags,settags]=useState([]);
  
  const handlekeypress=(e)=>{
    if(e.keyCode===13){
      console.log(search);
    }
  }

  const handleAdd=(tag)=>{settags([...tags,tag])}
  const handleDelete=(tagtodelete)=>{settags(tags.filter((tag)=>tag!==tagtodelete))};

  
  const searchPost = async() => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      setShow(false);
    } else {
      navigate('/');
      setShow(false);
    }

  };

  return(
    <> 
  <Button variant="primary" onClick={handleShow} className="me-2"><BsSearch /></Button>
  <Offcanvas show={show} onHide={handleClose} placement='bottom'   >
    <Offcanvas.Body>
    <>
        <FloatingLabel controlId="floatingInput" label="Search" className="mb-1">
          <Form.Control 
          name="search" type="text" placeholder="The tajmahal"
          value={search} onChange={(e)=>{setsearch(e.target.value)}}  
          onKeyDown={handlekeypress}
          />
        </FloatingLabel>
        <ChipInput
          style={{margin:'10px 0'}}
          value={tags}
          fullWidth
          onAdd={handleAdd}
          onDelete={handleDelete}
          label="search tags"
          variant="outlined"
        />
      <Button onClick={searchPost} >Search</Button>
      </>
    </Offcanvas.Body> 
</Offcanvas>

    </>
  );
}
export default Search;
