import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";


export default function Users() {
   const [users, setUsers] = useState(null);

   useEffect(() => {
     const fetcUsers = async () => {
       const res = await fetch("https://jsonplaceholder.typicode.com/users");
       const json = await res.json();
       setUsers(json);
     };

     fetcUsers();
   }, []);
  return (
    <View>
      <Text>UserList</Text>
      <View>
        {users &&users.map(user => (
          <Text key={user.id}>{user.name}</Text>
        ))}
      </View>
    </View>
  );
}