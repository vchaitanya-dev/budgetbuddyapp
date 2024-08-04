import {  Text, View,ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { SQLiteProvider } from "expo-sqlite/next";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screen/Home";
import {Link} from 'expo-router';
import { Asset } from 'expo-asset';
import  {useState,useEffect,Suspense} from "react";
const Stack = createNativeStackNavigator();
const loadDatabase = async () => {
  const dbName = "mySQLitedb.db";
  const dbAsset = require("./mySQLitedb.db");
  const  dbUrl = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUrl, dbFilePath);
  }
}

export default function App() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);
  if (!dbLoaded)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );

    return(
      <NavigationContainer>
      <Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="mySQLitedb.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "बजट दोस्त",
                headerLargeTitle: true,
                headerBlurEffect: "light",
                headerRight: () => (
 
                <Link href="/summary" >सारांश</Link>
                )
              
              }}

            />

          </Stack.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
    )
 
}
