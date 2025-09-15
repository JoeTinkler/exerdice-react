import { useContext } from "react";
import { ToastContext } from "./provider";
import { ToastItem, ToastsContainer } from "@components/ui/toast/toast";

export const Toasts: React.FC = () => {
  const { toasts, dismissToast } = useContext(ToastContext);
  return (
    <>
      {toasts.length > 0 &&
        <ToastsContainer>
          {toasts.map(toast => (
            <ToastItem key={toast.uid} onDismiss={() => dismissToast(toast.uid)} toast={toast} />
          ))}
        </ToastsContainer>
      }
    </>
  )
};