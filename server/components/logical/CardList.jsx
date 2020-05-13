import React from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import  {BlogCard} from '../index'

const api = {
    baseUrl: '/api/articles/',
};

class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            hasMorePosts: true,
            next_page: null,
            display_list: false,
        }
    }

    loadPosts() {
        var self = this;
        let url = api.baseUrl;

        if (this.state.next_page) {
            url = this.state.next_page;
        }

        axios.get(url).then(response => {
            console.log(response.data.result)
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


    change =() => {
        this.setState({
            display_list: !this.state.display_list
        });
    };

    componentWillMount(){
        axios.get(api.baseUrl)
            .then(response => {
                console.log(response)
            })
            .catch(error=>{
                    console.log(error)
            })
    }

    render() {
        return (
            <div>
                <button className="btn btn-info"
                          onClick={this.change}  >
                        switch
                </button>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadPosts.bind(this)}
                    hasMore={this.state.hasMorePosts}
                    loader={<div key={Math.random()}>Loading ...</div>}>

                    <div className="tracks row">
                        {this.state.posts.map((el, i) => {
                            return(
                                <BlogCard
                                    key={i}
                                    id={el.id}
                                    title={el.title}
                                    image={el.thumbnail}
                                    summery={el.summery}
                                    date={el.created_at}
                                    tags={el.tags}
                                />
                            )

                        })}
                    </div>
                </InfiniteScroll>
            </div>

        )
    }
}

export default CardList;

