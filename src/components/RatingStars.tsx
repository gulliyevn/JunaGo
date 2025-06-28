import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 16, 
  showNumber = false 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];

    // Полные звезды
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={`full-${i}`} style={[styles.star, { fontSize: size }]}>
          ⭐
        </Text>
      );
    }

    // Половина звезды
    if (hasHalfStar) {
      stars.push(
        <Text key="half" style={[styles.star, { fontSize: size }]}>
          ⭐
        </Text>
      );
    }

    // Пустые звезды
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Text key={`empty-${i}`} style={[styles.star, styles.emptyStar, { fontSize: size }]}>
          ⭐
        </Text>
      );
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      {showNumber && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  emptyStar: {
    opacity: 0.3,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RatingStars;
