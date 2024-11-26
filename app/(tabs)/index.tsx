import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { row1, row2, row3, row4, row5, STORAGE_KEY } from "@/assets/data";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

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
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  // Load history from AsyncStorage
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedHistory) setHistory(JSON.parse(storedHistory));
      } catch (error) {
        Alert.alert("Error", "Failed to load history.");
      }
    };
    loadHistory();
  }, []);

  // Save history to AsyncStorage
  const saveHistory = async (newHistory: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
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
          if (format.first && format.second) calculateResult();
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
    const firstNum = parseFloat(format.first);
    const secondNum = parseFloat(format.second || "0");

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

    const calculation = `${format.first} ${format.status} ${format.second} = ${result}`;
    const newHistory = [calculation, ...history];

    setHistory(newHistory);
    saveHistory(newHistory);

    setDisplay(calculation);
    setFormat({ first: result.toString(), status: "", second: "", isDecimal: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>

      <View style={styles.calculator}>
        {[row1, row2, row3, row4, row5].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
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
  container: { flex: 1, backgroundColor: "#1A1A1A", padding: 10 },
  displayContainer: {
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  display: {
    fontSize: 36,
    color: "#FFFFFF",
    textAlign: "right",
  },
  calculator: { flex: 1, justifyContent: "flex-end" },
  row: { flexDirection: "row", justifyContent: "space-around", marginVertical: 5 },
});
