import { Pressable, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
export default function Row({item,selectedId,select,data,setData}){
    const [strikeThrough, setStrikeThrough] = useState(false);

    const toggleStrikeThrough = () => {
        setStrikeThrough(!strikeThrough);
    };
   const backgroundColor=item.id===selectedId ? '#ffffff' : '#ffffff'
    let current = false
   const remove = () => {
    const arrayWithoutRemoved = data.filter((item) => item.id !== selectedId)
    setData(arrayWithoutRemoved)
    select(null)
   }

    return(
        <Pressable style={[styles.row,{backgroundColor}]} onPress = {toggleStrikeThrough}>
         <Text style={strikeThrough ? styles.oldPrice : styles.rowText}>{item.name}</Text>
        </Pressable>
    )
}

/*
   const remove = () => {
    const arrayWithoutRemoved = data.filter((item) => item.id !== selectedId)
    setData(arrayWithoutRemoved)
    select(null)
   }
*/


//style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}
//<Ionicons name='trash' size={24} onPress={()=> remove()}/>
/*

<Pressable style={[styles.row,{backgroundColor}]} onPress = {() => select(item.id)}>
        <Text style={styles.rowText}>{item.name}</Text>
        {
            item.id === selectedId && <Ionicons name='trash' size={24} onPress={()=> remove()}/>
        }
        </Pressable>

*/
const styles =StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    rowText: {
    fontSize: 16,
    padding: 4,
    margin: 4,    
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
      },
});