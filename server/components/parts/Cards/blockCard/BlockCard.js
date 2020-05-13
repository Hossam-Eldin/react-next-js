import React from 'react'
//import './style.scss'
//import {TagBar} from '../../index'
import {FaEye, FaArrowsAltV} from 'react-icons/fa'

const ImgCard = (props) => {

    const imgPostStyle={   
        minHeight: props.height,
        backgroundImage: "url("+ props.image+")"
    }
    const titleStyle={
        fontSize: props.fontSize,

    }
    const shadowHeight ={
        height:props.shadowHeight
    }
    const headerStyle={
        padding:props.pad
    }

    return(
        
            <article className="ImgCard" style={imgPostStyle}>
                    <div className="tag-bar">
{/*                         <TagBar list={[{img:'../../static/emoji/laughcry.svg'},{img:'../../static/emoji/laughcry.svg'},]} />
 */}                    </div>

                    <div className="content" style={shadowHeight}></div>
                    <div className="featured-header col-12" style={headerStyle}>
             
                       <div className="row">
                       <div className="col-12"> 
                            <ul className="list-inline m-0" >
                                <li className="list-inline-item small" > <FaEye /> 25 </li>
                                <li className="list-inline-item small" > <FaArrowsAltV /> 25  </li>
                             </ul>
                            </div>
                        <h2 className="col-12 block-post-title" style={titleStyle}>{props.title}</h2>
                        <div className="col-12">
                           <span className="text-gray">by</span> 
                           <a href="#" className="auth-name"> <span>author name</span> </a>
                        </div> 
                       </div>
     
                    </div>
            </article>
    )
}


export default ImgCard;
