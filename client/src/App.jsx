import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './components';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css';
//notification
import ReactNotifications from 'react-notifications-component';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200
    });
    return () => {};
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactNotifications />
        <div>
          <Router>
            <Route exact path="/" component={Index} />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
