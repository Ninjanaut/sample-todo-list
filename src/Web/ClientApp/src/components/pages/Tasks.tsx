import * as React from 'react'; // Typescript way of importing React
import { TaskList } from '../../domain/TaskList'
import { Task } from '../../domain/Task'
import TaskAdd from '../task/TaskAdd'
import TaskView from '../task/TaskView'
import TaskEdit from '../task/TaskEdit'
import ErrorMessage from '../shared/ErrorMessage'
import axios from 'axios';

interface IState {
    // object which contains validation
    tasklist: TaskList;

    // tracking id of currently changing task
    selectedTaskIdForEdit: string;

    // error properties
    isError: boolean;
    errorMessage: string;

}

export class Tasks extends React.Component<IState> {

    state: IState;

    constructor(props: any) {

        super(props);

        this.state = {
            tasklist: new TaskList(),
            selectedTaskIdForEdit: "",
            isError: false,
            errorMessage: ""
        };

        // register event handlers
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancelUpdate = this.handleCancelUpdate.bind(this);
        this.handleSelectTaskForUpdate = this.handleSelectTaskForUpdate.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    componentDidMount() {
        try {

            // get data from backend
            axios.get(`api/tasks`)
                .then((response) => {
                    if (response.status != 200) {
                        console.error(response.statusText);
                        this.setError("Could not load server data.");
                    } else {
                        // convert json object array to tasklist
                        response.data.forEach((json: Task) => {
                            var task = new Task(json.name, json.priority);
                            task.updateId(json.id);
                            this.state.tasklist.add(task)
                        });

                        // save tasklist to state
                        this.setState({
                            tasklist: this.state.tasklist
                        });
                    }
                }).catch(err => {
                    console.error(err.message);
                    this.setError("Could not load server data.");
                });  
        }
        // handle exception
        catch (e) {
            console.log(e);
            this.setError(e.message);
        }
    }

    setError(message: string) {
        this.setState({
            isError: true,
            errorMessage: message
        });
    }

    clearError() {
        this.setState({
            isError: false,
            errorMessage: ""
        });
    }

    handleCloseError = (): void => {
        this.clearError()
    }

    handleSelectTaskForUpdate = (id: string): void => {
        // let the state know, which task we would like to update
        this.setState({
            selectedTaskIdForEdit: id
        });
    }

    handleAdd = (event: any): void => {

        // parse event
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            priority: { value: number };
        };

        const name = target.name.value;

        let priority = target.priority.value;
        if (priority == "") {
            priority = null;
        }

        // create new task
        try {

            // frontend validation
            let task = new Task(name, priority);
            this.state.tasklist.add(task);

            // send command to backend
            fetch(`/api/tasks?name=${task.name}&priority=${task.priority}`, { method: 'post' })
                .then(response => {
                    if (!response.ok) {
                        response.text().then(function (text) {
                            throw Error(text);
                        }).catch((e) => {
                            this.setError(e.message);
                        });
                    } else {
                        response.json().then(function (json) {
                            task.updateId(json.id)
                        })
                    }
                })

            // activate operation
            this.setState({
                tasklist: this.state.tasklist
            });

        }
        // handle exception
        catch (e) {
            console.log(e);
            this.setError(e.message);
        }
    }

    handleUpdate = (event: any): void => {

        // parse event
        event.preventDefault();

        const target = event.target as typeof event.target & {
            id: { value: string }
            name: { value: string };
            priority: { value: number };
            status: { value: number }
        };

        const id = target.id.value;
        const name = target.name.value;
        const priority = target.priority.value;
        const status = target.status.value;

        // update task
        try {

            // frontend validation
            this.state.tasklist.update(id, name, priority, status);

            // send command to backend
            fetch(`/api/tasks/${id}?name=${name}&priority=${priority}&status=${status}`, { method: 'put' })
                .then(response => {
                    if (!response.ok) {
                        response.text().then(function (text) {
                            throw Error(text);
                        }).catch((e) => {
                            this.setError(e.message);
                        });
                    }
                })

            // activate operation
            this.setState({
                tasklist: this.state.tasklist,
                // close edit form
                selectedTaskIdForEdit: ""
            });
        }
        // handle exception
        catch (e) {
            console.log(e);
            this.setError(e.message);
        }

    }

    handleCancelUpdate = (id: string): void => {
        this.setState({
            // close edit form
            selectedTaskIdForEdit: ""
        });
    }

    handleDelete = (id: string): void => {
        try {

            // frontend validation
            this.state.tasklist.delete(id);

            // send command to backend
            fetch(`/api/tasks/${id}`, { method: 'delete' })
                .then(response => {
                    if (!response.ok) {
                        response.text().then(function (text) {
                            throw Error(text);
                        }).catch((e) => {
                            this.setError(e.message);
                        });
                    }
                })

            // activate operation
            this.setState({
                tasklist: this.state.tasklist,
            });
        }
        // handle exception
        catch (e) {
            console.log(e);
            this.setError(e.message);
        }
    }

    render() {
        return (
            <div>

                {this.state.isError ? <ErrorMessage message={this.state.errorMessage} handleCloseError={this.handleCloseError} /> : null}

                <TaskAdd handleAdd={this.handleAdd} />

                {this.state.tasklist.tasks
                    .sort((a, b) => (a.priority < b.priority) ? 1 : -1)
                    .map(task =>

                        <div key={task.id}>

                            {this.state.selectedTaskIdForEdit == task.id
                                ? <TaskEdit task={task} handleUpdate={this.handleUpdate} handleCancelUpdate={this.handleCancelUpdate} />
                                : <TaskView task={task} handleSelectTaskForUpdate={this.handleSelectTaskForUpdate} handleDelete={this.handleDelete} />
                            }

                        </div>

                    )}
            </div>
        );
    }
}