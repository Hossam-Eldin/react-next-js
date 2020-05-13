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
            post_id: this.props.postId

        }
        console.log('comment box post id ' + this.props.postId)
        Axios.post('/api/create-comment', data, { headers: { 'api-key': 'the_key' } })
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
                    <div className="form-group row">
                        <div className="avatar shadow-sm" title={this.props.username}>
                            <img src={this.props.avatar} alt="" className="img-fluid" />
                        </div>
                        <textarea className="form-control col comment-o"
                            ref={input => this.comment = input}
                            ></textarea>
                    </div>
                    <button className="btn btn-outline-info float-right">Post</button>
                </form>
            </div>
        );
    }
}

export default commentBox;