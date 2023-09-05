import React, { memo } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Line from '../../components/Line';
import { colors } from '../../constants/colors';

const CardAchievement = ({ data }) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>Pencapaian Anda</Title>
        </View>
        <Line />
        {data ? (
          <View style={styles.achievementContainer}>
            <TouchableOpacity
              style={styles.achievementItem}
              onPress={() =>
                Alert.alert(
                  'Hari Ini',
                  'Jumlah paket yang telah anda pickup hari ini',
                )
              }>
              <Text style={styles.achievementLabel}>Hari Ini</Text>
              <Text style={styles.achievementValue}>{data && data.daily}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.achievementItem}
              onPress={() =>
                Alert.alert(
                  'Bulan Ini',
                  'Jumlah paket yang telah anda pickup bulan ini',
                )
              }>
              <Text style={styles.achievementLabel}>Bulan Ini</Text>
              <Text style={styles.achievementValue}>
                {data && data.monthly}
              </Text>
            </TouchableOpacity>
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
  achievementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  achievementItem:
