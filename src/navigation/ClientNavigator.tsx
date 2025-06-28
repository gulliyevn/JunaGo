import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/client/MapScreen';
import DriversScreen from '../screens/client/DriversScreen';
import ScheduleScreen from '../screens/client/ScheduleScreen';
import ChatScreen from '../screens/client/ChatScreen';
import ClientProfileScreen from '../screens/profile/ClientProfileScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const ClientNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Drivers" component={DriversScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ClientProfileScreen} />
    </Tab.Navigator>
  );
};

export default ClientNavigator;
