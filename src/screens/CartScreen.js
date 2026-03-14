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
import { Trash2, ShoppingCart } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';

const CartScreen = () => {
  const { cart, removeFromCart } = useAppContext();

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemQty}>Qty: {item.quantity || 1}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeBtn} 
        onPress={() => removeFromCart(item.id)}
      >
        <Trash2 size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingCart size={80} color={COLORS.border} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// Note: I used <div> in styles description by mistake in my thought process, corrected below to View.
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
  cartItem: {
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  itemName: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: SIZES.fontSm,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  itemQty: {
    fontSize: SIZES.fontSm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  removeBtn: {
    padding: SPACING.sm,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  totalLabel: {
    fontSize: SIZES.fontLg,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: SIZES.fontXl,
    color: COLORS.text,
    fontWeight: '800',
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: SIZES.fontLg,
    fontWeight: '700',
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

export default CartScreen;
