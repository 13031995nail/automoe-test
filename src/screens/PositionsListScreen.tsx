import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CARD_ITEM_SIZE, PositionCard } from '../components/PositionCard';
import { SelectionBar } from '../components/SelectionBar';
import type { Position } from '../data/types';
import type { RootStackScreenProps } from '../navigation/types';
import { useAppSelector } from '../store/hooks';
import { positionsSelectors } from '../store/positionsSlice';
import { spacing } from '../theme';

type Props = RootStackScreenProps<'PositionsList'>;

const keyExtractor = (item: Position) => item.id;

export function PositionsListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const positions = useAppSelector(positionsSelectors.selectAll);

  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => (prev.size === positions.length ? new Set() : new Set(positions.map((p) => p.id))));
  }, [positions]);

  const open = useCallback(
    (positionId: string) => navigation.navigate('PositionDetails', { positionId }),
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Position>>(
    ({ item }) => <PositionCard position={item} selected={selectedIds.has(item.id)} onToggle={toggle} onOpen={open} />,
    [selectedIds, toggle, open],
  );

  const contentContainerStyle = useMemo(
    () => ({ paddingBottom: insets.bottom + spacing.l }),
    [insets.bottom],
  );

  return (
    <View style={[styles.container, { paddingLeft: insets.left, paddingRight: insets.right }]}>
      <SelectionBar selectedCount={selectedIds.size} totalCount={positions.length} onToggleAll={toggleAll} />

      <FlashList
        data={positions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedIds}
        estimatedItemSize={CARD_ITEM_SIZE}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
