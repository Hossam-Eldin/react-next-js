import React, { Component } from 'react';
import { FaVideo, FaLink } from 'react-icons/fa'

const LinkCard = (props) => {
    let classes = ['coge','wiggle','weave','down-go','anchor']
    let randomClass = classes[Math.floor(Math.random() * classes.length)]


    return (
        <div className={'link-card' + ' '+ randomClass}>

            <div className="link-card-container">
                {
                    props.ext_link ?
                        (
                            <div className="ext_link">

                                <FaLink />
                            </div>
                        )
                        : null

                }
                {
                    props.video ?
                        (
                            <div className="ext_link">
                                <FaVideo />
                            </div>
                        )
                        : null

                }
            </div>
                <div className="card-details">
                <p className="link-card-title text-truncate">{props.title}</p>

                </div>
        </div>
    )
}

export default LinkCard;
