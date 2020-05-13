import React, { Component } from 'react';
import { ReactionBtn } from '../../index'
import Axios from 'axios';


const reactions = [
    { name: 'Happy', image: '/static/emoji/laughcry.svg' },
    { name: 'Fail', image: '/static/emoji/damn_original_2.svg' },
    { name: 'Cute', image: '/static/emoji/cute_original.svg' },
    { name: 'WTF', image: '/static/emoji/wtf.svg' },
    { name: 'OMG', image: '/static/emoji/omg.svg' },
    { name: 'Love', image: '/static/emoji/love.svg' },
    { name: 'COOL', image: '/static/emoji/win.svg' },
    { name: 'GEEKY', image: '/static/emoji/geek_original.svg' },
    { name: 'Sad', image: '/static/emoji/sad.svg' },
    { name: 'Angry', image: '/static/emoji/angry.svg' },
    { name: 'Scary', image: '/static/emoji/scary.svg' },
    { name: 'Confused', image: '/static/emoji/confused.svg' },
]


class Reaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reaction: null,
            postId: null
        };

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.postId != null) {
            let reaction = localStorage.getItem(`key_${nextProps.postId}`);
            return {
                postId: nextProps.postId,
                reaction
            }
        }
    }

    handleReaction = (reaction, postId) => {
        //alert(postId)
        let key = `key_${postId}`
        localStorage.setItem(key, reaction)

        let data = {
            post_id: postId,
            cute: reaction == 'Cute' ? reaction : null,
            fail: reaction == 'Fail' ? reaction : null,
            happy: reaction == 'Happy' ? reaction : null,
            wtf: reaction == 'WTF' ? reaction : null,
            omg: reaction == 'OMG' ? reaction : null,
            love: reaction == 'Love' ? reaction : null,
            cool: reaction == 'COOL' ? reaction : null,
            geeky: reaction == 'GEEKY' ? reaction : null,
            angry: reaction == 'Angry' ? reaction : null,
            sad: reaction ==  'Sad'? reaction : null,
            scary : reaction == 'Scary'? reaction : null,
            confused : reaction ==  'Confused' ?  reaction :null,

        }
        Axios.post('/api/create-reaction', data)
            .then(response => {
                console.log(response)
                this.forceUpdate();
            })
            .catch(error => {
                console.error(error)
            })
    }




    render() {

        let result = this.props.reactions.filter((el) => {
            return el.name == this.state.reaction
        });
        let gray = this.props.reactions.filter(el => {
            return el.name != this.state.reaction
        })

        console.log('post id' + this.state.postId)
        console.log('reaction' + this.state.reaction)

        return (
            <div className="mt-4 border-t p-3 pt-5">
                <h6 className="text-c">WHAT'S YOUR REACTION?</h6>
                <ul className="list-inline m-0 mt-3">

                    {
                        this.state.reaction == null ?
                            this.props.reactions.map(el => {

                                return (

                                    <li onClick={e => this.handleReaction(el.name, this.props.postId)}
                                        className="list-inline-item ml-3">
                                        <ReactionBtn title={el.name} image={el.image}  vote={el.vote}/>
                                    </li>
                                )
                            })
                            : null

                    }
                    {
                        this.state.reaction != null ?
                            result.map(el => {
                                return (
                                    <li className="list-inline-item ml-3">
                                        <ReactionBtn title={el.name} image={el.image} vote={el.vote} />
                                    </li>
                                )
                            })
                            : null

                    }
                    {
                        this.state.reaction != null && this.state.postId == this.props.postId ?
                            gray.map(el => {
                                return (

                                    <li
                                        className="list-inline-item ml-3 gray-emoji">
                                        <ReactionBtn title={el.name} image={el.image} vote={el.vote} />
                                    </li>
                                )
                            })
                            : null
                    }

                </ul>
            </div>
        );
    }
}

export default Reaction;