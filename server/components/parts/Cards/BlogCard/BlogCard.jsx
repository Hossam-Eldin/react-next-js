import React from 'react'
//import styles from './style.scss'
import Link from 'next/link'


const BlogCard = (props) => {
    return (
        <div className="col-6" >
            <div className="post-module">
                <div className="thumbnail">
                    <div className="badge-list">
                        <ul className="list-inline">
                            <li className="list-inline-item">

                            </li>
                        </ul>
                    </div>
                    <div className="thumbnail-cont" style={{backgroundImage:`url(${props.image})`}}></div>
                </div>
                {/*  <!-- Post Content--> */}
                <div className="bb-post-content">

                    <div className="content-head">
                        <ul className="list-inline  pb-2 mb-0">
                            {
                                props.tags.map(el =>{
                                    return (
                                        <li className="list-inline-item"><a href="" className="text-m bb-tag">{el.tag_name}</a></li>

                                    )
                                })
                            }
                    </ul>
                     <Link  href={ `/article/?title=${props.title}`} as={`/a/${props.id}`}>
                              <h1 className="title">
                                {props.title}
                            </h1>
                        </Link>

                            <p className="description-two">{props.summery}</p>

                    </div>
                    <div className="author-card">
                        <ul className="list-inline m-0">
                            <li className="list-inline-item">
                                <img src="https://boombox.px-lab.com/wp-content/uploads/avatars/56/5bf83398b9e1b-bpthumb.jpg?x98972"
                                    className="img-fluid rounded-circle auth-img"/>
                            </li>

                            <li className="list-inline-item">
                                <span className="text-gray">by</span>
                                <span> <a href="" className="auth-name"> Author Name</a></span>
                            </li>

                            <li className="list-inline-item">
                                <small className="text-gray date-text">{props.date}</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default BlogCard;
