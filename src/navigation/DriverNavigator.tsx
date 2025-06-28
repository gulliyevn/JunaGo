import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import TabBar from './TabBar';

// Импорт экранов
import MapScreen from '../screens/driver/MapScreen';
import OrdersScreen from '../screens/driver/OrdersScreen';
import EarningsScreen from '../screens/driver/EarningsScreen';
import ChatScreen from '../screens/driver/ChatScreen';
import DriverProfileScreen from '../screens/driver/DriverProfileScreen';

const Tab = createBottomTabNavigator();

const DriverNavigator: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#181A20' : '#fff',
          borderTopColor: isDark ? '#333' : '#e0e0e0',
        },
      }}
    >
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarLabel: 'Карта',
          tabBarIcon: '🗺️',
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Заказы',
          tabBarIcon: '📋',
        }}
      />
      <Tab.Screen 
        name="Earnings" 
        component={EarningsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: '💰',
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarLabel: 'Чат',
          tabBarIcon: '💬',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={DriverProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: '👤',
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverNavigator;
