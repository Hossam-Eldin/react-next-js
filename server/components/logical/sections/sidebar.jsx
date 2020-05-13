import React, { Component } from 'react';
import {NavSlider, BoxFooter} from '../../index'




const PostList = [
    { title: 'something lorem or something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something 222', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something 44', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },

];

class sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="row mx-auto">
                    <div className="col-12" style={{overflow:'hidden'}}>
                        <NavSlider posts={PostList} />

                        <BoxFooter/>
                    </div>
            </div>    
        );
    }
}

export default sidebar;