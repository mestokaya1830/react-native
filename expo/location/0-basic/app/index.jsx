import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";

// Custom hook for live time
const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};

export default function Index() {
  const [address, setAddress] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const currentTime = useCurrentTime(); // Use custom hook

  const startWatching = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission required!");
      return;
    }

    setIsWatching(true);

    const locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 0,
      },
      async (location) => {
        try {
          let reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (reverseGeocodedAddress.length > 0) {
            setAddress(reverseGeocodedAddress[0]);
            setLastUpdate(new Date());
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);
        }
      }
    );

    setSubscription(locationSubscription);
  };

  const stopWatching = () => {
    setIsWatching(false);
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ textAlign: "center", marginBottom: 10, fontSize: 16 }}>
        Current Time: {currentTime.toLocaleTimeString()}
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Button
          title={isWatching ? "Stop Watching" : "Start Watching"}
          onPress={isWatching ? stopWatching : startWatching}
        />
      </View>

      {isWatching && (
        <Text style={{ color: "green", marginBottom: 10 }}>
          🟢 Location tracking active... (updates every 10 seconds)
        </Text>
      )}

      {address && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Current Location:
          </Text>
          <Text>City: {address.city}</Text>
          <Text>District: {address.district}</Text>
          <Text>
            Street: {address.street} {address.streetNumber}
          </Text>
          <Text>Postal Code: {address.postalCode}</Text>
          <Text>Country: {address.country}</Text>
          {lastUpdate && (
            <View>
              <Text style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
                Location last updated: {lastUpdate.toLocaleTimeString()}
              </Text>
              <Text style={{ fontSize: 12, color: "blue" }}>
                Time since last update:{" "}
                {Math.floor((currentTime - lastUpdate) / 1000)} seconds ago
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
