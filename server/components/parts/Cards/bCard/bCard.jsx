import React, { Component } from 'react';
import { Emoji } from '../../../index'
import styles from './style.scss';

class bCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="sc-card">
                    <img className="card-img-top" src={this.props.image} alt="Card image cap" />
                    <div className="sc-card-body">
                        <p className="sc-title">{this.props.title}</p>
                    </div>
                </div>
            </div>

            /*      <div className="card" style={styles} >
                     <div className="tags-list">
                             <ul className="list-inline">
                                 <li className="list-inline-item">
                                     <Emoji img="../static/emoji/omg.svg" height="35px" width="35px" />
                                 </li>
     
                             </ul>
                         </div>
                     <img className="card-img-top" src={this.props.image} alt="Card image cap" />
                         <div className="card-body p-2">
                         <p className="card-text sc-title">{this.props.title}</p>
                     </div>
                 </div> */

        );
    }
}

export default bCard;