import React, { Component } from 'react';
import { Radio } from 'antd';
import Axios from 'axios';
import { withRouter } from 'next/router'
import Admin from '../../../components/layouts/admin'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styles from '../../../assets/cp/components/editor.scss'
import { Alert } from 'antd';
import Router from 'next/router';
import TagsInput from 'react-tagsinput'
import tagStyle from '../../../assets/cp/components/tags.scss'



const RadioGroup = Radio.Group;

class edit extends Component {

    constructor(props) {
        super(props);


        this.state = {
            article_status: '',
            editor: null,
            editorState: null,
            html: null,
            article_id: '',
            post: {},
            input_content: null,
            success: null,
            tags: [],
            newTags: []
        };
    }


    //status of the article 
    articleState = (e) => { this.setState({ article_status: e.target.value, }); }


    //handling displaying the editor and the current content for the article
    componentDidMount() {
        this.getPost().then(response => {
            console.log(response)
            this.setState({
                post: response.data.data,
                article_status: response.data.data.status,
                html: response.data.data.content,
                tags: response.data.data.tags
            })

            const contentBlock = htmlToDraft(this.state.html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({
                    editorState: editorState,
                    editor: Editor

                })
            }
        })
    }


    //to display image you want to upload
    imageHandler = e => {
        this.setState({ file: URL.createObjectURL(e.target.files[0]) })
        //  console.log(this.image.files[0]);        
    }

    //for editor render
    onEditorStateChange = (editorState) => { this.setState({ editorState, }); }



    //tags input
    handleTags = (newTags) => { this.setState({ newTags }) }



    //handling update
    updateArticle = async (e) => {
        e.preventDefault()

        console.log(this.title.value);
        let article = new FormData();
        if (this.title.value) {
            article.append('title', this.title.value)
        }
        if (this.state.article_status) {
            article.append('status', this.state.article_status)
        }
        if (this.summery.value) {
            article.append('summery', this.summery.value);
        }
        if (this.content.value != this.state.html) {
            article.append('content', this.content.value)
        }
        if (this.image.value) {
            article.append('image', this.image.files[0], this.image.files[0].name)
        }
        if (this.seo.value) {
            
            article.append('seo', this.seo.value);
        }
        if (this.lang.value) {
            
            article.append('lang', this.lang.value);
        }

        try {
            let response = await Axios.patch('/api/article-update/' + this.props.router.query.id, article)
            this.setState({
                success: response.data.data
            })
            Router.push('/cp/articles/list')
        } catch (error) {
            console.log(error)
        }
    }




    //get current article data
    getPost = async (e) => {
        let article;
        try {
            article = await Axios.get('/api/article/?id=' + this.props.router.query.id)

        } catch (error) {
            console.error(error)
        }

        return article
    }





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
            'section_id': '1',
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
        const ClientEditor = this.state.editor
        const { editorState } = this.state;
        return (
            <Admin>
                {
                    this.state.success ?
                        <Alert message={this.state.success} type="info" closeText="Close Now" />
                        : null
                }

                <div className="row">
                    <div className="col-8">
                        <form onSubmit={this.updateArticle} className="form-container">
                            {/* title article */}
                            <div className="form-group" >
                                <label htmlFor="">Article Title</label>
                                <input type="text" className="form-control" ref={input => { this.title = input }} placeholder={post.title} />
                            </div>

                            {/*  summery */}
                            <div className="form-group">
                                <label htmlFor="">summery</label>
                                <textarea className="form-control" defaultValue={post.summery} rows="2" ref={input => (this.summery = input)}></textarea>
                                {/*   current summery */}
                                <label htmlFor="">current summery </label>
                                <p className="p-3  bg-light text-dark">{post.summery}</p>
                            </div>


                            {/* //image upload for article */}
                            <div className="form-group row">
                                {/* image upload */}
                                <div className="image-upload col-6">
                                    <label htmlFor="">Article Thumbnail  </label>
                                    <button type="button" onClick={e => { this.image.click() }} className="btn ml-3">upload image</button>

                                    <input type="file"
                                        ref={input => (this.image = input)}
                                        onChange={this.imageHandler}
                                        className="form-control" />
                                    <img src={this.state.file} className="img-fluid" alt="" />
                                </div>
                                <img src={post.image} style={{ height: 200 }} className="img-thumbnail float-right" alt="" />

                            </div>
                            {/* editor section */}
                            <div className="form-group">
                                <div className="editor-style">
                                    {this.state.editor ? (
                                        <div style={styles}>
                                            <ClientEditor
                                                className="bg-light"
                                                editorState={editorState}
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="demo-editor"
                                                onEditorStateChange={this.onEditorStateChange} />
                                            <textarea
                                                disabled
                                                className="form-control"
                                                ref={input => this.content = input}
                                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
                                        </div>
                                    ) : null}
                                </div>
                            </div>


                            {/* seo keywords */}
                            <div className="form-group  mb-5 mt-5">
                                <label htmlFor="">Seo Key words</label>
                                <textarea rows="2" ref={input => this.seo = input} className="form-control"></textarea>
                                <p>
                                    old keywords: {post.keywords}
                                </p>
                            </div>

                            {/* article state */}
                            <div className="form-group">
                                <label htmlFor="" className="mr-4">Article Status</label>
                                <RadioGroup onChange={this.articleState} value={this.state.article_status}>
                                    <Radio value="draft">draft</Radio>
                                    <Radio value="published">publish</Radio>
                                </RadioGroup>
                            </div>


                            {/*lang selection*/}
                            <div className="form-group mb-5">
                                <label htmlFor="">language</label>
                                <select className="form-control" ref={input => this.lang = input}>
                                    <option value="EN">English</option>
                                    <option value="AR">Arabic</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-info">update</button>

                        </form>
                    </div>
                    {/* /end of col-8 */}
                    <div className="col-4">
                        {/*  creating new tags form */}
                        <form onSubmit={this.createMap} className="border-top mt-5 pt-3">
                            {/*  tags */}
                            <div className="form-group" style={tagStyle}>
                                <label htmlFor="">Add New Tags</label>
                                <TagsInput value={this.state.newTags} onChange={this.handleTags} />
                            </div>

                            <button type="submit" className="btn btn-success">add new </button>
                        </form>
                            {/** delete old tags  */}
                            <div className="form-group">
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
                    </div>
                </div>

            </Admin>
        );
    }
}

export default withRouter(edit);