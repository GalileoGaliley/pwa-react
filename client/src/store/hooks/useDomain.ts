import { useState, useEffect } from 'react';

const domains = [
  'red-experience',
  'yellow-experience',
  'blue-experience',
];

export const useDomain = () => {
  const [domain, setDamain] = useState<string>('');

  useEffect(() => {
    const currentDomain = domains.find((item: string) => {
      if (window.location.href.includes(item)) {
        return item;
      }
    })
    setDamain(currentDomain ? currentDomain : 'default');
  }, []);

  return domain;
}
