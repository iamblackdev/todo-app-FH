import CheckIconDark from "@/assets/svgs/CheckIconDark";
import CheckIcon from "@/assets/svgs/CheckIcon";
import CancelIcon from "@/assets/svgs/CancelIcon";
import FilterIcon from "@/assets/svgs/FilterIcon";
import AddTodo from "@/components/Addtodo";
import EmptyTodoMessage from "@/components/EmptyTodo";
import FilterOptions from "@/components/FilterOptions";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TodoComponent from "@/components/TodoComponent";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { UPDATE_TODOS } from "@/redux/slice/todoSlice";
import { useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HapticTab } from "@/components/HapticTab";

const ToDoHome = () => {
  const colorScheme = useColorScheme();
  const todos = useAppSelector(state => state.todos)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [activeFilter, setActiveFiler] = useState<string>("all")
  const dispatch = useAppDispatch()

  // Set the selected active filter using the key passed,
  const handleFilterSelect = (key: string) => {
    if (activeFilter === key) return setActiveFiler("all")
    setActiveFiler(key)
  }

  const toogleEditMode = () => setEditMode(prev => !prev)

  // fillter todos (task) base on the active fillter selected.
  const filterTodos = useMemo(() => {
    setEditMode(false)
    return [...todos].filter(v => {
      if (activeFilter === "completed") {
        return v.completed === true
      }
      if (activeFilter === "incomplete") {
        return v.completed === false
      }
      return todos
    })
  }, [todos, activeFilter])

  // return numebr count of the todos (Total, Completed, Incomplete)
  const todosCount = useMemo(() => {
    const total = todos.length
    const completed = [...todos].filter((val) => val.completed).length
    const incomplete = total - completed
    return { completed, total, incomplete }
  }, [todos, activeFilter])



  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.flex]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={10}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ThemedView style={styles.container}>
            <ThemedView style={styles.titleWrapper}>
              {colorScheme === "light" ? <CheckIcon /> : <CheckIconDark />}
              <ThemedText style={styles.title}>To-do</ThemedText>
            </ThemedView>
            <ThemedView style={styles.appTop}>
              <ThemedText lightColor="#000" darkColor="#fff" style={styles.appText}>Your To-do</ThemedText>
              <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>

                {/*  */}
                <HapticTab onPress={() => setShowFilter(prev => !prev)}>
                  {showFilter ? <CancelIcon /> : <FilterIcon />}
                </HapticTab>

                {/* edit btn */}
                {todos.length ? <HapticTab onPress={() => toogleEditMode()} style={{ marginLeft: 14 }}>
                  <ThemedText style={{ fontSize: 18, fontWeight: 600 }}>
                    {editMode ? "Done" : "Edit"}
                  </ThemedText>
                </HapticTab> : null}
              </ThemedView>
            </ThemedView>


            {/* filter options */}
            {showFilter && <FilterOptions filterCount={todosCount} active={activeFilter} onSelect={handleFilterSelect} />}

            {/* todo list */}
            <ThemedView style={styles.flex}>
              <FlatList
                data={filterTodos}
                ListEmptyComponent={<EmptyTodoMessage activefilter={activeFilter} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <ThemedView style={{ marginVertical: 8 }} />}
                renderItem={({ item }) =>
                  <TodoComponent
                    id={item.id}
                    editMode={editMode}
                    isChecked={item.completed}
                    title={item.title}
                    onPress={(val) => dispatch(UPDATE_TODOS({ completed: val, id: item.id }))}
                  />
                }
              />
            </ThemedView>

            <AddTodo />
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

export default ToDoHome;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 16,
    flex: 1,
  },
  flex: {
    flex: 1
  },
  titleWrapper: {
    marginTop: 24,
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "center"
  },
  title: {
    marginLeft: 5,
    fontSize: 18.5,
    fontWeight: "500"
  },
  appTop: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  appText: {
    fontSize: 24,
    fontWeight: "500"
  }
});