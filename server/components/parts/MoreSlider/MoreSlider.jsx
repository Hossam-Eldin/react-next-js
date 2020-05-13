import React, { Component } from "react";
import Slider from "react-slick";
import styles  from './style.scss'
import {ImgCard, LinkCard} from '../../index'
import {FaLink} from 'react-icons/fa'
 class MoreSlider extends Component {


    render() {

        var settings = {
          //  dots: true,
            infinite: true,
            speed: 500,
            slidesToShow:8,
            slidesToScroll: 8,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div style={styles}>
                <Slider {...settings}>
                    {this.props.posts.map((item)=>{
                             return(
                                <div key={item.id}>   
                                    <div className="col-12 p-2"  title={item.type} >
                                        {
                                            item.thumbnail || item.image_link ? 
                                            <ImgCard image={item.thumbnail || item.image_link} title={item.title} tag={item.tag}></ImgCard>                                
                                              : null  
                                        }
                                        {
                                            item.ext_link ? 
                                                (
                                                    <LinkCard ext_link={item.ext_link} title={item.title} />
                                                )
                                            : null
                                         }
                                         {
                                             item.video_link?
                                             (
                                                    <LinkCard video={item.video_link}  title={item.title}/>
                                             )  
                                             :null

                                         }

                                    </div>
                                </div>
                             )   
                    })}
                </Slider>
            </div>
        );
    }
}

export default  MoreSlider;