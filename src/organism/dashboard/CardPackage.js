import React, {memo} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Skeleton} from 'react-native-animated-skeleton';
import {Caption, Card, Title} from 'react-native-paper';
import Line from '../../components/Line';
import {colors} from '../../constants/colors';

const CardPackage = ({data}) => {
  return (
    <Card
      style={{
        backgroundColor: colors.primary,
        borderRadius: 14,
        elevation: 10,
      }}>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Title style={{color: colors.white}}>Informasi Paket</Title>
          <Caption style={{color: colors.white}}>Lihat Selengkapnya</Caption>
        </View>
        <Line />
        {data ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Tersedia',
                  'Jumlah paket yang tersedia untuk di Pick-Up',
                )
              }>
              <Text style={{color: colors.white}}>Tersedia</Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: 'bold',
                }}>
                {data && data.available}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Dipickup',
                  'Jumlah paket yang telah anda pickup, dan dalam perjalanan menuju customer',
                )
              }>
              <Text style={{color: colors.white}}>Dipickup</Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: 'bold',
                }}>
                {data && data.pickup}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Diantarkan',
                  'Jumlah paket yang telah diantarkan hari ini',
                )
              }>
              <Text style={{color: colors.white}}>Diantarkan</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 32,
                    fontWeight: 'bold',
                  }}>
                  {data && data.received}
                </Text>
                <Text
                  style={{
                    backgroundColor: colors.white,
                    color: colors.primary,
                    fontSize: 10,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 2,
                  }}>
                  Hari Ini
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <Skeleton
              loaderStyle={{
                borderRadius: 4,
                width: 80,
                height: 40,
                backgroundColor: '#ddd',
              }}
              numberOfItems={1}
            />
            <Skeleton
              loaderStyle={{
                borderRadius: 4,
                width: 80,
                height: 40,
                backgroundColor: '#ddd',
              }}
              numberOfItems={1}
            />
            <Skeleton
              loaderStyle={{
                borderRadius: 4,
                width: 80,
                height: 40,
                backgroundColor: '#ddd',
              }}
              numberOfItems={1}
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default memo(CardPackage);
