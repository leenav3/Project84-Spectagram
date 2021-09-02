import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from 'react-native-dropdown-picker';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropDownHeight: 40,
      caption: ''

    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
        let previewImages = {
            "image_1": require('../assets/image_1.jpg'),
            "image_2": require('../assets/image_2.jpg'),
            "image_3": require('../assets/image_3.jpg'),
            "image_4": require('../assets/image_4.jpg'),
            "image_5": require('../assets/image_5.jpg')
        }
        return(
            <View style = {styles.Container}>
                <SafeAreaView style ={styles.droidSafeArea}/>
                <View style ={styles.appTitle} >
                    <View style = {styles.appIcon}>
                        <Image source ={require('../assets/logo.png')}
                        style = {{width: 60, height: 60, resizeMode: 'contain', marginLeft: 10}}/>
                    </View>
                    <View style ={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>
                            New Story
                        </Text>
                    </View>
                </View>
                <View style ={{
                    height:RFValue(this.state.dropDownHeight)}}>

                    <Image source= {previewImages[this.state.previewImage]} 
                     style={{resizeMode: 'contain', width: Dimensions.get("window").width-40, height:250, borderRadius:  10, marginBottom: 10}}/>
                        

                        <View style ={{height:RFValue(this.state.dropDownHeight)}}>
                            <DropDownPicker
                            items = {[
                                {label:"Image 1" , value : "image_1"},
                                {label:"Image 2" , value : "image_2"},
                                {label:"Image 3" , value : "image_3"},
                                {label:"Image 4" , value : "image_4"},
                                {label:"Image 5" , value : "image_5"},
                            ]}
                            defaultValue = {this.state.previewImage}
                            containerStyle = {{height: 40, borderRadius: 20, marginBottom : 10}}
                            style = {{backgroundColor: 'transparent'}}
                            itemStyle = {{justifyContent: 'flex-start'}}
                            dropDownStyle = {{backgorundColor:'#2f345d'}}
                            labelStyle = {{color: 'white', fontFamily : 'Bubblegum-Sans'}}
                            arrowStyle = {{color: 'white', fontFamily : 'Bubblegum-Sans'}}
                            onOpen={()=>{
                                this.setState({
                                    dropDownHeight : 170
                                })
                            }}
                            onClose={()=>{
                                this.setState({
                                    dropDownHeight : 40
                                })
                            }}
                            onChangeItem={(item)=>{
                                this.setState({
                                    previewImage : item.value
                                })
                            }}
                            />
                        </View>
                        <ScrollView>
                            <TextInput
                                style={styles.inputFont}
                                onChangeText={caption => this.setState({
                                    caption: caption
                                })}
                                placeholder={"Caption"}
                                placeholderTextColor="white"
                            />
                        </ScrollView>
                </View>
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },

  });
