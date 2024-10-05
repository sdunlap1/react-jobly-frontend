import { useState } from 'react';

/** 
 * Custom hook to keep state synced with localStorage.
 * @param key — key to store data under
 * @param firstValue — default value to use
 */
function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  const setValue = (val) => {
    try {
      localStorage.setItem(key, val);
      setItem(val);
    } catch (err) {
      console.error(err);
    }
  };

  return [item, setValue];
}

export default useLocalStorage;
