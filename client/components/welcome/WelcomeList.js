import React from 'react';
import { Text, View } from 'react-native';
import Welcome from "./Welcome";

export default function WelcomeList() {
  const names = [ "Mario", "Akash", "Cassidy" ];

  return (
    <>
      {names.map((name) => (
         <Welcome key={name} name={name} />
      ))}
    </>
  );
}