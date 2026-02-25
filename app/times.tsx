import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text) return;
    setTasks([...tasks, { id: Date.now().toString(), title: text, completed: false }]);
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <ImageBackground source={require('../assets/images/background5.jpg')} style={{ flex:1,width:'100%',height:'100%'}} >
    <View style={styles.container}>
    <View style={styles.head}>
           <Feather name="book" color={'white'} size={25} style={styles.icon}/>
           <Text style={styles.title}>My Plans 🪴</Text>
         </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add new task"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Feather
                name={item.completed ? "check-circle" : "circle"}
                size={24}
                color={item.completed ? "#1376f8" : "#555"}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.taskText,
                item.completed && { textDecorationLine: "line-through", color: "#888" },
              ]}
            >
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Feather name="trash-2" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom:15
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#2a2a3b",
    color: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 45,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    height:60
  },
  addButton: {
    backgroundColor: "#4F8EF7",
    padding: 14,
    borderRadius: 55,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F8EF7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#2A2A3B",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  taskText: {
    color: "#ffffff",
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  head:{
    borderRadius:50,
    width:"92%",
    height:75,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:165,
    marginTop:25,
    marginLeft:15
  },
  icon:{
    marginTop:-10
  }
});