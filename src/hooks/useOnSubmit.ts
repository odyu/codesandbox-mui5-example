import { useCallback, useState } from "react";

import { useSnackbar } from "../providers/SnackbarProvider";
import { sleep } from "../utils/sleep";

export const useOnSubmit = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { showSnack } = useSnackbar();

  const onSubmit = useCallback(async () => {
    setIsProcessing(true);
    await sleep(1000);
    showSnack({
      message: "保存しました",
    });
    setIsProcessing(false);
  }, [showSnack]);

  return {
    isProcessing,
    onSubmit,
  };
};
