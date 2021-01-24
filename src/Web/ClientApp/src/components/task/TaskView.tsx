import * as React from 'react';
import { Task } from '../../domain/Task'

const TaskView = (props: { task: Task, handleSelectTaskForUpdate: any, handleDelete: any }) => {
    return (
        <div className="alert alert-info">

            <span>
                <strong>{props.task.name}</strong>
            </span>

            <span className="float-right">
                <span>
                    <i className="bi bi-exclamation-circle"></i>
                    &nbsp;
                    {props.task.priority}
                </span>

                <span className="margin-left-md">
                    {props.task.statusName}
                </span>

                <button className="btn btn-sm btn-secondary margin-left-md"
                    onClick={() => { props.handleSelectTaskForUpdate(props.task.id) }}>
                    Edit
                    {/*<i className="bi bi-pencil"></i>*/}
                </button>
                &nbsp;
                <button className="btn btn-sm btn-secondary"
                    onClick={() => { props.handleDelete(props.task.id) }}>
                    Delete
                    {/*<i className="bi bi-x-circle"></i>*/}
                </button>
            </span>
        </div>
    );
}

export default TaskView;