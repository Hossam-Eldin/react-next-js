import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'next/router'
import Admin from '../../../components/layouts/admin'
import Router from 'next/router';



class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: {}
        };
    }

    componentDidMount() {
        //  alert(this.props.router.query.id);

        Axios.get('/api/section/' + this.props.router.query.id)
            .then(response => {
                console.log(response);
                this.setState({
                    section: response.data.data
                })
            })
            .catch(error => {
                console.log(error);

            })

    }

    handleSubmit = (e) => {

        e.preventDefault()

        console.log(this.title.value, this.description.value, this.image.value);
        const section = new FormData();
        if (this.image.files[0]) {
            section.append('image', this.image.files[0], this.image.files[0].name)
        }
        if (this.title.value) {
            section.append('title', this.title.value);
        }
        if (this.description.value) {

            section.append('description', this.description.value);
        }

        Axios.patch('/api/section-update/' + this.props.router.query.id, section).then(response => {
            console.log(response)
            if (response.data.data =='success') {
                Router.push('/section/list');
            }
        }).catch(error => {
            console.log(error)
        })

    }

    render() {
        return (
            <Admin>
                <form className="row" onSubmit={e => { this.handleSubmit(e) }} encType="multipart/form-data">

                    <blockquote className="blockquote">
                        <footer className="blockquote-footer small"> Updated At <cite title="Source Title">{this.state.section.updatedAt}</cite></footer>
                        <footer className="blockquote-footer small"> Created At <cite title="Source Title">{this.state.section.createdAt}</cite></footer>
                    </blockquote>
                    <div className="form-group col-12">
                        <label htmlFor="">category title</label>
                        <input type="text" ref={input => this.title = input} className="form-control" placeholder={this.state.section.name} />
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="">category description</label>
                        <textarea ref={input => this.description = input} className="form-control" rows="2"></textarea>
                    </div>

                    <div className="col-6">
                        <label htmlFor="">Old Description</label>
                        <p> {this.state.section.description}</p>
                    </div>
                    <img src={this.state.section.icon} className="img-fluid img-thumbnail " alt="" />
                    <div className="form-group col-12">
                        <label htmlFor="">Category Icon (image)</label>
                        <input type="file" ref={input => this.image = input} className="form-control" />
                    </div>

                    <button className="btn btn-info">Create</button>
                </form>

            </Admin>
        );
    }
}

export default withRouter(edit);
