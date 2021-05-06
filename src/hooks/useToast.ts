import { useContext } from 'react';
import { ToastContext } from 'src/components/Toast/Context';

export const useToast = () => useContext(ToastContext)!;
