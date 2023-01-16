import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../utils/models/expense";
import { setLocalStorage } from "../utils/config_localStorage";

export interface initExpense {
  value: Expense[];
}

const initialState: initExpense = {
  value: [],
};

export const counterSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setInitial: (state, action: PayloadAction<Expense[]>) => {
      state.value = action.payload;
    },
    addData: (state, action: PayloadAction<Expense>) => {
      let { value } = state;

      value.push(action.payload);
      setLocalStorage(value);
    },
    editData: (state, action: PayloadAction<Expense>) => {
      state.value.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj
      );
    },
    removeData: (state, action: PayloadAction<string>) => {
      const index = state.value.findIndex(
        (element) => element.id === action.payload
      );
      state.value.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitial, addData, editData, removeData } =
  counterSlice.actions;

export default counterSlice.reducer;
