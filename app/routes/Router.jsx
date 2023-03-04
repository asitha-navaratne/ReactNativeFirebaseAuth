import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/appScreens/SplashScreen";
import HomeScreen from "../screens/appScreens/HomeScreen";
import WelcomeScreen from "../screens/appScreens/WelcomeScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
import SignUpScreen from "../screens/authScreens/SignUpScreen";

import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const Router = () => {
  const [isAppStarting, setIsAppStarting] = useState(true);

  const { isSignedIn, setAuthListener } = useAuth();

  const SPLASH_SCREEN_DISPLAY_MS = 4000;

  useEffect(() => {
    setTimeout(() => setIsAppStarting(false), SPLASH_SCREEN_DISPLAY_MS);

    const unsubscribe = setAuthListener();

    return unsubscribe;
  }, []);

  if (isAppStarting) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={SignInScreen} />
            <Stack.Screen name="Register" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
