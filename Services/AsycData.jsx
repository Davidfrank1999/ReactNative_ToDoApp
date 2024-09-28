import AsyncStorage from "@react-native-async-storage/async-storage";

//Function to save tasks to AsyncStorage
export const saveTasks = async (tasks) => {
    try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

    } catch (error) {
        console.error('Failed to save tasks:', error);
    }
};

//Function to load tasks from AsyncStorage
export const loadTasks = async () => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        return storedTasks !== null ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return [];
    }
}

// Function to clear all tasks from AsyncStorage (if needed)
export const clearTasks = async () => {
    try {
        await AsyncStorage.removeItem('tasks');
    } catch (error) {
        console.error('Failed to clear tasks:', error);
    }
  };