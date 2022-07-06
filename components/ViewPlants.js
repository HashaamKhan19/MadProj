import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';

import IoniIcon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function App() {
  useEffect(() => {
    firestore()
      .collection('Plants')
      .get()
      .then(querySnapshot => {
        const tempDoc = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()};
        });
        console.log(tempDoc);
        setData(tempDoc);
      });
  }, []);

  const [actionTriggered, setActionTriggered] = useState('');
  const [plants, setPlants] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [imageSource, setImageSource] = useState(null);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  // useEffect(async () => {
  //   const res = await firestore().collection('Plants').get();
  //   setPlants(res);
  //   console.log(res);
  // });
  useEffect(() => {
    if (!search.length) {
      setfilteredArray(data);
    }
    setfilteredArray(data.filter(dataItem => dataItem.name.includes(search)));
    console.log(search);
  }, [search]);

  return (
    <ScrollView style={styles.delpage}>
      <View style={styles.searchbar}>
        <TextInput
          style={styles.input}
          placeholder="Search your Plant here"
          placeholderTextColor={'#000000'}
          onChangeText={setSearch}
          value={search}
        />
        <IoniIcon
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color={'#000000'}
        />
      </View>
      {filteredArray.map(item => {
        return (
          <TouchableOpacity style={styles.importedDataContainer}>
            <View style={styles.importedImage}>
              <Image
                style={styles.imageToShow}
                source={{
                  uri: item.image,
                }}
              />
            </View>
            <View style={styles.importedName}>
              <Text style={styles.importedNameText}>{item.name}</Text>
            </View>
            <View style={styles.importedPrice}>
              <Text style={styles.importedPriceText}>${item.price}</Text>
            </View>
            <View style={styles.importedDescription}>
              <Text style={styles.importedDescText}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {/* <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          toggleModal();
        }}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  delpage: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  importedDataContainer: {
    backgroundColor: 'rgba(241,241,241,1)',
    height: 400,
    padding: 20,
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    elevation: 7,
  },
  importedImage: {
    height: 220,
  },
  importedName: {
    height: 60,
    flex: 0,
    top: 6,
  },
  importedPrice: {
    height: 40,
  },
  importedDescription: {
    height: 110,
  },
  importedNameText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 17,
  },
  importedPriceText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  importedDescText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  imageToShow: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  goBack: {
    backgroundColor: 'lightgreen',
    width: 100,
    padding: 5,
    borderRadius: 10,
    left: '37%',
  },
  goBackText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Poppins-Light',
    fontSize: 15,
  },
  searchbar: {
    position: 'relative',
  },
  input: {
    fontFamily: 'Poppins-Regular',
    height: 40,
    backgroundColor: '#819185',
    margin: 10,
    padding: 5,
    paddingLeft: 40,
    borderRadius: 20,
    color: '#1c1c1c',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
