import { Todo } from "./components/Todo"
import { Header } from "./components/Header"

import styles from './App.module.css'

import './global.css'

export function App() {
  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <Todo />
      </main>
    </div>
  )
}
