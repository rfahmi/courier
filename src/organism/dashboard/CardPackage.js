import React, { memo } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, Title, Caption } from 'react-native-paper';
import Line from '../../components/Line';
import { colors } from '../../constants/colors';

const CardPackage = ({ data }) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>Informasi Paket</Title>
          <Caption style={styles.caption}>Lihat Selengkapnya</Caption>
        </View>
        <Line />
        {data ? (
          <View style={styles.infoContainer}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Tersedia',
                  'Jumlah paket yang tersedia untuk di Pick-Up',
                )
              }>
              <Text style={styles.infoLabel}>Tersedia</Text>
              <Text style={styles.infoValue}>{data && data.available}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Dipickup',
                  'Jumlah paket yang telah anda pickup, dan dalam perjalanan menuju customer',
                )
              }>
              <Text style={styles.infoLabel}>Dipickup</Text>
              <Text style={styles.infoValue}>{data && data.pickup}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Diantarkan',
                  'Jumlah paket yang telah diantarkan hari ini',
                )
              }>
              <Text style={styles.infoLabel}>Diantarkan</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>{data && data.received}</Text>
                <Text style={styles.todayBadge}>Hari Ini</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingItem} />
            <View style={styles.loadingItem} />
            <View style={styles.loadingItem} />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    elevation: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
  },
  caption: {
    color: colors.white,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoLabel: {
    color: colors.white,
  },
  infoValue: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayBadge: {
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  loadingItem: {
    borderRadius: 4,
    width: 80,
    height: 40,
    backgroundColor: '#ddd',
  },
});

export default memo(CardPackage);
