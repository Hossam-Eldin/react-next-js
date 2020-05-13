import React, { Component } from 'react'
import  _ from 'lodash'
import  styles from './style.scss'
import {FaFacebookF, FaTwitter, FaInstagram , FaYoutube} from 'react-icons/fa'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const Social = [...this.props.socialList]
        const Link = {
            display:'block',
            width:'50px'
        }   
        return (
            <div className="p-4" style={styles}>
                <p className=" h5 text-center social-list-title"> FIND US ON </p>
             <ul className="list-inline">
                <li className="list-inline-item " >
                    <a href="#" className="social-icon-2 fb-icon"> <FaFacebookF /> </a>
                </li>
                <li className="list-inline-item">
                    <a href="#" className="social-icon-2 t-icon">
                        <FaTwitter />
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="#" className="social-icon-2 i-icon"><FaInstagram /></a>
                </li>
                <li className="list-inline-item">
                    <a href="#" className="social-icon-2 yt-icon"> <FaYoutube /></a>
                </li>
            </ul> 
            </div>

        )
    }
}

export default index;