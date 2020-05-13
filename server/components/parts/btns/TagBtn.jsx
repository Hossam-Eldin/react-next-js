import React, { Component } from 'react';

class TagBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {
                    this.props.tags.map(el => {
                        return (
                            <div className="tag-btn btn">
                                <a>{el.tag_name}</a>
                            </div>
                        )
                    })
                }
            </div>


        );
    }
}

export default TagBtn;