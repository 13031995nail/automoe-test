# Автомоё — тестовое задание React Native

Приложение из двух экранов: список позиций с выбором и экран, где можно открыть позицию и отредактировать её описание.

## Стек

- Expo SDK 53, React Native, новая архитектура
- React Navigation
- Redux/Mobx

## Запуск

`npm install`
`npx expo start`       
# нативная сборка:
`npx expo run:ios`
`npx expo run:android`


## Структура

App.tsx                          провайдеры: Redux, SafeArea, NavigationContainer
src/
  data/                          тип Position и генератор 200 позиций
  store/                         стор, слайс positions, типизированные хуки
  navigation/                    RootStackParamList + стек-навигатор
  screens/
    PositionsListScreen.tsx      экран 1: список + плашка «Выбрано X из N»
    PositionDetailsScreen.tsx    экран 2: название + редактирование описания
  components/                    PositionCard, RadioButton, SelectionBar
  theme.ts                       цвета и отступы


## Проверка

- `npx expo-doctor`: 18/18 проверок пройдено
- версии зависимостей соответствуют SDK 53 (`npx expo install --check`).
- Запущено и проверено на web, Small Phone / Android 17, Redmi Note 11S / Android 12
