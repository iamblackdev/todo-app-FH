import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";
import {
  Animated,
  Button,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useEffect, useMemo, useRef, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { generateUniqueId } from "@/utils/helpers";
import { ADD_TODO, SET_EDIT_TODO, UPDATE_TODOS } from "@/redux/slice/todoSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useColor } from "@/hooks/useThemeColor";
import { HapticTab } from "./HapticTab";


const initilaState = {
  title: '',
  completed: false
}

const AddTodo: React.FC = () => {
  const dispatch = useAppDispatch()
  const Colors = useColor()
  const editTodo = useAppSelector(state => state.editTodo)
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [todo, setTodo] = useState(initilaState)
  const [backdropPointer, setBackdropPointer] = useState(false)

  const bottom = useMemo(() => {
    if (Platform.OS === "android") return 20
    return 0
  }, [])

  // Dom Refs
  const inputRef = useRef<any>(null)
  const modalAnimRef = useRef(new Animated.Value(-250)).current;
  const buttonAnimationRef = useRef(new Animated.Value(bottom)).current;
  // const backDropAnimRef = useRef(new Animated.Value(0)).current;


  const editMode = useMemo(() => {
    return editTodo?.id ? true : false
  }, [editTodo])


  // Animates button and input modal
  const toogleAddModal = (open: boolean) => {
    if (open) inputRef.current!.focus();
    setBackdropPointer(open)
    return Animated.parallel([
      Animated.spring(buttonAnimationRef, {
        friction: 5,
        toValue: open ? -100 : bottom,
        useNativeDriver: false,
      }),
      Animated.spring(modalAnimRef, {
        toValue: open ? bottom : -250,
        friction: 5,
        useNativeDriver: false,
      })
    ])
  }

  const resetState = () => setTodo(initilaState)

  const handleAddTodo = () => dispatch(ADD_TODO({ title: todo.title, id: generateUniqueId(), completed: todo.completed }))

  const handleEditTodo = () => dispatch(UPDATE_TODOS({ title: todo.title, id: editTodo?.id!, completed: todo.completed }))

  const handleSubmit = () => {
    if (editMode) {
      handleEditTodo()
    } else {
      handleAddTodo()
    }
    handleCloseAddModal()
  }
  const handleCloseAddModal = () => {
    Keyboard.dismiss()
    dispatch(SET_EDIT_TODO(null))
    resetState()
    toogleAddModal(false).start()
  }

  useEffect(() => {
    if (editTodo?.id) {
      toogleAddModal(true).start()
      setTodo({
        title: editTodo.title,
        completed: editTodo.completed
      })
    }
  }, [editTodo])

  return (
    <>
      {/* add input modal */}
      <Animated.View
        style={[styles.addContainer, { width: windowWidth, bottom: modalAnimRef }]}>
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.title}>{editMode ? 'Edit' : 'Create'} To-do</ThemedText>
          <ThemedView style={[styles.inputWrapper, { backgroundColor: Colors.listbg }]}>
            <BouncyCheckbox
              useBuiltInState={false}
              isChecked={todo.completed}
              onPress={(val) => setTodo((prev) => ({ ...prev, completed: !val }))}
              size={25}
              fillColor="#292D3240"
              innerIconStyle={{ borderColor: "#292D32", borderWidth: todo.completed ? 0 : 1.5, }}
            />
            <TextInput
              ref={inputRef}
              value={todo.title}
              onChangeText={(val) => setTodo((prev) => ({ ...prev, title: val }))}
              style={[styles.input, { color: Colors.main }]}
              placeholder="Add your task. (Max 150)"
              maxLength={150}
            />
          </ThemedView>

          <ThemedView style={styles.button}>
            <Button disabled={todo.title.length < 3} onPress={() => handleSubmit()} title={editMode ? "Save" : "Create"} />
          </ThemedView>
        </ThemedView>
      </Animated.View>

      {/* add button */}
      <HapticTab onPress={() => toogleAddModal(true).start()}>
        <Animated.View
          style={[styles.floatingBtn, { backgroundColor: Colors.active, bottom: buttonAnimationRef }]}>
          <Ionicons name="add" size={24} color="white" />
        </Animated.View>
      </HapticTab>

      {/* backdrop */}
      {backdropPointer && <TouchableWithoutFeedback onPress={() => handleCloseAddModal()}>
        <Animated.View style={[styles.backdrop, { width: windowWidth, height: windowHeight }]} />
      </TouchableWithoutFeedback>}
    </>
  );
}

export default AddTodo;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "#00000050",
    position: "absolute",
    top: 0,
    left: 0
  },
  addContainer: {
    zIndex: 2,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  modal: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',

    paddingHorizontal: 16,
    paddingVertical: 18,
    borderColor: "#E4E3E3",
    borderWidth: 1,
    borderRadius: 16,
  },
  input: {
    flex: 1,
    height: 40
  },
  button: { width: 100, marginLeft: "auto", marginTop: 16 },
  floatingBtn: {
    position: "absolute",
    padding: 19,
    borderRadius: "50%",
    bottom: 0,
    right: 16
  }
})