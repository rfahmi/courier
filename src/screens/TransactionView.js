import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, {memo, useEffect, useState} from 'react';
import {Image, Linking, ScrollView, StatusBar, Text, View} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {Button, Caption, Card, IconButton, Paragraph} from 'react-native-paper';
import BackButton from '../components/BackButton';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {colors} from '../constants/colors';
import {currencyFormat} from '../utils/formatter';

const TransactionView = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [coor, setCoor] = useState(null);
  const [map, setMap] = useState(null);
  const [cardExpand, setCardExpand] = useState(true);
  const [totalDuration, setTotalDuration] = useState(0);
  const HERE_API = 'af7r-5nCSj6d_LkeUMwlAaOCJ5tcGDdXmBA7WbHCSHk';

  const getCoordinates = async (q) => {
    await axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?apiKey=${HERE_API}&q=${q}
      `,
      )
      .then((res) => {
        const c = {
          lat: res.data.items[0].position.lat,
          lng: res.data.items[0].position.lng,
        };
        setCoor(c);
        setMap(
          `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${HERE_API}&c=${c.lat},${c.lng}&w=400&h=800&z=13`,
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getCoordinates(data.address);

    // Coundown timer for a given expiry date-time
    let date = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

    // Getting the current date-time
    // You can set your own date-time
    let expirydate = data.bracket_date + ' ' + data.ec_bracket_end;

    let diffr = moment.duration(moment(expirydate).diff(moment(date)));
    // Difference of the expiry date-time
    var hours = Number(diffr.asHours());
    var minutes = Number(diffr.minutes());
    var seconds = Number(diffr.seconds());

    // Converting in seconds
    var d = hours * 60 * 60 + minutes * 60 + seconds;

    // Settign up the duration of countdown
    setTotalDuration(d);
  }, [data]);

  const paymentMethodDesc = (code) => {
    let result = 'UNKNONW';
    switch (Number(code)) {
      case 1:
        result = 'BCA Transfer';
        break;
      case 2:
        result = 'Virtual Account';
        break;
      case 3:
        result = 'COD/Bayar Di Tempat';
        break;
      case 4:
        result = 'Kartu Kredit';
        break;
      case 5:
        result = 'BCA Virtual Account';
        break;
      default:
        result = 'UNKNOWN';
        break;
    }
    return result;
  };
  return (
    <>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{height: StatusBar.currentHeight}} />
      <BackButton
        label={`${data.custname.toUpperCase()} (${data.trxno})`}
        goBack={() => navigation.goBack()}
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderRadius: 50,
        }}
      />
      <Image
        source={{uri: map}}
        resizeMode="cover"
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
      />
      <ScrollView style={{padding: 16}}>
        <Card
          style={{maxHeight: cardExpand ? 1000 : 50}}
          onPress={() => setCardExpand(!cardExpand)}>
          <IconButton
            icon={cardExpand ? 'chevron-up' : 'chevron-down'}
            style={{position: 'absolute', top: 0, right: 0}}
          />
          <Card.Content style={{padding: 16}}>
            {cardExpand ? (
              <>
                {totalDuration > 0 && Number(data.status) === 4 && (
                  <CountDown
                    until={totalDuration}
                    timetoShow={('H', 'M', 'S')}
                    digitStyle={{backgroundColor: colors.primary}}
                    digitTxtStyle={{color: colors.white}}
                    timeLabelStyle={{color: colors.primary, fontWeight: 'bold'}}
                    size={16}
                  />
                )}
                <Caption>Alamat: </Caption>
                <Paragraph>{data.address.toUpperCase()}</Paragraph>
                <Caption>Catatan: </Caption>
                <Paragraph>{data.trxnote}</Paragraph>
                <Caption>Nomor Telepon: </Caption>
                <Paragraph>{data.phone}</Paragraph>
                <Caption>Metode pembayaran: </Caption>
                <Paragraph>{paymentMethodDesc(data.payment_method)}</Paragraph>
                {Number(data.payment_method) === 3 && (
                  <>
                    <Caption>Nilai Tagihan (COD Saja): </Caption>
                    <Paragraph>Rp{currencyFormat(data.total)}</Paragraph>
                    {Number(data.change_value) > 0 && (
                      <>
                        <Caption>Permintaan Kembalian: </Caption>
                        <Paragraph>
                          Rp{currencyFormat(data.change_value)}
                        </Paragraph>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <Text numberOfLines={1}>{data.address.toUpperCase()}</Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
      {Number(data.status) === 4 && (
        <View style={{padding: 16}}>
          <Button
            icon="whatsapp"
            color="#128C7E"
            style={{width: '100%', marginVertical: 10, zIndex: 0}}
            labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
            mode="contained"
            onPress={() =>
              Linking.openURL(`whatsapp://send?phone=${data.phone}`)
            }>
            WhatsApp
          </Button>
          <Button
            icon="phone"
            style={{width: '100%', marginVertical: 10, zIndex: 0}}
            labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
            mode="contained"
            onPress={() => Linking.openURL(`tel:${data.phone}`)}>
            CALL
          </Button>
          {coor && (
            <Button
              icon="navigation"
              style={{width: '100%', marginVertical: 10, zIndex: 0}}
              labelStyle={{fontWeight: 'bold', fontSize: 15, lineHeight: 26}}
              mode="contained"
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${coor.lat},${coor.lng}`,
                )
              }>
              Navigasi Sekarang
            </Button>
          )}
        </View>
      )}
    </>
  );
};

export default memo(TransactionView);
