import { Task } from "../../models/task.class";
import React from "react";
import PropTypes from 'prop-types';
import LEVELS from "../../models/levels.enum";

import '../../styles/task.scss'

const TaskComponent = ({ task, completed, deleteTask }) => {

    const taskLevelBadge = () => {
        switch (task.level) {
            case LEVELS.NORMAL:
                return (
                    <h6 className="mb-0">
                        <span className="badge bg-primary">
                            {task.level}
                        </span>
                    </h6>);
            case LEVELS.URGENT:
                return (
                    <h6 className="mb-0">
                        <span className="badge bg-warning">
                            {task.level}
                        </span>
                    </h6>);
            case LEVELS.BLOCKING:
                return (
                    <h6 className="mb-0">
                        <span className="badge bg-danger">
                            {task.level}
                        </span>
                    </h6>);

            default:
                break;
        }
    }

    const taskIconCompleted = () => {
        return (
            task.completed
            ? (<i onClick={()=>completed(task)} className="bi-toggle-on task-action" style={{ color: "green" }}></i>)
            : (<i onClick={()=>completed(task)} className="bi-toggle-off task-action" style={{ color: "red" }}></i>)
        )
    }

    return (

        <tr className={task.completed ? 'fw-normal task-completed' : 'fw-normal task-pending'}>
            <th>
                <span className="ms-2">
                    {task.name}
                </span>
            </th>
            <td className="align-middle">
                <span>{task.description}</span>
            </td>
            <td className="align-middle">
                {taskLevelBadge()}
            </td>
            <td className="align-middle">
                {taskIconCompleted()}
                <i onClick={() => deleteTask(task)} className="bi-trash task-action" style={{ color: "tomato" }}></i>
            </td>
        </tr>
    )
}

TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    completed: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired

}

export default TaskComponent;