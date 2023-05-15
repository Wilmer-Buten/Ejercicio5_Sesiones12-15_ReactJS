import React from 'react'
import * as yup from 'yup';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import LEVELS from '../../models/levels.enum';
import PropTypes from 'prop-types'; 
import { Task } from '../../models/task.class';

function TaskFormik({add,length}) {


    const initialValues = {
        
        name: '',
        description: '',
        completed: false,
        level: LEVELS.NORMAL
        
    }

    const taskSchema = yup.object().shape({

        name: yup.string().required('Name is required'),
        description: yup.string(),
        completed: yup.boolean(),
        level: yup.string().required()

    });
        

    return (
   

   <Formik
        initialValues={initialValues}
        validationSchema={taskSchema}
        onSubmit={(values)=>{

          const newTask = new Task(
            values.name,
            values.description,
            false,
            values.level
          )
          add(newTask);
        }}
        >
            {({
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur 
            }) => (
           
            <Form>
                <Field name='name' id='name' type='text' placeholder='Name of the task' />
                        {
                            errors.name && touched.name && (
                                <ErrorMessage name='name' component={'div'}></ErrorMessage>
                            )
                        }
                <Field name='description' id='description' type='text' placeholder='Description of the task' />
                        {
                            errors.description && touched.description && (
                                <ErrorMessage name='description' component={'div'}></ErrorMessage>
                            )
                        }
                <select name='level' id='level' value={values.level} onChange={handleChange} >
                    <option value={LEVELS.NORMAL}>{LEVELS.NORMAL}</option>
                    <option value={LEVELS.URGENT}>{LEVELS.URGENT}</option>
                    <option value={LEVELS.BLOCKING}>{LEVELS.BLOCKING}</option>
                </select>
                <button type='submit' className='btn btn-success btn-lg ms-2'>
                        {
                            length > 0
                              ? 'Add task' 
                              : 'Add your first task!'
                        }
                </button>
            </Form>            
            )}  

    </Formik>
  )
}

TaskFormik.propTypes = {
    length: PropTypes.number.isRequired,
    add: PropTypes.func.isRequired
}

export default TaskFormik;