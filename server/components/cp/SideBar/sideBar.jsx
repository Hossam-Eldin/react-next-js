import React from 'react'
import Link from 'next/link'

class sideBar extends React.Component {
    state = {
        open: false,
    };
    render() {
        const { open } = this.state;
        return (
            <div>
                <div id="sidebar-container" className="nav-go sidebar-expanded d-none d-md-block">
                    <ul className="list-group">
                        <li>
                            <Link href="/cp/home" >
                                <a className="list-group-item cp-link"> Home</a>
                            </Link>
                        </li>
                        <li >
                            <Link href="/cp/posts/create">
                            <a className="list-group-item cp-link">Create</a>
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>
        )
    }

}


export default sideBar;