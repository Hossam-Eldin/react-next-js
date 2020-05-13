import React, { Component } from 'react';
import Axios from 'axios';
import { PostHeader, SideBar, MoreSlider, Reaction, ShareBar, NavSlider, Comment } from '../../components/index'
import { withRouter } from 'next/router'
import Layout from '../../components/layouts/webstie'

class article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
    }

    componentDidMount() {
        Axios.get('/api/article/?id=41')
            .then(response => {
                this.setState({ post: response.data.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let { image, title, summery,keywords ,author} = this.state.post;
       let url = 'http://localhost:3000' ;
        const PostList = [
            { id: '1', title: 'something lorem or something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
            { id: '2', title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
            { id: '3', title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },

        ]
        return (
            <Layout title={title} 
            keywords={keywords}
            description={summery}
            image={image}
            link={url}
            author={author}
        >

            <div>
                <div className="container-fluid">

                    <div className="row pt-5 pb-5 article">
                        <div className="col-11 col-md-10 col-lg-10 mx-auto bg-white" >
                            <div className="row">
                                <div className="col-4 pb-5 pr-0 d-block mx-auto bg-white border-right">
                                     <SideBar sideTitle="Related Post" posts={PostList} />
                                 </div>
                                <div className="col-8 p-0 bg-white">

                                    <div className="p-3 col-11 d-block mx-auto">

                                        <PostHeader image={image} title={title} summery={summery} url={url} />
                                    </div>

                                    <div className="col-11 d-block mx-auto">

                                        <img src={this.state.post.image} className="img-fluid" alt="" sizes="(min-width: 1221px) 846px, (min-width: 880px) calc(100vw - 334px), 100vw" />

                                        <div className="pb-2 col-12 ">

                                            <div className="post-content">
                                                <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />

                                            </div>
                                            <ShareBar head="LIKE IT? SHARE WITH YOUR FRIENDS!" title={title} link={url} />
                                        </div>


                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Layout>
        );
    }
}

export default article;