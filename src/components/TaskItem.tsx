import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from '../assets/icons/trash/trash.png' 

export interface Task {
    id: number;
    title: string;
    done: boolean;
  }

interface TasksListProps {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string,) => void;
    item: Task,
    index: number;
  }

export function TaskItem({item, index, tasks, toggleTaskDone, removeTask, editTask } : TasksListProps ){

const [isEdit, setIsEdit] = useState<boolean>(false)
const [title, setTitle] = useState<string>(item.title)
const textInputRef = useRef<TextInput>(null)

function handleStartEditing(){
    setIsEdit(true);
}

function handleCancelEditing(){
    setTitle(oldState => oldState);
    setIsEdit(false)
}

function handleSubmitEditing(){
    () => editTask(item.id, title);
    setIsEdit(false)
}

useEffect(() => {
    if(textInputRef.current){
        if(isEdit == true){
        textInputRef.current.focus()
        } else {
            textInputRef.current.blur()
        }
    }
    
}, [isEdit])

return(
    <>
    <View>
    <TouchableOpacity
      testID={`button-${index}`}
      activeOpacity={0.7}
      style={styles.taskButton}
      onPress={() => toggleTaskDone(item.id)}
    >
      <View 
        testID={`marker-${index}`}
        style={item.done == true ? styles.taskMarkerDone : styles.taskMarker}
      >
        { item.done && (
          <Icon 
            name="check"
            size={12}
            color="#FFF"
          />
        )}
      </View>

      <TextInput
      value={title}
      onChangeText={setTitle}
      editable={isEdit}
      onSubmitEditing={handleSubmitEditing}
      style={item.done == true ? styles.taskTextDone : styles.taskText}
      ref={textInputRef}
      />
      
    </TouchableOpacity>
  </View>

  <TouchableOpacity
    testID={`trash-${index}`}
    style={{ paddingHorizontal: 24 }}
    onPress={() => removeTask(item.id)}
  >
    <Image source={trashIcon} />
  </TouchableOpacity>
  </>
)
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })