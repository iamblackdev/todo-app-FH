import { AppSliceInitialStateType, TodoType } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppSliceInitialStateType = {
	todos: [],
	editTodo: null,
};

export const todoSlice = createSlice({
	name: 'todoSlice',
	initialState,
	reducers: {
		SET_EDIT_TODO: (state: AppSliceInitialStateType, action: PayloadAction<TodoType | null>) => {
			state.editTodo = action.payload;
		},
		UPDATE_TODOS: (state: AppSliceInitialStateType, action: PayloadAction<{ id: string; completed?: boolean; title?: string }>) => {
			const todoID = action.payload.id;
			const index = state.todos.findIndex((val) => val.id === todoID);
			if (index >= 0) {
				state.todos[index] = {
					...state.todos[index],
					...action.payload,
				};
			}
		},
		ADD_TODO: (state: AppSliceInitialStateType, action: PayloadAction<TodoType>) => {
			const newTodo = action.payload;
			state.todos.unshift(newTodo);
		},
		DELETE_TODO: (state: AppSliceInitialStateType, action: PayloadAction<string>) => {
			const id = action.payload;
			state.todos = state.todos.filter((val) => val.id !== id);
		},
	},
});

export const { DELETE_TODO, UPDATE_TODOS, ADD_TODO, SET_EDIT_TODO } = todoSlice.actions;
export default todoSlice.reducer;
