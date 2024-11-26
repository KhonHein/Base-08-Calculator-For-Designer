import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Alert } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { developed, warning1, warning2, warning3 } from '@/assets/data';

export default function TabTwoScreen() {
    // Key for AsyncStorage
    const STORAGE_KEY = "designer_calculator_history";
    const [history, setHistory] = useState<string[]>([]); // History state
    // Load history from AsyncStorage when the app starts
    useEffect(() => {
      const loadHistory = async () => {
        try {
          const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
          }
        } catch (error) {
          Alert.alert("Error", "Failed to load history.");
        }
      };
  
      loadHistory();
    }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="logo-designernews" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>Warning: For Designers Only ⚠️</ThemedText>
      </ThemedView>
      <ThemedText>
      This calculator uses an 8-based system designed for design purposes like measurements and layouts. 
      It is NOT suitable for financial calculations, billing, or cash transactions. 
        </ThemedText>
      <Collapsible title=" Donn't use in business or financial">
        {warning1&&warning1.map((item,index)=><ThemedText key={index}>{item.status+ ". "+item.describion}</ThemedText>)}
      </Collapsible>

      <Collapsible title="A Note for Designers 📝">
        {warning2&&warning2.map((item,index)=><ThemedText key={index}>{item.status+ ". "+item.describion}</ThemedText>)}
      </Collapsible>

      <Collapsible title="Final Warning ⚠️">
        {warning3&&warning3.map((item,index)=><ThemedText key={index}>{item.status+ ". "+item.describion}</ThemedText>)}
      </Collapsible>
      <Collapsible title="Developer🧑‍💻">
        {developed&&developed.map((item,index)=><ThemedText key={index}>{item.status+ ". "+item.describion}</ThemedText>)}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: 35,
    position:"absolute",
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
