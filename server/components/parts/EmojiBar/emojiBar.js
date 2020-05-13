import React from 'react'
import _ from 'lodash'
import {Emoji} from '../../index'
import Link from 'next/link';
//import {Cicon} from '../index'
//import './style.scss'

const URLS = [
  {url:'../../static/emoji/cute_original.svg',title:'cute'},
  {url:'../../static/emoji/damn_original_2.svg',title:'damn'},
  {url:'../../static/emoji/geek_original.svg' ,title:'geek'},
  {url:'../../static/emoji/laughcry.svg',title:'laughcry'},
  {url:'../../static/emoji/love.svg', title:'love'},
  {url:'../../static/emoji/omg.svg', title:'omg'},
  {url:'../../static/emoji/win.svg' , title:'win'},
  {url:'../../static/emoji/wtf.svg', title:'wtf'},
]


const emojis = (props) => {
    return(
            <div className="wrapper d-flex justify-content-center"> 
              <ul className="list-inline   mt-3 mb-3">
              {_.map(props.badges, el => {
                return(
                 <li key={el.name} title={el.name} className="list-inline-item p-2" > 
                    <Link href={`/single/badge/?badge=${el.name}`} as={`/b/${el.name}`} >
                      <a>
                       <Emoji key={el.name} img={el.icon} />
                      </a>
                    </Link>
                  </li>
                )
              })}




            </ul>

         </div>)
}

export default emojis;