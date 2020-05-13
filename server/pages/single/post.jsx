import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Axios from 'axios';
import { ShareBarSections, ShareBar, SectionMenu, Comment } from '../../components/index'
import Layout from '../../components/layouts/webstie'
import SideBar from '../../components/logical/sections/sidebar';
import { Menu, Dropdown, Icon } from 'antd';


import {
    FaFacebookF,
    FaTwitter,
    FaRedditAlien,
    FaWhatsapp,
    FaOdnoklassniki,
    FaHeart,
    FaPinterest,
    FaPinterestP,
    FaShareSquare,

    FaShare

} from 'react-icons/fa';


import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    RedditShareButton,
    WhatsappShareButton,
    OKShareButton,
    FacebookShareCount,


} from 'react-share'





class post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            sections: [],
            tags: [],
            url: '',
            comments: [],
        };
    }

    componentDidMount() {
        let post_id = this.props.router.query.id;
        //console.log(post_id)
        Axios.get('/api/post/?post_id=' + post_id)
            .then(response => {
                // console.log(response)
                this.setState({
                    post: response.data.data,
                    tags: response.data.data.tags,
                    url: window.location.href,
                })
                this.getComments();
            })
            .catch(err => {
                console.log(err)
            })


        //get all sections 
        Axios.get('/api/sections')
            .then(response => {
                //  console.log(response)
                this.setState({
                    sections: response.data.result
                })
            })
            .catch(error => {
                console.log(error)
            })

    }


    getComments = () => {
        Axios({
            methods: 'get',
            url: `/api/get-comments/${this.state.post.id}`,
            headers: { 'api-key': 'the_key' }
        })
            .then(response => {
                console.log('comments ' + JSON.stringify(response.data))
                this.setState({
                    comments: response.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const menu = (title) => {
            return (
                <Menu>
                    <Menu.Item>
                        <RedditShareButton url={this.state.url} quote={title}
                            windowWidth={660}
                            windowHeight={460}>
                            <FaRedditAlien className="in-icon c-reddit" />
                        </RedditShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <WhatsappShareButton url={this.state.url}
                            quote={title}>
                            <FaWhatsapp className="in-icon c-whatsapp" />
                        </WhatsappShareButton>

                    </Menu.Item>
                    <Menu.Item>
                        <OKShareButton url={this.state.url}
                            quote={title}>

                            <FaOdnoklassniki className="in-icon c-ok" />
                        </OKShareButton>
                    </Menu.Item>
                </Menu>
            )
        }

        let { id, thumbnail, title, summery, image_link } = this.state.post;
        let url = this.state.url;
        return (
            <Layout title={title}
                keywords={title}
                description={summery}
                image={post.thumbnail || post.image_link}
                link={this.state.url}
                author={"Orangeito"}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-9 col-xl-8 mx-auto row mb-5 mt-5">
                            {/*  section list */}
                            {/*              <div className="col-lg-2 col-xl-2 d-none d-lg-block d-xl-block">
                                <SectionsMenu sections={this.state.sections} />
                            </div> */}
                            {/*  post content */}

                            <div className="col-12 col-lg-8 col-xl-8  pt-4">
                                <ul className="list-inline p-0 m-0">
                                    {
                                        this.state.tags.map(el => {
                                            return <li key={el.map_id} className="list-inline-item text-c"> <span> {el.tag_name}</span></li>
                                        })
                                    }
                                </ul>
                                <h2 className="text-c">{title}</h2>
                                <img src={thumbnail || image_link} className="img-fluid  mb-4" alt="" />
                                {/* summery  */}
                                <p className="h5">{summery}</p>

                                {/*  share bar */}
                                <div className="flex-bar">
                                    <button className="flex-bar-item fb-share-btn" title="Facebook Share">
                                        <FacebookShareButton url={this.state.url + '/p/' + id} quote={title} className="col"> 
                                            <FaFacebookF className="in-icon d-block mx-auto" />
                                        </FacebookShareButton>
                                    </button>

                                    <button className="flex-bar-item p-share-btn" title="Save On Pinterest">
                                        <PinterestShareButton

                                            url={this.state.url}
                                            media={`${this.state.url}/${thumbnail || image_link}`}
                                            windowWidth={1000}
                                            windowHeight={730}
                                            className="Demo__some-network__share-button col">
                                            <FaPinterestP className="in-icon d-block mx-auto" />
                                        </PinterestShareButton>
                                    </button>
                                    <button className="more-share-btn" title="Share">
                                        <Dropdown overlay={menu(title)}>
                                            <a className="ant-dropdown-link" className="share-drop" title="Share" >
                                                <FaShare className="in-icon d-block mx-auto" />
                                            </a>
                                        </Dropdown>
                                    </button>

                                </div>


                                {/*    comment section */}
                                <div className="border-t pt-5 pb-5">
                                    <Comment postId={this.state.post.id} comments={this.state.comments} />
                                </div>

                            </div>

                            {/*  side bar */}
                            <div className="col-lg-4  col-xl-4   d-none d-lg-block d-xl-block">
                                <SideBar />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(post);