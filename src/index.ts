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
  wallet_id: string;
  username: string;
}

// Function to connect and get the Vault
export function connectBitmask(
  title: string,
  description: string,
  pubkeyHash: string,
  id: string,
  isDefault: boolean,
): AuthInfo | AuthInfoError {
  const call = "get_vault";
  const dateId = Date.now();

  window.addEventListener(
    "message",
    // eslint-disable-next-line no-shadow
    async (event) => {
      if (event.source !== window) {
        return;
      }
      if (event.data.refresh) {
        return { error: AuthInfoError.NeedReload };
      } else if (
        event.data.returnid &&
        String(event.data.returnid) === String(dateId)
      ) {
        const response = event.data;
        if (!response) {
          return AuthInfoError.ExtensionNotDetected;
        }
        switch (response?.wallet_id) {
          case "0":
            return AuthInfoError.OperationCanceled;
          case "-1":
            return AuthInfoError.GenericError;
          case "-3":
            return AuthInfoError.GenericError;
          default:
            return {
              wallet_id: response?.wallet_id,
              username: response?.username,
            };
        }
      } else if (event.data.pubkeyHash === "0" && !event.data.call) {
        return { error: AuthInfoError.BitmaskConnectionError };
      }
    },
    false,
  );
  if (pubkeyHash === "0") {
    return AuthInfoError.ExtensionNotDetected;
  } else {
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
  }
  return AuthInfoError.GenericError; // Placeholder return value
}
