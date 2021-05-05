import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  createContext,
} from 'react';

export enum ToastTypes {
  info = 'INFO',
  error = 'ERROR',
  success = 'SUCCESS',
}

export type ToastType = keyof typeof ToastTypes;

type ToastConfig = {
  type: ToastType;
  message: string;
  duration: number;
  shouldCloseOnPress?: boolean;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  borderColor?: string;
};

type ToastOptions = Omit<ToastConfig, 'message' | 'duration'> & {
  duration?: ToastConfig['duration'];
};

type ToastContextType = {
  toastConfig: ToastConfig | null;
  showToast: (message: string, options: ToastOptions) => void;
  hideToast: () => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: FC = ({ children }) => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const showToast = useCallback((message: string, options: ToastOptions) => {
    const { iconSize = 20, duration = 2500, ...otherOptions } = options;

    setToastConfig({ message, iconSize, duration, ...otherOptions });
  }, []);

  const hideToast = useCallback(() => {
    setToastConfig(null);
  }, []);

  const toastProviderValue = useMemo(
    () => ({
      showToast,
      hideToast,
      toastConfig,
    }),
    [showToast, hideToast, toastConfig],
  );

  return (
    <ToastContext.Provider value={toastProviderValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
