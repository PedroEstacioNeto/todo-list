import { ADD_TASK, COMPLETE_TASK, UPDATE_TASK, DELETE_TASK } from "./ActionsType";

const initialState = {
    task: JSON.parse(localStorage.getItem("tasks")) || []
};

const saveToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const taskReducer = (state=initialState, action) => {
    let updatedTasks;
    switch (action.type) {
        case ADD_TASK:
            updatedTasks = [...state.task, action.payload];
            saveToLocalStorage(updatedTasks);
            return {...state, tasks: updatedTasks};

        case DELETE_TASK:
            updatedTasks = state.tasks.filter((task)=> task.id !== action.payload);
            saveToLocalStorage(updatedTasks);
            return {...state, tasks: updatedTasks};

        case COMPLETE_TASK:
            updatedTasks = state.tasks.map((task)=> 
                task.id === action.payload ? {...task, completed: true} : task
                );
                saveToLocalStorage(updatedTasks);
                return {...state, tasks: updatedTasks};
                
        case UPDATE_TASK:
            updatedTasks = state.task.map((task) => 
            task.id === action.payload ? {...task, text: action.payload.newText} : task
        );
        saveToLocalStorage(updatedTasks);
        return {...state, tasks: updatedTasks};
        
        default:
            return state;
    }
}

export default taskReducer;