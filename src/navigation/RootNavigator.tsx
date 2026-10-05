import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PositionDetailsScreen } from '../screens/PositionDetailsScreen';
import { PositionsListScreen } from '../screens/PositionsListScreen';
import { colors } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
        headerStyle: { backgroundColor: colors.surface },
        contentStyle: { backgroundColor: colors.background },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="PositionsList" component={PositionsListScreen} options={{ title: 'Позиции' }} />
      <Stack.Screen name="PositionDetails" component={PositionDetailsScreen} options={{ title: 'Карточка позиции' }} />
    </Stack.Navigator>
  );
}
