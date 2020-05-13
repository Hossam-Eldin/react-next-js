import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { FaBandcamp } from 'react-icons/fa';
import { inject, observer } from 'mobx-react'
import Link from 'next/link';

@inject('store')

class SectionsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            sections: []
        };
    }
    componentDidMount() {
        this.props.store.sections.getSection()
            .then(response => {
                console.log(response)
                if (response.data.result) {

                    this.setState({
                        sections: response.data.result
                    })
                }
            })

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
                    <FaBandcamp className="nav-icon" />
                </div>
                
                <Modal
                    title="Sections"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={'65%'}
                    bodyStyle={{ height: '500px', background: 'var(--postBg)' }}
                >
                    <div className="row">

                        {
                            this.state.sections.map(el => {
                                return (
                                    <div key={el.id} className="col-xs-12  col-sm-12 col-md-3  col-lg-2  col-xl-2">
                                        <Link href={`/section/?title=${el.name}`} as={`/o/${el.name}`}>
                                            <a className="m-0 text-c section-li-item">
                                                <img src={el.icon} className="section-icon" alt="" />
                                                {el.name}
                                            </a>
                                        </Link>                    
                                     </div>
                                        )
                                    })
                                }
                                 
                                  
                    </div>
                </Modal>
            </div>
                    );
                }
            }
            
export default SectionsMenu;