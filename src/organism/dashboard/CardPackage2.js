import React, { memo } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { Card, Title, Caption } from 'react-native-paper';
import Line from '../../components/Line';
import { colors } from '../../constants/colors';

const CardPackage2 = ({ data, title }) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>{title}</Title>
          <Caption style={styles.caption}>Lihat Selengkapnya</Caption>
        </View>
        <Line />
        {data ? (
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Belum Dikirim</Text>
              <Text style={styles.infoValue}>{data && data.new}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Terkirim Hari Ini</Text>
              <Text style={styles.infoValue}>{data && data.sent}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
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
    backgroundColor: colors.secondary,
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
  infoItem: {
    flex: 1,
    marginRight: 16,
  },
  infoLabel: {
    color: colors.white,
  },
  infoValue: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
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

export default memo(CardPackage2);
