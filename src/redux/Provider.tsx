'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';

// export function ReduxProvider({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }

type Props = {
  children: React.ReactNode;
};

export const persistor = persistStore(store);

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
