import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Guilherme",
    user_email: "guilherme@gmail.com",
  });
}

export function tagCardUpdate(itemsCount: string) {
  OneSignal.sendTag("cart_items_count", itemsCount);
}
