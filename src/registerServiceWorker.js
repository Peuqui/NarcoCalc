/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
      const banner = document.createElement('div')
      banner.setAttribute('style',
        'position:fixed;top:0;left:0;right:0;z-index:9999;' +
        'background:#078300;color:#fff;padding:12px 20px;' +
        'text-align:center;font-size:16px;cursor:pointer;' +
        'box-shadow:0 2px 8px rgba(0,0,0,0.3)')
      banner.textContent = 'Neue Version verfügbar — hier klicken zum Aktualisieren'
      banner.addEventListener('click', () => window.location.reload())
      document.body.appendChild(banner)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
