import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import Axios from 'axios';
import Router from 'next/router';

class head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            articles: []
        };
    }


    componentDidMount() {
        Axios.get('/api/sections')
            .then(response => {
                this.setState({
                    sections: response.data.result
                })
            })
            .catch(error => {
                console.log(error)
            })
        Axios.get('/api//article-list')
            .then(response => {
                this.setState({
                    articles: response.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    submitHandle = async (e) => {
        e.preventDefault()

        let data = {};
        data.tag = this.tag.value;
        if (this.post_id.value) {
            data.post_id = this.post_id.value;
        }

        if (this.section_id.value) {
            data.section_id = this.section_id.value;
        }

        try {
            let response = await Axios.post('/api/create-landing', data);
            console.log(response);
            if (response.data.message == 'success') {
                Router.push('/landing/head');
            }
        } catch (error) {
            console.log(error)
        }

    }


    render() {
        return (
            <Layout>
                <div>
                    Featured Posts Chose by Admins
                </div>

                <form onSubmit={this.submitHandle}>
                    {/* Featured Tag */}
                    <div className="form-group">
                        <select ref={input => this.tag = input} className="ant-input" required >
                            <option value="">Select Tag For Landing</option>
                            <option value="featured">featured for big posts in top </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Articles</label>
                        <select ref={input => this.post_id = input} className="ant-input">
                            <option value="">Select Article</option>
                            {
                                this.state.articles.map(el => {
                                    return <option value={el.id}>{el.title}</option>
                                })
                            }
                        </select>
                    </div>


                    {/* sections */}
                    <div className="form-group">
                        <label htmlFor="">Sections</label>
                        <select ref={input => this.section_id= input} className="ant-input">
                            <option value="">Select Section </option>
                            {
                                this.state.sections.map(el => {
                                    return <option value={el.id} >{el.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <button type="submit" className="ant-btn btn-block"> Create </button>

                </form>
            </Layout>
        );
    }
}

export default head;