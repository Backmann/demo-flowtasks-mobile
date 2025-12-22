import { useCallback, useEffect, useState } from 'react';

function getParam(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

function setParam(key, value) {
  const url = new URL(window.location.href);
  if (!value) url.searchParams.delete(key);
  else url.searchParams.set(key, value);
  window.history.replaceState({}, '', url.toString());
}

export function useQueryParam(key, defaultValue = '') {
  const [value, setValue] = useState(() => getParam(key) ?? defaultValue);

  useEffect(() => {
    const onPopState = () => setValue(getParam(key) ?? defaultValue);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [key, defaultValue]);

  const update = useCallback(
    (next) => {
      setValue(next);
      setParam(key, next);
    },
    [key]
  );

  return [value, update];
}
