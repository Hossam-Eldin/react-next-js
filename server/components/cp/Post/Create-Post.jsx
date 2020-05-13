import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import axios from 'axios';
import { observer, inject } from 'mobx-react'
import TagsInput from 'react-tagsinput'
import '../../../assets/cp/components/tags.scss'
import Router from 'next/router';

@inject('store')
class create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            tags: [],
            file: null

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
        this.setState({ file: URL.createObjectURL(e.target.files[0]) })
        //  console.log(this.image.files[0]);        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let post = new FormData();
        post.append('image', this.image.files[0], this.image.files[0].name);
        post.append('title', this.title.value);
        post.append('summery', this.summery.value);
        post.append('section_id', this.section.value);
        post.append('type', 'Post');
        post.append('status', 'published')

        if (this.state.tags) {
            for (let i = 0; i < this.state.tags.length; i++) {
                post.append('tags', this.state.tags[i])
            }
        }

        this.props.store.posts.createPost(post);

/*         axios.post('/api/create-post', post)
            .then(response => {
                console.log(response)
                if (response.data.data == 'success') {
                    Router.push('/articles/list')  
              }
            })
            .catch(error => {
                console.log(error)
            }) */
    }

    render() {
        return (
            <div>

                <h6>upload meme or image </h6>
                <form onSubmit={e => { this.handleSubmit(e) }} className=" container-fluid row">
                    <div className="col-4">
                        <div className="form-group">
                            <button type="button" onClick={e => { this.image.click() }} className="btn btn-upload">upload image</button>

                            <input type="file"
                                required
                                ref={input => (this.image = input)}
                                onChange={this.imageHandler}
                                className="form-control upload-input" />

                            <img src={this.state.file} className="img-fluid image-viewer" alt="" />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group">
                            <label htmlFor="">Post Title</label>
                            <input type="text" 
                                    ref={input => this.title = input} 
                                    className="ant-input o-input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">summery</label>
                            <textarea ref={input => this.summery = input} className="ant-input o-input" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">section </label>
                            <select ref={input => this.section = input} className="ant-input o-input" required>
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

export default create;