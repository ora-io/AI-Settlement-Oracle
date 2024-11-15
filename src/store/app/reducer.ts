import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AppStateType = {
  isSubmit: boolean;
  requestId: string;
  selectAnswer: string;
  aiOutput: string;
};

const initialState: AppStateType = {
  isSubmit: false,
  requestId: '',
  selectAnswer: '',
  aiOutput: ''
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRequestId: (state, action: PayloadAction<string>) => {
      state.requestId = action.payload;
    },
    setIsSubmit: (state, action: PayloadAction<boolean>) => {
      state.isSubmit = action.payload;
    },
    setSelectAnswer: (state, action: PayloadAction<string>) => {
      state.selectAnswer = action.payload;
    },
    setAiOutput: (state, action: PayloadAction<string>) => {
      state.aiOutput = action.payload;
    }
  }
});

export const appActions = slice.actions;
export default slice.reducer;
