import React, { Component } from 'react';
import { CommentBox, ReplyBox } from '../../index'
import { Collapse } from 'antd';
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import jtw from 'jsonwebtoken';
import { observer, inject } from 'mobx-react'
const Panel = Collapse.Panel;

@inject('store')
@observer class comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replay: false,
            user:{}
        };
    }

    
    componentDidMount(){
    
        const  user = JSON.parse(localStorage.getItem('user_data'))
        if (user) {
            console.log(user);
                this.setState({
                    user:user
                })
        }
    }

    replyHandler = (id) => { console.log(id) }

    responseGoogle = (response) => {
        console.log(response);
    }
    //handling response from google login
    googleSuccess = (data) => {
        this.props.store.oauth.googleLogin(data)
            .then(response => {
                //refresh component
                this.forceUpdate()
            })
    };

    //handling response form facebook login
    responseFacebook = (response) => {
        // console.log(response.accessToken);
        this.props.store.oauth.facebookLogin(response)
            .then(response=>{
                //refresh component
                this.forceUpdate()
            })
    };

    render() {
        const { store } = this.props;

        return (
            <div className="comments">
                {
                    typeof window !== 'undefined' && localStorage.getItem('token') === null ? (
                            <ul className="list-inline">
                                <li className="list-inline-item"> <p>to comment you have to login use </p> </li>
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
                        )
                        :  (
                            /* comment box component  */
                          <div>
                             <p>leave comment user id {this.state.user.id} </p>
                            <CommentBox userId={this.state.user.id} 
                                        postId={this.props.postId}
                                        username={this.state.user.name}
                                        avatar={this.state.user.avatar} />
                          </div>
                    )
                }





                {
                    this.props.comments.map(el => {
                        return (
                            <div children="pb-3 pt-3">
                                <div className="comment row pt-4" key={el.id}>
                                    <div className="avatar shadow-sm">
                                        <img src={el.avatar} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col">
                                        <div className="auth">
                                            <p className="mb-1">
                                                <strong>{el.username}</strong>
                                                <span className="ml-2">{el.created_at}</span>
                                            </p>
                                        </div>
                                        <div className="text-comment">
                                            <p className="mb-1">
                                                {el.comment}
                                            </p>
                                        </div>


                                        {
                                            <Collapse defaultActiveKey={[el.id]} bordered={false} >
                                                <Panel header="Reply" key="1">
                                                    <ReplyBox key={el.id}
                                                              userId="1"
                                                              ref={`reply${el.id}`}
                                                              postId={this.props.postId}
                                                              commentId={el.id} />

                                                </Panel>

                                            </Collapse>
                                        }
                                    </div>


                                </div>
                                <div>
                                    {/* reply */}
                                    {
                                        el.reapplies.map(el => {
                                            return (<div className="reply row border-top pt-3">
                                                <div className="reply-avatar shadow-sm">
                                                    <img src={el.avatar} alt="" className="img-fluid" />
                                                </div>
                                                <div className="col">
                                                    <div className="reply-auth">
                                                        <p className="mb-1">
                                                            <strong>{el.username}</strong>
                                                            <span className="ml-2">{el.created_at}</span>
                                                        </p>
                                                    </div>
                                                    <div className="text-reply">
                                                        <p className="mb-1">
                                                            {el.reply}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        );
    }
}

export default comment;