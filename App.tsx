import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "./firebase";
import { onValue, ref, set } from "firebase/database";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ padding: 24 }}>
        <Header />
        <Content />
      </SafeAreaView>
    </View>
  );
}

export function Header() {
  return (
    <View>
      <Text style={styles.headerTitle}>Smart Switch</Text>
    </View>
  );
}

export function Content() {
  const [authenticated, setAuthenticated] = useState(false);
  const [relays, setRelays] = useState({
    relay_1: false,
    relay_2: false,
    relay_3: false,
    relay_4: false,
  });

  const relayArray = Object.keys(relays).map((id) => ({
    id,
    checked: relays[id] as boolean,
  }));

  useEffect(() => {
    if (authenticated) return;

    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInWithEmailAndPassword(
          auth,
          "supardi.g_ti22@nusaputra.ac.id",
          "!xdv25Zj%rzwPn"
        );
        setAuthenticated(true);
      }
    });
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) return;

    const relaysRef = ref(db, "devices/1");

    return onValue(relaysRef, (snapshot) => {
      setRelays(snapshot.exportVal());
    });
  }, [authenticated]);

  return (
    <View style={styles.content}>
      <FlatList
        data={relayArray}
        renderItem={(relay) => <RelayItem relay={relay.item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      ></FlatList>
    </View>
  );
}

export function RelayItem(props: { relay: { id: string; checked: boolean } }) {
  const { id, checked } = props.relay;

  async function handleSwitchChange(checked: boolean) {
    await set(ref(db, `/devices/1/${id}`), checked);
  }

  return (
    <View
      style={{
        ...styles.relayItem,
        backgroundColor: checked ? "#8C8CFF" : "#2C2C32",
      }}
    >
      <Text style={styles.relayItemName}>{id.replaceAll("_", " ")}</Text>
      <Switch
        style={styles.relayItemSwitch}
        trackColor={{
          false: "#fff",
          true: "#6464E7",
        }}
        thumbColor={checked ? "#fff" : "#6464E7"}
        value={checked}
        onValueChange={handleSwitchChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222227",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    marginTop: 24,
  },
  relayItem: {
    flex: 1,
    minHeight: 150,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    margin: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  relayItemName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  relayItemSwitch: {
    marginTop: "auto",
  },
});
