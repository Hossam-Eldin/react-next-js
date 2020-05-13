import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import tagStyle from '../../../assets/cp/components/tags.scss'
import { inject } from 'mobx-react'
import { Upload, Icon, message, Modal } from 'antd';
import MainForm from './MainForm';
import SectionsForm from './SectionsForm';

@inject('store')
class imageUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            tags: [],
            sections: [],
            title: '',
            description: '',
            image_url: '',
            section: ''
        };
    }

    handleTags = (tags) => { this.setState({ tags }) }

    componentDidMount() {
        this.props.store.sections.getSection().then(response => {
            this.setState({
                sections: response.data.result
            })
        })

    }


    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        })
    }



    //handle section select
    /*    handleSection = (e) => {
   
           this.setState({
               selected: e.currentTarget.value,
           })
           console.log(this.state.section)
       } */
    handleSection = e => {
        e.preventDefault();
        //console.log(e.target.value);
        this.setState({ section: e.target.value });
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value })
        //  console.log(this.state.title, this.state.description, `this section id ${this.state.section}`);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { image_url, title, description, section } = this.state;

        console.log(image_url, title, description, section);

        let user = JSON.parse(localStorage.getItem('user_data'))
        let post = new FormData();
        //  post.append('image', this.image.files[0], this.image.files[0].name);
        post.append('type', 'Image_Link');
        post.append('user_id', user.id)
        post.append('image_url', image_url);
        post.append('title', title);
        if (description) {
            post.append('description', description);
        }

        if (this.state.tags) {
            for (let i = 0; i < this.state.tags.length; i++) {
                post.append('tags', this.state.tags[i])
            }
        }

        /*    this.props.store.posts.userCreatePost(post).then(response => {
               console.log(response);
               if (response.data.message === 'success') {
                   message.success("post is created ");
                   this.props.cancel();
               }
           }) */
    }

    render() {
        let { step } = this.state;
        switch (step) {

            case 1:
                return (
                    <div>

                        <input type="text"
                            className="form-control input-o"
                            name="image_url" placeholder="image url"
                            onChange={this.handleChange('image_url')} />
                        <button className="btn btn-info" onClick={this.nextStep}>next</button>
                    </div>
                )
            case 2:
                return <MainForm
                    nextStep={this.nextStep}
                    handleChange={this.handleChange} />
            case 3:
                return <SectionsForm nextStep={this.nextStep}
                    handleSubmit={this.handleSubmit}
                    handleSection={this.handleSection}
                    sections={this.state.sections}
                    prevStep={this.prevStep} />
        }


    }
}

export default imageUrl;