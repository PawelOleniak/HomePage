import { toast } from 'react-toastify';

export default function notificationsMiddleware() {
  return (next) => (action) => {
    if (action.messege && /(.*)_(SUCCESS)/.test(action.type)) {
      toast.success(action.messege);
    }
    next(action);
  };
}
