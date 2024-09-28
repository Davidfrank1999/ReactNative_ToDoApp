import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'

export default function TaskBox({text, index, handleEdit, handleDelete}) {
  

  return (
    
    <View style={styles.TaskContainer}>
        
        <Text style={styles.TaskTxt}>{text}</Text>

        <View style={styles.TaskBtnContainer}>
            
            <TouchableOpacity style={styles.EditBtn} onPress={()=>handleEdit(index)}>
              <Text style={styles.BtnTxt}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.EditBtn} onPress={() =>handleDelete(index)}>
              <Text style={styles.BtnTxt}>Delete</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    TaskContainer: {
        width: '100%',
        minHeight: 80,
        padding: 10,
        backgroundColor: '#F4F4F2',
        borderRadius:7,
        marginVertical:10,
        justifyContent: 'space-between',
        // Elevation property for Android
        elevation: 1, // Elevation for shadow effect on Android
    },

    TaskBtnContainer: {
        flexDirection: 'row',
        
    },

    EditBtn: {
        
        paddingHorizontal: 5,
        paddingVertical: 2,
        width: '50%',
        alignItems: 'center'
    
    },

    TaskTxt: {
        marginVertical:'auto',
    }
})