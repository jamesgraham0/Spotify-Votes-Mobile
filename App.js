import { Provider } from 'react-redux';
import store from './client/src/redux/store';
import AppNavigation from './AppNavigation.js';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  );
}