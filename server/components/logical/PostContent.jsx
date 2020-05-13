import React from 'react';
import axios from 'axios';
import {PostHeader} from "../index";

class PostContent extends  React.Component{


    render(){
        if(this.state.post){
            return(
                <div>
                    <PostHeader
                        title={this.state.post.title}
                        image={this.state.post.image}
                    />
    
                </div>
            )
        }
        else{
            return(<div>Loading ....</div>)
        }
    }
}


export  default PostContent;