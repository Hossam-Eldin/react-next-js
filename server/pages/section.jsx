import React, { Component } from 'react'
import MemeGrid from '../components/logical/MemeGrid';
import Layout from '../components/layouts/webstie';
import { withRouter } from 'next/router'
import Link from 'next/link'
import { inject } from 'mobx-react';
import PostsList from '../components/logical/PostsLists';
import { SectionMenu, TagBtn } from '../components/index';
import Axios from 'axios';
import Masonry from '../components/logical/masonry'
import List from '../components/logical/sections/list';
import SectionsMenu from '../components/logical/sections/SectionsMenu';
import SideBar from '../components/logical/sections/sidebar';

const PostList = [
    { title: 'something lorem or something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
];

const Maso = [
    { src: 'https://via.placeholder.com/350x150' },
    { src: 'https://via.placeholder.com/350x250' },
    { src: 'https://via.placeholder.com/350x50' },
    { src: 'https://via.placeholder.com/350x150' },
    { src: 'https://via.placeholder.com/350x150' },
    { src: 'https://via.placeholder.com/350x250' },
    { src: 'https://via.placeholder.com/350x50' },
    { src: 'https://via.placeholder.com/350x150' },
    { src: 'https://via.placeholder.com/350x150' },
]



@inject('store')
class section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            posts: [],
            section: '',
            tags: [],
            sider: false
        };
    }

    componentDidMount() {
        const { router } = this.props;
        //console.log( 'this router '+ JSON.stringify( this.props.router))

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


        console.log(router.query.title);


        Axios.get('/api/section-info/' + router.query.title)
            .then(response => {
                console.log('section response ' + response.data.data);
                this.setState({
                    section: response.data.data,
                })
                /*             console.log('section id   ' + this.state.section.id)
            
                            console.log('articles' + response.data.data.posts) */

                this.getSectionTags().then(result => {
                    console.log(result);
                    this.setState({
                        tags: result.data.data
                    })
                })

                this.getPosts().then(result => {
                    this.setState({
                        posts: result.data.data
                    })
                    console.log('posts ===========')
                    console.log( this.state.posts);
                })

            })
            .catch(error => {
                console.log(error)
            })



    }
    /**
     * get section tags
     */
    getSectionTags = () => {
        return Axios.get('/api/section-tags/?section=' + this.state.section.id)
            .then(response => {
                return response

            }).catch(error => {
                console.log(error)
            })
    }

    /**
     * get posts for the tag
     */
    getPosts = async () => {
        let response;
        try {
            response = await Axios.get('/api/section-posts/' + this.state.section.id)

        } catch (error) {
            console.log(error);
        }
        return response;

    }

    render() {
        let section = this.state.section;
        return (
            <Layout 
        title={section.name}
            link={this.state.url}
            keywords={section.description}
            description={section.description}
            image={section.icon}
             author="Orangeito"      
            >
                <div className="container-fluid pt-5">
                    <div className="row">
                        {/* section header */}
                        <div className="col-12 col-lg-8 section-header d-block mx-auto">
                            <div className="section-head">
                                <h3 className="text-c">{this.state.section.name}</h3>

                            </div>
                        </div>

                        {/* section sidebar */}


                                <div className="col-12 col-lg-8 col-xl-8 mx-auto row">
{/*                                     <div className="d-none d-lg-block d-xl-block col-2">
                                        <SectionsMenu />
                                    </div> */}

                                    {/* content grid */}
                                    <div className="col-md-12 col-lg-8 col-xl-8">
                                        {/*  <Masonry posts={this.state.posts} /> */}
                                        {/*  <MemeGrid posts={this.state.posts} /> */}
                                        <List posts={this.state.posts} />
                                    </div>
                                    {/* sidebar */}
                                    <div className="col-lg-4 col-xl-4 p-0  d-none d-lg-block d-xl-block">
                                        <SideBar />
                                    </div>
                                </div>

                            </div>

                        </div>
               

            </Layout>
        );
    }
}

export default withRouter(section);