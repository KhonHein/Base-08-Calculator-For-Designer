import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Degit } from '@/assets/data'

interface Props extends Degit {
    handleOnPress:(value:number|string)=>void;
}
const Button = ({name,value,color,bgcolor,disabled,handleOnPress}:Props) => {
  return (
    <Pressable
    style={[styles.button,{backgroundColor:bgcolor}]}
    onPress={()=>handleOnPress(value)}
    disabled={disabled}
  >
    <Text style={[styles.text,{color}]}>{name}</Text>
  </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        // paddingVertical: 12,
        // paddingHorizontal: 32,
        width: 80,
        height: 80,
        borderRadius: 40,
        elevation: 10,
        margin:2,
      },
      text: {
        fontSize: 25,
        lineHeight: 25,
        fontWeight: "bold",
        letterSpacing: 0.25,
        //color: "white",
      },
})