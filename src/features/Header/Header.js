import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";
import './Header.css';
import { HiOutlineSearch, HiOutlineX} from 'react-icons/hi';

export const Header = () =>{
  const dispatch = useDispatch();
  const [searchTermCurrent, setSearchTermCurrent] = useState('');
  const searchTerm = useSelector(state=>state.reddit.searchTerm);
  const onTermChange = (e)=>{
    setSearchTermCurrent(e.target.value);
  }
  useEffect(()=>{
    setSearchTermCurrent(searchTerm);
    
  },[searchTerm])
  const onTermSubmit = (e) =>{
    e.preventDefault()
    dispatch(setSearchTerm(searchTermCurrent));
    
  }
  const onClear = () =>{
    const form = document.getElementById("formMain");
    setSearchTermCurrent('');
    dispatch(setSearchTerm(searchTermCurrent));
    form.reset();
    
  }
  const renderSearchTerm=() =>{
    if(searchTerm!==""){
      return(
        
          
          <button onClick={onClear} className="clearIcon" >
            <HiOutlineX/>
          </button>
      
        )
    }
    return(
      
        <button type="submit" aria-label="Search" onSubmit={onTermSubmit} className="searchIcon" >
          <HiOutlineSearch/>
        </button>
      
    )
    
  }
  

  return(
      <div className= 'header'>
          <div className="logo">
            <h1>
                Reddit Wrangler
            </h1>
          </div>
          <form id="formMain" className="search" onSubmit={onTermSubmit}>
            <input
              type="text"
              placeholder="Search Posts"
              aria-label="Search posts"
              onChange={onTermChange}
            />
            
              {renderSearchTerm()}
           
            
          </form>
          
      </div>
  )
}