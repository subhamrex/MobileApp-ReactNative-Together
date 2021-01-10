import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image, KeyboardAvoidingView, FlatList, Platform} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../../actions/user'
import firebase from 'firebase'
import {addMessage} from '../../../actions/post'
interface props {
    subscriber?: any,
    addMessage?: any,
    user?: any

}

const keyboardVerticalOffset = Platform.OS === 'ios' ? 120 : 100
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class MessagesScreen extends React.Component <props> {

    state:any = {
        messages:[],
        message:''
    }
    subscriber: () => void;
    constructor(props:any){
        super(props);
        this.subscriber = firebase.firestore().collection('messages').limit(50).orderBy('date','desc').onSnapshot((docs)=>{
            let messages:any = [] 
            docs.forEach((doc)=>{
                messages.push(doc.data())
            })
            this.setState({messages})
        })
        
    }
    sendMessage = () =>{
       if (this.state.message.replace(/\s/g,'').length){
            this.props.addMessage(this.state.message)
            this.setState({message:''})
        }
    
    }

    render(){
        return (
            <KeyboardAvoidingView
            // behavior = {Platform.OS ==='ios' ? "padding" : null}
             keyboardVerticalOffset = {keyboardVerticalOffset}
             style={{flex:1, backgroundColor: "#f5f5dc", justifyContent:'center', alignItems:'center'}}>
            {/* <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} /> */}
                <FlatList
                inverted
                keyExtractor={(item)=> JSON.stringify(item.date)}
                data={this.state.messages}
                style={{flex:1}}
                renderItem= {({item})=>(
                    
                    (item.uid === this.props.user.uid )?
                    <View style={{padding:15,justifyContent:'center',alignItems: 'center'}}>

                        <Text style={{backgroundColor:'#0095f6',fontSize:20,borderColor:'#f5f5dc',borderWidth:1,borderRadius:20,paddingLeft:5}}> {item.username}: {item.message}  </Text>
                    </View>
                    :
                    <View style={{padding:15,justifyContent:'center',alignItems: 'center'}}>

                        <Text style={{backgroundColor:'white',fontSize:20,borderColor:'#f5f5dc',borderWidth:1,borderRadius:20,paddingLeft:5}}>{item.username}: {item.message}  </Text>
                    </View>
                    

                )}

                />
                <View style={{width:'100%',flexDirection:'row',alignItems: 'center',borderTopWidth:0.5,borderColor:'gray'}}>
                    <TextInput
                    style={{width:'85%',height:50,paddingVertical:10, paddingHorizontal:20,color:'black'}}
                    onChangeText={(message)=> this.setState({message})}
                    value={this.state.message}
                    returnKeyType ='send'
                    placeholder="Send Message"
                    onSubmitEditing={this.sendMessage}
                    placeholderTextColor='grey'
                    autoCapitalize='none'
                    />
                    <TouchableOpacity
                        onPress={()=>this.sendMessage()}
                    >
                        <Text style={[
                            
                                (!this.state.message.replace(/\s/g,'').length)?
                                 {color:'grey'}
                                :{fontWeight:'bold',color:'black'}
                               
                            
                        ]}>SEND  </Text>
                    </TouchableOpacity>
                    
                </View>
               
            </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return bindActionCreators({ getUser,addMessage}, dispatch)
}
const mapStateToProps = (state:any) => {
    return{
        user: state.user,
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(MessagesScreen)







