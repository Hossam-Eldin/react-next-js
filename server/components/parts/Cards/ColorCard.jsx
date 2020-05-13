import React, { Component } from 'react';

const ColorCard  = (props) => {
    return (
        <div className="color-card text-light" style={{backgroundColor:props.bgColor}}>
            <div className="color-card-header p-2">
                {props.name}
            </div>
            <div className="color-card-body p-3"><h2 className="m-0 text-light">{props.number}</h2></div>
            <div className="color-card-footer p-2" > got to the this thing </div>
        </div>
    )
};


export  default  ColorCard;