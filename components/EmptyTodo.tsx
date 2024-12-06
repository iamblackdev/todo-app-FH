import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface props {
  activefilter: string
}
const EmptyTodoMessage: React.FC<props> = ({ activefilter }) => {
  if (activefilter === "completed") return (
    <ThemedView style={styles.wrapper}>
      <ThemedText>You have no completed task</ThemedText>
    </ThemedView>
  );

  if (activefilter === "incomplete") return (
    <ThemedView style={styles.wrapper}>
      <ThemedText>You have no incomplete task</ThemedText>
    </ThemedView>
  );


  return (
    <ThemedView style={styles.wrapper}>
      <ThemedText>Hey 👋, Welcome</ThemedText>
      <ThemedText>You have not saved any task</ThemedText>
    </ThemedView>
  );
}

export default EmptyTodoMessage;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }
})