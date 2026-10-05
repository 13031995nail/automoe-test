import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Position } from '../data/types';
import { colors, radius, spacing } from '../theme';
import { RadioButton } from './RadioButton';

export const CARD_HEIGHT = 104;
export const CARD_GAP = spacing.m;

export const CARD_ITEM_SIZE = CARD_HEIGHT + CARD_GAP;

interface PositionCardProps {
  position: Position;
  selected: boolean;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
}

export const PositionCard = memo(function PositionCard({ position, selected, onToggle, onOpen }: PositionCardProps) {
  const { id, name, description } = position;

  const handleOpen = useCallback(() => onOpen(id), [onOpen, id]);
  const handleToggle = useCallback(() => onToggle(id), [onToggle, id]);

  return (
    <View style={styles.cell}>
      <Pressable
        onPress={handleOpen}
        style={({ pressed }) => [styles.card, selected && styles.cardSelected, pressed && styles.cardPressed]}
        accessibilityRole="button"
        accessibilityHint="Открыть карточку позиции"
      >
        <View style={styles.texts}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>

        <Pressable
          onPress={handleToggle}
          hitSlop={12}
          style={styles.radio}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected }}
          accessibilityLabel={`Выбрать: ${name}`}
        >
          <RadioButton selected={selected} />
        </Pressable>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  cell: {
    height: CARD_ITEM_SIZE,
    paddingBottom: CARD_GAP,
    paddingHorizontal: spacing.l,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    borderRadius: radius.l,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  cardPressed: {
    opacity: 0.7,
  },
  texts: {
    flex: 1,
    marginRight: spacing.m,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  radio: {
    padding: spacing.xs,
  },
});
