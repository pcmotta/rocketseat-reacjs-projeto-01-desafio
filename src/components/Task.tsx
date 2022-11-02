import { Check, Trash } from 'phosphor-react'

import styles from './Task.module.css'

export interface TaskInterface {
    id: string,
    done: boolean,
    text: string,
    createdAt: Date,
    doneAt?: Date
}

interface TaskProps {
    task: TaskInterface,
    onTaskDone: (id: string) => void,
    onDelete: (id: string) => void
}

export function Task({ task, onTaskDone, onDelete }: TaskProps) {
    return (
        <div className={`${styles.task} ${task.done ? styles.done : ''}`}>
            <label className={styles.checkboxContainer}>
                <input
                    onClick={() => onTaskDone(task.id)} 
                    type="radio" 
                    checked={task.done} 
                />
                <span>
                    {task.done ? 
                        <Check /> :
                        ''
                    }
                </span>
            </label>

            <div className={`${styles.taskDescription} ${task.done ? styles.done : ''}`}>
                {task.text}
            </div>

            <button onClick={() => onDelete(task.id)}>
                <Trash />
            </button>
        </div>
    )
}