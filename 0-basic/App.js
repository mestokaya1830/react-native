import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, ScrollView, Text, View, StyleSheet, Image, ImageBackground } from 'react-native';

import img1 from './assets/img1.png'
import imgBG from './assets/bg.jpg'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="red" />
          <View style={{flex: 1}}>
              <ImageBackground source={imgBG} style={styles.bgImgStyle}>
                <ScrollView>
                  <Text style={styles.text}>Merhaba Expo!</Text>
                  <Image source={img1} style={styles.imgStyle} />
                </ScrollView>
              </ImageBackground>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bgImgStyle:{
    flex: 1,
    alignItems:'center'
  },
  text:{
    textAlign:'center',
    fontSize:30,
    marginTop: 20,
    marginBottom: 20,
  },
  imgStyle:{
    width: 300,
    height:200
  }
});
