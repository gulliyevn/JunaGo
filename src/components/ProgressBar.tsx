import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label = 'Прогресс', 
  showPercentage = true 
}) => {
  const { isDark } = useTheme();
  
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
          {label}
        </Text>
        {showPercentage && (
          <Text style={[styles.percentage, { color: isDark ? '#fff' : '#000' }]}>
            {clampedProgress}%
          </Text>
        )}
      </View>
      
      <View style={[styles.progressContainer, { backgroundColor: isDark ? '#555' : '#f0f0f0' }]}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${clampedProgress}%`,
              backgroundColor: getProgressColor(clampedProgress)
            }
          ]} 
        />
      </View>
    </View>
  );
};

const getProgressColor = (progress: number): string => {
  if (progress >= 80) return '#34C759'; // Зеленый
  if (progress >= 60) return '#FF9500'; // Оранжевый
  if (progress >= 40) return '#FF9F0A'; // Желтый
  return '#FF3B30'; // Красный
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProgressBar; 