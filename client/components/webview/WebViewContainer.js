import React from 'react';
import { WebView } from 'react-native-webview';

export default function WebViewContainer() {
  return (
    <WebView style={styles.webview} source={{ uri: 'https://www.goicerays.com' }} />
  );
}