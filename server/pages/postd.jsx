import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/layouts/webstie'
import Axios from 'axios';

class postd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
    }

    componentDidMount() {
        console.log('this router aa' + this.props.router.query.id)
        this.getPost().then(Response => {
            console.log(Response)
            this.setState({
                post: Response.data.data
            })
        })
    }
    getPost = async () => {
        let data;
        try {
            data = await Axios.get('/api/post/?post_id=2')
        } catch (error) {
            console.log(error)
        }

        return data;
    }
    render() {
        let post = this.state.post;

        return (
            <Layout>
                {/*            <h2>{this.state.post.title}</h2>
                <img src={post.thumbnail || post.image_link} alt="" />
                display something */}


                <div className="tweetEntry-tweetHolder">

                    <div className="tweetEntry">

                        <div className="tweetEntry-content">

                            <a className="tweetEntry-account-group" href="#">

                                <img className="tweetEntry-avatar" src="http://placekitten.com/200/200" />

                                    <strong className="tweetEntry-fullname">
                                     </strong>

                                <span className="tweetEntry-username">
                                    @<b>[username]</b>
                                </span>

                                <span className="tweetEntry-timestamp">- post.updatedAt</span>

                            </a>

                            <div className="tweetEntry-text-container">
                                {post.title}
                             </div>

                        </div>

                        <div className="optionalMedia">
                            <img className="optionalMedia-img" src={post.thumbnail} />
                            </div>

                        <div className="tweetEntry-action-list">
          {/*                   <i className="fa fa-reply" style="width: 80px;"></i>
                            <i className="fa fa-retweet" style="width: 80px"></i>
                            <i className="fa fa-heart" style="width: 80px"></i> */}
                        </div>

                    </div>

                </div>

            </Layout>
        );
    }
}

export default withRouter(postd);
/* 

                     <!-- Entry with Media turned off. --> 
                    <div className="tweetEntry">

                        <div className="tweetEntry-content">

                            <a className="tweetEntry-account-group" href="[accountURL]">

                                <img className="tweetEntry-avatar" src="http://placekitten.com/100/100" />

                                <strong className="tweetEntry-fullname">
                                    [fullname]
                                            </strong>

                                <span className="tweetEntry-username">
                                    @<b>[username]</b>
                                </span>

                                <span className="tweetEntry-timestamp">- [timestamp]</span>

                            </a>

                            <div className="tweetEntry-text-container">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam ipsum, finibus ac est sed, vestibulum condimentum neque. Sed eget iaculis.
                                        </div>

                        </div>

                        <div className="optionalMedia" style="display:none;">
                            <img className="optionalMedia-img" src="https://i.imgur.com/kOhhPAk.jpg" />
                        </div>

                        <div className="tweetEntry-action-list" style="line-height:24px;color: #b1bbc3;">
                            <i className="fa fa-reply" style="width: 80px;"></i>
                            <i className="fa fa-retweet" style="width: 80px"></i>
                            <i className="fa fa-heart" style="width: 80px"></i>
                        </div>

                    </div>

                    {/*       <!-- Entry with Media turned on. --> 
                    <div className="tweetEntry">

                        <div className="tweetEntry-content">

                            <a class="tweetEntry-account-group" href="[accountURL]">

                                <img class="tweetEntry-avatar" src="http://placekitten.com/150/150" />

                                <strong class="tweetEntry-fullname">
                                    [fullname]
                                                     </strong>

                                <span class="tweetEntry-username">
                                    @<b>[username]</b>
                                </span>

                                <span class="tweetEntry-timestamp">- [timestamp]</span>

                            </a>

                            <div class="tweetEntry-text-container">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam ipsum, finibus ac est sed, vestibulum condimentum neque. Sed eget iaculis.
                                        </div>

                        </div>

                        <div class="optionalMedia">
                            <img class="optionalMedia-img" src="http://placekitten.com/600/400" />
                        </div>

                        <div class="tweetEntry-action-list" style="line-height:24px;color: #b1bbc3;">
                            <i class="fa fa-reply" style="width: 80px;"></i>
                            <i class="fa fa-retweet" style="width: 80px"></i>
                            <i class="fa fa-heart" style="width: 80px"></i>
                        </div>

                    </div>

                    {/*  <!-- Template Entry --> 
                    <div class="tweetEntry">

                        <div class="tweetEntry-content">

                            <a class="tweetEntry-account-group" href="[userURL]" >

                                <img class="tweetEntry-avatar" src="[avatarSource]" />

                                <strong class="tweetEntry-fullname">
                                    [displayName]
                                                             </strong>

                                <span class="tweetEntry-username">
                                    @<b>[username]</b>
                                </span>

                                <span class="tweetEntry-timestamp">- [date]</span>

                            </a>

                            <div class="tweetEntry-text-container">
                                [text]
                                                        </div>

                        </div>

                        <div class="optionalMedia" style="[displayMedia]">
                            <img class="optionalMedia-img" src="[tweetImageLinkSource]" />
                        </div>

                        <div class="tweetEntry-action-list" style="line-height:24px;color: #b1bbc3;">
                            <i class="fa fa-reply" style="width: 80px;"></i>
                            <i class="fa fa-retweet" style="width: 80px"></i>
                            <i class="fa fa-heart" style="width: 80px"></i>
                        </div>

                    </div>

                    {/*     <!--End of tweetHolder--> **/