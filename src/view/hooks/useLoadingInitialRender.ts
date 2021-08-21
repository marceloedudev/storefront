import { useEffect, useState } from 'react';

function fakeRequest() {
  return new Promise((resolve) => setTimeout(() => resolve(true), 2500));
}

const useLoadingInitialRender = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fakeRequest().then(() => {
      const spinner = document.querySelector('.spinner-container');
      if (spinner) {
        spinner.remove();
        setLoading(false);
      }
    });
  }, []);

  return {
    isLoading,
  };
};

export default useLoadingInitialRender;
