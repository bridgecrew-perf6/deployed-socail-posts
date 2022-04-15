import React, { useEffect, useState } from 'react';
import {  Pagination } from "react-bootstrap";
import {  useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetPosts } from '../redux/actions/A_Posts';


const Paginations =({page})=>{ 
    const navigate=useNavigate();

    const { currentPage,numberOfPages } = useSelector((state) => state.R_Posts);
    const dispatch = useDispatch();
    useEffect(() => {
      if (page) {
        dispatch(GetPosts(page));
        //console.log(page);
      }
    }, [dispatch, page]);
    


    let items = [];
    const hanldepagination=(number)=>{
      navigate(`/posts/?page=${number}`);
    }
    for (let number = 1; number <= numberOfPages; number++) {
    items.push(<Pagination.Item key={number} onClick={()=>{hanldepagination(number)}} >{number}</Pagination.Item>,);}
    
  return(
    <>
    <Pagination>
        <Pagination.First onClick={()=>{
          if(currentPage>1)
            hanldepagination(currentPage-1);
          }
          }/>
        <Pagination size="md">{items}</Pagination>
        <Pagination.Last onClick={()=>{
          if(currentPage<items.length)
            hanldepagination(currentPage+1)
          }
          }/>
    </Pagination>
    <br />
   
    </>
  );
}
  
export default Paginations;