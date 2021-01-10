import uuid from "uuid";
import firebase from 'firebase';
import db from "../config/Firebase";
//import { LogBox } from 'react-native';
import _ from 'lodash';

// LogBox.ignoreLogs(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = (message:any) => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };

 export const updateDescription = (input:any) => {
return {type:'UPDATE_DESCRIPTION', payload: input}
 }


export const updateNextPhoto = (input:any) => {
	return async (dispatch:any, getState:any) => {
		try {
			let array = []
			const { post } = getState()
			post.photos?.forEach((photo:any) => {
				array.push(photo)
			});
			array.push(input)

			dispatch({type: 'UPDATE_POST_NEXT_PHOTO',  payload:array})
		} catch (e) {
			alert(e)
		}
	}
}
export const removeImage = (photoToRemove:any) => {
	return async (dispatch:any, getState:any) => {
		try {
            let array:any = []
            const { post } = getState()
            post.photos?.forEach((photo:any) => {
                array.push(photo)
            }) 
            array.splice(photoToRemove, 1)
			dispatch({type: 'UPDATE_POST_NEXT_PHOTO',  payload:array})
		} catch (e) {
			alert(e)
		}
	}
}

export const uploadPost = () => {
	return async (dispatch:any, getState:any) => {
		try{
			const { post, user } = getState()
			const id = uuid.v4()
			const upload = {
				id:id,
				uid: user.uid,
				photo: user.photo,
				photos: post.photos,
				username: user.username,
				date: new Date().getTime(),
				savedBy:[],
				likes:[],
				comments:[],
				description: post.description
			}
			
			await db.collection('posts').doc(id).set(upload)
			await db.collection('users').doc(user.uid).update({
				posts: firebase.firestore.FieldValue.arrayUnion(id)
			})
		}catch(e){
			alert(e)
		}
	}
}

export const getPosts = (numberOfPosts:any) => {
	return async (dispatch:any, getState:any) => {
		const posts = await db.collection('posts').orderBy('date', 'desc').limit(numberOfPosts).get()
		let array:any = [] 
		// const posts = db.collection('posts').orderBy('date', 'desc').limit(numberOfPosts).onSnapshot((snapshot:any) =>(
		// 	snapshot.forEach((post:any) =>{
		// 		array.push(post.data())
		// 	})
			
		// ))

		posts.forEach((post:any) => {
			array.push(post.data())
		});

		dispatch({type:"GET_POSTS", payload:array})
	}
}
export const getSavedPosts = (numberOfPosts:any) => {
	return async (dispatch:any, getState:any) => {
		try{
			const { uid } = getState().user
			
			const posts = await db.collection('posts').orderBy('date', 'desc').where('savedBy', 'array-contains', uid).get()

			let array:any = [] 
			posts.forEach((post:any) => {
				array.push(post.data())
			});

			dispatch({type:"GET_SAVED_POSTS", payload:array})
		}catch(e){
			console.log(e)
		}
	}
}


export const likePost = (post:any) => {
	return async (dispatch:any , getState:any) => {
		try{
			const { uid } = getState().user

			db.collection('posts').doc(post.id).update({
				likes: firebase.firestore.FieldValue.arrayUnion(uid)
			})

		}catch(e){
			alert(e)
		}
	}
}
export const unLikePost = (post:any) => {
	return async (dispatch:any , getState:any) => {
		try{
			const { uid } = getState().user

			db.collection('posts').doc(post.id).update({
				likes: firebase.firestore.FieldValue.arrayRemove(uid)
			})

		}catch(e){
			alert(e)
		}
	}
}
export const savePost = (post:any) => {
	return async (dispatch:any , getState:any) => {
		try{
			const { uid } = getState().user

			db.collection('posts').doc(post.id).update({
				savedBy: firebase.firestore.FieldValue.arrayUnion(uid)
			})
			db.collection('users').doc(uid).update({
				savedPosts: firebase.firestore.FieldValue.arrayUnion(post.id)
			})

		}catch(e){
			alert(e)
		}
	}
}
export const unSavePost = (post:any) => {
	return async (dispatch:any , getState:any) => {
		try{
			const { uid } = getState().user

			db.collection('posts').doc(post.id).update({
				savedBy: firebase.firestore.FieldValue.arrayRemove(uid)
			})
			db.collection('users').doc(uid).update({
				savedPosts: firebase.firestore.FieldValue.arrayRemove(post.id)
			})

		}catch(e){
			alert(e)
		}
	}
}

export const getPost = (post:any) => {
	return async (dispatch:any, getState:any) => {
		try{
			dispatch({type:'GET_POST', payload:post})
		}catch(e){
			alert(e)
		}
	}
}

export const addMessage = (text:any) => {
	return (dispatch:any,getState:any) => {
		const {uid,photo,username} = getState().user
		try{
			const message = {
				message:text,
				photo:photo,
				username:username,
				uid:uid,
				date:new Date().getTime()
			}
			db.collection('messages').doc().set(message)
		}
		catch(e){
			alert(e)
		}
	}
}

//  export const updateDescription  = (update:any) =>{
// 	 return (dispatch:any,getState:any) =>{
// 		 null
// 	 }
//  }