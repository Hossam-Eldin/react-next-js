import React, { Component } from 'react';
import Masonry from 'react-masonry-css'
import Dummy from 'dummyjs'
import { FaComment, FaShareSquare } from 'react-icons/fa'
import { VoteBtn } from '../index';
import { Button } from 'antd';
import Modal from '../logical/Model'
import Link from 'next/link'

class masonry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false

        };
    }


    showModal = (id) => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const breakpointColumnsObj = {
            default: 4,
            1400: 4,
            1100: 3,
            700: 2,
            500: 1
        };


        const grid = this.props.posts.map((el, i) => {
            return (
                <div key={i} className="masonry-cards">
                    <div className="p-2 ">
                        <div className="float-left pr-3">
                            <VoteBtn width="30px" height="30px" />

                        </div>
                        <Link href={`/single/post/?id=${el.id}`} 
                            as={`/p/${el.id}`}
                        >
                            open link
                        </Link>
                        <strong className="m-c-section" >Item #{i + 1}</strong>
                        {/*               <Button type="primary" onClick={this.showModal}>
                                Open Modal 
                        </Button> */}
                    </div>
                    <div><img src={el.thumbnail || el.image_link} style={{ width: '100%' }} alt="" /></div>
                    <div className="m-c-footer p-2">
                        <div className="title">{el.title}</div>
                        <div>
                            <a href="" className="small m-c-link"> tag1</a>
                            <a href="" className="small m-c-link"> tag1</a>
                            <a href="" className="small m-c-link"> tag1</a>
                            <a href="" className="small m-c-link"> tag1</a>
                            <a href="" className="small m-c-link"> tag1</a>
                            <a href="" className="small m-c-link"> tag1</a>


                        </div>
                        <ul className="list-inline m-0">
                            <li className="list-inline-item"> <a className="m-c-icons">  <FaComment /></a> </li>
                            <li className="list-inline-item"> <a className="m-c-icons"> <FaShareSquare /> </a> </li>
                            <li className="list-inline-item"> <a className="m-c-icon"></a> </li>
                        </ul>
                    </div>
                </div>
            )
        })

        /*         const grid = new Array(10).fill().map((item,i)=>{
                    return(
                        <div className="card">
                        <img src={Dummy.src(400,500)} alt="" className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{Dummy.text('6')} </h5>
                            <p className="card-text">{Dummy.text('6')}</p>
                        </div>
                    </div>
                    )
                })
         */

        return (
            <div>

                {/*                 <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                </Modal> */}

                <button onClick={this.forceUpdate.bind(this, null)}>Refresh</button>
                <hr style={{ visibility: 'hidden' }} />
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {grid}
                </Masonry>
            </div>
        );
    }


}

export default masonry;