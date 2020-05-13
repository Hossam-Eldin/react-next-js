import React, { Component } from 'react';
import { Modal, Button } from 'antd';


class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            
            <Modal
            title="Basic Modal"
            visible={this.props.visible}
            onOk={this.props.onOk}
            onCancel={this.props.onCancel}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        );
    }
}

export default Model;