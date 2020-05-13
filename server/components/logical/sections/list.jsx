import React, { Component } from 'react';
import { ShareBarSections, VoteBtn } from '../../index'
import { Menu, Dropdown, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import Link from 'next/link';
import {
    FaFacebookF,
    FaTwitter,
    FaRedditAlien,
    FaWhatsapp,
    FaOdnoklassniki,
    FaHeart,
    FaPinterest,
    FaPinterestP,
    FaShareSquare,
    FaShare,
    FaVideo

} from 'react-icons/fa';


import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    RedditShareButton,
    WhatsappShareButton,
    OKShareButton,
    FacebookShareCount,


} from 'react-share'




class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,

        };
    }
    componentDidMount() {
        this.setState({
            url: window.location.protocol + '//' + window.location.host
        })
    }



    render() {

        let { id, title, type, image_link, thumbnail } = this.props;
        const menu = (title) => {
            return (
                <Menu>
                    <Menu.Item>
                        <RedditShareButton url={String(window.location)} quote={title}
                            windowWidth={660}
                            windowHeight={460}>
                            <FaRedditAlien className="in-icon c-reddit" />
                        </RedditShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <WhatsappShareButton url={String(window.location)}
                            quote={title}>
                            <FaWhatsapp className="in-icon c-whatsapp" />
                        </WhatsappShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <OKShareButton url={String(window.location)}
                            quote={title}>

                            <FaOdnoklassniki className="in-icon c-ok" />
                        </OKShareButton>
                    </Menu.Item>
                </Menu>
            )
        }

        return (
            <div className="list-spc">
                <div class="spc pr-4 pl-4 mb-4 ">
                    <div className="row">
                        {/*  side bar */}
                        <div class="p-0  row side-spc">
                            <div className="col-12 p-0 mt-3 mb-3 mx-auto">
                                <VoteBtn width={'40px'} height={'40px'} post_id={id} />
                            </div>
                            {/*        <div className="col-12 item-spc">
                                                <a className="btn-sec-vote bar-spc-item btn-vote-like" title="up vote">
                                                    <FaThumbsUp />
                                                    </a>
                                                    
                                                    </div>
                                                    <div className="col-12 item-spc">
                                                    <a className="btn-sec-vote bar-spc-item btn-vote-dislike" title="down vote">
                                                    <FaThumbsDown />
                                                    </a>
                                                </div> */}
                            <div className="col-12 item-spc">
                                <FacebookShareButton url={this.state.url + '/p/' + id} quote={title}>
                                    <FaFacebookF className="in-icon d-block mx-auto" />
                                </FacebookShareButton>
                            </div>

                            <div className="col-12 item-spc">
                                <PinterestShareButton
                                    url={String(window.location)}
                                    media={`${String(window.location)}/${thumbnail || image_link}`}
                                    windowWidth={1000}
                                    windowHeight={730}
                                    className="Demo__some-network__share-button">
                                    <FaPinterestP className="in-icon d-block mx-auto" />
                                </PinterestShareButton>
                            </div>
                            <div className="col-12 item-spc">
                                <Dropdown overlay={menu(title)}>
                                    <a className="ant-dropdown-link" className="share-drop" title="Share" >
                                        <FaShare className="in-icon d-block mx-auto" />
                                    </a>
                                </Dropdown>

                            </div>

                        </div>

                        <div className="col">
                            {/* user bar */}
                            {/*                               <div className="user-spc col-12 mb-2">
                                                <img src="https://via.placeholder.com/150"
                                                className="img-fluid avatar-spc"
                                                alt="" />
                                                <span className="pl-2">user name </span>
                                            </div> */}
                            {/* post title  */}
                            <div className="pl-3 pr-3 title-spc">
                                <Link href={`/single/post/?id=${title}`} as={`/p/${id}`}>
                                    <p class="h3 card-text mt-1 mb-3">{title}</p>
                                </Link>
                            </div>
                            {/* post image */}
                            {
                                image_link || thumbnail ?
                                    (
                                        <Link href={`/single/post/?id=${title}`} as={`/p/${id}`}>
                                            <img class="card-img-top"
                                                src={image_link || thumbnail}
                                                alt={title} />
                                        </Link>

                                    )
                                    : null
                            }
                            {
                                type == "Video_Link" ? (
                                    <h2 className="text-c"><FaVideo /> </h2>
                                ) : null
                            }



                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default list;