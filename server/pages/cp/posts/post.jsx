
import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import '../../../assets/ant.scss'
import ExtrLink from '../../../components/cp/Post/Ext-Link';
import VideoLink from '../../../components/cp/Post/Video-Link';
import ImgLink from '../../../components/cp/Post/Img-Link';
import CreatePost from '../../../components/cp/Post/Create-Post';
import Layout from '../../../components/layouts/admin';


const TabPane = Tabs.TabPane;


class post extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Layout>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="bulb" /> Create Post  </span>} key="1">
                        <CreatePost />
                    </TabPane>
                    <TabPane tab={<span><Icon type="picture" /> Post Image  </span>} key="2">
                        <ImgLink />
                    </TabPane>
                    <TabPane tab={<span><Icon type="play-circle" />Post video Link</span>} key="3">
                        <VideoLink />
                    </TabPane>
                    <TabPane tab={<span><Icon type="link" /> Post External link</span>} key="4">
                        <ExtrLink />
                    </TabPane>
                </Tabs>
            </Layout>
        );
    }
}

export default post;