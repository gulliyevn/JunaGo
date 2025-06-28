import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
}

const AppCard: React.FC<AppCardProps> = ({ children, style, padding = 16, margin = 16 }) => {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      margin,
      padding,
      ...Platform.select({
        ios: {
          shadowColor: colors.cardShadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
});

export default AppCard;
