import React from "react";
import { View, Text, Button } from "react-native";
import { DeadlineDatabase } from "../hooks/useDeadlineDatabase";

type DeadlineProps = {
  data: DeadlineDatabase;
  onDelete: () => void;
  onOpen: () => void;
};

export function Deadline({ data, onDelete, onOpen }: DeadlineProps) {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Prazo para a Tarefa ID: {data.task_id}</Text>
      <Text>Data do Prazo: {data.deadline_date}</Text>
      <Button title="Abrir" onPress={onOpen} />
      <Button title="Excluir" onPress={onDelete} />
    </View>
  );
}
