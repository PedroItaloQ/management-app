import { useSQLiteContext } from "expo-sqlite";

export type TaskDatabase = {
  id: number;
  name: string;
  description?: string;
  assignee?: string;
  status: string;
  created_at: string;
}

export function useTaskDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<TaskDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (name, description, assignee, status, created_at) VALUES (?, ?, ?, ?, ?)"
    );

    try {
      const result = await statement.executeAsync(
        data.name,
        data.description ?? '',
        data.assignee ?? '',
        data.status,
        data.created_at
      );

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM tasks WHERE name LIKE ?";
      const response = await database.getAllAsync<TaskDatabase>(
        query,
        `%${name}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: TaskDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE tasks SET name = ?, description = ?, assignee = ?, status = ? WHERE id = ?"
    );

    try {
      await statement.executeAsync(
        data.name,
        data.description ?? '',
        data.assignee ?? '',
        data.status,
        data.id
      );
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM tasks WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM tasks WHERE id = ?";
      const response = await database.getFirstAsync<TaskDatabase>(query, [
        id,
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByName, update, remove, show };
}
