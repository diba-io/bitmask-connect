import { Vault } from "bitmask-core/bitcoin";

export enum AuthInfoError {
  ExtensionNotDetected,
  NeedReload,
  BitmaskConnectionError,
  WalletAlreadyLinked,
  OperationCanceled,
  GenericError,
}

export interface AuthInfo {
  walletId: string;
  username: string;
}

export function connectBitmask(
  title: string,
  description: string,
  pubkeyHash: string,
  id: string,
  isDefault: boolean,
): Promise<AuthInfo | AuthInfoError | undefined> {
  return new Promise((resolve, reject) => {
    const call = "get_vault";
    const dateId = Date.now();

    // Define the listener function
    const listener = (event: MessageEvent) => {
      // Check if the message ID matches
      if (event.data && event.data.returnid === String(dateId)) {
        window.removeEventListener("message", listener);
        const response = event.data;
        if (!response) {
          resolve(AuthInfoError.ExtensionNotDetected);
        }
        switch (response?.wallet_id) {
          case "0":
            resolve(AuthInfoError.OperationCanceled);
          case "-1":
            resolve(AuthInfoError.GenericError);
          case "-3":
            resolve(AuthInfoError.GenericError);
          default:
            resolve({
              walletId: response?.wallet_id,
              username: response?.username,
            });
        }
      }
    };

    // Add the event listener
    window.addEventListener("message", listener);

    // Send the message to the content script
    window.postMessage(
      {
        call,
        pubkeyHash: "0",
        dateId,
        title,
        description,
        ...(!isDefault && {
          uid: id,
        }),
      },
      "*",
    );

    // Set a timeout to reject the promise if no response is received
    setTimeout(() => {
      window.removeEventListener("message", listener);
      reject(new Error("No response received within the timeout period"));
    }, 10000); // 10 seconds timeout
  });
}
