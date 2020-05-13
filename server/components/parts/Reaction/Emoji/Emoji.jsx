import React from 'react'
import styles from './style.scss'

const emoji =(props) => {
    const pStyle = {
        width:props.width,
        height:props.height,
        lineHeight:'1',
        styles
    };

    return(
        <div className="emoji" style={pStyle}>
            <img 
                src={props.img} 
                className="img-fluid"  
                title={props.title} />
        
        </div>
    )
}


export default emoji;