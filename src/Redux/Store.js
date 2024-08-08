import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools';
import taskReducer from './Reducer';

const rootReducer = combineReducers ({
    task: taskReducer,
});

const sagaMiddleware = typeof createSagaMiddleware === 'function' ? createSagaMiddleware() : createSagaMiddleware.default()
const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

export default store;