import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { Heart } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product, onPress }) => {
  const { toggleWishlist, isInWishlist } = useAppContext();
  const hearted = isInWishlist(product.id);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <TouchableOpacity 
        style={styles.wishlistBtn} 
        onPress={() => toggleWishlist(product)}
      >
        <Heart 
          size={20} 
          color={hearted ? COLORS.danger : COLORS.textSecondary} 
          fill={hearted ? COLORS.danger : 'transparent'} 
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 6,
    borderRadius: 20,
  },
  content: {
    padding: SPACING.sm,
  },
  name: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    color: COLORS.text,
  },
  price: {
    fontSize: SIZES.fontSm,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4,
  },
});

export default ProductCard;
