import { types, applySnapshot } from 'mobx-state-tree'
import posts from './posts.js'
import Sections from './sections';
import oauth from './auth';
let store = null

const Store = types
  .model({
    lastUpdate: types.Date,
    light: false,
    data: 'this from mobx',
    posts: types.optional(posts, { items: [] }),
    oauth: types.optional(oauth, { items: [] }),
    sections: types.optional(Sections, { items: [] }),
    auth:false,
  
  })
  .actions(self => {
    let timer
    function changeAuth(){
      self.auth = false;
      console.log('this mobx' + self.auth)
    }  

    function start () {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data
        // pass off to another action instead
        self.update()
      }, 1000)
    }

    function update () {
      self.lastUpdate = Date.now()
      self.light = true
    }

    function stop () {
      clearInterval(timer)
    }

    return { start, stop, update,changeAuth }
  })

export function initializeStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({ lastUpdate: Date.now() })
  }
  if (store === null) {
    store = Store.create({ lastUpdate: Date.now() })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
