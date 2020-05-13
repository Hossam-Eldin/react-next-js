import React from 'react'
import styles from './style.scss'

const ImgCard = (props) => {
   let card_style= {
       backgroundImage:`url(${props.image})`,
       styles
   }
    
    return (
        <div className="img-card" style={card_style}>
             <span className="tag">{props.tag}</span>
            <div className="img-details">
                <p className="title">{props.title}</p>
            </div>
        </div>
    );
}

export default ImgCard

