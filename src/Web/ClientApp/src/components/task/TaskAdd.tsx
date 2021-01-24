import * as React from 'react';

const TaskAdd = (props: { handleAdd: any }) => {

    const [name, setName] = React.useState("");
    const [priority, setPriority] = React.useState("");

    const onSubmit = (e: any) => {
        // reset fields
        setName("");
        setPriority("");

        // redirect event
        props.handleAdd(e);
    };

    const handleChangeName = (e: any) => {
        setName(e.target.value)
    }

    const handleChangePriority = (e: any) => {
        setPriority(e.target.value)
    }

    return (
        <form className="form-inline" onSubmit={onSubmit} style={{ marginBottom: "15px" }}>

            <input type="text" className="form-control" name="name" placeholder="Name"
                value={name}
                onChange={handleChangeName}></input>

            <input type="text" className="form-control margin-left-sm" name="priority" placeholder="Priority"
                style={{ width: "80px" }}
                value={priority}
                onChange={handleChangePriority}></input>

            <button className="btn btn-primary margin-left-sm" type="submit">Add</button>

        </form>
    );
}

export default TaskAdd;