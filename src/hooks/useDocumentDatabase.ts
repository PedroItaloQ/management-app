import { useSQLiteContext } from "expo-sqlite";

export type DocumentDatabase = {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export function useDocumentDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<DocumentDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO documents (title, content, created_at) VALUES (?, ?, ?)"
    );

    try {
      const result = await statement.executeAsync(
        data.title,
        data.content,
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

  async function searchByTitle(title: string) {
    try {
      const query = "SELECT * FROM documents WHERE title LIKE ?";
      const response = await database.getAllAsync<DocumentDatabase>(
        query,
        `%${title}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: DocumentDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE documents SET title = ?, content = ? WHERE id = ?"
    );

    try {
      await statement.executeAsync(
        data.title,
        data.content,
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
      await database.execAsync("DELETE FROM documents WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM documents WHERE id = ?";
      const response = await database.getFirstAsync<DocumentDatabase>(query, [
        id,
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByTitle, update, remove, show };
}
