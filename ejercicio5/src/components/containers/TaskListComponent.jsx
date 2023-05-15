import React, { useEffect, useState } from "react";
import {Task} from "../../models/task.class";
import LEVELS from "../../models/levels.enum";
import TaskComponent from "../pure/TaskComponent";

import '../../styles/task.scss';
import TaskFormik from "../forms/TaskFormik";

const TaskListComponent = () => {

    const defaultClass1 = new Task('Task #1', 'Insert your description', false, LEVELS.NORMAL)
    const defaultClass2 = new Task('Task #2', 'Insert your description', true, LEVELS.URGENT)
    const defaultClass3 = new Task('Task #3', 'Insert your description', false, LEVELS.BLOCKING)


    const [tasks, setTasks] = useState([defaultClass1, defaultClass2, defaultClass3]);

    const [loading, setLoading] = useState(true); 

    useEffect(()=>{
        setTimeout(() =>{
            setLoading(false);
        }, 1500)
    }, [tasks])

    const addTask = (task) => {
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
        
    }

    const completeTask = (task)=>{
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        setTasks(tempTasks);
    }

    const deleteTask = (task)=>{
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index,1)
        setTasks(tempTasks);
    }

    const Table = () => {
        return (
            <table>
            <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Priority</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
                {tasks.map((task, index)=> {
                    return(
                    <TaskComponent key={index} task={task} completed={completeTask} deleteTask={deleteTask}></TaskComponent>
                    )
                })}
            </tbody>
        </table>
        )
    }

    let tasksTable = <Table></Table>

    tasks.length > 0
    ? tasksTable = <Table></Table>
    : tasksTable = <h3>No Tasks to Display</h3>

    return (
        <div>
            <div className="col-12 ">
                <div className="card">
                    <div className='card-header p-3'>
                        <h5>
                            Your Tasks: 
                        </h5>
                    </div>
                    <div className='card-body' data-mdb-perfect-scrollbat='true' style={{
                        position: 'relative',
                        height: '400rpx'
                    }}>
                        {loading 
                            ? <div>LOADING...</div>
                            : tasksTable
                        }
                    </div>
                </div>
            </div>
                    <TaskFormik add={addTask} length={tasks.length}></TaskFormik>
                    {/* <TaskForm add={addTask} length={tasks.length}></TaskForm> */}
        </div>
    )

}

export default TaskListComponent;