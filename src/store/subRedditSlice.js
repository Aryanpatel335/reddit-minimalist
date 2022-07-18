import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';  

const subRedditSlice = createSlice({
    name: 'subreddits',
    initialState:{
        subreddits: [],
        isLoading:false,
        errorOccured: false
    },
    reducers:{
        startLoadingProcess(state){
            state.isLoading = true;
            state.errorOccured = false;



        },
        setLoadedSubreddits(state,action){
            state.isLoading= false;
            state.subreddits = action.payload;


        },
        loadingError(state){
            state.errorOccured= true;
            state.isLoading= false;

        }

    }
})


export default subRedditSlice.reducer;


export const { startLoadingProcess, setLoadedSubreddits, loadingError} = subRedditSlice.actions;





//when fetchSubreddits() is called it will return a function, when called inside the dispatch it will dispatch the function returned by the fetchSubreddits()
export function fetchSubreddits() {
    return async function fetchSubredditsThunk(dispatch){
        try{
            dispatch(startLoadingProcess());
            const subreddits = await getSubreddits();
            dispatch(setLoadedSubreddits(subreddits));
        }
        catch(error){
            dispatch(loadingError());
        }
    }   
}

export const currentSubreddits = (state) => state.subreddits.subreddits;