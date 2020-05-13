import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFire, FaHashtag, FaSearch, FaGoogle, FaFacebook, FaUserPlus , FaSignInAlt } from 'react-icons/fa';
import { observer, inject } from 'mobx-react'
import UserComponent from './UserComponent';
import { Menu, Dropdown, Icon } from 'antd';
import Router from 'next/router';



@inject('store')
@observer class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            signup: false,
            user: {}
        };
    }

    componentDidMount() {
        //when component reload set the data for user if it exist 
        let user = JSON.parse(localStorage.getItem('user_data'))
        if (user) {
            this.setState({
                user: user
            })
        }
    }

    showModal = () => {
        this.setState({ visible: true });
    };
    signupModel = () => {
        this.setState({ signup: true })
    }

    handleOk = e => {
        this.setState({ visible: false, });
    };

    signupOk = e => {
        this.setState({ signup: false })
    }

    handleCancel = e => {
        this.setState({ visible: false, });
    };




    responseGoogle = (response) => {
        console.log(response);
    }
    //handling response from google login
    googleSuccess = (data) => {
        this.props.store.oauth.googleLogin(data)
            .then(response => {
                let user = JSON.parse(localStorage.getItem('user_data'))
                //refresh component
                this.setState({
                    visible: false,
                    user: user
                })

                this.forceUpdate()
            })
    };

    //handling response form facebook login
    responseFacebook = (response) => {
        // console.log(response.accessToken);
        this.props.store.oauth.facebookLogin(response)
            .then(response => {
                let user = JSON.parse(localStorage.getItem('user_data'))
                //refresh component
                this.setState({
                    visible: false,
                    user: user
                })

                this.forceUpdate()
            })
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        this.forceUpdate();
        Router.push('/')
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <h5 onClick={this.logout}>Logout </h5>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                {
                    typeof window !== 'undefined' && localStorage.getItem('token') === null ? (
                        <ul className="inline-list">
                            <li className="list-inline-item"> 
                                <button className="btn btn-light auth-btn" onClick={this.showModal} > Login <FaSignInAlt/>  </button>
                            </li>
                            <li className="list-inline-item">
                                <button className="btn btn-light auth-btn" onClick={this.signupModel}> Sign up <FaUserPlus />  </button>
                            </li>
                        </ul>

                    ) : (
                            <Dropdown overlay={menu}>
                                <div>
                                    <UserComponent name={this.state.user.name} avatar={this.state.user.avatar} />

                                </div>
                            </Dropdown>
                        )
                }

                <Modal
                    title="Login"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <h1>Login</h1>
                    <p>you can use social media to login </p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <GoogleLogin
                                clientId="573815323330-hgag266jqjmor303eft4acqc4tlrlusr.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.googleSuccess}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </li>
                        <li className="list-inline-item">
                            <FacebookLogin
                                appId="376483093210075"
                                fields="name,email,picture"
                                render={renderProps => (
                                    <button className="btn btn-facebook" onClick={renderProps.onClick}><FaFacebook className="facebook-icon" /> Login</button>
                                )}
                                callback={this.responseFacebook} />
                        </li>
                    </ul>
                </Modal>
                {/*                 //signup model */}
                <Modal
                    title="Signup model"
                    visible={this.state.signup}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <h1>Sign up</h1>
                    <p>you can use social media to signup  </p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <GoogleLogin
                                clientId="573815323330-hgag266jqjmor303eft4acqc4tlrlusr.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.googleSuccess}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </li>
                        <li className="list-inline-item">
                            <FacebookLogin
                                appId="376483093210075"
                                fields="name,email,picture"
                                render={renderProps => (
                                    <button className="btn btn-facebook" onClick={renderProps.onClick}><FaFacebook className="facebook-icon" /> Login</button>
                                )}
                                callback={this.responseFacebook} />
                        </li>
                    </ul>
                </Modal>
            </div>

        );
    }
}

export default AuthComponent;