import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import tagStyle from '../../../assets/cp/components/tags.scss'

class videoUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
    }
    render() {
        return (
            <div>
                <form className="row">

                    <div className="col-5">
                        <div className="form-group">
                            <input type="text" className="form-control input-o" placeholder="Video Url" />
                        </div>

                    </div>
                    <div className="col-7">
                        <div className="form-group">
                            <input type="text" className="form-control input-o" placeholder="Title" />
                        </div>

                        <div className="form-group">
                            <textarea className="form-control input-o" >Description</textarea>
                        </div>
                        {/*  tags */}
                        <div className="form-group" style={tagStyle}>
                            <TagsInput value={this.state.tags} onChange={this.handleTags} />
                        </div>
                        <button className="btn  btn-block btn-o text-c"> Post </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default videoUrl;