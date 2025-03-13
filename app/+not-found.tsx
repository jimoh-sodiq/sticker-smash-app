import { Link, Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet  } from "react-native";

export default function Notfound() {
  return (
    <>
        <Stack.Screen options={{title: 'Oops! Not Found'}}  />
        <View style={styles.container}>
            <Link href="/" style={styles.button}>
                Go back to Home Screen
            </Link>
        </View>

    </>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e",
    },
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "#fff"
      }
})