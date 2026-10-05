import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

interface SelectionBarProps {
  selectedCount: number;
  totalCount: number;
  onToggleAll: () => void;
}

export const SelectionBar = memo(function SelectionBar({ selectedCount, totalCount, onToggleAll }: SelectionBarProps) {
  const allSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <View style={styles.container}>
      <Text style={styles.counter} accessibilityLiveRegion="polite">
        Выбрано <Text style={styles.counterAccent}>{selectedCount}</Text> из {totalCount}
      </Text>

      <Pressable
        onPress={onToggleAll}
        hitSlop={8}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>{allSelected ? 'Снять все' : 'Выбрать все'}</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.l,
    marginVertical: spacing.m,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderRadius: radius.m,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  counter: {
    fontSize: 15,
    color: colors.text,
  },
  counterAccent: {
    fontWeight: '700',
    color: colors.primary,
  },
  button: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: radius.m,
    backgroundColor: colors.primaryMuted,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
