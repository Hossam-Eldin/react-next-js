import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../components/layouts/webstie'
import Axios from 'axios';
import { PostHeader, SideBar, MoreSlider, Reaction, ShareBar, NavSlider,Comment} from '../components/index'



class Post extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            post: {},
            reactions: {},
            reaction_list: [],
            comments : [],
            url:''
        }      
    }
  

    componentDidMount() {
        const { router } = this.props;


        //console.log(router.query.id);
         Axios.get('/api/article/?id=' + router.query.id)
            .then(response => {
              // console.log(response.data)
                this.setState({
                    post: response.data.data,
                    reactions: response.data.data.reactions ? response.data.data.reactions : null,
                    url:window.location.href,    
                })
               
           
               this.getComments()
              //  console.log('this state. reactions ' + this.state.reactions)

                let reaction_list = [];
                let reaction = this.state.reactions;
                if (this.state.reactions!= null ) {
                    
                    reaction_list.push({ 'vote': `${reaction.happy}`, name: 'Happy', image: '/static/emoji/laughcry.svg' });
                    reaction_list.push({ 'vote': `${reaction.sad}`, name: 'Sad', image: '/static/emoji/sad.svg' });
                    reaction_list.push({ 'vote': `${reaction.angry}`, name: 'Angry', image: '/static/emoji/angry.svg' });
                    reaction_list.push({ 'vote': `${reaction.omg}`, name: 'OMG', image: '/static/emoji/omg.svg' });
                    reaction_list.push({ 'vote': `${reaction.cool}`, name: 'COOL', image: '/static/emoji/win.svg' });
                    reaction_list.push({ 'vote': `${reaction.wtf}`, name: 'WTF', image: '/static/emoji/wtf.svg' });
                    reaction_list.push({ 'vote': `${reaction.cute}`, name: 'Cute', image: '/static/emoji/cute_original.svg' });
                    reaction_list.push({ 'vote': `${reaction.geeky}`, name: 'Geeky', image: '/static/emoji/geek_original.svg' });
                    reaction_list.push({ 'vote': `${reaction.fail}`, name: 'Fail', image: '/static/emoji/damn_original_2.svg' });
                    reaction_list.push({ 'vote': `${reaction.love}`, name: 'Love', image: '/static/emoji/love.svg' });
                    reaction_list.push({ 'vote': `${reaction.scary}`, name: 'Scary', image: '/static/emoji/scary.svg' });
                    reaction_list.push({ 'vote': `${reaction.confused}`, name: 'Confused', image: '/static/emoji/confused.svg' });
                }

                this.setState({ reaction_list: reaction_list })
                console.log('reaction list ' + JSON.stringify(this.state.reaction_list))
            }) 
           // }) 
        //  console.log(router);




    }

    getComments = () =>{
        Axios({
            methods: 'get',
            url: `/api/get-comments/${this.state.post.id}`,
            headers: { 'api-key': 'the_key' }
        })
            .then(response => {
                console.log('comments '+ JSON.stringify(response.data))
                this.setState({
                    comments: response.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }



    render() {
        let { image, title, summery,keywords ,author} = this.state.post;
       let url = this.state.url;
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


                <div className="container-fluid">

                    <div className="row pt-5 pb-5 article">
                        {/* size controlling div */}
                        <div className="col-12 col-lg-10 col-xl-10  mx-auto bg-c" >
                            <div className="row">
                            {/* sidebar display only on lg and xl */}
                                <div className="d-none d-lg-block d-xl-block  col-3 pb-5 pr-0 border-r ">
                                    <SideBar sideTitle="Related Post" posts={PostList} />
                                </div>
                                {/* //article section */}
                                <div className="col-sm-12 col-md-12 col-lg-9 p-0">

                                    <div className="p-3 col-11 d-block mx-auto">

                                        <PostHeader image={image} title={title} summery={summery} url={url} />
                                    </div>

                                    <div className="col-12 col-lg-11 col-xl-11 d-block mx-auto">

                                        <img src={this.state.post.image} className="img-fluid" alt="" sizes="(min-width: 1221px) 846px, (min-width: 880px) calc(100vw - 334px), 100vw" />

                                        <div className="pb-2 col-12 ">

                                            <div className="post-content">
                                                <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />

                                            </div>
                                            {/* share bar for social media */}
                                            <ShareBar head="LIKE IT? SHARE WITH YOUR FRIENDS!" title={title} link={url} />
                                        </div
                                        >
                                        {this.state.reaction_list.map(el => {
                                            return <span>{el.vote}</span>
                                        })}
                                         {/* reaction icons */}
                                        <Reaction postId={this.state.post.id} reactions={this.state.reaction_list} />
                                        
                                         {/*    comment section */}
                                        <div className="border-t pt-5 pb-5">
                                            <Comment postId={this.state.post.id}  comments={this.state.comments} />
                                        </div>
                                   
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div> 

            </Layout>

        )
    }
}




export default withRouter(Post);