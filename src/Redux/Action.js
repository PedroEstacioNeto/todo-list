import { ADD_TASK, COMPLETE_TASK, UPDATE_TASK, DELETE_TASK } from "./ActionsType";

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const completeTask = (task) => ({
    type: COMPLETE_TASK,
    payload: task,
});

export const deleteTask = (task) => ({
    type: DELETE_TASK,
    payload: task,
});

export const updateTask = (id, newTask) => ({
    type: UPDATE_TASK,
    payload: {id, newTask},
});