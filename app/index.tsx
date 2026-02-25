import { Audio } from "expo-av";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React, { JSX, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Feather } from "@expo/vector-icons";

const TIMER_OPTIONS = [
  { label: "10s", value: 10 },
  { label: "30m", value: 1800 },
  { label: "1h", value: 3600 },
  { label: "2h", value: 7200 },
];

export default function App(): JSX.Element {
  const [selectedTime, setSelectedTime] = useState<number>(TIMER_OPTIONS[0].value);
  const [time, setTime] = useState<number>(TIMER_OPTIONS[0].value);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
    return () => {
      // Cleanup sound on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      // Unload previous sound if it exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        require("../assets/Audio/alarm.mp3"), // Ensure path is correct
        { shouldPlay: true }
      );
      soundRef.current = sound;
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Focus Complete 🎉",
        body: "Time for a break!",
      },
      trigger: null, // Send immediately
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            stopTimer();
            playSound();
            sendNotification();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = async () => {
    stopTimer();
    setTime(selectedTime);
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");

    return hours > 0 
      ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` 
      : `${pad(minutes)}:${pad(seconds)}`;
  };

  const progress = ((selectedTime - time) / selectedTime) * 100;

  return (
    <ImageBackground source={require('../assets/images/background4.jpg')} style={styles.bg} >
      <View style={styles.container}>
        <View style={styles.head}>
          <Feather name="home" color={'white'} size={25}/>
          <Text style={styles.title}>Focus Mode</Text>
          <View style={{ width: 25 }} /> 
        </View>
        <StatusBar style="light" />

        <Image source={require('../assets/images/cover4.jpg')} style={styles.cover} />
        
        <AnimatedCircularProgress
          size={220}
          width={12}
          fill={progress}
          tintColor="#1376f8"
          backgroundColor="#aeb6cc46"
          rotation={0}
          style={styles.circul}
        >
        
        </AnimatedCircularProgress>
 <Text style={styles.timerInside}>{formatTime()}</Text>
        <View style={styles.controlls}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setIsRunning(!isRunning)}
            >
              <Feather size={28} color={"black"} name={isRunning ? "pause" : "play"} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
              <Feather name="refresh-cw" color={'white'} size={24}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.optionsRow}>
          {TIMER_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[styles.timeOption, selectedTime === item.value && styles.selectedOption]}
              onPress={() => {
                setIsRunning(false);
                setSelectedTime(item.value);
                setTime(item.value);
              }}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  container: { alignItems: "center", flex: 1 },
  title: { fontSize: 19, color: "#ffffff", fontWeight: "bold" },
  timerInside: { fontSize: 35, color: "#ffffff", fontWeight: "bold",marginTop:120 },
  buttonRow: { flexDirection: "row", alignItems: 'center' },
  startButton: { backgroundColor: "#dde4e7", padding: 15, borderRadius: 50, marginHorizontal: 10 },
  resetButton: { backgroundColor: "#1b1919", padding: 15, borderRadius: 50, marginHorizontal: 10 },
  head: { width: "90%", flexDirection: "row", alignItems: "center", marginTop: 50, gap:170, marginLeft:40 },
  circul: { marginTop: 60, elevation: 5 },
  cover: { width: 195, height: 195, borderRadius: 100, position: "absolute", top: 149 },
  controlls: { backgroundColor: "rgba(24, 24, 26, 0.9)", width: "60%", borderRadius: 80, alignItems: "center", justifyContent: "center", height: 90, marginTop: 30, elevation: 5 },
  optionsRow: { flexDirection: "row", marginTop: 30, gap: 10 },
  timeOption: { backgroundColor: "#ffffff22", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  selectedOption: { backgroundColor: "#1376f8" },
  optionText: { color: "white", fontWeight: "bold" },
});