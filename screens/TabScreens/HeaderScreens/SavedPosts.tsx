import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../../actions/user'
import { getSavedPosts, likePost, unLikePost, savePost,unSavePost,getPosts} from '../../../actions/post'

import PostComponent from '../../Components/PostComponent'
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props{
    getSavedPosts?: any, 
    post?: any,
    user?: any,
    likePost?: any,
    unLikePost?: any,
    savePost?: any,
    unSavePost?: any,
}

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class SavedPosts extends React.Component <Props>{

    componentDidMount = () =>{
        this.props.getSavedPosts()
       // this.props.getPosts()
        
    }

    render(){
        
        return (
            <View>
                <View style={{ justifyContent: 'center',  backgroundColor: "#f5f5dc",   alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}}>

                </View>
                {/* <Image source={require('../../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} /> */}
                 <FlatList
            
            data={this.props.post.saved_feed}
            keyExtractor={(item) => JSON.stringify(item.uid)}
            renderItem={({item}) => (
                <PostComponent 
                item={item}
                user={this.props.user}
                likePost={(item:any)=>this.props.likePost(item)}
                unLikePost={(item:any)=>this.props.unLikePost(item)}
                savePost={(item:any)=>this.props.savePost(item)}
                unSavePost={(item:any)=>this.props.unSavePost(item)}
                />
            )}
            />
            </View>
        
           
            
        );
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return bindActionCreators({ getUser, getSavedPosts, likePost, unLikePost, savePost,unSavePost,getPosts}, dispatch)
}
const mapStateToProps = (state:any) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(SavedPosts)
