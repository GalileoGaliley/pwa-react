import { useAppSelector } from '../hooks/useAppSelector';

const useUserLoading = () => useAppSelector(({ user: { loading } }) => loading);

const useGetUser = () => useAppSelector(({ user: { user } }) => user);

const useGetToken = () =>
  useAppSelector(
    ({
      user: {
        user: { token },
      },
    }) => token,
  );

export {
  useGetToken,
  useUserLoading,
  useGetUser,
};
