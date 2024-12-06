import store from '@/redux/config';

export interface TodoType {
	id: string;
	title: string;
	completed: boolean;
}

export interface AppSliceInitialStateType {
	todos: TodoType[];
	editTodo: TodoType | null;
}

export interface filterObjectType {
	title: string;
	count: number;
	key: string;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
