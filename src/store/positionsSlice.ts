import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { generatePositions } from '../data/generatePositions';
import type { Position } from '../data/types';

export const POSITIONS_COUNT = 200;

const positionsAdapter = createEntityAdapter<Position>();

const initialState = positionsAdapter.setAll(positionsAdapter.getInitialState(), generatePositions(POSITIONS_COUNT));

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    descriptionUpdated(state, action: PayloadAction<{ id: string; description: string }>) {
      const { id, description } = action.payload;
      positionsAdapter.updateOne(state, { id, changes: { description } });
    },
  },
});

export const { descriptionUpdated } = positionsSlice.actions;
export const positionsReducer = positionsSlice.reducer;

export const positionsSelectors = positionsAdapter.getSelectors<{ positions: typeof initialState }>(
  (state) => state.positions,
);