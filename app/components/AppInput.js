import React, {useState} from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Entypo, AntDesign } from "@expo/vector-icons";
import Colors from '../Colors';

const AppInput =({inputStyle, label, labelStyle, width, onChange, containerStyle, LeftIcon, type, valid, ...props}) =>{
  const [showPass, setShowPass] = useState(true)
  return (
    <View style={[styles.container, {...containerStyle}]} >
        { label && <Text style={[styles.text, {...labelStyle}]}> {label} </Text>}
      <View style={[ styles.input_view,{...inputStyle}, ]}>
        { LeftIcon && <View style={styles.leftIcon}>
          <LeftIcon/>
        </View> }
        <TextInput
            {...props}
            secureTextEntry={type === "password" && showPass}
            // onChangeText={onChange}
            style={{flex:1,height:"100%", fontSize:17, paddingHorizontal:10}}
        />
        { type === "password" && <View style={styles.rightIcon} >
           <Entypo name={showPass ? "eye-with-line" : "eye"} size={20} onPress={() => setShowPass(!showPass)} />
        </View> }
        { type === "input" && <View style={styles.rightIcon} >
          {valid === true && <AntDesign name="checkcircle" size={18} color={Colors.secondary} />}
          { valid === false && <AntDesign name={"closecircle"} size={18} color="red" />}
        </View> }
      </View>
    </View>
   )

}


const styles = StyleSheet.create({
   container:{
      marginBottom: 20,
      width:"100%"
   },
   input_view:{
     width:"100%",
       borderWidth: 1,
       borderColor: Colors.gray,
       borderRadius:25,
       flexDirection: "row",
       alignItems:"center",
       height: 60
   },
   text:{
       color: Colors.Dgray,
       fontSize: 14,
       marginBottom:5,
       marginLeft:20
   },
   leftIcon:{
     borderRightWidth: 1,
     borderRightColor: Colors.gray,
     alignItems:"center",
     justifyContent: "center",
    paddingHorizontal:20,
     height: "100%"
   },
   rightIcon:{
    alignItems:"center",
    justifyContent: "center",
    paddingHorizontal:20,
    height: "100%"
  },
})
export default AppInput