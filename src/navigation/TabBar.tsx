import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ICONS: Record<string, any> = {
  'Карта': <Ionicons name="map" size={26} />, // blue
  'Водители': <MaterialIcons name="directions-car" size={26} />, // purple
  'Заказы': <MaterialIcons name="assignment" size={26} />, // orange
  'Чат': <Ionicons name="chatbubble-ellipses" size={26} />, // green
  'Профиль': <Ionicons name="person-circle" size={26} />, // gray
  'Plus': <Ionicons name="add" size={36} />,
  'Earnings': <FontAwesome name="money" size={36} />,
};

const ACTIVE_COLORS: Record<string, string> = {
  'Карта': '#007AFF',
  'Водители': '#8e44ad',
  'Заказы': '#FF9500',
  'Чат': '#34C759',
  'Профиль': '#636e72',
  'Plus': '#fff',
  'Earnings': '#fff',
};

const TabBar = ({ state, descriptors, navigation }: any) => {
  const { isDark } = useTheme();
  return (
    <View style={[styles.tabBar, { backgroundColor: isDark ? '#181A20' : '#fff', borderTopColor: isDark ? '#333' : '#e0e0e0' }]}>  
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;
        const isCenter = label === '' || label === 'Plus' || label === 'Earnings';
        const iconName = options.tabBarIcon || label;
        const color = isFocused ? ACTIVE_COLORS[iconName] || '#007AFF' : '#b2bec3';

        if (isCenter) {
          // Центральная кнопка (Plus/Earnings)
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => navigation.navigate(route.name)}
              style={styles.centerButtonWrap}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#007AFF", "#34C759"]}
                style={styles.centerButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {iconName === 'Earnings' ? (
                  <FontAwesome name="money" size={36} color="#fff" />
                ) : (
                  <Ionicons name="add" size={36} color="#fff" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        }

        // Обычные табы
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {iconName === 'Карта' && <Ionicons name="map" size={26} color={color} />}
            {iconName === 'Водители' && <MaterialIcons name="directions-car" size={26} color={color} />}
            {iconName === 'Заказы' && <MaterialIcons name="assignment" size={26} color={color} />}
            {iconName === 'Чат' && <Ionicons name="chatbubble-ellipses" size={26} color={color} />}
            {iconName === 'Профиль' && <Ionicons name="person-circle" size={26} color={color} />}
            <Text style={[styles.label, { color: isFocused ? color : '#b2bec3' }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 64,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  centerButtonWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -18,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#34C759',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
});

export default TabBar;
