import { UuidGenerator } from "../utilities/UuidGenerator"
import { TaskStatus } from "./TaskStatus"

export class Task {

    private _id: string;

    private _name: string;

    private _priority: number;

    private _status: TaskStatus;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get priority(): number {
        return this._priority;
    }

    get status(): TaskStatus {
        return this._status;
    }

    get statusName(): string {
        return TaskStatus[this._status];
    }

    // When we insert task to the backend a new UUID is generated.
    // I think it is better then to pass the UUID to backend directly.
    public updateId(id: string) {
        this._id = id;
    }

    constructor(name: string, priority: number) {
        this.validateThatNameIsNotNull(name);

        this._id = new UuidGenerator().uuid;
        this._name = name;
        this._priority = priority;
        this._status = TaskStatus.NotStarted;
    }

    public update(name: string, priority: number, status: TaskStatus) {
        this.validateThatNameIsNotNull(name);

        this._name = name;
        this._priority = priority;
        this._status = status;
    }

    private validateThatNameIsNotNull(name: string) {
        if (name == null || name == "") {
            throw new Error('Every task must have a name.');
        }
    }
}
