import { Task } from "./Task"
import { TaskStatus } from "./TaskStatus"

export class TaskList {

    private _tasks: Task[];

    get tasks(): Task[] {
        return this._tasks;
    }

    constructor() {
        this._tasks = [];
    }

    public add(task: Task) {

        // if user did not provided priority value, set the priority to the new max
        if (task.priority == null) {
            if (this._tasks.length == 0) {
                task.update(task.name, 1, task.status);
            } else {
                const currentMaxPriority = Math.max(...this._tasks.map(o => o.priority), 0);
                task.update(task.name, currentMaxPriority + 1, task.status);
            }
        }

        let existingTask = this._tasks.find(x => x.name == task.name);

        if (existingTask != null) {
            throw new Error("A task with provided name already exists.");
        }

        this._tasks.push(task);
    }

    public update(id: string, name: string, priority: number, status: TaskStatus) {

        let task = this._tasks.find(x => x.id == id);

        if (task == null) {
            throw new Error(`Task with id ${id} not found`);
        }

        task.update(name, priority, status);
    }

    public delete(id: string) {
        this._tasks.forEach((task, index) => {
            if (task.id == id) {
                if (task.status != TaskStatus.Completed) {
                    throw new Error(`You can delete only completed tasks.`);
                }
                this._tasks.splice(index, 1);
            }
        });
    }

}
