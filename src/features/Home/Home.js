import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredPosts, fetchPosts, setSearchTerm } from '../../store/redditSlice';
import { Post } from '../Post/Post';
import './Home.css'
import Skeleton from 'react-loading-skeleton';

export const Home= () =>{
    const reddit = useSelector((state)=>state.reddit);
    const {errorOccured,isLoading,searchTerm,selectedSubreddit} = reddit;
    const posts= useSelector(fetchFilteredPosts);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit,dispatch])
    


    if (posts.length === 0 && !isLoading) {
        return (
          <div className="error">
            <h2>No posts matching "{searchTerm}"</h2>
            <button type="button" className='go-home' onClick={() => dispatch(setSearchTerm(''))}>
              Go Home
            </button>
          </div>
        );
    }

    if(errorOccured){
        return(
            <div className='error'>
                <button className='go-home' onClick={()=>dispatch(fetchPosts(selectedSubreddit))}>
                    Try Again
                </button>
            </div>
        )
    }
    if(isLoading){
      return(
        <>
        {Array(5).fill(
        <div className='main-load'>
          
          <div className='article'>
              <div className="post-container" >
                <Skeleton width={400}/>
                  <div className="post-details">
                    <span className="author-details">
                      <Skeleton width={400}/>
                    </span>

                  </div>

                  <div className="post-image-container">
                    <Skeleton width={400} height={150}/>
                  </div>


                  <div className='comment-container'>
                    <span className="post-comments-container">
                      <Skeleton/>

                    </span>



                  </div>

              </div>
          </div>
        </div>
        )}
        
        </>


      )
    }

    return(
        <div className='mainHome'>
            {posts.map((post, index) => (
              
                <Post
                  key={post.id}
                  post={post}
                  index={index}
                />
              
            ))}
        
        </div>
    )   
    
}