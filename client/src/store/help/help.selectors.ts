import { useAppSelector } from '../hooks/useAppSelector';

const useHelpLoading = () => useAppSelector(({ help: { loading } }) => loading);

const useGetMessages = () =>
  useAppSelector(
    ({
      help: {
        messages,
      },
    }) => messages,
  );

const useGetHistoryId = () =>
  useAppSelector(
    ({
      help: {
        historyId,
      },
    }) => historyId,
  );

export {
  useHelpLoading,
  useGetMessages,
  useGetHistoryId,
};
