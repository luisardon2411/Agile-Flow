import { Task, TaskList, TaskNotification } from "./Task.interface";

type Action = 
| { type: 'SET_TASK', payload: Task[] }
| { type: 'ADD_TASK', payload: Task }
| { type: 'REMOVE_TASK', payload: string }
| { type: 'UPDATE_TASK', payload: Task }
| { type: 'SET_TASK_LISTS', payload: TaskList[] }
| { type: 'ADD_TASK_LIST', payload: TaskList }
| { type: 'SET_TASK_NOTIFICATION', payload: TaskNotification[] }
| { type: 'ADD_TASK_NOTIFICATION', payload: TaskNotification }


const initialState = {
    tasks: [],
    taskLists: [],
    taskNotifications: []
}

interface State {
    tasks: Task[];
    taskLists: TaskList[];
    taskNotifications: TaskNotification[];
}

const tasksReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_TASK':
        return { ...state, tasks: action.payload };
      case 'ADD_TASK':
        return { ...state, tasks: [...state.tasks, action.payload] };
      case 'SET_TASK_LISTS':
        return { ...state, taskLists: action.payload };
      case 'ADD_TASK_LIST':
        return { ...state, taskLists: [...state.taskLists, action.payload] };
      case 'SET_TASK_NOTIFICATION':
        return { ...state, taskNotifications: action.payload };
      case 'ADD_TASK_NOTIFICATION':
        return {
          ...state,
          taskNotifications: [...state.taskNotifications, action.payload],
        };
      default:
        return state;
    }
  };


export { initialState, tasksReducer }
export type { Action, State }