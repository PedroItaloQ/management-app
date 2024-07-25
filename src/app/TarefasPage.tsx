import { useEffect, useState } from "react";
import { View, Button, Alert, FlatList, ScrollView, Text } from "react-native";
import { Link, router } from "expo-router";

import { Input } from "../components/Input";
import { Label } from "@/components/Label";
import { Document } from "../components/Document";
import { Task } from "../components/Task";
import { Deadline } from "../components/Dealine";

import { useDocumentDatabase, DocumentDatabase } from "../hooks/useDocumentDatabase";
import { useTaskDatabase, TaskDatabase } from "../hooks/useTaskDatabase";
import { useDeadlineDatabase, DeadlineDatabase } from "../hooks/useDeadlineDatabase";

export default function TarefasPage() {
  const [search, setSearch] = useState("");

  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [documents, setDocuments] = useState<DocumentDatabase[]>([]);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [tasks, setTasks] = useState<TaskDatabase[]>([]);

  const [taskId, setTaskId] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlines, setDeadlines] = useState<DeadlineDatabase[]>([]);

  const documentDatabase = useDocumentDatabase();
  const taskDatabase = useTaskDatabase();
  const deadlineDatabase = useDeadlineDatabase();

  // Handlers for Documents
  async function createDocument() {
    try {
      const response = await documentDatabase.create({
        title: documentTitle,
        content: documentContent,
        created_at: new Date().toISOString(),
      });

      Alert.alert("Documento cadastrado com o ID: " + response.insertedRowId);
      await listDocuments();
    } catch (error) {
      console.log(error);
    }
  }

  async function listDocuments() {
    try {
      const response = await documentDatabase.searchByTitle(search);
      setDocuments(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeDocument(id: number) {
    try {
      await documentDatabase.remove(id);
      await listDocuments();
    } catch (error) {
      console.log(error);
    }
  }

  // Handlers for Tasks
  async function createTask() {
    try {
      const response = await taskDatabase.create({
        name: taskName,
        description: taskDescription,
        assignee: taskAssignee,
        status: taskStatus,
        created_at: new Date().toISOString(),
      });

      Alert.alert("Tarefa cadastrada com o ID: " + response.insertedRowId);
      await listTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function listTasks() {
    try {
      const response = await taskDatabase.searchByName(search);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTask(id: number) {
    try {
      await taskDatabase.remove(id);
      await listTasks();
    } catch (error) {
      console.log(error);
    }
  }

  // Handlers for Deadlines
  async function createDeadline() {
    try {
      const response = await deadlineDatabase.create({
        task_id: Number(taskId),
        deadline_date: deadlineDate,
      });

      Alert.alert("Prazo cadastrado com o ID: " + response.insertedRowId);
      await listDeadlines();
    } catch (error) {
      console.log(error);
    }
  }

  async function listDeadlines() {
    try {
      const response = await deadlineDatabase.searchByTaskId(Number(taskId));
      setDeadlines(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeDeadline(id: number) {
    try {
      await deadlineDatabase.remove(id);
      await listDeadlines();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listDocuments();
    listTasks();
    listDeadlines();
  }, [search]);

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>

        {/* Tasks */}
        <Label text="Tarefas" />
        <Input placeholder="Nome da Tarefa" onChangeText={setTaskName} value={taskName} />
        <Input placeholder="Descrição da Tarefa" onChangeText={setTaskDescription} value={taskDescription} />
        <Input placeholder="Responsável" onChangeText={setTaskAssignee} value={taskAssignee} />
        <Input placeholder="Status da Tarefa" onChangeText={setTaskStatus} value={taskStatus} />
        <Button title="Salvar Tarefa" onPress={createTask} />

        {/* Deadlines */}
        <Label text="Prazo da tarefa" />
        <Input placeholder="Id da tarefa" onChangeText={setTaskId} value={taskId} />
        <Input placeholder="Data do Prazo" onChangeText={setDeadlineDate} value={deadlineDate} />
        <Button title="Salvar Prazo" onPress={createDeadline} />

        {/* Search */}
        <Label text="Pesquisar" />
        <Input placeholder="Pesquisar" onChangeText={setSearch} />

        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Task
              data={item}
              onDelete={() => removeTask(item.id)}
              onOpen={() => router.navigate("/tasks/" + item.id)}
            />
          )}
          contentContainerStyle={{ gap: 16 }}
        />

        <FlatList
          data={deadlines}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Deadline
              data={item}
              onDelete={() => removeDeadline(item.id)}
              onOpen={() => router.navigate("/deadlines/" + item.id)}
            />
          )}
          contentContainerStyle={{ gap: 16 }}
        />

        <Link href="/" style={{ fontSize: 25, backgroundColor: 'rgb(69, 142, 252)', padding: 10, marginRight:100 }}>Ir para Documentos</Link>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 16 }} />

      </View>
    </ScrollView>
  );
}
