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



class ShareBarV extends React.Component {
    render() {
        const shareUrl = this.props.link;
        const title = this.props.title;
        const image = this.props.image;

        const menu = () => {
            return (
                <Menu>
                    <Menu.Item>
                        <RedditShareButton url={shareUrl} quote={title}>
                            <FaRedditAlien className="in-icon c-reddit-v" />
                        </RedditShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <WhatsappShareButton url={shareUrl} quote={title}>
                            <FaWhatsapp className="in-icon c-whatsapp-v" />
                        </WhatsappShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <OKShareButton url={shareUrl} quote={title}>

                            <FaOdnoklassniki className="in-icon c-ok-v" />
                        </OKShareButton>
                    </Menu.Item>
                </Menu>
            )
        }

        return (
            <div>
                <p className="share-title">{this.props.head}</p>
                <ul className="social-share-btn-v">
                    <li className="pb-3">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FaFacebookF className="in-icon c-fb-v" />
                        </FacebookShareButton>
                    </li>
                    <li className="pb-3">
                        <TwitterShareButton url={shareUrl} quote={title}>
                            <FaTwitter className="in-icon c-twitter-v" />
                        </TwitterShareButton>
                    </li>
                    <li className="pb-3">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" className="share-drop" href="#">
                                <FaShareSquare />
                                <small>
                                    Share
                                </small>
                            </a>
                        </Dropdown>

                    </li>
                </ul>
            </div>
        )

    }
}


export default ShareBarV;