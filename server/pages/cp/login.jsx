import React, { Component } from 'react';
import 'bootstrap-scss';
import Router from 'next/router'
import { inject } from 'mobx-react'
import Axios from 'axios';
import loginStyle from '../../assets/website/forms.scss'

@inject('store')
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    login = async (e) => {
        e.preventDefault()
        let data = {
            username: this.username.value,
            password: this.password.value,
        }

        try {
            let result = await Axios.post('/api/login-admin', data)
            console.log(result);
            
            if (result.data.err) {
                this.setState({
                    error: result.data.err.message
                })
            }
            
          if (result.data.url) {
              Router.push(result.data.url)                
             }  
 
            

        } catch (error) {
            console.log(error)
        }

    }
    render() {
        return (
            <div>
                <div style={loginStyle} className="login-form shadow">
                {
                    this.state.error ?
                        <div className="alert alert-danger" role="alert">  {this.state.error}</div>
                        : 
                     <div className="alert alert-light text-center" role="alert"> Orangeito Dashboard </div>   
                }
                    <form onSubmit={this.login}>

                        <div className="form-group">
                            <input type="text" placeholder="User Name"
                                ref={input => this.username = input}
                                className="form-control border-secondary" />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                placeholder="*******"
                                ref={input => this.password = input}
                                className="form-control border-secondary" />
                        </div>

                        <button className="btn btn-outline-secondary btn-block">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default login;