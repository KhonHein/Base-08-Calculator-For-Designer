import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { row1, row2, row3, row4, row5, STORAGE_DESIGNER_KEY } from "@/assets/data";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHistory } from "@/components/HistoryContext";

interface Format {
  first: string;
  status: string;
  second: string;
  isDecimal: boolean;
}

export default function HomeScreen() {
  const defaultFormat: Format = { first: "0", status: "", second: "", isDecimal: false };
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [display, setDisplay] = useState("0");
  const [label, setLabel] = useState(""); // Label for the operation
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);
  const { addHistory } = useHistory();

  const saveHistory = async (newCalculation: string) => {
    try {
      const existingHistory = await AsyncStorage.getItem(STORAGE_DESIGNER_KEY);
      const parsedHistory = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newCalculation, ...parsedHistory];
      await AsyncStorage.setItem(STORAGE_DESIGNER_KEY, JSON.stringify(updatedHistory));
      setHistory(updatedHistory); // Update local state
    } catch (error) {
      Alert.alert("Error", "Failed to save history.");
    }
  };

  const handlePress = (value: string | number) => {
    if (typeof value === "number") {
      if (!format.status) {
        const newFirst = format.isDecimal
          ? format.first + value
          : (parseFloat(format.first) * 10 + value).toString();
        setFormat({ ...format, first: newFirst });
        setDisplay(newFirst);
      } else {
        const newSecond = format.isDecimal
          ? format.second + value
          : (parseFloat(format.second || "0") * 10 + value).toString();
        setFormat({ ...format, second: newSecond });
        setDisplay(`${format.first} ${format.status} ${newSecond}`);
      }
    } else {
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
          break;
        case "✕":
          handleBackspace();
          break;
        case "=":
          if (format.first && format.second) {
            calculateResult();
          }
          break;
        case "ⅰ":
          router.navigate("/about");
          break;
        case "®️":
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
    const firstNum = parseDesignerDecimal(format.first);
    const secondNum = parseDesignerDecimal(format.second || "0");
  
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
  
    const formattedResult = formatDesignerDecimal(result);
    const calculation = `${format.first} ${format.status} ${format.second} = ${formattedResult}`;
    const labeledCalculation = label ? `${calculation} (${label})` : calculation;
  
    setDisplay(calculation);
    setFormat({ first: formattedResult, status: "", second: "", isDecimal: false });
    saveHistory(labeledCalculation); // Save only the new calculation
    setLabel(""); // Clear label input
  };
  

  const parseDesignerDecimal = (value: string) => {
    const [whole, fraction] = value.split(".");
    const wholeNumber = parseInt(whole, 10);
    const fractionNumber = fraction ? parseInt(fraction, 10) / 8 : 0;
    return wholeNumber + fractionNumber;
  };

  const formatDesignerDecimal = (value: number) => {
    const whole = Math.floor(value);
    const fraction = Math.round((value - whole) * 8);
    return fraction === 0 ? `${whole}` : `${whole}.${fraction}`;
  };


  const renderButtonRow = (row: any[], rowIndex: number) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((item, index) => (
        <Button key={index} {...item} handleOnPress={handlePress} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>
      <TextInput
        style={styles.labelInput}
        placeholder="Add a Label"
        placeholderTextColor="#ccc"
        value={label}
        onChangeText={setLabel}
      />
      <View style={styles.warning}>
        <Text style={styles.warningText}>Base-8 Ruler Calculator!</Text>
        <Text style={styles.warningText}>
          For Designer Only! Not For Billing!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {[row1, row2, row3, row4, row5].map(renderButtonRow)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  displayContainer: { backgroundColor: "#333", borderRadius: 10, padding: 15 },
  display: { fontSize: 32, color: "#fff", textAlign: "right" },
  labelInput: {height:40, marginVertical:5, color: "#fff", borderColor: "#666", borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  buttonContainer: { flex: 1, justifyContent: "flex-end" },
  row: { flexDirection: "row", justifyContent: "space-around", marginVertical: 5 },
  warning:{width:'100%',height:100,margin:'auto',borderColor:'white',backgroundColor:'white',borderWidth:0.5,borderRadius:3,justifyContent:'center',alignItems:'center'},
  warningText:{color:'red',fontSize:20,}
});
