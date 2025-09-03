import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Linking,
  StatusBar,
} from "react-native";

import * as Device from "expo-device";
import * as Location from "expo-location";
import styles from "../assets/mainStyle";

export default function Index() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [watchingLocation, setWatchingLocation] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [accuracy, setAccuracy] = useState("balanced");

  const locationSubscription = useRef(null);

  // Location accuracy options
  const accuracyOptions = [
    {
      key: "lowest",
      label: "Lowest (Battery Saving)",
      value: Location.Accuracy.Lowest,
    },
    { key: "low", label: "Low", value: Location.Accuracy.Low },
    { key: "balanced", label: "Balanced", value: Location.Accuracy.Balanced },
    { key: "high", label: "High", value: Location.Accuracy.High },
    {
      key: "highest",
      label: "Highest (GPS)",
      value: Location.Accuracy.Highest,
    },
  ];

  useEffect(() => {
    initializeLocation();
    return () => {
      // Cleanup function
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  // Main location initialization function
  const initializeLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Device check
      if (Platform.OS === "android" && !Device.isDevice) {
        throw new Error(
          "This app will not work on Android emulator. Try it on your device!"
        );
      }

      // Check if location services are enabled
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        Alert.alert(
          "Location Services Disabled",
          "Please enable location services in device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        throw new Error("Location services are disabled");
      }

      // Permission check
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Location access permission is required.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        throw new Error("Location access permission denied");
      }

      // Get initial location
      await getCurrentLocation();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    try {
      const selectedAccuracy = accuracyOptions.find(
        (opt) => opt.key === accuracy
      );

      const locationData = await Location.getCurrentPositionAsync({
        accuracy: selectedAccuracy.value,
        timeout: 15000,
        maximumAge: 10000,
      });

      setLocation(locationData);

      // Get address information
      await getAddressFromCoordinates(locationData.coords);

      // Add to history
      addToHistory(locationData);
    } catch (error) {
      throw new Error(`Could not get location: ${error.message}`);
    }
  };

  // Get address from coordinates
  const getAddressFromCoordinates = async (coords) => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (addresses.length > 0) {
        const addr = addresses[0];
        const formattedAddress = [
          addr.name,
          addr.street,
          addr.district,
          addr.city,
          addr.region,
          addr.country,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(formattedAddress || "Address not found");
      }
    } catch (error) {
      setAddress("Could not get address", error);
    }
  };

  // Add location to history
  const addToHistory = (locationData) => {
    const historyItem = {
      ...locationData,
      timestamp: new Date().toLocaleString("en-US"),
      id: Date.now().toString(),
    };

    setLocationHistory((prev) => [historyItem, ...prev.slice(0, 9)]); // Last 10 locations
  };

  // Start/stop continuous location tracking
  const toggleLocationWatching = async () => {
    if (watchingLocation) {
      // Stop tracking
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
      setWatchingLocation(false);
    } else {
      // Start tracking
      try {
        const selectedAccuracy = accuracyOptions.find(
          (opt) => opt.key === accuracy
        );

        locationSubscription.current = await Location.watchPositionAsync(
          {
            accuracy: selectedAccuracy.value,
            timeInterval: 5000, // 5 seconds
            distanceInterval: 10, // 10 meters
          },
          (locationData) => {
            setLocation(locationData);
            getAddressFromCoordinates(locationData.coords);
            addToHistory(locationData);
          }
        );

        setWatchingLocation(true);
      } catch (error) {
        Alert.alert(
          "Error",
          "Could not start continuous location tracking: " + error.message
        );
      }
    }
  };

  // Refresh function
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getCurrentLocation();
    } catch (error) {
      setErrorMsg(error.message);
    }
    setRefreshing(false);
  };

  // Open in maps
  const openInMaps = () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const url = Platform.select({
        ios: `maps://?q=${latitude},${longitude}`,
        android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
      });
      Linking.openURL(url);
    }
  };

  // Format location information
  const formatLocationInfo = () => {
    if (!location) return null;

    const { coords } = location;
    return {
      latitude: coords.latitude.toFixed(6),
      longitude: coords.longitude.toFixed(6),
      accuracy: coords.accuracy
        ? `±${Math.round(coords.accuracy)}m`
        : "Unknown",
      altitude: coords.altitude ? `${Math.round(coords.altitude)}m` : "Unknown",
      speed: coords.speed ? `${Math.round(coords.speed * 3.6)} km/h` : "0 km/h",
      heading: coords.heading ? `${Math.round(coords.heading)}°` : "Unknown",
      timestamp: new Date(location.timestamp).toLocaleString("en-US"),
    };
  };

  const locationInfo = formatLocationInfo();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Error Message */}
        {errorMsg && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {errorMsg}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={initializeLocation}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Current Location Information */}
        {locationInfo && (
          <View style={styles.locationContainer}>
            <Text style={styles.sectionTitle}>📍 Current Location</Text>

            {address && (
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>{address}</Text>
              </View>
            )}

            <View style={styles.coordsContainer}>
              {Object.entries(locationInfo).map(([key, value]) => (
                <View key={key} style={styles.coordRow}>
                  <Text style={styles.coordLabel}>{key.toUpperCase()}:</Text>
                  <Text style={styles.coordValue}>{value}</Text>
                </View>
              ))}
            </View>

            {/* Control Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={getCurrentLocation}
              >
                <Text style={styles.buttonText}>🔄 Refresh Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  watchingLocation && styles.activeButton,
                ]}
                onPress={toggleLocationWatching}
              >
                <Text style={styles.buttonText}>
                  {watchingLocation
                    ? "⏹️ Stop Tracking"
                    : "▶️ Continuous Track"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={openInMaps}
              >
                <Text style={styles.buttonText}>🗺️ Show on Map</Text>
              </TouchableOpacity>
            </View>

            {/* Accuracy Options */}
            <View style={styles.accuracyContainer}>
              <Text style={styles.sectionTitle}>🎯 Location Accuracy</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {accuracyOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.accuracyButton,
                      accuracy === option.key && styles.selectedAccuracy,
                    ]}
                    onPress={() => setAccuracy(option.key)}
                  >
                    <Text
                      style={[
                        styles.accuracyText,
                        accuracy === option.key && styles.selectedAccuracyText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Location History */}
        {locationHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>📋 Location History</Text>
            {locationHistory.map((item, index) => (
              <View key={item.id} style={styles.historyItem}>
                <Text style={styles.historyIndex}>#{index + 1}</Text>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyCoords}>
                    {item.coords.latitude.toFixed(4)},{" "}
                    {item.coords.longitude.toFixed(4)}
                  </Text>
                  <Text style={styles.historyTime}>{item.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}


