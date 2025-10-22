import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";

export default function MapScreen() {
  const params = useLocalSearchParams();
  const lat = parseFloat(params.lat as string) || 37.0965;
  const lng = parseFloat(params.lng as string) || -113.5684;
  const text = (params.text as string) || "Yard Sale";

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let current = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: current.coords.latitude,
        lng: current.coords.longitude,
      });
    })();
  }, []);

  const initialRegion = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Map View",
          headerStyle: { backgroundColor: "#8FA31E" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            title={text}
            description="Post location"
          />

          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              }}
              title="You are here"
              pinColor="blue"
            />
          )}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});



