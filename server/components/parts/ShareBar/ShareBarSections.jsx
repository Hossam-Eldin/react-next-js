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
    FaShareSquare,
    FaShare

} from 'react-icons/fa';

import { FiFacebook, FiTwitter, FiShare2 } from 'react-icons/fi'
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



class ShareBarSections extends React.Component {
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

                <div className="bar-spc-item">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" className="share-drop" title="Share" >
                            <FaShare className="in-icon" />
                        </a>
                    </Dropdown>
                </div>

                {/*                 <ul className="list-inline sections-social-share-btn">
                    <li className="list-inline-item bar-spc-item">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" className="share-drop" title="Share" >
                                <FaShare className="in-icon" /> 
                            </a>
                        </Dropdown>
                    </li>
                    <li className="list-inline-item bar-spc-item" title="share with facebook">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FaFacebookF className="in-icon" />
                        </FacebookShareButton>
                    </li>
                    <li className="list-inline-item bar-spc-item"  title="share with twitter">
                        <TwitterShareButton url={shareUrl} title={title}>
                            <FaTwitter className="in-icon" />
                        </TwitterShareButton>
                    </li>
                </ul> */}
            </div>
        )
    }
}


export default ShareBarSections;