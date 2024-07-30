import React from "react";
import { View, Text, Button } from "react-native";
import { TaskDatabase } from "../hooks/useTaskDatabase";

type TaskProps = {
  data: TaskDatabase;
  onDelete: () => void;
  onOpen: () => void;
};

export function Task({ data, onDelete, onOpen }: TaskProps) {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.name}</Text>
      <Text>{data.description}</Text>
      <Text>Responsável: {data.assignee}</Text>
      <Text>Status: {data.status}</Text>
      <Text>Criado em: {data.created_at}</Text>
      <Button title="Abrir" onPress={onOpen} />
      <Button title="Excluir" onPress={onDelete} />
    </View>
  );
}
