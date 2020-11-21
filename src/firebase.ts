import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDF7lMHvh7G6QzxrfnldYTFQuv8lHYGIEA",
  authDomain: "blood-3cf97.firebaseapp.com",
  databaseURL: "https://blood-3cf97.firebaseio.com",
  projectId: "blood-3cf97",
  storageBucket: "blood-3cf97.appspot.com",
  messagingSenderId: "514588445680",
  appId: "1:514588445680:web:86db63e01e652c13efab35",
  measurementId: "G-WD290T3NYS"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const ref = storage.ref();
//quirey https://cloud.google.com/firestore/docs/manage-data/add-data

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const imageCollection = db.collection('images')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  ref,
  db,
  firebase,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  imageCollection
}
