import { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { descriptionUpdated, positionsSelectors } from '../store/positionsSlice';
import { colors, radius, spacing } from '../theme';

type Props = RootStackScreenProps<'PositionDetails'>;

export function PositionDetailsScreen({ route, navigation }: Props) {
  const { positionId } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const position = useAppSelector((state) => positionsSelectors.selectById(state, positionId));

  const [draft, setDraft] = useState(position?.description ?? '');

  const trimmedDraft = draft.trim();
  const isDirty = position !== undefined && trimmedDraft !== position.description;
  const canSave = isDirty && trimmedDraft.length > 0;

  const save = useCallback(() => {
    if (!canSave) return;
    dispatch(descriptionUpdated({ id: positionId, description: trimmedDraft }));
  }, [canSave, dispatch, positionId, trimmedDraft]);

  if (!position) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Позиция не найдена</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          {
            paddingLeft: insets.left + spacing.l,
            paddingRight: insets.right + spacing.l,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.name}>{position.name}</Text>
        <Text style={styles.label}>Описание</Text>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          multiline
          textAlignVertical="top"
          placeholder="Введите описание"
          placeholderTextColor={colors.textSecondary}
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.l) }]}>
        <Pressable
          onPress={save}
          disabled={!canSave}
          style={({ pressed }) => [styles.button, !canSave && styles.buttonDisabled, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSave }}
        >
          <Text style={styles.buttonText}>{isDirty ? 'Сохранить' : 'Сохранено'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.s,
  },
  input: {
    minHeight: 180,
    padding: spacing.l,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  footer: {
    paddingTop: spacing.m,
    paddingHorizontal: spacing.l,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  button: {
    height: 52,
    borderRadius: radius.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
