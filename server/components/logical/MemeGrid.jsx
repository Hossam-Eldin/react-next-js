import React from 'react'
import Link from 'next/link'


const MemeGrid = (props) => {
    return(
        <div className="card-columns">

            {
                props.posts.map(el=>{
                    return(
                        <div className="card">
                        <img src={el.thumbnail || el.image_link} alt="" className="img-fluid"/>
                        {
                            el.video_link ?
                          (
                                <iframe src={el.video_link} width="100%" frameborder="0"></iframe>

                            ):
                            null
                        }
                        {
                            el.ex_link ?
                          (
                                <iframe src={el.ex_link} width="100%" frameborder="0"></iframe>

                            ):
                            null
                        }
                
                        <div className="card-body">
                        <h5 className="card-title">
                        <Link  href={ `/post/?title=${el.title}`} as={`/p/${el.id}`}>
                             {el.title}
                        </Link>

                        </h5>
                        <p className="card-text">{el.summery}</p>
                        </div>
                    </div>
                    )
                })
            }



        </div>
    )
}

export default MemeGrid;