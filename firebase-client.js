import {initializeApp,getApps,getApp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import {getFirestore} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';
import {getStorage} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js';
import {firebaseConfig} from './firebase-config.js';

export const configReady=Boolean(firebaseConfig.apiKey&&firebaseConfig.projectId&&firebaseConfig.appId);
const app=configReady?(getApps().some(a=>a.name==='[DEFAULT]')?getApp():initializeApp(firebaseConfig)):null;
export const auth=app?getAuth(app):null;
export const db=app?getFirestore(app):null;
export const storage=app?getStorage(app):null;
