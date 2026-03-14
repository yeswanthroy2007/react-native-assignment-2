import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { ChevronLeft, Heart, ShoppingBag } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const hearted = isInWishlist(product.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistBtn} onPress={() => toggleWishlist(product)}>
          <Heart 
            size={24} 
            color={hearted ? COLORS.danger : COLORS.text} 
            fill={hearted ? COLORS.danger : 'transparent'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addToCartBtn} 
          onPress={() => {
            addToCart(product);
            navigation.navigate('Cart');
          }}
        >
          <ShoppingBag size={20} color={COLORS.white} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 12,
  },
  wishlistBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: SPACING.lg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.white,
    marginTop: -30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: SIZES.fontSm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  price: {
    fontSize: SIZES.fontXl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  name: {
    fontSize: SIZES.font2xl,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 10,
  },
  description: {
    fontSize: SIZES.fontMd,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: 20,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 10,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: SIZES.fontLg,
    fontWeight: '700',
  },
});

export default ProductDetailsScreen;
