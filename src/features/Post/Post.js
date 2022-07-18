import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAvatar, fetchComments } from '../../store/redditSlice';
import './Post.css'
import { Avatar } from '../Avatar/Avatar';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { Comment } from '../Comment/Comment';
import "react-loading-skeleton/dist/skeleton.css";
export const Post = (props)=>{
    const {post,index} = props;
    const dispatch = useDispatch();
    

    const toggleComments = () =>{
        const permalink = post.permalink;
        dispatch(fetchComments(index,permalink));
        
    }
    useEffect(()=>{
        dispatch(fetchAvatar(index,post.author));
    },[dispatch])

    
    const showComments = ()=>{
        if(post.commentError){
            return(
                <div>
                    <p>
                        Error Occured
                    </p>
                </div>
            )
        }
        if(post.loadingComments){
            return(
                <div className='loading'>
                    
                        <p>Loading...</p>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>

                   
                </div>
            )


        }
        if(post.showComments){
            if(post.comments.length ===0){
                return(
                    <h4>No comments yet!</h4>
                )
            }
            return(
                <div>
                    {post.comments.map(comment=>(
                     <Comment comment={comment}/>
                    ))} 
               </div>

            )
        }
        return null;
    }
    
    return(
        <article key={post.id}>
            <div className="post-container" >
                <h3 className="post-title">{post.title}</h3>
                <div className="post-details">
                  <span className="author-details">
                    <Avatar name={post.posterUrl} />
                    <span className="author-username">{`u/${post.author}`}</span>
                  </span>
                  <span>{moment.unix(post.created_utc).fromNow()}</span>
                </div>

                <div className="post-image-container">
                  <img src={post.url} alt="" className="post-image" />
                </div>

                
                <div className='comment-container'>
                  <span className="post-comments-container">
                    <button
                      type="button"
                      className={`comment-button ${
                        post.showComments && 'showing-comments'
                      }`}
                      onClick={()=> toggleComments()}
                      aria-label="Show comments"
                    >
                        Comments
                      
                    </button>
                    
                  </span>
                  {showComments()}
                  
                  
                </div>
                
            </div>
        </article>
       
    )


}