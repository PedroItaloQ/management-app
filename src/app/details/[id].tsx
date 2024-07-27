import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useDocumentDatabase } from "../../hooks/useDocumentDatabase";  // Altere para usar o hook correto
import { useTaskDatabase } from "../../hooks/useTaskDatabase";
import { useDeadlineDatabase } from "../../hooks/useDeadlineDatabase";  // Descomente e use conforme necessário

export default function Details() {
  const [data, setData] = useState({
    title: "",
    content: "",
    // Adicione mais campos conforme necessário para tarefas ou prazos
  });

  const documentDatabase = useDocumentDatabase();  // Altere para usar o hook correto
  const taskDatabase = useTaskDatabase();  // Descomente e use conforme necessário
  const deadlineDatabase = useDeadlineDatabase();  // Descomente e use conforme necessário
  const params = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      documentDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            title: response.title,
            content: response.content,
            // Atualize conforme necessário para tarefas ou prazos
          });
        }
      });
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>ID: {params.id}</Text>
      <Text style={{ fontSize: 32 }}>Título: {data.title}</Text>
      <Text style={{ fontSize: 32 }}>Conteúdo: {data.content}</Text>
      {/* Adicione mais campos conforme necessário */}
    </View>
  );
}
