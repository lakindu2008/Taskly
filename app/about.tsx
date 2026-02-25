import React from "react";
import { View, Text, Image, useColorScheme, Linking, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function about() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 25,
        backgroundColor: "rgba(12, 12, 12, 1)"
      }}
    >
      {/* App Icon */}
      <Image source={require("../assets/images/icon.png")} // <-- your logo
        style={{ width: 100, height: 100, borderRadius: 20, marginBottom: 25 }}
      />

      {/* App Name */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color:"#FFF",
          marginBottom: 10,
        }}
      >
        Taskly
      </Text>

      {/* Short Tagline */}
      <Text
        style={{
          color:"#444",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Stay focused, track your sessions, and get more done every day
      </Text>

      {/* About Description */}
      

      {/* Buttons / Links */}
     

        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/lakindu2008/Taskly")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#DDD",
            borderRadius:35,
            width:"90%",
            height:55,
            justifyContent:"center",
            marginTop:10
          }}
        >
          <Ionicons
            name="download-outline"
            size={20}
            color="#000"
          />
          <Text
            style={{
              color:"#000",
              marginLeft: 8,
              fontWeight: "600",
            }}
          >
            Check Updates
          </Text>
        </TouchableOpacity>

         <TouchableOpacity
          onPress={() => Linking.openURL("https://www.instagram.com/lakindu_perera_/")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:"#DDD",
            borderRadius: 35,
            width:"90%",
            height:55,
            justifyContent:"center",
            marginTop:10
          }}
        >
          <Ionicons
            name="logo-instagram"
            size={20}
            color="#000"
          />
          <Text
            style={{
              color:"#000",
              marginLeft: 8,
              fontWeight: "600",
            }}
          >
            Follow Me
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/lakindu2008")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:"#DDD",
            borderRadius: 30,
            width:"90%",
            height:55,
            justifyContent:"center",
            marginTop:10
          }}
        >
          <Ionicons
            name="logo-github"
            size={20}
            color="#000"
          />
          <Text
            style={{
              color:"#000",
              marginLeft: 8,
              fontWeight: "600",
            }}
          >
            About Developer
          </Text>
        </TouchableOpacity>
    </View>
  );
}
