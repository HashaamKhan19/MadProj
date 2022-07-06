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
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import Dialog from 'react-native-dialog';

export default function AdminHomePage({navigation, route}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [forcedReload, setForcedReload] = useState(true);

  const [visible, setVisible] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [filePath, setFilePath] = useState({});

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Plants', value: 'Plants'},
    {label: 'Tools', value: 'Tools'},
    {label: 'Care', value: 'Care'},
  ]);

  const [data, setData] = useState([]);
  const [datatools, setDatatools] = useState([]);
  const [datacare, setDatacare] = useState([]);

  const [itemm, setItemm] = useState();

  const plantsCollectionGetter = () => {
    firestore()
      .collection('Plants')
      .get()
      .then(querySnapshot => {
        const tempDoc = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()};
        });
        // console.log('UPDATING SET DATA', tempDoc);
        setData(tempDoc);
        console.log('SET DATA UPDATED', setData);
      });
  };
  const toolsCollectionGetter = () => {
    firestore()
      .collection('Tools')
      .get()
      .then(querySnapshot => {
        const tempDoc = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()};
        });
        console.log(tempDoc);
        setDatatools(tempDoc);
      });
  };
  const careCollectionGetter = () => {
    firestore()
      .collection('Care')
      .get()
      .then(querySnapshot => {
        const tempDoc = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()};
        });
        console.log(tempDoc);
        setDatacare(tempDoc);
      });
  };

  useEffect(() => {
    plantsCollectionGetter();
    toolsCollectionGetter();
    careCollectionGetter();
  }, [forcedReload]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
    };
  }

  const handleCancel = () => {
    setNewPrice(0);
    setVisible(false);
  };
  const handleChange = () => {
    // console.log('Function called');
    console.log('ITEMMMMMMM', itemm.id);
    console.log(newPrice);
    if (newPrice.length == 0) {
      Alert.alert('Warning', 'Field Cant be Empty');
      setItemm('');
      return;
    }
    firestore()
      .collection('Plants')
      .doc(itemm.id)
      .update({
        price: newPrice,
      })
      .then(() => {
        console.log('Data Updated!');
      });

    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Update Price</Dialog.Title>
        <Dialog.Description>Enter New Price</Dialog.Description>
        <Dialog.Input onChangeText={setNewPrice} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Update" onPress={handleChange} />
      </Dialog.Container>

      <Modal
        style={styles.modalView}
        isVisible={isModalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.9}>
        {actionTriggered === 'addScreen' ? (
          <View>
            <Text style={styles.nameText}>Enter Item Name</Text>

            <TextInput
              style={styles.nameTextBox}
              onChangeText={setName}
              placeholder="flower"
              placeholderTextColor={'grey'}
            />

            <Text style={styles.priceText}>Enter Item Price</Text>

            <TextInput
              style={styles.priceTextBox}
              onChangeText={setPrice}
              placeholder="$6.99"
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
            />

            <Text style={styles.descText}>Enter Item Description</Text>

            <TextInput
              style={styles.descTextBox}
              onChangeText={setDesc}
              placeholder="Very Bootifull Phool"
              placeholderTextColor={'grey'}
            />

            <TouchableOpacity
              style={styles.ImageModalCloser}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then(image => {
                  setImageSource(image.path);
                  console.log(image);
                });
              }}>
              <Text style={styles.imagebtn}>Insert-Image</Text>
            </TouchableOpacity>

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.drpdwn}
              textStyle={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}
            />
            <TouchableOpacity
              style={styles.modalCloser}
              onPress={() => {
                const fileName = imageSource.split('/').pop();
                const ref = storage().ref(fileName);

                ref
                  .putFile(imageSource)
                  .then(() => {
                    storage()
                      .ref(fileName)
                      .getDownloadURL()
                      .then(url => {
                        firestore()
                          .collection(value)
                          .add({
                            name: name,
                            price: price,
                            description: desc,
                            image: url,
                          })
                          .then(() => {
                            console.log('Data uploaded');
                          });
                      });
                  })
                  .catch(err => console.log(err));
              }}>
              <Text style={styles.addItemText}>Add-Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloserActual}
              onPress={() => {
                toggleModal();
              }}>
              <Text style={styles.addItemText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : actionTriggered === 'delScreen' ? (
          <ScrollView style={styles.delpage}>
            {data.map(item => {
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
                    <Text style={styles.importedDescText}>
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      firestore()
                        .collection('Plants')
                        .doc(item.id)
                        .delete()
                        .then(() => {
                          console.log('User deleted!');
                        });
                      setForcedReload(!forcedReload);
                    }}>
                    <IoniIcon
                      style={styles.delIcon}
                      name="trash-bin-outline"
                      size={40}
                      color={'#a11f17'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            {datatools.map(item => {
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
                    <Text style={styles.importedDescText}>
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      firestore()
                        .collection('Tools')
                        .doc(item.id)
                        .delete()
                        .then(() => {
                          console.log('User deleted!');
                        });
                      setForcedReload(!forcedReload);
                    }}>
                    <IoniIcon
                      style={styles.delIcon}
                      name="trash-bin-outline"
                      size={40}
                      color={'#a11f17'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            {datacare.map(item => {
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
                    <Text style={styles.importedDescText}>
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      firestore()
                        .collection('Care')
                        .doc(item.id)
                        .delete()
                        .then(() => {
                          console.log('User deleted!');
                        });
                      setForcedReload(!forcedReload);
                    }}>
                    <IoniIcon
                      style={styles.delIcon}
                      name="trash-bin-outline"
                      size={40}
                      color={'#a11f17'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                toggleModal();
              }}>
              <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : actionTriggered === 'updateScreen' ? (
          <ScrollView style={styles.delpage}>
            {data.map(item => {
              console.log('ITEM', item);
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
                    <Text style={styles.importedDescText}>
                      {item.description}
                    </Text>
                  </View>
                  {console.log(item)}
                  <TouchableOpacity
                    onPress={() => {
                      setItemm(item);
                      setVisible(true);
                      setForcedReload(!forcedReload);
                    }}>
                    <IoniIcon
                      style={styles.delIcon}
                      name="create-outline"
                      size={40}
                      color={'#a3c722'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            {datatools.map(item => {
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
                    <Text style={styles.importedDescText}>
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setItemm(item);
                      setVisible(true);
                      setForcedReload(!forcedReload);
                    }}>
                    <IoniIcon
                      style={styles.delIcon}
                      name="create-outline"
                      size={40}
                      color={'#a3c722'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            {datacare.map(item => {
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
                    <Text style={styles.importedDescText}>
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setItemm(item);
                      setVisible(true);
                      setForcedReload(!forcedReload);
                    }}>
                    <IoniIcon
                      style={styles.delIcon}
                      name="create-outline"
                      size={40}
                      color={'#a3c722'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                toggleModal();
              }}>
              <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : actionTriggered === 'viewScreen' ? (
          <View>
            <Text>List of all items here</Text>
            <TouchableOpacity style={styles.modalCloser} onPress={toggleModal}>
              <Text style={styles.addItemText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Modal>

      <View style={styles.btnsGrp}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            toggleModal();
            setActionTriggered('addScreen');
          }}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/more.png')}
          />
          <Text style={styles.addbtntxt}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnsGrp}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            toggleModal();
            setActionTriggered('delScreen');
          }}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/delete-button.png')}
          />
          <Text style={styles.delbtntxt}>Delete Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnsGrp}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            toggleModal();
            setActionTriggered('updateScreen');
          }}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/loop.png')}
          />
          <Text style={styles.editbtntxt}>Update Item</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.btnsGrp}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            toggleModal();
            setActionTriggered('viewScreen');
          }}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/visibility.png')}
          />
          <Text style={styles.viewbtntxt}>View Item</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.btnsGrp}>
        <TouchableOpacity
          style={styles.logoutbtn}
          onPress={() => {
            auth().signOut();
          }}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  btnsGrp: {
    width: 180,
    margin: 18,
  },
  btn: {
    backgroundColor: '#4eed73',
    borderRadius: 20,
    elevation: 4,
  },
  tinyLogo: {
    flex: 0,
    top: 12,
    left: 14,
    width: 25,
    height: 25,
  },
  editbtntxt: {
    flex: 0,
    bottom: 12,
    left: 52,
    fontSize: 18,
    color: '#213326',
    fontFamily: 'Poppins-Regular',
  },
  delbtntxt: {
    flex: 0,
    bottom: 13,
    left: 53,
    fontSize: 18,
    color: '#213326',
    fontFamily: 'Poppins-Regular',
  },
  addbtntxt: {
    flex: 0,
    bottom: 13,
    left: 56,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#213326',
  },
  viewbtntxt: {
    flex: 0,
    bottom: 13,
    left: 52,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#213326',
  },
  logoutbtn: {
    backgroundColor: '#1e522a',
    width: 80,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    left: 50,
    top: 10,
  },
  logout: {
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
    color: 'white',
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  delnameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    left: 24,
  },
  nameTextBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: 180,
    height: 35,
    paddingLeft: 15,
    fontFamily: 'Poppins-Italic',
    paddingTop: 4,
    paddingBottom: 2,
  },
  priceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    top: 10,
  },
  priceTextBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: 180,
    height: 35,
    paddingLeft: 15,
    fontFamily: 'Poppins-Italic',
    top: 10,
    color: 'grey',
    padding: -5,
  },
  descText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    top: 25,
  },
  descTextBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: 180,
    height: 85,
    paddingLeft: 15,
    fontFamily: 'Poppins-Italic',
    top: 25,
  },
  modalCloser: {
    top: 75,
    backgroundColor: '#646965',
    borderRadius: 20,
    padding: 6,
  },
  modalCloserActual: {
    top: 95,
    backgroundColor: '#646965',
    borderRadius: 20,
    padding: 6,
  },
  addItemText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  imagebtn: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  ImageModalCloser: {
    top: 50,
    backgroundColor: '#26472d',
    borderRadius: 20,
    padding: 6,
  },
  drpdwn: {
    top: 60,
    backgroundColor: '#26472d',
    width: 180,
    borderRadius: 20,
    fontFamily: 'Poppins-Regular',
  },
  drpdwndel: {
    top: 95,
    backgroundColor: '#26472d',
    width: 180,
    borderRadius: 20,
    fontFamily: 'Poppins-Regular',
  },
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
    height: 60,
    width: 250,
    marginTop: -10,
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
    marginTop: -5,
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
    marginBottom: 10,
  },
  goBackText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Poppins-Light',
    fontSize: 15,
  },
  delIcon: {
    flex: 0,
    left: 265,
    top: -55,
  },
});
