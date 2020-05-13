import React, { Component } from 'react';





const UserComponent = (props) => {
    return (
        <div title={props.name}>
                <img src={props.avatar} className="img-fluid nav-avatar" alt="" />
        
        </div>
    )
}

export default UserComponent;