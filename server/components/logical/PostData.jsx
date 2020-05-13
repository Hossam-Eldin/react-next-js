import React from 'react'
import {withRouter} from 'next/router'




const PostData = withRouter((props)=>{

    return(
        <div>
            <h1>{props.router.query.title}</h1>

        </div>
    )
});

export  default PostData;