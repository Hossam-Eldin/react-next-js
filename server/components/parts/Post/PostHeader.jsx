import React from 'react'
import styles from './style.scss'
import {  ShareBar, VoteBtn } from '../../index'
import {FaFacebookF,FaTwitter,FaShareAlt} from 'react-icons/fa'
const PostHeader = (props) => {
    const HeaderStyle = {
        styles
    }

    return (

        <div className="mb-4" style={HeaderStyle} >
            {/* tag list */}
            <ul className="list-inline tag-list">
                <li className="list-inline-item"> tags</li>
            </ul>

            {/* title and vote*/}
            <ul className="list-inline list-header">
{/*                 <li className="list-inline-item">
                    <VoteBtn />
                </li> */}
                <li className="list-inline-item">
                    <h2 className="article-title">{props.title}</h2>
                </li>
            </ul>

           {/*  social share buttons */}

            <ul className="list-inline">
                <li className="list-inline-item">
                     <ShareBar  title={props.title} link={props.url} image={props.image} />
               </li>
            </ul>


        </div>
    )
};



export default PostHeader;