import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_DESIGNER_KEY, STORAGE_KEY } from "@/assets/data";

const HistoryContext = createContext({
  history: [] as string[],
  designerHistory: [] as string[],
  clearHistory: (isDesigner: boolean) => {},
  addHistory: (item: string, isDesigner: boolean) => {},
});

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [designerHistory, setDesignerHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistories = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        const storedDesignerHistory = await AsyncStorage.getItem(STORAGE_DESIGNER_KEY);

        setHistory(storedHistory ? JSON.parse(storedHistory) : []);
        setDesignerHistory(storedDesignerHistory ? JSON.parse(storedDesignerHistory) : []);
      } catch (error) {
        console.error("Failed to load histories:", error);
      }
    };
    loadHistories();
  }, []);

  const addHistory = async (item: string, isDesigner: boolean) => {
    try {
      if (isDesigner) {
        const newDesignerHistory = [item, ...designerHistory];
        setDesignerHistory(newDesignerHistory);
        await AsyncStorage.setItem(STORAGE_DESIGNER_KEY, JSON.stringify(newDesignerHistory));
      } else {
        const newHistory = [item, ...history];
        setHistory(newHistory);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error("Failed to add history:", error);
    }
  };

  const clearHistory = async (isDesigner: boolean) => {
    try {
      if (isDesigner) {
        setDesignerHistory([]);
        await AsyncStorage.removeItem(STORAGE_DESIGNER_KEY);
      } else {
        setHistory([]);
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  return (
    <HistoryContext.Provider value={{ history, designerHistory, clearHistory, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
