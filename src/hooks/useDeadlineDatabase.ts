import { useSQLiteContext } from "expo-sqlite";

export type DeadlineDatabase = {
    id: number;
    task_id: number;
    deadline_date: string;
}

export function useDeadlineDatabase() {
    const database = useSQLiteContext();

    async function create(data: Omit<DeadlineDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO deadlines (task_id, deadline_date) VALUES ($task_id, $deadline_date)"
        );

        try {
            const result = await statement.executeAsync({
                $task_id: data.task_id,
                $deadline_date: data.deadline_date,
            });

            const insertedRowId = result.lastInsertRowId.toLocaleString();
            return { insertedRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function searchByTaskId(task_id: number) {
        try {
            const query = "SELECT * FROM deadlines WHERE task_id = ?";
            const response = await database.getAllAsync<DeadlineDatabase>(
                query,
                task_id
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async function update(data: DeadlineDatabase) {
        const statement = await database.prepareAsync(
            "UPDATE deadlines SET task_id = $task_id, deadline_date = $deadline_date WHERE id = $id"
        );

        try {
            await statement.executeAsync({
                $id: data.id,
                $task_id: data.task_id,
                $deadline_date: data.deadline_date,
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function remove(id: number) {
        try {
            await database.execAsync("DELETE FROM deadlines WHERE id = " + id);
        } catch (error) {
            throw error;
        }
    }

    async function show(id: number) {
        try {
            const query = "SELECT * FROM deadlines WHERE id = ?";
            const response = await database.getFirstAsync<DeadlineDatabase>(query, [id]);

            return response;
        } catch (error) {
            throw error;
        }
    }

    return { create, searchByTaskId, update, remove, show };
}
