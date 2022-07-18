import { createSlice,createSelector } from "@reduxjs/toolkit";
import { getSubredditPosts, getPostComments,getAvatars } from "../api/reddit";

//to access selectedSubreddit it is under the fetched subreddit array as "url" so using subreddit.url will give the proper output from the object
const redditSlice = createSlice({
    name: "reddit",
    initialState: {
        posts:[],
        errorOccured: false,
        isLoading:false,
        searchTerm: '',
        selectedSubreddit:'/r/Home/',
    },
    reducers:{
        setPosts(state, action) {
            state.posts = action.payload;
        },
        loadPosts(state){
            state.isLoading =true;
            state.errorOccured=false;

        },
        recievedPosts(state,action){
            state.isLoading=false;
            state.posts = action.payload;
            
        },
        postError(state){
            state.isLoading=false;
            state.errorOccured=true;

        },
        setSearchTerm(state,action){
            state.searchTerm = action.payload;
        },
        //will pass in the subreddit url and onClick will call to set the state as the returned url
        setSelectedSubreddit(state,action){
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        toggleComment(state,action){
            state.posts[action.payload].showComments = !state.posts[action.payload].showComments;
        },
        loadComments(state,action){
            //using "showComments", "comments", "commentError", "loadingComments" 
            state.posts[action.payload].showComments = !state.posts[action.payload].showComments;
            if(!state.posts[action.payload].showComments){
                return;
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].commentError = false;


        },
        recievedComments(state,action){
            //payload will include the index of post and the comments corresponding to it
            //payload will be an object of {index,comments}
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.passedComments;
            
            

        },
        commentsError(state,action){
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].commentError = true;

        },
        
        addAvatarUrl(state,action){
            state.posts[action.payload.index].posterUrl = action.payload.url;
        }
    }

});


export const {
    setPosts,
    loadPosts,
    recievedPosts,
    postError,
    setSearchTerm,
    setSelectedSubreddit,
    loadComments,
    recievedComments,
    commentsError,
    toggleComment,
    addAvatarUrl
} = redditSlice.actions

export default redditSlice.reducer;




export const fetchPosts = (subreddit) => async (dispatch)=>{
    try{
        //add the comments and other comment load indicators to the post array;

        dispatch(loadPosts());
        const postsRecieved = await getSubredditPosts(subreddit);
        const postsWithComments = postsRecieved.map((post)=>{
            return{
                ...post,
                showComments: false,
                comments:[],
                commentError: false,
                loadingComments: false,
                posterUrl:''
        }});
        dispatch(recievedPosts(postsWithComments));


    }
    catch(error){
        dispatch(postError());
    }



};

export const fetchComments = (index, permalink) => async (dispatch)=> {
    try{
        dispatch(loadComments(index));
        const passedComments = await getPostComments(permalink);
        dispatch(recievedComments({index,passedComments}));
        

    }
    catch(error){
        dispatch(commentsError());
    }
};

export const fetchAvatar = (index,author) => async (dispatch)=>{
    try{
        
        const url = await getAvatars(author);
        dispatch(addAvatarUrl({index,url}));
    
    }
    catch(error){
      console.log('error')
    }
}

const selectPosts = (state) => state.reddit.posts;
const selectTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;
//export const stateisLoading = (state) => state.reddit.isLoading;

export const fetchFilteredPosts = createSelector(
    [selectPosts,selectTerm],
    (posts,term) =>{
        if(term !== ''){
            return posts.filter((post)=>
                post.title.toLowerCase().includes(term.toLowerCase())
            );


        }
        return posts;

    }

)

