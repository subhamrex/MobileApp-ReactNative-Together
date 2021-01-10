import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts, likePost, unLikePost, savePost,unSavePost} from '../../actions/post'

import PostComponent from '../Components/PostComponent'
import { SafeAreaView } from 'react-native-safe-area-context';
//import {YellowBox} from 'react-native'
console.disableYellowBox = true
interface Props{
    getPosts?: any,
    navigation?: any,
    user?:any, 
    likePost?: any,
    unLikePost?: any,
    savePost?: any,
    unSavePost?: any,
    post?: any,
}

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class HomeScreen extends React.Component <Props> {
    state = {
        refreshing:false
    }

    componentDidMount = () =>{
        this.props.getPosts()
        
    }
    makeRemoteRequest=()=>{
        this.setState({
            refreshing:false,
        })
    }

    handleRefresh = () =>{
        this.props.getPosts(),
        this.setState({ 
           refreshing:true, 
        },()=>{
            this.makeRemoteRequest();
        }
        )
        
        
    }
    render(){
        
        return (
        
            <SafeAreaView style={{flex:1, backgroundColor: "#f5f5dc", justifyContent:'center', alignItems:'center'}}>
             {/* <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} />  */}
                <View style={{height:50, width:screenWidth, borderBottomColor:'rgba(0,0,0,0.1)', borderBottomWidth:0.5, justifyContent:'space-between', flexDirection:"row"}}>
                    <Image source={require('../../assets/images/date.png')} style={{width:70, height:45, marginHorizontal:15}} />
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('SavedPosts')}>
                            <Image source={require('../../assets/images/like-red2.png')} style={{width:25,height:25, margin:10,bottom:4}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MessagesScreen')}>
                        <Image source={require('../../assets/images/share2.png')} style={{width:25,height:25, margin:10, bottom:5}} />
                        </TouchableOpacity>
                      
                    </View>
                </View>
                <FlatList
                onRefresh = {this.handleRefresh}
                refreshing = {this.state.refreshing}
                data={this.props.post.feed}
                keyExtractor={(item) => JSON.stringify(item.uid)}
                renderItem={({item}) => (

                    <PostComponent 
                    item={item}
                    user={this.props.user}
                    likePost={(item:any)=>this.props.likePost(item)}
                    unLikePost={(item:any)=>this.props.unLikePost(item)}
                    savePost={(item:any)=>this.props.savePost(item)}
                    unSavePost={(item:any)=>this.props.unSavePost(item)}
                    navigation={this.props.navigation}
                    />

                )}
                />
            </SafeAreaView>
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







