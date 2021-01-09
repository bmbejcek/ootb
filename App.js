import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Container from './Container'
import store from './redux/store'

function App() {
return (
<Provider store={store}>
<Container />
</Provider>
);
}

export default App;
