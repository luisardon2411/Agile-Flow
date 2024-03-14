import { useContext, createContext, useReducer, useCallback, useEffect } from "react";
import { Action, State, initialState, tasksReducer } from "./interfaces/task.actions";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from '../Auth/AuthContext';
import { TaskList } from "./interfaces/Task.interface";


const TaskContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null
});

export const useTask = () => {
    return useContext(TaskContext);
}

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    const { user, isAuhenticated } = useAuth();

    const getTaskList = useCallback( async () => {
        if (isAuhenticated && user) {
            const queryRef = query(collection(db, 'taskList'), 
                or(
                    where('isGlobal', '==', true),
                    where('assignedTo', 'array-contains', user.uid)
                )
            );
            const querySnapshot = await getDocs(queryRef);
            const taskList: TaskList[] = [];
            querySnapshot.forEach((doc) => {
                taskList.push(doc.data() as TaskList);
            });
            dispatch({ type: 'SET_TASK_LISTS', payload: taskList })
        }
    },[isAuhenticated, user]);


    useEffect( () => {
        getTaskList();
    },[user, getTaskList])



    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}


