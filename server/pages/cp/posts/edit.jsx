import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'next/router'
import Admin from '../../../components/layouts/admin'
import TagsInput from 'react-tagsinput'
import tagStyle from '../../../assets/cp/components/tags.scss'
import Router from 'next/router';

class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            tags: [],
            newTags: [],
            sections: [],
            success: null
        };
    }


    componentDidMount() {
        //console.log(this.props.router.query.id)
        Axios.get('/api/post/?post_id=' + this.props.router.query.id)
            .then(response => {
                this.setState({
                    post: response.data.data,
                    tags: response.data.data.tags
                })
            })
            .catch(error => {
                console.log(error)
            })
        //get sections
        Axios.get('/api/sections')
            .then(response => {
                this.setState({
                    sections: response.data.result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    submitHandle = async (e) => {
        e.preventDefault()
        let post  = this.state.post;
        let newPost = new FormData();
        if (this.title.value) {
            newPost.append('title', this.title.value)
        }
        if (post.summery && this.summery.value) {
            newPost.append('summery', this.summery.value);
        }

        if (post.video_link && this.videoLink.value) {
            newPost.append('video_link', this.videoLink.value)
        }
        if (post.image_link && this.image_link.value) {
            newPost.append('image_link', this.image_link.value)
        }
        if (post.ext_link && this.ext_link.value) {
            newPost.append('ext_link', this.ext_link.value)
        }
        if (post.thumbnail && this.thumbnail.files[0]) {
            newPost.append('image', this.thumbnail.files[0], this.thumbnail.files[0].name)
        }

        if (this.section_id.value) {
            newPost.append('section_id', this.section_id.value)
        }

        try {
            let response = await Axios.patch('/api/post/edit-admin/' + this.props.router.query.id,newPost)
            console.log(response)
            if (response.data.data == 'success') {
                    Router.push('/posts/list');
            }
        } catch (error) {
            console.log(error)
        }


    }

    //tags input
    handleTags = (newTags) => { this.setState({ newTags }) }


    //delete map tag not the tag it self
    deleteMap = async (id) => {
        try {
            let response = await Axios.delete('/api/map-delete/' + id)
            this.setState({
                success: response.data.data
            })
        } catch (error) {

        }
    }


    // handling creating new tags for articles 
    createMap = async (e) => {
        e.preventDefault();
        console.log('this tragerd')

        let data = {
            'tags': this.state.newTags,
            'section_id': this.section.value,
            'post_id': this.props.router.query.id
        }

        try {
            let response = await Axios.post('/api/map-create', data)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let post = this.state.post;

        let summeryInput = (
            <div className="form-group">
                <label htmlFor="">Summery</label>
                <p>{post.summery}</p>
                <textarea className="ant-input" ref={input => this.summery = input}></textarea>
            </div>
        )

        let ext_linkInput = (
            <div className="form-group">
                <label htmlFor="">External Link</label>
                <p>{post.ext_link}</p>
                <textarea className="ant-input" ref={input => this.ext_link = input}></textarea>
            </div>
        )

        let image_linkInput = (
            <div className="form-group">
                <label htmlFor="">image Link</label>
                <p>{post.image_link}</p>
                <textarea className="ant-input" ref={input => this.image_link = input}></textarea>
            </div>
        )

            let videoLinkInput = (
                <div className="form-group">
                    <label htmlFor="">video Link</label>
                    <p>{post.video_link}</p>
                    <textarea className="ant-input" ref={input => { this.videoLink = input }}></textarea>
                </div>
            )
            let thumbnailInput = (
                <div className="from-group">
                    <label htmlFor="">Image</label>
                    <img src={post.thumbnail} className="img-fluid" alt="" />
                    <input type="file" className="ant-input" ref={input => this.thumbnail = input} />
                </div>
            )
        let sectionsInput = (
            <div className="form-group">
                <label htmlFor="">Sections</label>
                <select className="ant-input" ref={input => this.section_id = input} >
                <option value={post.SectionId} >{post.Section_name}</option>
                    {
                        
                            this.state.sections.map(el => {
                                return <option key={el.id} value={el.id}>{el.name}</option>
                            })
                    }
                </select>
            </div>
        )
        return (
            <Admin>
                <form onSubmit={this.submitHandle}>
                    {/*  title */}
                    <div className="form-group">
                        <label htmlFor=""> Title Post </label>
                        <input type="text" className="ant-input" ref={input => this.title = input} placeholder={post.title} />
                    </div>
                    {/* sections select */}
                    {sectionsInput}
                    {/* summery */}
                    {post.summery ? summeryInput : null}
                    {/* external link */}
                    {post.ext_link ? ext_linkInput : null}
                    {/* video link */}
                    {post.video_link ? videoLinkInput : null}
                    {/* image link */}
                    {post.image_link ? image_linkInput : null}
                    {/** thumbnail*/}
                    {post.thumbnail ? thumbnailInput : null}

                    <button type="submit" className="ant-btn btn-block">Update </button>
                </form>
                {/** delete old tags  */}
                <div className="col-12 mt-5 border-top p-3">
                    <p className="h4">delete old Tags</p>
                    <div className="row">

                        {this.state.tags.map(el => {
                            return (
                                <div key={el.map_id} className="col-1 p-1  m-1 clearfix border">
                                    <span className="float-left">{el.tag_name}</span>
                                    <button className="float-right ant-btn" onClick={e => { this.deleteMap(el.map_id) }}>X</button>
                                </div>
                            )
                        })}
                    </div>

                </div>

                {/*  creating new tags form */}
                <form onSubmit={this.createMap} className="border-top mt-5 pt-3">
                    {/*  tags */}
                    <div className="form-group" style={tagStyle}>
                        <label htmlFor="" className="h4">Add New Tags</label>
                        <TagsInput value={this.state.newTags} onChange={this.handleTags} />
                    </div>

                    <button type="submit" className="ant-btn btn-block">add new </button>
                </form>
            </Admin>
        );
    }
}

export default withRouter(edit);