import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubreddit, setSelectedSubreddit } from "../../store/redditSlice";
import { fetchSubreddits,currentSubreddits } from "../../store/subRedditSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Subreddits.css';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
export const Subreddits = () =>{

    const dispatch = useDispatch();
    const subreddits= useSelector(currentSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    useEffect(()=>{
        dispatch(fetchSubreddits());
    },[dispatch])

    const scrl = useRef()
    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
    };
    
    
    return(
        
            
            <div className="container">
                
                
                <div className="horizontal-scroll" ref={scrl} >
                    
                    <button className="btn-scroll" id="btn-scroll-left" onClick={()=> slide(-500)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button className="btn-scroll" id="btn-scroll-right" onClick={()=> slide(500)}><FontAwesomeIcon icon={faChevronRight}/></button>

                    
                   
                    <div className="subreddit-container">
                        {subreddits.map(subreddit=>(
                            
                                <button
                                className={`${selectedSubreddit === subreddit.url && "subreddit-clicked"} subreddit-btn`}
                                onClick={()=>dispatch(setSelectedSubreddit(subreddit.url))}
                                key={subreddit.id}>
                                    <img
                                        src={subreddit.icon_img || "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5" }
                                        alt={`${subreddit.display_name}`}
                                    />


                                    {subreddit.display_name}
                                </button>


                           
                        ))}

                    </div>
                    
                </div>
                
            </div>

        



    )


}