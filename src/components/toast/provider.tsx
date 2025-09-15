import { unixTimestamp } from "@helpers/date";
import { PropsWithChildren, createContext, useReducer } from "react";

type ToastContextData = {
  toasts: Toast[];
  addToast: (text: string, type: ToastType, duration?: number, buttons?: ToastButton[]) => void;
  dismissToast: (id: string) => void;
}

export enum ToastDuration {
  Default = 5
}

export const ToastContext = createContext<ToastContextData>({ toasts: [], addToast: () => {}, dismissToast: () => {} });

type ToastAction = { type: 'ADD', payload: Toast } | { type: 'DISMISS', payload: string };

const toastReducer = (state: Toast[], action: ToastAction) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DISMISS':
      return state.filter(toast => toast.uid !== action.payload);
    default:
      return state;
  }
}

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, []);
  const dismissToast = (uid: string) => {
    dispatch({ type: "DISMISS", payload: uid });
  };
  const addToast = (text: string, type: ToastType, duration?: number, buttons?: ToastButton[]) => {
    const uid = unixTimestamp().toString();
    dispatch({ type: 'ADD', payload: { uid, text, type, duration, buttons } });
    if (duration) {
      setTimeout(() => { dismissToast(uid); }, duration * 1000);
    }
  };
  return (
    <ToastContext.Provider value={{ toasts: state, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}