import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

  const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    if(tasks.find(data => data.title === newTaskTitle )){
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        
      )
    }else{
      setTasks(oldState => [...oldState, data]);
    }

   
  }

  function handleToggleTaskDone(id: number) {
    const value = tasks.map((data) => {
      if(data.id === id){
        data.done = !data.done,


        console.log(data.done)
      }
      return data
      })
      setTasks(value)
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) { 
    console.log('acionou')
    Alert.alert(
      'Remover Item',
      'Tem certeza que deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))
           
        }
      ]
    )
    
  }

  function handleEditTask(id: number, newTaskTitle: string ){
    const value = tasks.map((data) => {
      if(data.id === id){
        data.title = newTaskTitle,


        console.log(data.done)
      }
      return data
      })
      setTasks(value)
  
  }



  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})