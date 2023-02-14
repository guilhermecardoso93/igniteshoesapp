import { useState, useEffect } from "react";
import { useTheme } from "native-base";
import OneSignal, {
  OSNotification,
  NotificationReceivedEvent,
} from "react-native-onesignal";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { Notification } from "../components/Notification";


const linking = {
  prefixes: [' igniteshoesapp://', 'com.rocketseat.igniteshoes://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId,
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();

        setNotification(response);
      }
    );

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}
