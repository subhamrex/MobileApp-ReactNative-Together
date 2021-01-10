import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/TabScreens/HomeScreen'
import PostScreen from '../screens/TabScreens/PostScreen'
import NotificationsScreen from '../screens/TabScreens/NotificationsScreen'
import SearchScreen from '../screens/TabScreens/SearchScreen'
import ProfileScreen from '../screens/TabScreens/ProfileScreen'

import { FontAwesome } from '@expo/vector-icons'
import { Platform } from 'react-native';


const Tab = createMaterialBottomTabNavigator();


export default function MyTabs() {
    
    return (
        <Tab.Navigator
        barStyle={ (Platform.OS == 'ios') ?
        { backgroundColor: "#f5f5dc", height: 50 ,bottom:10  }
        :
        {  backgroundColor: "#f5f5dc", height: 50 ,  } }
        >
            <Tab.Screen name="Home" component={HomeScreen}
            options={({ route}) => ({
                tabBarIcon: ({color}) => (
                    <FontAwesome name='home' color={color} size={22} />
                ),
                headerShown: true, headerTitle:'See your post', 
            })} 
            />
             {/* <Tab.Screen name="Search" component={SearchScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color}) => (
                    <FontAwesome name='search' color={color} size={22} />
                )
            })} 
            /> */}
            <Tab.Screen name="Post" component={PostScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color}) => (
                    <FontAwesome name='plus' color={color} size={22} />
                )
            })} 
            />
            {/* <Tab.Screen name="Notifications" component={NotificationsScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color}) => (
                    <FontAwesome name='heart' color={color} size={22} />
                )
            })} 
            /> */}
           
            <Tab.Screen name="Profile" component={ProfileScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color}) => (
                    <FontAwesome name='user' color={color} size={22} />
                )
                
                
                
            })}
            

            
            
            />
        </Tab.Navigator>
    );
}