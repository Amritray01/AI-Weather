import React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 10000; // 10 seconds for usability

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const initialState = {
  toasts: [],
};

const ToastContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };
    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t,
        ),
      };
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const toastTimeouts = React.useRef(new Map());

  React.useEffect(() => {
    state.toasts.forEach((toast) => {
      if (!toast.open && !toastTimeouts.current.has(toast.id)) {
        const timeout = setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", toastId: toast.id });
          toastTimeouts.current.delete(toast.id);
        }, TOAST_REMOVE_DELAY);
        toastTimeouts.current.set(toast.id, timeout);
      }
    });

    return () => {
      toastTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.current.clear();
    };
  }, [state.toasts]);

  const createToast = (props) => {
    const id = genId();
    dispatch({
      type: "ADD_TOAST",
      toast: { ...props, id, open: true },
    });
    return id;
  };

  const updateToast = (id, props) => {
    dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });
  };

  const dismissToast = (id) => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
  };

  const contextValue = {
    toasts: state.toasts,
    toast: createToast,
    updateToast,
    dismissToast,
    clearAll: () => dispatch({ type: "REMOVE_TOAST" }),
  };

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}