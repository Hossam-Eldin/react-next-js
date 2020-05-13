/**Reply Box  */

import React, { Component } from 'react';
import Axios from 'axios'

class commentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleForm = (e) => {
        e.preventDefault();
        
        let data = {
            comment: this.comment.value,
            user_id: this.props.userId,
            post_id: this.props.postId,
            comment_id: this.props.commentId
            
        }
     //   console.log('comment box post id '+this.props.postId)
         Axios.post('/api/create-reply', data, { headers: { 'api-key': 'the_key' } })
            .then(response => {
                console.log(response.data)

            })
            .catch(err => {
                alert(err)
            }) 

    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleForm} className="pb-5">
                    <div className="form-group">
                        <textarea className="form-control comment-o"
                            ref={input => this.comment = input}
                            cols="10" rows="1"></textarea>
                    </div>
                    <button className="btn btn-outline-info">Save</button>
                </form>
            </div>
        );
    }
}

export default commentBox;