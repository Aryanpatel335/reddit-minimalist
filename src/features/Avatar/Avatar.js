import './Avatar.css'

export const Avatar = (props)=>{

    const {name} = props

    return(
        <div className='avatar-image'>
            <img
                src={name}
                alt={`${name} profile`}
                className="avatar"

            />
        </div>


    )
}