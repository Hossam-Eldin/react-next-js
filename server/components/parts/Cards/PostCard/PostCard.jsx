import React, { Component } from 'react';
import styles from './style.scss'
import Link from 'next/link'

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="col-12 mb-4" style={styles}>
                <div className="row post-card">
                    <div className="col-4 post-image p-0">
                        <div className="tags-list">
                            <ul className="list-inline">
                                {/*              <li className="list-inline-item"><Link href="#some"> 
                                <Emoji img="static/emoji/omg.svg" height="35px" width="35px" />
                            </Link></li> */}


                            </ul>
                        </div>
                        {/*   <img src={this.props.image} alt="" className="img-fluid" /> */}
                        <div className="post-thumbnail" style={{ backgroundImage: `url(${this.props.image})` }} ></div>
                    </div>
                    <div className="col-8 post-info">
                        <ul className="list-inline post-tags m-0 p-2">
                            <li className="list-inline-item">
                                <a href="#" className="tag">Tv </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="tag"> Gaming </a>
                            </li>
                        </ul>
                        <Link href={`/article/?id=${this.props.id}`} as={`/a/${this.props.id}`}>
                            <a>
                                <h2 className="post-card-title">{this.props.title}</h2>
                                <p className="post-summery text-truncate pb-1">
                                    {this.props.text}
                                </p>

                            </a>

                        </Link>
                        <div className="post-author">
                            <ul className="list-inline m-0">
                                <li className="list-inline-item">
                                    <img src="https://boombox.px-lab.com/animatrix/wp-content/uploads/sites/9/2016/11/11-360x180.jpg?x86641"
                                        className="author-image" alt="" />
                                </li>
                                <li className="list-inline-item">
                                    <span className="text-muted">by</span>
                                    <a href="#" className="author-name">Author Name</a>
                                </li>
                                <li className="list-inline-item">
                                    <span className="post-date">{this.props.date}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default PostCard;