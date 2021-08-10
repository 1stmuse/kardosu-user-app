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
import { Entypo } from "@expo/vector-icons"

const Login = ({navigation}) => {
  const device = Platform.OS
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inputValid, setInputValid] = useState(null)
  const [saveUser, setSaveUser] = useState(false)

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
          <Text style={{color:Colors.black, fontSize:25, fontWeight:"bold"}} >Welcome Back,</Text>
          <Text style={{color:Colors.Dgray, marginTop:10}}>Hello there, sign in to continue</Text>
        </View>
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
            marginBottom:35
          }}
        />
        <AppInput
          label="PASSWORD"
          LeftIcon={() => <Entypo name="lock" size={24} color={Colors.Dgray} /> }
          onChange={(text) => setPassword(text)}
          type="password"
        />
        <View style={[styles.spaceBetween, {paddingHorizontal:10, marginBottom:20}]}>
          <View style={styles.spaceBetween}>
            <Switch value={saveUser} onValueChange={val => setSaveUser(val)} />
            <Text style={{color:Colors.secondary, fontWeight:"bold", marginLeft: device === "ios" ? 10 : 0}}>Save me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("forgot_password")}>
            <Text style={{ color: Colors.primary, fontSize: 16 }}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <AppButton
          text="LOGIN"
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
          <Text style={{color:Colors.Dgray, marginRight:10, fontSize:15}}>Don't Have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")} >
            <Text style={{marginLeft:3, color:Colors.secondary, fontWeight:"bold", textDecorationLine:"underline"}}>
              Sign Up
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
export default Login;
