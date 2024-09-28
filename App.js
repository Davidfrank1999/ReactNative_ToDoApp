import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { saveTasks, loadTasks } from './Services/AsycData'

import TaskBox from './components/TaskBox'
// img import
import ProfilePic from './assets/User_avatars.jpg';

import { useEffect, useState } from 'react';


export default function App() {  
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');


  // pop up 
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (task) {
      if (editIndex !== -1) {
        //Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      
      } else {
        // Handle the input value as needed
        setTasks([...tasks, task]);
        
      };
      setModalVisible(false); // Close the modal after submission
      setTask(''); // Clear the input
      console.log(tasks);
  
    }
    
  };

  // Editing
  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit =(index) => {
    const taskToEdit = tasks[index];
    setModalVisible(true);
    setTask(taskToEdit);//makes the text appear in the text box
    setEditIndex(index);
    // to handleSubmit
  
  }

  const handleDelete =(index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
  }

  // Storage
  // Load Stored Data
  useEffect(()=> {
    const fetchTasks = async ()=> {
      const storedTasks = await loadTasks();
      console.log('loading data', storedTasks);
      setTasks(storedTasks);
    };
    fetchTasks();
  }, []);

  //Saves when ever a task is add to the tasks
  useEffect(() => {
    try {
    if (tasks.length > 0) {
      saveTasks(tasks);
      console.log(' Effect stored', tasks);
    }
    } catch (error) {
      console.error(error)
    }

  }, [tasks]);
  

  return (
    <View style={styles.container}>
    
    
      <View style={styles.TopBox}>
  
        <Text style={styles.Title}>To Do App</Text>

        <Image source={ProfilePic} style={styles.profilePic}
        ></Image>
        
      </View>
      
      <View style={styles.TopBox}>
        <TextInput 
          placeholder='Task input'
          value={task}
          onChangeText={(text) => setTask(text)}
          onPress={() => setModalVisible(true)} // Show modal when input is focused
          style={styles.TextInput}
        ></TextInput>
        <TouchableOpacity 
          style={styles.AddBtn}
          
        >
          <Text style={styles.BtnTxt} onPress={handleSubmit}>Add</Text>
        </TouchableOpacity>
      </View>

    {/* pop up input text */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

        {/* Dismiss the modal when tapping the overlay */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>

          {/* Prevent the overlay tap from closing the modal when interacting with modal content */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Task ✏️"
              value={task}
              onChangeText={(text) => setTask(text)}
              autoFocus={true}  /* Automatically focus on the TextInput when the modal opens */
              multiline={true}
            />
            <TouchableOpacity 
              style={styles.AddBtn}  
            >
              <Text style={styles.BtnTxt} onPress={handleSubmit}>
                {editIndex !== -1 ? "Update Task" : "Add"}</Text>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>

      </Modal>

      {/* Task list box */}
      <View style={styles.TopBox2}>

      <FlatList
          data={tasks}
          keyExtractor={(item,index)=> index.toString()}
          renderItem={({ item, index }) => <TaskBox text={item} handleEdit={() => handleEdit(index)} handleDelete={() => handleDelete(index)}/> }
          showsVerticalScrollIndicator={false} // Remove vertical scroll bar
          showsHorizontalScrollIndicator={false} // Remove horizontal scroll bar
        />
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:30,
    
  },


  TopBox: {
    width:'100%',
    height: 80,
    
    flexDirection:'row',
  
    justifyContent:"space-between",
    alignItems: 'center',
  },

  TopBox2: {
    width:'100%',
    flex:3,
    
  },

  Title: {
    fontSize: 20,
    fontWeight: 'bold',

  },

  profilePic: {
    width:50,
    height:50,
  },

  TextInput:{
  
    flex:1,
    height: '80%'
  },

  AddBtn: {
    backgroundColor: '#394867',
    padding: 5,
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    
  },

    BtnTxt: {
      color: '#F4F4F2',
      fontWeight: 'bold',
    },

  // input popup
  modalOverlay: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: 'rgba(57, 72, 103, 0.3)',
  },
  modalContent: {
    top:200,
    width: '80%',
    padding: 10,
    backgroundColor: '#F4F4F2',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
 
    padding: 5,
    borderRadius: 2,
    marginBottom: 20,
  },
});
