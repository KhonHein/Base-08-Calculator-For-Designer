import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useHistory } from '@/components/HistoryContext';

const Recent = () =>{
  const { history, designerHistory, clearHistory } = useHistory();

  return (
    <SafeAreaView style={styles.container}>
      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>↻ Histories ↩</Text>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
          />
          <View style={styles.historyBtnContainer}>
            <Pressable onPress={() => clearHistory(false)} style={styles.clearBtn}>
              <Text>🧹clear 🚮</Text>
            </Pressable>
          </View>
        </View>
      )}

      {designerHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>↻ Designer 👗 Histories ↩</Text>
          <FlatList
            data={designerHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
          />
          <View style={styles.historyBtnContainer}>
            <Pressable onPress={() => clearHistory(true)} style={styles.clearBtn}>
              <Text>🧹clear 🚮</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Recent

const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        height:'100%',
        justifyContent:'space-between',
    },
    historyContainer:{
        width:'90%',
        padding:2,
        minHeight:200,
        maxHeight:'50%',
        overflowY:'auto',
        borderColor:'white',
        borderWidth:1,
        borderRadius:5,
        marginHorizontal:'auto',
        justifyContent:'space-between',
        marginVertical:5,
      },
      historyBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      clearBtn:{
        color:'white',
        margin:5,
        borderColor:'white',
        borderRadius:2,
        borderWidth:1,
        backgroundColor:'white',
        width:300,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'auto'
      },
      historyTitle: {
        color: "white",
        marginTop: 10,
        fontSize: 18,
        marginLeft:10
      },
      historyItem: {
        color: "white",
        fontSize: 16,
        padding: 5,
        marginLeft:10
      },
})