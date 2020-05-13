import React from 'react'
import Layout from '../components/layouts/webstie'
import { SubNav, SideBar, EmojiBar, Slider, BlockCard } from '../components/index'
import BlogHeader from '../components/logical/BlogHeader'
import CardList from '../components/logical/CardList'
import CardGrid from '../components/logical/BlogGrid';
import Link from 'next/link';
import Axios from 'axios'
import BlogGrid from '../components/logical/BlogGrid';

export default () => {



  const PostList = [
    { title: 'something lorem or something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
    { title: 'something', image: "https://media.gettyimages.com/photos/vernazza-nights-picture-id988625206", tag: "tag" },
  ]
  return (
    <Layout title="Orangeito">
      {/*       <SubNav />
 */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 mx-auto">
            <BlogHeader />
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {/*    <Link href="/section/?id='" as="/o/2">
              <h1 className="title">something</h1>
            </Link> */}

          <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10  mx-auto border-t mt-5">
            <div className="row">
              {/* index content */}
              <div className="col-sm-12 col-md-12 col-lg-8">
                <div className="col-sm-12 col-md-12 col-lg-10 mx-auto">
                  <BlogGrid />
                </div>

              </div>
              {/* side bar */}
              <div className="col-md-4 col-lg-4 d-none d-lg-block d-xl-block border-l">
                <SideBar sideTitle="Popular Title" posts={PostList} />
              </div>
            </div>
          </div>
        </div>


      </div>


    </Layout>
  )
}

