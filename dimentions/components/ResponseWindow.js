import React, { useMemo } from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";

export default ResponseWindow = () => {
  const { width } = useWindowDimensions();

  // useMemo kullanarak, width değeri değişmedikçe stillerin yeniden hesaplanmasını önlüyoruz.
  const styles = useMemo(() => {
    const isSmallScreen = width < 400;
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
      },
      box: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSmallScreen ? "#FFD1D1" : "#B2EBF2",
        padding: isSmallScreen ? 15 : 30,
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
      },
      infoText: {
        marginTop: 10,
        fontSize: 14,
        color: "#555",
      },
    });
  }, [width]); // width değiştiğinde useMemo içindeki fonksiyon yeniden çalışır.

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
          {width < 400 ? "Small Screen" : "Large Screen"}
        </Text>
        <Text style={styles.infoText}>
          Şu anki genişlik: {Math.round(width)}px
        </Text>
      </View>
    </View>
  );
};

