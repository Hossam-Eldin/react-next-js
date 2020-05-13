import React from 'react'
import Admin from '../../../components/layouts/admin'
import { observer, inject } from 'mobx-react'
import TagsInput from 'react-tagsinput'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styles from '../../../assets/cp/components/editor.scss'
import tagStyle from '../../../assets/cp/components/tags.scss'
import { Radio } from 'antd';
import axios from 'axios';
import Axios from 'axios';

const RadioGroup = Radio.Group;



@inject('store')
class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            article_state: 'draft',
            editor: null,
            tags: [],
            file: null,
            sections: [],
            badges: []
        }
    }


    onEditorStateChange = (editorState) => { this.setState({ editorState, }); }

    componentDidMount() {
        //to solve problem of editor displaying  not in right way
        setTimeout(() => {
            this.setState({ editor: Editor })
        }, 1000)


        this.props.store.sections.getSection().then(res => {
            this.setState({
                sections: res.data.result
            })
        })


        Axios.get('/api/badges/')
        .then(response => {
            console.log(response)
            this.setState({ badges: response.data.data })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleTags = (tags) => { this.setState({ tags }) }

    articleState = (e) => { this.setState({ article_state: e.target.value, }); }

    imageHandler = e => {
        this.setState({ file: URL.createObjectURL(e.target.files[0]) })
        //  console.log(this.image.files[0]);        
    }



    handleSubmit = (e) => {
        e.preventDefault()
        const article = new FormData();
        article.append('image', this.image.files[0], this.image.files[0].name)
        article.append('title', this.title.value);
        article.append('summery', this.summery.value);
        article.append('content', this.content.value);
        article.append('status', this.state.article_state);
        article.append('seo', this.seo.value);
        article.append('lang', this.lang.value);
        article.append('badge', this.badge.value);
        for (let i = 0; i < this.state.tags.length; i++) {
            article.append('tags', this.state.tags[i])
        }


        this.props.store.posts.create(article);
    }


    render() {
        const ClientEditor = this.state.editor;
        const { editorState } = this.state;
        return (
            <Admin>
                <div>
                    <form onSubmit={e => { this.handleSubmit(e) }} encType="multipart/form-data" className="form-container row" >

                        <div className="col-md-8">
                            {/*  title  */}
                            <div className="form-group mb-5 mt-5">
                                <label htmlFor="">Article Title</label>
                                <input ref={input => (this.title = input)}
                                    className="form-control"
                                    placeholder="article title" />
                            </div>
                            {/* image upload */}
                            <div className="form-group  image-upload mb-5 mt-5">
                                <label htmlFor="">Article Thumbnail  </label>
                                <button type="button" onClick={e => { this.image.click() }} className="btn ml-4 ">upload image</button>

                                <input type="file"
                                    ref={input => (this.image = input)}
                                    onChange={this.imageHandler}
                                    className="form-control" />
                                <img src={this.state.file} className="img-fluid image-preview" alt="" />
                            </div>
                            {/* article summery */}
                            <div className="form-group mb-5 mt-5">
                                <label htmlFor="">summery</label>
                                <textarea className="form-control" cols="10" rows="2" ref={input => (this.summery = input)}></textarea>
                            </div>

                            {/* editor section */}
                            <div className="form-group mb-4 ">

                                <label htmlFor="" className="h5">Article Content</label>
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

                            {/*  tags */}
                            <div className="form-group mb-5 mt-5" style={tagStyle}>
                                <label htmlFor=""> Tags</label>
                                <TagsInput value={this.state.tags} onChange={this.handleTags} />
                            </div>
                            {/* seo keywords */}
                            <div className="form-group  mb-5 mt-5">
                                <label htmlFor="">Seo Key words</label>
                                <textarea rows="2" ref={input => this.seo = input} className="form-control"></textarea>
                            </div>

                        </div>
                        {/* article state */}


                        <div className="col-md-4">
                            {/* select badge */}
                            <div className="form-group mb-5 mt-5">
                                <label htmlFor="">Badge : <small> for what suit the tune of the article </small></label>
                                <select ref={input => this.badge = input} className="form-control" required>
                                    <option value=""> Select Badge</option>
                                    {this.state.badges.map(el=>{
                                        return <option value={el.name}>{el.name}</option>
                                    })}
                                </select>

                            </div>
                            <div className="form-group  mb-5 mt-5">
                                <label htmlFor="" className="col-12" >Article State</label>
                                <RadioGroup onChange={this.articleState} value={this.state.article_state} className="ml-4">
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
                            {/* section select */}
                            {/*<div className="form-group">*/}
                            {/*<label htmlFor=""> sections </label>*/}
                            {/*<select ref={input => this.section = input} className="ant-input form-control">*/}
                            {/*{*/}
                            {/*this.state.sections ? */}
                            {/*this.state.sections.map(section => {*/}
                            {/*return <option key={section.id} value={section.id}>{section.name}</option>*/}
                            {/*})*/}
                            {/*: null*/}
                            {/*}*/}
                            {/*</select>*/}
                            {/*</div>*/}
                        </div>


                        <button className="btn btn-info m-2 col-12" type="submit">Save</button>
                    </form>
                </div>
            </Admin>

        );
    }
}

export default Create;