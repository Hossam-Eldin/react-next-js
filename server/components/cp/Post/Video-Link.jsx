import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import axios from 'axios';
import { observer, inject } from 'mobx-react'
import TagsInput from 'react-tagsinput'
import '../../../assets/cp/components/tags.scss'


@inject('store')
class VideoLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            tags: [],
            VideoLink: null

        };
    }

    componentWillMount() {

        this.props.store.sections.getSection().then(res => {
            this.setState({
                sections: res.data.result
            })
        })

    }
    handleTags = (tags) => { this.setState({ tags }) }

    imageHandler = e => {
        this.setState({ VideoLink:this.VideoLink.value})
        //  console.log(this.image.files[0]);        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let post = new FormData();
        post.append('title', this.title.value);
        post.append('section_id', this.section.value);
        post.append('type', 'Video_Link');
        post.append('status', 'published')
        post.append('video_link', this.VideoLink.value);


        if (this.summery.value) {
            post.append('summery', this.summery.value);
        }
        if (this.state.tags) {
            for (let i = 0; i < this.state.tags.length; i++) {
                post.append('tags', this.state.tags[i])
            }
        }
        this.props.store.posts.createPost(post);

 /*        axios.post('/api/create-post', post)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            }) */
    }

    render() {
        return (
            <div>

                <p>link  Video</p>
                <form onSubmit={e => { this.handleSubmit(e) }} className="container-fluid row">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="">Video Link</label>
                                <input type="text" ref={input => this.VideoLink = input} 
                                className="ant-input o-input"
                                placeholder="link video"
                                 required onChange={this.imageHandler}/>
                                 {this.state.VideoLink}
{/*                            <iframe width="auto" height="auto" src={this.state.VideoLink} frameBorder="0"></iframe>
 */}                           <div className="col-12" dangerouslySetInnerHTML={{__html:this.state.VideoLink}}></div>
                        </div>
                    </div>

                    <div className="col-8">
                        <div className="form-group">
                            <label htmlFor="">Post Title</label>
                            <input type="text" ref={input => this.title = input} className="ant-input o-input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">summery</label>
                            <textarea ref={input => this.summery = input} className="ant-input o-input"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">section </label>
                            <select ref={input => this.section = input} className="ant-input o-input" required>
                                <option value="">Select Section</option>
                                {
                                    this.state.sections.map(section => {
                                        return <option key={section.id} value={section.id}>{section.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""> Tags</label>
                            <TagsInput value={this.state.tags} onChange={this.handleTags} required />
                        </div>

                    </div>





                    <button className="ant-btn">create</button>

                </form>

            </div>
        );
    }
}

export default VideoLink;