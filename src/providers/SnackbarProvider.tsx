import { Alert, Snackbar, SnackbarProps } from "@mui/material";
import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { useQueue } from "react-use";

import { noop } from "../utils/noop";

export type ShowSnack = (props: SnackbarProps) => void;

type SnackbarContextValue = {
  showSnack: ShowSnack;
};

const SnackbarContext = createContext<SnackbarContextValue>({ showSnack: noop });

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const { add, remove, first } = useQueue<SnackbarProps>();

  const showSnack = useCallback<ShowSnack>(
    (snackbarProps) => {
      add({
        open: true,
        ...snackbarProps,
      });
    },
    [add]
  );

  const onClose = useCallback(() => {
    remove();
  }, [remove]);

  const value = useMemo(() => ({ showSnack }), [showSnack]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}

      {first && (
        <Snackbar {...first} onClose={onClose}>
          <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
            {first.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
