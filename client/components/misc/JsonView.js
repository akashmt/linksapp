import React from "react";
import { Text } from "react-native";

const JsonView = ({ 
  name = null, 
  email = null, 
  password = null
}) => {
  return (
    <Text>
      { JSON.stringify({ 
        name, 
        email, 
        password 
      }, null, 4) }
    </Text>
  );
}

export default JsonView;