import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const middleWare = [thunk];

const persistConfig = {
  key: 'authType',
  storage: storage,
 // whitelist: ['auth'] // which reducer want to store
};
const PersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  PersistReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export const persistor = persistStore(store); 
