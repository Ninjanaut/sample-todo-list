import * as React from 'react';
import { Task } from '../../domain/Task'
import { TaskStatus } from '../../domain/TaskStatus'

const TaskEdit = (props: { task: Task, handleUpdate: any, handleCancelUpdate: any }) => {

    return (
        <div className="alert alert-warning">

            <form className="form-inline" onSubmit={props.handleUpdate}>

                <input type="hidden" name="id" value={props.task.id}></input>

                <input type="text" className="form-control margin-left-sm" name="name" defaultValue={props.task.name}></input>

                <input type="text" className="form-control margin-left-sm" name="priority" defaultValue={props.task.priority}></input>

                <select className="form-control margin-left-sm" name="status" defaultValue={props.task.status}>
                    {Object.keys(TaskStatus).filter(x => !isNaN(Number(x))).map(key => (
                        <option key={key} value={key}>
                            {TaskStatus[key as any]}
                        </option>
                    ))}
                </select>

                <button className="btn btn-secondary margin-left-sm" type="submit">
                    <i className="bi bi-check2"></i>
                </button>

                <button className="btn btn-secondary margin-left-sm" onClick={() => { props.handleCancelUpdate() }}>
                    <i className="bi bi-x-circle-fill"></i>
                </button>

            </form>

        </div>
    );
}

export default TaskEdit;