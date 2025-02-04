import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, View, FlatList } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import  Row  from './components/Row'
import  Add  from './components/Add'
import { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage' 

const STORAGE_KEY ='@items_key'

export default function App() {
  const [data, setData] = useState([])
  const [selectedId, setSelectedId]=useState(null)
  
  useEffect(()=>{
   //AsyncStorage.clear()
    getData()
  },[])

  useEffect(()=>{
    storeData(data)
  },[data]) 

  const getData = async() => {
    try{
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if(json === null){
        json = []
      }
      setData(json)
    }catch(ex){
      console.log(ex)
    }
  }

  const storeData = async(value) => {
    try{
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY,json)
    }catch(ex){
      console.log(ex)
    }
  }

  const add = useCallback((name)=>{
    const newItem ={
      id: uuid.v4(),
      name: name
    }
    const tempData=[...data,newItem]
    setData(tempData)
  }, [data])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <Add add={add} />
      <FlatList
      data={data}
      keyExtractor={(item)=>item.id}
      extraData={selectedId}
      renderItem={({item})=>(
        <Row 
          item={item}
          selectedId={selectedId}
          select={setSelectedId}
          data={data}
          setData={setData}
          />
      )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*
 return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <Add add={add} />
      <FlatList
      data={data}
      keyExtractor={(item)=>item.id}
      extraData={selectedId}
      renderItem={({item})=>(
        <Row 
          item={item}
          selectedId={selectedId}
          select={setSelectedId}
          data={data}
          setData={setData}
          />
      )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/