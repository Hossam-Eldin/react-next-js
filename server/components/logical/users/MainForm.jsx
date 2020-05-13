import React, { Component } from 'react';

class MainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <input type="text"
                        className="form-control input-o"
                        placeholder="Title" 
                        onChange={this.props.handleChange('title')}/>
                </div>

                <div className="form-group">
                    <textarea className="form-control input-o"
                        onChange={this.props.handleChange('description')} defaultValue="Description"></textarea>
                </div>
                {/*  tags */}
          {/*       <div className="form-group" style={tagStyle}>
                    <TagsInput value={this.state.tags} onChange={this.handleTags} />
                </div> */}
                <button type="button" onClick={this.props.nextStep}  className="btn btn-info">Next</button>
            </div>
        );
    }
}

export default MainForm;