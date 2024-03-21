import { useAppSelector } from '../hooks/useAppSelector';

const useGetToastText = () => useAppSelector(({ toast: { data } }) => data);

export {
  useGetToastText,
};
