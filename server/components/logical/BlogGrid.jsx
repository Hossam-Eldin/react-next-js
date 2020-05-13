import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import Axios from 'axios';
import { BlogCard } from '../index'
import ContentLoader, { Facebook } from 'react-content-loader'
import ListPost from '../parts/Cards/ListPost'


const MyLoader = () => (
    <ContentLoader
        height={475}
        width={500}
        speed={2}
        primaryColor="#dcdcdc"
        secondaryColor="#ecebeb"
    >
        <rect x="36" y="420" rx="4" ry="4" width="290" height="11" />
        <rect x="18" y="81" rx="5" ry="5" width="393" height="302" />
        <rect x="35" y="394" rx="0" ry="0" width="290" height="13" />
        <rect x="25" y="50" rx="0" ry="0" width="365" height="13" />
    </ContentLoader>
);


class BlogGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            nextPage: null,
            currentPage: null,
            load: true
        };
    }

    componentDidMount() {
           Axios.get('/api/articles')
              .then(response => {
                  console.log(response.data)
                  this.setState({
                      articles: response.data.result,
                      nextPage: response.data.pagination.nextPage,
                      currentPage:  response.data.pagination.current_page,
                  })
              })
              .catch(error => {
  
              }) 
    }


    handleLoadMore = () => {
        Axios.get(this.state.nextPage)
            .then(response => {
                console.log('on load more clicked ')
                console.log(response.data)

                this.setState({
                    articles: this.state.articles.concat(response.data.result),
                    currentPage: response.data.pagination.current_page,
                })
                if (response.data.pagination.nextPage) {
                    this.setState({
                        nextPage: response.data.pagination.nextPage
                    })
                }
                else {
                    this.setState({
                        nextPage: null,
                        load: false
                    })
                }

                console.log(this.state.articles)
            })
            .catch(error => {

            })
    }

    render() {
        return (
            <div>


                <div className="row">

                    {
                        this.state.articles === undefined || this.state.articles.length == 0 ?


                            (
                            <div className="col-12 row">
                                <div className="col-12"><MyLoader /> </div>
                                <div className="col-12 "><MyLoader /> </div>
                                <div className="col-12 "><MyLoader /> </div>
                                <div className="col-12 "><MyLoader /> </div>
                                <div className="col-12 "><MyLoader /> </div>
                            </div>
                            )
                            :
                            this.state.articles.map((el, i) => {
                                return (
                                    <ListPost
                                        key={i}
                                        id={el.id}
                                        title={el.title}
                                        image={el.thumbnail}
                                        summery={el.summery}
                                        date={el.created_at}
                                        tags={el.tags}
                                        author={el.author}
                                        author_id={el.author_id}
                                        author_avatar={el.author_avatar}
                                    />
                                )

                            })

                    }
                    {this.state.load === false ?
                        (<p className="text-center col-12 h3" > The End </p>) :
                        (

                            <div className="col-12 d-flex mb-5 justify-content-center">
                                <button className="btn btn-warning text-dark " onClick={this.handleLoadMore}> LOAD MORE </button>
                            </div>
                        )}

                </div>
            </div>
        );
    }
}

export default BlogGrid;