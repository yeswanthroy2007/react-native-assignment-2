import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { HeartOff, Heart } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';

const WishlistScreen = ({ navigation }) => {
  const { wishlist, toggleWishlist } = useAppContext();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeBtn} 
        onPress={() => toggleWishlist(item)}
      >
        <Heart size={20} color={COLORS.danger} fill={COLORS.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
      </View>

      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <HeartOff size={80} color={COLORS.border} />
          <Text style={styles.emptyText}>Nothing in your wishlist</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: SIZES.font2xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  list: {
    padding: SPACING.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: SPACING.md,
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
  removeBtn: {
    padding: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: SIZES.fontLg,
    color: COLORS.textSecondary,
    marginTop: 20,
    fontWeight: '500',
  },
});

export default WishlistScreen;
