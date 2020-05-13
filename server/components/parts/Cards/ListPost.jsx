import React, { Component } from 'react';
import Link from 'next/link'
import { FaShareSquare, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { ShareBarV } from '../../index'
const ListPost = (props) => {
    const imageStyle = {
        backgroundImage: `url(${props.image})`,
    }
    let url = `http://localhost:3000/a/${props.id}`;

    return (
        <div className="col-12 row lp-post mb-5 pt-4">

            <div className="col-11">
                <div className="lp-head">
                    <ul className="list-inline  pb-2 mb-0">
                        {
                            props.tags.map(el => {
                                return (
                                    <li className="list-inline-item" key={el.tag_name} ><a href="" className="text-m bb-tag">{el.tag_name}</a></li>

                                )
                            })
                        }


                    </ul>
                    <a className="lp-title">
                        <Link href={`/article/?title=${props.title}`} as={`/a/${props.id}`}>
                            <h1>
                                {props.title}
                            </h1>
                        </Link>
                    </a>
                    <p> {
                        props.author_avatar ?
                            <img src={props.author_avatar} className="lp-author-avatar" alt={props.author} />
                            : null
                    }
                        {props.author} . {props.date}</p>
                </div>


                <div className="lp-img-wrap mx-auto" style={imageStyle}>
                </div>

                <div className="lp-summery mt-3 mb-5">
                    <h5 className="text-muted">
                        {props.summery}
                    </h5>
                </div>
            </div>
            <div className="col-1">
                <div className="mx-auto text-center lp-sharing pt-5">
                    <ShareBarV title={props.title} link={url} />
                </div>
            </div>
        </div>

    );
}
export default ListPost;