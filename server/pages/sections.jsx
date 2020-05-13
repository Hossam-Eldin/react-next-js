import React, { Component } from 'react';
import Layout from '../components/layouts/webstie';
import SideBar from '../components/logical/sections/sidebar';
import Axios from 'axios';
import List from '../components/logical/sections/list'
import InfiniteScroll from 'react-infinite-scroller';
const api = {
    baseUrl: '/api/posts/',
};


class sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            url: '',
            hasMorePosts: true,
            next_page: null,
            display_list: false,
        };
    }


    /*     componentDidMount() {
            Axios({
                methods: 'get',
                url: '/api/posts?page=1',
                headers: { 'api-key': 'the_key' }
            })
                .then(response => {
                    console.log(response)
                    this.setState({
                        posts: response.data.result,
                        url: window.location.href
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } */


    loadPosts() {
        var self = this;
        let url = api.baseUrl;

        if (this.state.next_page) {
            url = this.state.next_page;
        }

        Axios({
            methods: 'get',
            url: url,
            headers: { 'api-key': 'the_key' }
        }).then(response => {
            console.log('posts' + response.data.result)
            if (response) {
                let items = self.state.posts;

                response.data.result.map((post) => {
                    items.push(post);
                });

                if (response.data.pagination.nextPage) {
                    self.setState({
                        posts: items,
                        next_page: response.data.pagination.nextPage
                    });
                }
                else {
                    self.setState({
                        hasMorePosts: false,
                    })
                }
            }
        })
            .catch()
    }

    render() {
        return (
            <Layout
                title="Orangeito"
                link={this.state.url}
                author="Orangeito"
            >

                <div className="col mt-5">
                    <div className="row">
                        <div className="col-12 col-lg-8 col-xl-8 mx-auto row">
                            {/*                          <div className="d-none d-lg-block d-xl-block col-2">
                                <SectionsMenu />
                            </div> */}

                            {/* content grid */}
                            <div className="col-md-12 col-lg-8 col-xl-8">
                                {/*  <Masonry posts={this.state.posts} /> */}
                                {/*  <MemeGrid posts={this.state.posts} /> */}
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadPosts.bind(this)}
                                    hasMore={this.state.hasMorePosts}
                                    loader={<div className="loader text-c" key={0}>Loading ...</div>}

                                >
                                    <div className="list-spc">
                                        {

                                            this.state.posts.map(el => {
                                                return (

                                                    <List 
                                                        title={el.title}
                                                        id={el.id}
                                                        thumbnail={el.thumbnail}
                                                        image_link={el.image_link}
                                                        type={el.type}
                                                        />
                                                )
                                            })
                                        }
                                    </div>
                                </InfiniteScroll>

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

export default sections;