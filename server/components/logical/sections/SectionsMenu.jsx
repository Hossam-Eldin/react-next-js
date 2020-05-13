import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Link from 'next/link';

@inject('store')
@observer class SectionsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };
    }

    componentDidMount() {
        this.props.store.sections.getSection()
            .then(response => {
                console.log(response)
                if (response.data.result) {

                    this.setState({
                        sections: response.data.result
                    })
                }
            })

    }
    render() {
        return (
            <div>
                <ul className="list-group border-less">
                    {
                        this.state.sections.map(el => {
                            return (

                                <li key={el.id} className="list-group-item p-0  m-0 text-c border-less">
                                    <Link href={`/section/?title=${el.name}`} as={`/o/${el.name}`}>
            
                                    <a className="h5 m-0 text-c section-li-item">
                                     <img src={el.icon} className="section-icon" alt=""/>  
                                     {el.name}
                                     </a>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        );
    }
}

export default SectionsMenu;