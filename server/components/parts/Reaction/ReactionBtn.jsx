import React from 'react';
import styles from './style.scss'
import {Emoji} from '../../index'

const ReactionBtn =(props) => {
    return(
        <div className="reaction-btn" style={styles}>
            <Emoji img={props.image}  title={props.title} />
            <div className="reactions-number">{props.vote}</div>
        </div>
    )
};


export default ReactionBtn;