import { useCallback } from 'react';

import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { appActions } from './reducer';

export function useAppState(): AppState['app'] {
  return useAppSelector((state) => state.app);
}

export function useSetRequestId(): (payload: string) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (payload: string) => {
      dispatch(appActions.setRequestId(payload));
    },
    [dispatch]
  );
}

export function useSetIsSubmit(): (payload: boolean) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (payload: boolean) => {
      dispatch(appActions.setIsSubmit(payload));
    },
    [dispatch]
  );
}

export function useSetSelectAnswer(): (payload: string) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (payload: string) => {
      dispatch(appActions.setSelectAnswer(payload));
    },
    [dispatch]
  );
}

export function useSetAiOutput(): (payload: string) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (payload: string) => {
      dispatch(appActions.setAiOutput(payload));
    },
    [dispatch]
  );
}
