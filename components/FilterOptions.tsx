import { ThemedView } from "./ThemedView";
import { filterObjectType } from "@/utils/types";
import { ThemedText } from "./ThemedText";
import { FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMemo } from "react";


interface props {
  active: string
  filterCount: {
    incomplete: number
    completed: number
    total: number
  }
  onSelect: (val: string) => void
}
const FilterOptions: React.FC<props> = ({ active, onSelect, filterCount }) => {
  const colorScheme = useColorScheme()
  const filters = [
    {
      title: "All",
      count: filterCount?.total || 0,
      key: 'all',
    },
    {
      title: "Completed",
      count: filterCount?.completed || 0,
      key: 'completed',
    },
    {
      title: "Incomplete",
      count: filterCount?.incomplete || 0,
      key: 'incomplete',
    }
  ]

  const styles = useMemo(() => {
    return stylesfunc(colorScheme || 'light')
  }, [colorScheme])

  return (
    <ThemedView style={styles.filtersWrapper}>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <ThemedView style={{ marginHorizontal: 4 }} />}
        renderItem={({ item }) =>
          <TouchableWithoutFeedback onPress={() => onSelect(item.key)}>
            <ThemedView style={[styles.filter, active === item.key && styles.activeFilter]}>
              <ThemedText style={[styles.text, active === item.key && styles.activeText]} >{item.title} ({item.count})</ThemedText>
            </ThemedView>
          </TouchableWithoutFeedback>
        }
      />
    </ThemedView>
  );
}

export default FilterOptions;

const stylesfunc = (theme: 'light' | 'dark') => StyleSheet.create({
  filtersWrapper: {
    marginBottom: 22
  },
  filter: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 30,
    borderColor: "#8B8B8B",
    borderWidth: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  activeFilter: {
    borderColor: Colors[theme].active,
    backgroundColor: Colors[theme].active
  },
  text: {
    color: Colors[theme].tabActiveText,
    fontWeight: '500'
  },
  activeText: {
    color: "white",
  },
})