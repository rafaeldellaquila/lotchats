import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAx6I-Xc7Mmyil5zZTd154zdddl_j4RpYo',
  authDomain: 'lotchats.firebaseapp.com',
  projectId: 'lotchats',
  storageBucket: 'lotchats.appspot.com',
  messagingSenderId: '128567894933',
  appId: '1:128567894933:web:2a7c436a7782daf3ba0c9c'
}

const app = initializeApp(firebaseConfig)

export default app
