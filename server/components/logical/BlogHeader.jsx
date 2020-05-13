import React, { Component } from 'react';
import { BlockCard } from '../index'
import Axios from "axios";
import Sliding from '../parts/MoreSlider/MoreSlider'
import { SubNav, SideBar, EmojiBar } from '../index'

const Testing = (props) => {
    return (
        <div>
            {
                props.posts.map(el => {
                    return <div>{el.id}</div>
                })
            }
        </div>
    )
}


class BlogHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider_data: [],
            featured: [],
            bigPost: {},
            badges:[],
            featuredDisplay : false,
        }
    }

    componentWillMount() {
        Axios.get('/api/badges')
        .then(response=>{
            this.setState({
                badges:response.data.data
            })
        })
        .catch(error=>{
            console.log(error)
        })

        this.getSlider().then(result => {
            this.setState({
                slider_data: result.data.data
            })
        })

        this.getFeatured().then(response => {
        //            console.log('ff posts ' + JSON.stringify(response.data.data))
            this.setState({featuredDisplay: true})
            this.setState({ featured: response.data.data })
            this.setState({ bigPost: this.state.featured[0] })
            //   console.log(`big paot ${this.state.bigPost}`)
          //  alert(JSON.stringify(this.state.bigPost))
        })


    }
    /**
     * slider 
     */
    getSlider = async () => {
        let data
        try {
            data = await Axios.get('/api/slider')

        } catch (error) {
            console.log(error)
        }
        return data;

    }



    getFeatured = async () => {
        let data
        try {
            data = await Axios.get('/api/featured')
        } catch (error) {
            console.log(error)
        }
        return data;
    }


    render() {
        let bigPost = this.state.bigPost;
        return (
            <div>
                <div className="container mb-4 mt-5">

                <EmojiBar badges={this.state.badges} />

{/*                  <Sliding posts={this.state.slider_data} title="slider for blog" />
 */}                </div>
                {
                    this.state.featured.length != 0 || this.state.featured != undefined || this.state.featuredDisplay == true ?
                        (
                            <div className="row">
                                <div className="col-5 pr-1 pl-0">
                                {
                                    bigPost != null ?
                                        <BlockCard title={bigPost.title} image={bigPost.thumbnail} />

                                    : null
                                }
                                </div>
                                <div className="col-7 pl-3 pr-2">
                                    <div className="row">
                                        {  this.state.featuredDisplay == true ? 
                                            this.state.featured.slice(1).map(el => {
                                                return (
                                                    <div key={el.title} className="col-6 mb-2 pr-1 pl-1">
                                                        <BlockCard title={el.title} 
                                                                height="222px"
                                                                 image={el.thumbnail}
                                                                 fontSize="20px" />
                                                    </div>
                                                )
                                            })
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>


                        ) : null
                }
 

            </div>
        );
    }
}

export default BlogHeader;