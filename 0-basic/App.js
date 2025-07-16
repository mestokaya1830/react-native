import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Image, ImageBackground } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';

import img1 from './assets/img1.png'
import imgBG from './assets/bg.jpg'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="red" />
         <ImageBackground source={imgBG} style={styles.bgImgStyle}>
          <View>
            <Text style={styles.text}>Merhaba Expo!</Text>
            <Image source={img1} style={styles.imgStyle} />
          </View>
         </ImageBackground>
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
