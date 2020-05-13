import React, { Component } from 'react';
import Layout from '../../layouts/admin';
import axios from 'axios';
import { observer, inject } from 'mobx-react'
import TagsInput from 'react-tagsinput'
import '../../../assets/cp/components/tags.scss'


@inject('store')
class ImgLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            tags: [],
            imgLink: null

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
        this.setState({ imgLink:this.imgLink.value})
        //  console.log(this.image.files[0]);        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let post = new FormData();
        post.append('title', this.title.value);
        post.append('section_id', this.section.value);
        post.append('image_link', this.imgLink.value);
        post.append('type', 'Image_Link');
        post.append('status', 'published')


        if (this.summery.value) {
            post.append('summery', this.summery.value);
        }
        if (this.state.tags) {
            for (let i = 0; i < this.state.tags.length; i++) {
                post.append('tags', this.state.tags[i])
            }
        }

        this.props.store.posts.createPost(post);

/* 
        axios.post('/api/create-post', post)
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

                <p>link  meme or image , wallpaper </p>
                <form onSubmit={e => { this.handleSubmit(e) }} className=" container-fluid row">
                    <div className="col-4">
                        <div className="form-group">
                                <label htmlFor="">Image Link</label>
                                <input  type="text" ref={input => this.imgLink = input}
                                        className="ant-input o-input" 
                                        onChange={this.imageHandler} required
                                        placeholder="link for image" />
                          <div className="">
                            <img src={this.state.imgLink} className="img-fluid image-viewer" alt="" />
                            </div>
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
                                {
                                    this.state.sections.map(section => {
                                        return <option key={section.id} value={section.id}>{section.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""> Tags</label>
                            <TagsInput value={this.state.tags} onChange={this.handleTags}  required />
                        </div>

                    </div>





                    <button className="ant-btn">create</button>

                </form>

            </div>
        );
    }
}

export default ImgLink;