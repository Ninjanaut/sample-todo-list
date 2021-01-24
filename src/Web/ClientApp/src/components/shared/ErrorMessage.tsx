import * as React from 'react';

const ErrorMessage = (props: { message: string, handleCloseError: any }) => {

    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {props.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.handleCloseError}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

export default ErrorMessage;