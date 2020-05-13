import React, { Component } from 'react';
import Layout from '../../../components/layouts/admin';
import axios from 'axios';
import Router from 'next/router';

class createAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            userName: this.username.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            password: this.password.value,
            type:this.type.value,
        }
        console.log(data)

        axios.post('/api/admin-create', data)
            .then(response => {
                console.log(response);
                if (response.data.message == 'success') {
                     Router.push('/cp/home');   
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Layout>
                <div>
                    <form className="row" onSubmit={e => { this.handleSubmit(e) }}>
                        <div className="col-8 col-lg-5 d-block mx-auto">


                            <div className="form-group">
                                <label htmlFor="">username</label>
                                <input type="text" className="form-control" ref={input => this.username = input} placeholder="user name"  required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">first name</label>
                                <input type="text" className="form-control" ref={input => this.firstName = input} placeholder="first name"  required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">last name</label>
                                <input type="text" className="form-control" ref={input => this.lastName = input} placeholder="last name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="email" className="form-control"  ref={input => this.email = input}  placeholder="example@example.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">password</label>
                                <input type="password" className="form-control" ref={input => this.password = input} placeholder="password"  required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Type</label>
                                <select className="form-control"  ref={input =>  this.type = input} required>
                                    <option value="">Select admin Type</option>
                                    <option value="Super-Admin">Super-Admin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Writer">Writer</option>
                                    <option value="Writer">Editor</option>
                                </select>
                            </div>

                            <button className="btn btn-block btn-info">Create</button>
                        </div>
                    </form>
                </div>

            </Layout>
        );
    }
}

export default createAdmin;