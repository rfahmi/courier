import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Title, Caption } from 'react-native-paper';
import Line from '../../components/Line';
import { colors } from '../../constants/colors';
import { currencyFormat } from '../../utils/formatter';

const CardCod = ({ data }) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>Tagihan COD</Title>
          <Caption style={styles.caption}>Lihat Selengkapnya</Caption>
        </View>
        <Line />
        {data ? (
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Jumlah</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>{data && data.count}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nominal</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>
                  Rp{currencyFormat(data && data.value)}
                </Text>
              </View>
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
  infoItem: {
    flex: 1,
    marginRight: 16,
  },
  infoLabel: {
    color: colors.white,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default memo(CardCod);
