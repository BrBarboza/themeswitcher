import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Responce<T> = [
  T,
  Dispatch<SetStateAction<T>>
];

function usePersistedState<T>(key: string, initialState: any): Responce<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect (() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState]
}

export default usePersistedState