import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Tasks } from './Tasks'
import { TaskInterface } from './Task'
import styles from './Todo.module.css'

import { PlusCircle } from 'phosphor-react'

export function Todo() {
    const [tasks, setTasks] = useState<Array<TaskInterface>>([])
    const [taskText, setTaskText] = useState('')

    function handleDoneTask(id: string) {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                if(!task.done) {
                    task.doneAt = new Date()
                } else {
                    delete task.doneAt
                }

                task.done = !task.done
            }

            return task
        })

        setTasks(newTasks.sort(sortTasks))
    }

    function handleDeleteTask(id: string) {
        const tasksWithoutDeletedTask = tasks.filter(task => task.id !== id)

        setTasks(tasksWithoutDeletedTask)
    }

    function handleAddTask(event: FormEvent) {
        event.preventDefault()
        const task = {
            id: uuidv4(),
            done: false,
            text: taskText,
            createdAt: new Date()
        }
        const taskWithNewTask = [...tasks, task]

        setTasks(taskWithNewTask.sort(sortTasks))
        setTaskText('')
    }

    function handleTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
        setTaskText(event.target.value)
    }

    function doneTasks() {
        return tasks.filter(task => task.done).length
    }

    function sortTasks(taskA: TaskInterface, taskB: TaskInterface) {
        if (taskA.done) {
            if (!taskB.done) return 1

            if(taskA.doneAt && taskB.doneAt && taskA.doneAt > taskB.doneAt) return -1
            return 1
        }

        if(taskB.done) return -1
        if(taskA.createdAt > taskB.createdAt) return -1
        return 1
    }

    return (
        <div className={styles.todoContainer}>
            <form className={styles.form} onSubmit={handleAddTask}>
                <input 
                    placeholder='Adicione uma nova tarefa'
                    value={taskText}
                    onChange={handleTaskTextChange}
                    required
                />
                <button type='submit'>
                    Criar
                    <PlusCircle size={20} />
                </button>
            </form>

            <div className={styles.taskContainer}>
                <div className={styles.counters}>
                    <div className={styles.createdTasks}>
                        <strong>Tarefas Criadas</strong>
                        <span className={styles.counter}>{tasks.length}</span>
                    </div>

                    <div className={styles.doneTasks}>
                        <strong>Concluídas</strong>
                        <span className={styles.counter}>
                            {`${doneTasks()} de ${tasks.length}`}
                        </span>
                    </div>
                </div>

                <Tasks 
                    tasks={tasks}
                    onTaskDone={handleDoneTask}
                    onDelete={handleDeleteTask} 
                />
            </div>
        </div>
    )
}