import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { FaBandcamp, FaUpload,FaVideo, FaImage, FaFileUpload } from 'react-icons/fa';
import { Tabs } from 'antd';
import UploadImage from './uploadImage';
import ImageUrl from './imageUrl';
import VideoUrl from './videoUrl';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}


class upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <div onClick={this.showModal}>
                    <FaUpload className="nav-icon" />
                </div>

                <Modal
                    title="Upload"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'55%'}
                    bodyStyle={{  background: 'var(--postBg)' }}
                >
                    <div className="row">
                        <div className="col-12 user-upload">
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab={<span><FaFileUpload className="mr-2" /> upload image</span>} key="1">
                                    <UploadImage />
                                </TabPane>
                                <TabPane tab={<span><FaImage className="mr-2" /> Post image Url</span>} key="2">
                                    <ImageUrl cancel={this.handleCancel}/>
                                </TabPane>
                                <TabPane tab={<span><FaVideo className="mr-2" /> Post video Url</span>} key="3">
                                    <VideoUrl />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default upload;