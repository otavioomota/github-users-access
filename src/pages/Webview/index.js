import React from "react";
import { WebView } from "react-native-webview";

const Webview = ({ repository }) => {
  return <WebView source={repository.html_url} style={{ flex: 1 }} />;
};

export default Webview;
