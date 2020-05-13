import React, { Component } from 'react';
import { FaArrowUp, FaArrowDown, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';


class VoteBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    upVote = () => {
        axios.post('/api/up-vote',{
            post_id:this.props.post_id
        })
        .then(response=>{
            console.log(response);
        })
        .catch(err=>{
            console.log(err);
        })

    }
    downVote = () => {
        axios.post('/api/down-vote',{
            post_id:this.props.post_id
        })
        .then(response=>{
            console.log(response);
        })
        .catch(err=>{
            console.log(err);
        })
     }

    render() {
        const btnStyle = {
            width: this.props.width,
            height: this.props.height
        }
        return (
            <div className="vote-btn" style={btnStyle}>
                <button className="up-btn" title="vote up" onClick={this.upVote}> <FaChevronUp /> </button>
                <button className="down-btn" title="vote down" onClick={this.downVote} > <FaChevronDown /> </button>
            </div>
        );
    }
}

export default VoteBtn;