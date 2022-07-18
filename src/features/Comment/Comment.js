import './Comment.css'
import moment from 'moment';

export const Comment = (props) =>{
    const {comment } = props

    return(
        <div className='comment-container'>
            <div className='body-container'>
                <p className='author'>{comment.author} <span className='commentHour'>{moment.unix(comment.created_utc).fromNow()}</span></p>
                <p className='body'>{comment.body}</p>
            </div>

        </div>
    )

}