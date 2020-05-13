import React, { Component } from 'react';
import axios from 'axios';
import { observer, inject } from 'mobx-react'
import TagsInput from 'react-tagsinput'
import '../../../assets/cp/components/tags.scss'
import 'bootstrap-scss'

@inject('store')
class ExtLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            tags: [],
            extrLink: null

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

    changer = e => {
        this.setState({ extrLink: this.extrLink.value })
        //  console.log(this.image.files[0]);        
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let post = new FormData();
        //  post.append('image', this.image.files[0], this.image.files[0].name);
        post.append('title', this.title.value);
        post.append('section_id', this.section.value);
        post.append('ext_link', this.extrLink.value)
        post.append('type', 'external_link');
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

       /*  axios.post('/api/create-post', post)
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

                <blockquote className="mb-4 blockquote"><span className="blockquote-footer">Post External Link</span></blockquote>
                <form onSubmit={e => { this.handleSubmit(e) }} className="row container-fluid" autoComplete="on">

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="">External Link</label>
                            <input type="text" ref={input => this.extrLink = input}
                                 className="ant-input o-input" onChange={this.changer} required />
                            <a href={this.state.extrLink}> {this.state.extrLink}</a>
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
                            <label htmlFor="" required >section </label>
                            <select ref={input => this.section = input} className="ant-input o-input">
                                {
                                    this.state.sections.map(section => {
                                        return <option key={section.id} value={section.id}>{section.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""> Tags</label>
                            <TagsInput value={this.state.tags} onChange={this.handleTags} />
                        </div>

                    </div>





                    <button className="ant-btn">create</button>

                </form>

            </div>
        );
    }
}

export default ExtLink;