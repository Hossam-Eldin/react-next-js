import React from 'react'
import styles from './style.scss'
import { Menu, Dropdown, Icon } from 'antd';

import {
    FaFacebookF,
    FaTwitter,
    FaRedditAlien,
    FaWhatsapp,
    FaOdnoklassniki,
    FaHeart,
    FaPinterest,
    FaShareSquare

} from 'react-icons/fa';

import { MdShare } from 'react-icons/md';

import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    RedditShareButton,
    WhatsappShareButton,
    OKShareButton,
    FacebookShareCount,


} from 'react-share'



class ShareBtns extends React.Component {
    render() {
        const shareUrl = this.props.link;
        const title = this.props.title;
        const image = this.props.image;

        const menu = () => {
            return (
                <Menu>
                    <Menu.Item>
                        <RedditShareButton url={shareUrl} title={title}
                            windowWidth={660}
                            windowHeight={460}>
                            <FaRedditAlien className="in-icon c-reddit" />
                        </RedditShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <WhatsappShareButton url={shareUrl} quote={title}>
                            <FaWhatsapp className="in-icon c-whatsapp" />
                        </WhatsappShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <OKShareButton url={shareUrl} quote={title}>

                            <FaOdnoklassniki className="in-icon c-ok" />
                        </OKShareButton>
                    </Menu.Item>
                </Menu>
            )
        }

        return (
            <div>
                <p className="share-title">{this.props.head}</p>
                <ul className="list-inline social-share-btn">
                    <li className="list-inline-item">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FaFacebookF className="in-icon c-fb" />
                        </FacebookShareButton>
                    </li>
                    <li className="list-inline-item">
                        <TwitterShareButton url={shareUrl} title={title}>
                            <FaTwitter className="in-icon c-twitter" />
                        </TwitterShareButton>
                    </li>
                    <li className="list-inline-item">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" className="share-drop" href="#">
                                <FaShareSquare /> Share
                            </a>
                        </Dropdown>

                    </li>
                </ul>
            </div>
        )


        /*         return (
                    <div style={styles} className="mb-3 clearfix">
                        <p className="share-title">{this.props.head}</p>
        
                        <div className="share-container">
                            <h3 className="mr-2 share-text">
                                <MdShare /> share
                             </h3>
                            <div className="share-window">
        
                                <div className="share-bar">
                                    <div className="trigger f-b" title="facebook ">
                                        <FacebookShareButton url={shareUrl} quote={title}>
                                            <FaFacebookF className="in-icon" />
                                        </FacebookShareButton>
                                    </div>
                                    <div className="trigger t-b" title="twitter ">
                                        <TwitterShareButton url={shareUrl} quote={title}>
                                            <FaTwitter className="in-icon" />
                                        </TwitterShareButton>
                                    </div>
                                    <div className="trigger r-b" title="reddit">
                                        <RedditShareButton url={shareUrl} quote={title}>
                                            <FaRedditAlien className="in-icon" />
                                        </RedditShareButton>
                                    </div>
                                    <div className="trigger w-b" title="whatsapp">
                                        <WhatsappShareButton url={shareUrl} quote={title}>
                                            <FaWhatsapp className="in-icon" />
                                        </WhatsappShareButton>
                                    </div>
                                    <div className="trigger o-b" title="ok">
                                        <OKShareButton url={shareUrl} quote={title}>
        
                                            <FaOdnoklassniki className="in-icon" />
                                        </OKShareButton>
                                    </div>
        
                                    <div className="trigger">
                                        <PinterestShareButton url={shareUrl} quote={title}      
                                               media={`${image}`}>
                                            <FaPinterest  className="in-icon" />
                                        </PinterestShareButton>
                                    </div>
                                </div>
                            </div>
                            <div className="like">
                                <div className="trigger like-btn ">
                                    <FaHeart className="mr-2" />
                                    Like
                                </div>
                            </div>
                        </div>
        
                    </div>
        
                ) */
    }
}


export default ShareBtns;