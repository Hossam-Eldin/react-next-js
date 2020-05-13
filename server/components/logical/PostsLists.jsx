import React, { Component } from 'react';
import { VoteBtn, ShareBar } from '../index'
import { FaFacebookF, FaTwitter, FaComment, FaEllipsisH } from 'react-icons/fa'
import Link from 'next/link'

class PostsLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null
        };
    }

    componentDidMount() {
        this.setState({
            url: window.location.protocol + '//' + window.location.host
        })
    }
    render() {
        return (
            <div>
                {
                    this.props.posts.map(el => {
                        return (
                            <div key={el.title} className="row section-post" >
                                <div className="col-1 p-1 vote-line">
                                    <VoteBtn />
                                </div>

                                <div className="col-11 pt-2 pb-2">
                                    <span>section</span>
                                    <a className="section-post-title">
                                    <Link href={`/single/post/?id=${el.title}`} as={`/p/${el.id}`}>
                                            {el.title}
                                        </Link>
                                    </a>


                                    <div className="section-post-image">
                                        <img
                                            src={el.thumbnail || el.image_link}
                                            alt=""
                                            className="img-fluid" />
                                    </div>

                                    <div>
                                        <ShareBar title={el.title} link={this.state.url + '/p/' + el.id} />
                                    </div>
                                </div>


                            </div>
                        )
                    })
                }

            </div>
        );
    }
}

export default PostsLists;