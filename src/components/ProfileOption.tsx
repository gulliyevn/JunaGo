import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileOptionProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color?: string;
  onPress?: () => void;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ icon, label, value, color = '#222', onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
    <View style={styles.iconWrap}>{icon}</View>
    <Text style={[styles.label, { color }]}>{label}</Text>
    {value && <Text style={styles.value}>{value}</Text>}
    <Ionicons name="chevron-forward" size={20} color="#bbb" style={styles.arrow} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
    paddingHorizontal: 4,
  },
  iconWrap: { width: 32, alignItems: 'center' },
  label: { flex: 1, fontSize: 16, fontWeight: '500' },
  value: { fontSize: 16, color: '#27ae60', marginRight: 8 },
  arrow: { marginLeft: 4 },
});
export default ProfileOption; 