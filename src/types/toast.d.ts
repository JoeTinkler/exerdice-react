type Toast = {
  text: string;
  type: ToastType;
  uid: string;
  duration?: number;
  buttons?: ToastButton[];
}

type ToastButton = {
  label: string;
  handler: () => void;
}

type ToastType = 'success' | 'error' | 'info';