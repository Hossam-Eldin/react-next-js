import React, { Component } from 'react';
import { Radio, Input } from 'antd';

class SectionsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,

        };
    }

    handleSelected = (e, i) => {
        e.preventDefault();
        alert(i);
    }
    render() {
        let { selected } = this.state;
        let classes = { 'is-selected': this.state.selected }
        return (
            <div>

                <div className="user-sections-select">
                    {/*                     <select className="form-control" onChange={e=>this.props.handleSection(e)}>
                        {
                            this.props.sections.map(el=>{
                                return  <option value={el.id}>{el.name}</option>
                            })
                        }
                    </select> */}
                    <ul className="list-group">
                        {
                            this.props.sections.map((el, i) => {
                                return <li className={`list-group-item`}>
                                    <span className="text-c"> {el.name} </span>
                                    <input type="radio" name="sections" value={el.id} onChange={e => this.props.handleSection(e)} className="form-control" />
                                </li>
                            })
                        }

                    </ul>
                </div>
                <button className="btn btn-info" onClick={this.props.prevStep}>Prev</button>
                <button className="btn btn-info" onClick={e => this.props.handleSubmit(e)}>Post</button>
            </div>
        );
    }
}

export default SectionsForm;