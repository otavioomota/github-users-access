import { createAppContainer, createStackNavigator } from "react-navigation";

import Main from "./pages/Main";
import User from "./pages/User";
import Webview from "./pages/Webview";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Webview,
    },
    {
      headerLayoutPreset: "center",
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#7159c1",
        },
        headerTintColor: "#FFF",
      },
    }
  )
);

export default Routes;
