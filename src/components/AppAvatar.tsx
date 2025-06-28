import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AppAvatarProps {
  size: number;
  source?: { uri: string };
  defaultSource?: { uri: string };
  name?: string;
  style?: any;
}

const AppAvatar: React.FC<AppAvatarProps> = ({ 
  size, 
  source, 
  defaultSource, 
  name,
  style 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (source?.uri) {
    return (
      <Image
        source={source}
        defaultSource={defaultSource}
        style={[styles.avatar, avatarStyle, style]}
        resizeMode="cover"
      />
    );
  }

  if (name) {
    return (
      <View style={[styles.avatarPlaceholder, avatarStyle, style]}>
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.avatarPlaceholder, avatarStyle, style]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        👤
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#f0f0f0',
  },
  avatarPlaceholder: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppAvatar;
