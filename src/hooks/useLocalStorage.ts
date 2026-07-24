import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    return storage.load<T>(key, defaultValue);
  });

  useEffect(() => {
    storage.save(key, state);
  }, [key, state]);

  return [state, setState];
}
