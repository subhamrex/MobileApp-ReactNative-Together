import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts, likePost, unLikePost, savePost,unSavePost} from '../../actions/post'

import PostComponent from '../Components/PostComponent'
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props{
    navigation?: any,
    post?: any,
    likePost?: any,
    unLikePost?: any,
    savePost?: any,
    unSavePost?: any,
    user?: any,

}

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class HomeScreen extends React.Component <Props> {

  

    render(){
        this.props.navigation.setOptions({
             title:this.props.post.onePost.username + "'s post",
             headerStyle: {backgroundColor:'#f5f5dc'}
         })
        return (
            <View style={{backgroundColor: "#f5f5dc", width:screenWidth, height:screenHeight+60,}}>
                   <PostComponent 
            item={this.props.post.onePost}
            user={this.props.user}
            likePost={(item:any)=>this.props.likePost(item)}
            unLikePost={(item:any)=>this.props.unLikePost(item)}
            savePost={(item:any)=>this.props.savePost(item)}
            unSavePost={(item:any)=>this.props.unSavePost(item)}
            navigation={this.props.navigation}
            />
            </View>
         
        );
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return bindActionCreators({ getUser, getPosts, likePost, unLikePost, savePost,unSavePost}, dispatch)
}
const mapStateToProps = (state:any) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)







