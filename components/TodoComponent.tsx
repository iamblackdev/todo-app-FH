import { Alert, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { DELETE_TODO, SET_EDIT_TODO } from "@/redux/slice/todoSlice";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useColor } from "@/hooks/useThemeColor";
import { HapticTab } from "./HapticTab";

interface props {
  editMode: boolean
  isChecked: boolean
  id: string
  title: string
  onPress: (val: boolean) => void
}
const TodoComponent: React.FC<props> = ({ isChecked, onPress, title, editMode, id }) => {
  const dispatch = useAppDispatch()
  const colorScheme = useColorScheme()
  const Colors = useColor()
  const editAnim = useRef(new Animated.Value(-40)).current;
  const deleteAnim = useRef(new Animated.Value(-35)).current;


  const backgroundColor = useMemo(() => {
    return isChecked ? Colors.listbgChecked : Colors.listbg
  }, [isChecked, colorScheme])

  const textColor = useMemo(() => {
    return isChecked ? Colors.listText : Colors.listText
  }, [isChecked, colorScheme])

  const animationEditMode = (visible: boolean) => {
    return Animated.parallel([
      Animated.spring(deleteAnim, {
        toValue: visible ? 7 : -40,
        friction: 3,
        tension: visible ? 30 : 0,
        useNativeDriver: false,
      }),
      Animated.spring(editAnim, {
        toValue: visible ? 0 : -35,
        tension: visible ? 30 : 0,
        friction: 3,
        useNativeDriver: false,
      })
    ])
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this task?', [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => dispatch(DELETE_TODO(id)) },
    ]);
  }

  const runAnimation = () => {
    if (editMode) {
      animationEditMode(true).start()
    } else {
      animationEditMode(false).start()
    }
  }
  useEffect(() => {
    runAnimation()
    return () => {
      animationEditMode(false).stop()
    }
  }, [editMode])
  return (

    <ThemedView style={styles.wrapper}>
      <HapticTab onPress={() => dispatch(SET_EDIT_TODO({ id, title, completed: isChecked }))}>
        <Animated.View style={[styles.editBtn, { backgroundColor: Colors.active, marginRight: 8, marginLeft: editAnim }]}>
          <ThemedText>
            <Ionicons name="pencil-sharp" size={20} color="white" />
          </ThemedText>
        </Animated.View>
      </HapticTab>
      <BouncyCheckbox
        isChecked={isChecked}
        useBuiltInState={false}
        onPress={(val) => onPress(!val)}
        style={[styles.checkwrapper, { backgroundColor }]}
        textStyle={{ color: textColor }}
        unFillColor="transparent"
        text={title}
        size={25}
        fillColor={Colors.checkFilled}
        innerIconStyle={{ borderWidth: isChecked ? 0 : 1.5, borderColor: Colors.checkBorder }}
      />
      <HapticTab onPress={() => handleDelete()}>
        <Animated.View style={[styles.editBtn, { backgroundColor: Colors.active, marginLeft: 8, marginRight: deleteAnim }]}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </Animated.View>
      </HapticTab>
    </ThemedView >
  );
}

export default TodoComponent;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  checkwrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderColor: "#E4E3E3",
    borderWidth: 1,
    borderRadius: 16,
  },
  editBtn: {
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 15,
    width: 30,
    height: 30
  }
})