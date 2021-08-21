import AppProvider from '@view/hooks';
import React from 'react';
import useLoadingInitialRender from '@view/hooks/useLoadingInitialRender';

function App() {
  const { isLoading } = useLoadingInitialRender();

  if (isLoading) {
    return null;
  }

  return <AppProvider />;
}

export default App;
