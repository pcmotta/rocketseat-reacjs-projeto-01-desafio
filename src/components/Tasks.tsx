import styles from './Tasks.module.css'

import clipboard from '../assets/clipboard.svg'
import { Fragment, useState } from 'react'
import { Task, TaskInterface } from './Task'

interface TasksProps {
    tasks: TaskInterface[],
    onTaskDone: (id: string) => void,
    onDelete: (id: string) => void
}

export function Tasks({ tasks, onTaskDone, onDelete }: TasksProps) {
    return (
        <Fragment>
            {tasks.length === 0 ? 
                <div className={styles.noTasks}>
                    <img src={clipboard} />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    Crie tarefas e organize seus itens a fazer
                </div> : 
                <div className={styles.tasks}>
                    {tasks.map(task => (
                        <Task 
                            key={task.id}
                            task={task} 
                            onTaskDone={onTaskDone} 
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            }   
        </Fragment>
    )
}