



const staticDevCoffee = "dev-coffee-site-v1";
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { RiHomeSmile2Line, RiHomeSmile2Fill, RiUser5Fill, RiSearchEyeFill } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { RiUser5Line } from 'react-icons/ri'

const BottomNavBar = props => {
    const history = useHistory()
    const [activeTabs, setActiveTabs] = useState(props.name)
    useEffect(() => {
        switch (activeTabs) {
            case 'home':
                history.push('/')
                break;
            case 'search':
                history.push('/search')
                break;
            case 'favourites':
                history.push('/favourites')
                break;
            case 'account':
                history.push('/account')
                break;
            default:
                history.push('/')
                break;
        }
    }, [activeTabs, history])

    return (
        <div className='bottom-nav'>
            <div className='bn-tab'>
                {activeTabs === 'home' ?
                    <RiHomeSmile2Fill
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('home')}
                    /> :
                    <RiHomeSmile2Line
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('home')}
                    />}
            </div>
            <div className='bn-tab'>
                {activeTabs === 'search' ?
                    <RiSearchEyeFill
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('search')}
                    /> :
                    <BiSearchAlt
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('search')}
                    />}
            </div>
            <div className='bn-tab'>
                {activeTabs === 'favourites' ?
                    <AiFillHeart
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('favourites')}
                    /> :
                    <AiOutlineHeart
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('favourites')}
                    />}
            </div>
            <div className='bn-tab'>
                {activeTabs === 'account' ?
                    <RiUser5Fill
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('account')}
                    /> :
                    <RiUser5Line
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('account')}
                    />}
            </div>
        </div>
    )
}

export default BottomNavBar





const assets = [
 "/",
 "/index.html",
// "/css/style.css",
// "/js/app.js",
//  "/tabelle.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
      caches.open(staticDevCoffee).then(cache => {
          cache.addAll(assets)
      })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
          return res || fetch(fetchEvent.request)
      })
  )
})



const expectedCaches = ["dev-coffee-site-v1"];

self.addEventListener('install', event => {
console.log('V3 installing…');
caches.delete("dev-coffee-site-v1");
console.log("Old cache deleted");
// cache a horse SVG into a new cache, static-v2
caches.open(staticDevCoffee).then(cache => {
  cache.addAll(assets)
}) 
});


self.addEventListener('activate', event => {
console.log("Service worker activated, deleting cache now");
// delete any caches that aren't in expectedCaches
// which will get rid of static-v1
event.waitUntil(
  caches.keys().then(keys => Promise.all(
    keys.map(key => {
      if (!expectedCaches.includes(key)) {
        return caches.delete(key);
      }
    })
  )).then(() => {
    console.log('V2 now ready to handle fetches!');
  })
);
});



self.addEventListener('message', function(event) {
event.ports[0].postMessage({'test': 'This is my response.'});
});
