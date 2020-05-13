import React, { Component } from 'react';
import Layout from '../../components/layouts/webstie';
import { withRouter } from 'next/router'
import Axios from 'axios';
import { ShareBar } from '../../components/index';
class random extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            url:''
        };
    }
    componentDidMount() {
        console.log(window.location.pathname); //yields: "/js" (where snippets run)
        console.log(window.location.href);     //yields: "https://stacksnippets.net/js"        //console.log(this.props.router.query.title)
        Axios.get(`/api/random/?tag=${this.props.router.query.title}`)
            .then(response => {
              //  console.log(response.data)
                this.setState({
                    post: response.data.data,
                    url:window.location.href,
                })
                //  console.log(this.state.post)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let post = this.state.post;
        

        return (
            <Layout 
            title={post.title} 
            keywords={post.title}
            description={post.summery}
            image={post.thumbnail || post.image_link}
           link={this.state.url}
            author="Orangeito"
            >

                <div className="container-fluid">
                    <div className="row  d-block  mx-auto">
                        {/* add place */}
                        <div className="col-12 col-lg-3"></div>
                        <div className="col-12 col-lg-6 col-xl-6 random-post mb-5 mt-5 pt-4 pb-4 mx-auto">
                            <h1 className="text-center text-c">{post.title} </h1>

                            <div className="col-10 col-lg-9 col-xl-9 mx-auto mb-4">
                                <img src={post.thumbnail || post.image_link} className="img-fluid d-block mx-auto" alt="" />
                            </div>

                            <h4 className="col-8 col-lg-9 col-xl-9 text-c  text-center mx-auto mb-5">
                                {post.summery}
                            </h4>

                            <div className="col-8 text-center mx-auto text-c h5">
                                hello  {this.props.router.query.name} would you like to share
                                <ShareBar />
                            </div>
                        </div>
                        {/* add place */}
                        <div className="col-12 col-lg-3"></div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(random);