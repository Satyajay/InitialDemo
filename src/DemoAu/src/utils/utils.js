import { NetInfo, Platform } from "react-native";

//To check network connection

export function checkNetworkConnection() {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "ios") {
      function handleFirstConnectivityChange(isConnected) {
        NetInfo.isConnected.removeEventListener(
          "connectionChange",
          handleFirstConnectivityChange
        );
        resolve(isConnected);
      }
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        resolve(isConnected);
      });
    }
  });
}

//To capitalize first letter

export function capitalizeFirstLetter(string) {
  if (string.trim().length > 0)
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
