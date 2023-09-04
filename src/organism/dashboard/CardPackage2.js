import React, {memo} from 'react';
import {Alert, Text, View} from 'react-native';
import {Skeleton} from 'react-native-animated-skeleton';
import {Caption, Card, Title} from 'react-native-paper';
import Line from '../../components/Line';
import {colors} from '../../constants/colors';

const CardPackage2 = ({data, title}) => {
  return (
    <Card
      style={{
        backgroundColor: colors.secondary,
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
          <Title style={{color: colors.white}}>{title}</Title>
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
            <View
              style={{flex: 1, marginRight: 16}}
              onPress={() =>
                Alert.alert(
                  'Hari Ini',
                  'Jumlah paket yang telah anda pickup hari ini',
                )
              }>
              <Text style={{color: colors.white}}>Belum Dikirim</Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: 'bold',
                }}>
                {data && data.new}
              </Text>
            </View>
            <View
              style={{flex: 1, marginRight: 16}}
              onPress={() =>
                Alert.alert(
                  'Bulan Ini',
                  'Jumlah paket yang telah anda pickup bulan ini',
                )
              }>
              <Text style={{color: colors.white}}>Terkirim Hari Ini</Text>
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
                  {data && data.sent}
                </Text>
              </View>
            </View>
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
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default memo(CardPackage2);
