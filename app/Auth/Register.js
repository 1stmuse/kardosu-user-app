import React, {useState, useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  Switch,
  Platform
} from "react-native";
import Colors from "../Colors";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import { login } from "../api/auth"
import { Entypo, FontAwesome} from "@expo/vector-icons"

const Register = ({navigation}) => {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [inputValid, setInputValid] = useState(null)

  const onBlurInput = () => {
    if(email.length < 1){
      setInputValid(false)
    }else {
      setInputValid(true)
    }
  }

  const submit = useCallback(async () =>{

    const response = await login({email, password})
    if(response.ok) {
      // console.log(response.data.token)
      await AsyncStorage.setItem('token', response.data.token)
      return
    }
    Alert.alert("Error", response.data.message,)
    console.log(response.data.message) 
  }, [email, password])

  return (
    <View style={[styles.container]}>
      <View style={[styles.logo, { height: height * 0.25 }]}>
        <Text style={{fontSize:30, color:Colors.primary, fontWeight:"900"}} >Karduso</Text>
      </View>
      <View style={[styles.body, { paddingHorizontal: width * 0.05, width }]}>
        <View style={{marginBottom:30}}>
          <Text style={{color:Colors.black, fontSize:25, fontWeight:"bold"}} >Create an account,</Text>
          <Text style={{color:Colors.Dgray, marginTop:10}}>first create your free account then start shopping</Text>
        </View>
        <AppInput
          label="NAME"
          onBlur={onBlurInput}
          LeftIcon={() => <FontAwesome name="user-circle-o" size={24} color={Colors.Dgray} /> }
          value={name}
          valid={inputValid}
          type="input"
          onChangeText={(text) => setName(text)}
          autoCapitalize="none"
          containerStyle={{
            marginBottom:20
          }}
        />
        <AppInput
          label="EMAIL"
          onBlur={onBlurInput}
          LeftIcon={() => <Entypo name="mail" size={24} color={Colors.Dgray} /> }
          value={email}
          valid={inputValid}
          type="input"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={{
            marginBottom:20
          }}
        />
        <AppInput
          label="PASSWORD"
          LeftIcon={() => <Entypo name="lock" size={24} color={Colors.Dgray} /> }
          onChange={(text) => setPassword(text)}
          type="password"
        />

        <AppButton
          text="SIGN UP"
          onClick={submit}
          style={{
            backgroundColor: Colors.secondary,
            marginTop: 20,
            height:55
          }}
          textStyle={{
              color: Colors.white
          }}
        />

        <View style={styles.create} >
          <TouchableOpacity onPress={() => navigation.navigate("login")} >
            <Text style={{color:Colors.primary, fontWeight:"bold", textDecorationLine:"underline"}}>
              Already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  sign_in: {
    color: Colors.gray,
    fontSize: 23,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
  },
  create: {
    flexDirection:"row",
    justifyContent:'center',
    marginTop:20
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
  }
});
export default Register;
