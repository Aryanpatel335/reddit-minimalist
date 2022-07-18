//https://github.com/reddit-archive/reddit/wiki/JSON
//starting using /r/Pics




export const API_ROOT = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit) =>{
    
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    const json = await response.json();
    
    return json.data.children.map((post)=> post.data);


}

export const getSubreddits = async () =>{
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
    return await json.data.children.map((subreddit)=> subreddit.data);

    

}

export const getPostComments  = async (permaLink) =>{
    const response = await fetch(`${API_ROOT}${permaLink}.json`);
    const json = await response.json();


    return json[1].data.children.map((subreddit) => subreddit.data);

}
//accessed via author in posts array and comments array
export const getAvatars = async (author) =>{
    const response= await fetch(`https://www.reddit.com/user/${author}/about.json`)
    const json = await response.json();
    
    const userData = json.data.icon_img
    const strippedUrl = userData.split('?')[0]
    return strippedUrl;
      
    
}


  
  

// const testingAPI= async () =>{

//     const subreddits = await getSubreddits();
//     const subredditSampleUrl = subreddits[2].url;
//     const sendtoGetPosts= await getSubredditPosts(subredditSampleUrl);
//     const permaLinktoPass = sendtoGetPosts[1].permalink;
//     const returnedPostComments = await getPostComments(permaLinktoPass);
//     //This will return an array of all the comments given by the JSON promise
//     console.log(returnedPostComments.map(comment=> comment.body===undefined ? 'No Comment Available' :comment.body));
//     //Likely an array of 25 map each one and return the .body property to be the comments by the user;
    

// }
// testingAPI();