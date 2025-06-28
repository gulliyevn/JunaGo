import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/driver/MapScreen';
import OrdersScreen from '../screens/driver/OrdersScreen';
import ScheduleScreen from '../screens/driver/ScheduleScreen';
import ChatScreen from '../screens/driver/ChatScreen';
import DriverProfileScreen from '../screens/profile/DriverProfileScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const DriverNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={DriverProfileScreen} />
    </Tab.Navigator>
  );
};

export default DriverNavigator;
