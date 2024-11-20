import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { row1, row2, row3, row4, row5 } from "@/assets/data";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

interface Format {
  first: string; // Track as strings to handle decimal inputs
  status: string;
  second: string;
  isDecimal: boolean; // Flag for decimal tracking
}

export default function HomeScreen() {
  const defaultFormat: Format = { first: "0", status: "", second: "", isDecimal: false };
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [display, setDisplay] = useState("0"); // Displayed value for operations
  const [degisnFeet, setDegisnFeet] = useState("0"); // Designer feet result display
  const router = useRouter();

  const handlePress = (value: string | number) => {
    if (typeof value === "number") {
      if (!format.status) {
        const newFirst = format.isDecimal ? format.first + value : (parseFloat(format.first) * 10 + value).toString();
        setFormat({ ...format, first: newFirst });
        setDisplay(newFirst);
      } else {
        const newSecond = format.isDecimal ? format.second + value : (parseFloat(format.second || "0") * 10 + value).toString();
        setFormat({ ...format, second: newSecond });
        setDisplay(`${format.first} ${format.status} ${newSecond}`);
      }
    } else {
      // Handle operations and special inputs
      switch (value) {
        case ".":
          if (!format.isDecimal) {
            if (!format.status) {
              setFormat({ ...format, first: format.first + ".", isDecimal: true });
              setDisplay(format.first + ".");
            } else {
              setFormat({ ...format, second: format.second + ".", isDecimal: true });
              setDisplay(`${format.first} ${format.status} ${format.second}.`);
            }
          }
          break;
        case "AC":
          setFormat(defaultFormat);
          setDisplay("0");
          setDegisnFeet("0");
          break;
        case "✕":
          handleBackspace();
          break;
        case "=":
          if (format.first && format.second) {
            calculateResult();
          }
          break;
        case "↻":
          router.navigate("/recent");
          break;
        default:
          if (format.first) {
            setFormat({ ...format, status: value, isDecimal: false });
            setDisplay(`${format.first} ${value}`);
          }
          break;
      }
    }
  };

  const handleBackspace = () => {
    if (format.second) {
      const newSecond = format.second.slice(0, -1) || "0";
      setFormat({ ...format, second: newSecond });
      setDisplay(`${format.first} ${format.status} ${newSecond}`);
    } else if (format.status) {
      setFormat({ ...format, status: "" });
      setDisplay(`${format.first}`);
    } else if (format.first) {
      const newFirst = format.first.slice(0, -1) || "0";
      setFormat({ ...format, first: newFirst });
      setDisplay(newFirst);
    }
  };

  const calculateResult = () => {
    let result = 0;
  
    // Convert both numbers, interpreting decimals in base-8
    const firstNum = parseDesignerDecimal(format.first);
    const secondNum = parseDesignerDecimal(format.second || "0");
  
    // Perform calculation based on selected operator
    switch (format.status) {
      case "+":
        result = firstNum + secondNum;
        break;
      case "-":
        result = firstNum - secondNum;
        break;
      case "x":
        result = firstNum * secondNum;
        break;
      case "÷":
        result = secondNum !== 0 ? firstNum / secondNum : NaN;
        break;
      default:
        return;
    }
  
    // Convert the result back to designer format for display
    const formattedResult = formatDesignerDecimal(result);
    
    setDisplay(`${format.first} ${format.status} ${format.second} = ${formattedResult}`);
    setFormat({ first: formattedResult, status: "", second: "", isDecimal: false });
  };
  
  // Helper function to parse designer decimal in base-8
  const parseDesignerDecimal = (value: string) => {
    const [whole, fraction] = value.split(".");
    const wholeNumber = parseInt(whole, 10);
    const fractionNumber = fraction ? parseInt(fraction, 10) / 8 : 0;
    return wholeNumber + fractionNumber;
  };
  
  // Helper function to format result back to designer base-8 decimal
  const formatDesignerDecimal = (value: number) => {
    const whole = Math.floor(value);
    const fraction = Math.round((value - whole) * 8);
    return fraction === 0 ? `${whole}` : `${whole}.${fraction}`;
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusContainer}>
        <TextInput
          style={styles.input}
          value={display}
          placeholder="0"
          editable={false}
        />
      </View>
      <View style={styles.warning}>
        <ThemedText style={{color:'red'}}>Don't Use!</ThemedText>
        <ThemedText style={{color:'red'}}>This Is For Only Inches Designer!</ThemedText>
      </View>
      <View style={styles.calculator}>
        {[row1, row2, row3, row4, row5].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.degitContainer}>
            {row.map((item, index) => (
              <Button key={index} {...item} handleOnPress={handlePress} />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  
  statusContainer: {
    width: "100%",
    alignItems: "center",
  },
  warning:{
    justifyContent:'center',
    alignItems:'center',
    width:350,
    height:100,
    backgroundColor:'white',
    borderRadius:10,
    margin:'auto'
  },
  input: {
    height: 60,
    width: "90%",
    backgroundColor: "#1E3E62",
    borderRadius: 10,
    fontSize: 25,
    color: "white",
    textAlign: "right",
    paddingHorizontal: 10,
    margin: 5,
  },

  calculator: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom:10,
  },
  degitContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
