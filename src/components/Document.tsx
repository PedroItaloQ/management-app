import React from "react";
import { View, Text, Button } from "react-native";
import { DocumentDatabase } from "../hooks/useDocumentDatabase";

type DocumentProps = {
  data: DocumentDatabase;
  onDelete: () => void;
  onOpen: () => void;
};

export function Document({ data, onDelete, onOpen }: DocumentProps) {
  return (
    <View>
      <Text>{data.title}</Text>
      <Text>{data.content}</Text>
      <Button title="Abrir" onPress={onOpen} />
      <Button title="Excluir" onPress={onDelete} />
    </View>
  );
}
