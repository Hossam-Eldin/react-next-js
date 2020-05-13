import React, { Component } from 'react';
import Layout from '../../components/layouts/webstie';
import { Tabs } from 'antd';
import axios from 'axios';
import { withRouter } from 'next/router';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}



class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        let uid = this.props.router.query.uid;
        axios.get(`/api/user/${uid}`)
            .then(response => {
                console.log(response)
                this.setState({ user: response.data.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let user = this.state.user;
        return (
            <Layout>
                <div className="p-5">
                    <div className="row">
                        <div className="col-12 col-lg-3"></div>
                        {/* profile content */}
                        <div className="col-12 col-lg-6">
                            {/* user info */}
                            <div className="user-box">
                                <div className="user-avatar">
                                    <img src={user.avatar} alt="" />
                                </div>
                                <p className="text-center">{user.username}</p>
                                <p className="text-center">{user.status}</p>
                            </div>
                            {/*  user content */}
                            <div className="user-content">
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="My Posts" key="1">
                                        <span className="text-c">posts</span>
                                    </TabPane>
                                    <TabPane tab="Comments" key="2">
                                        <span className="text-c">posts</span>
                                    </TabPane>
                                    <TabPane tab="Votes" key="3">
                                        <span className="text-c">posts</span>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>

                        <div className="col-12 col-lg-3"></div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(profile);