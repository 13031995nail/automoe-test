import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

interface RadioButtonProps {
  selected: boolean;
}

export const RadioButton = memo(function RadioButton({ selected }: RadioButtonProps) {
  return (
    <View style={[styles.outer, selected && styles.outerSelected]}>
      {selected ? <View style={styles.inner} /> : null}
    </View>
  );
});

const SIZE = 24;

const styles = StyleSheet.create({
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    borderColor: colors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerSelected: {
    borderColor: colors.primary,
  },
  inner: {
    width: SIZE / 2,
    height: SIZE / 2,
    borderRadius: SIZE / 4,
    backgroundColor: colors.primary,
  },
});
