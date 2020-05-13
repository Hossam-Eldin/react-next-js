import React from 'react'
import Head from 'next/head'
import 'bootstrap-scss'

const Header = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
      <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      <meta name="keywords" content={props.keywords} ></meta>
      <meta name="news_keywords" content={props.keywords}></meta>
      <meta name="twitter:url" content={props.link}></meta>

      <link rel="canonical" href={props.link}></link>
      <meta property="og:title" content={props.title}></meta>
      <meta property="og:type" content="article"></meta>
      <meta name="twitter:image" content={props.image}></meta>
      <meta property="og:image" content={props.image}></meta>
      <meta name="author" content={props.author || 'orangeito'}></meta>
      <meta property="og:url" content={props.link}></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@orangeito"></meta>
      <meta name="twitter:title" content={props.title}></meta>
      <meta property="og:description" content={props.description}></meta>
      <meta name="description" content={props.description}></meta>
      <meta name="twitter:description" content={props.description}></meta>
      <meta property="og:locale" content="en_US"></meta>
      <meta property="og:site_name" content="Orangeito"></meta>
      {/*         <meta property="fb:app_id" content="35737966741"></meta>*/}
      {/*         <link rel="amphtml" href="https://kotaku.com/the-week-in-games-get-over-here-1834154272/amp"></link>
 */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </Head>
  )
}


export default Header;