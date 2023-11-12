import Spline from '@splinetool/react-spline'
import {
  IconArrowDown,
  IconSend,
  IconCheck,
  IconTrash,
} from '@tabler/icons-react'
import { FormEvent, useState } from 'react'
import { MagicMotion } from 'react-magic-motion'

type Task = {
  id: number | undefined
  name: string
  completed: boolean
}

type TaskList = Array<Task>

const App = () => {
  const [taskList, setTaskList] = useState<TaskList>([])
  const [taskFromInput, setTaskFromInput] = useState('')

  const addTask = (e: FormEvent): void => {
    e.preventDefault()

    const newTask: Task = {
      id: taskList?.length,
      name: taskFromInput,
      completed: false,
    }

    setTaskList([...taskList, newTask])
    setTaskFromInput('')
  }

  const deleteTask = (id: number | undefined): void => {
    setTaskList((taskList) => taskList.filter((task) => task.id !== id))
  }

  const completeTask = (id: number | undefined): void => {
    setTaskList((taskList) =>
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true }
        }
        return task
      })
    )
  }

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ width: '300px', height: '300px' }}>
        <Spline scene='https://prod.spline.design/ucFssGlX0ly7Lf53/scene.splinecode' />
      </div>

      <h1
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        Add a task here <IconArrowDown color='black' stroke={3} size={30} />
      </h1>

      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        onSubmit={addTask}
      >
        <input
          type='text'
          placeholder='New task...'
          autoComplete='off'
          required
          value={taskFromInput}
          onChange={(e) => setTaskFromInput(e.target.value)}
          style={{
            background: 'transparent',
            outline: 'none',
            border: 'none',
            borderBottom: '.1px solid #4f4f4f',
            padding: '5px 10px',
            height: 'auto',
            width: '95%',
          }}
        />
        <button
          type='submit'
          style={{
            background: 'transparent',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <IconSend stroke={3} size={20} />
        </button>
      </form>

      <MagicMotion>
        <section
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {taskList.map((task, index) => {
            return (
              <div
                key={index}
                data-id={task.id}
                style={{
                  padding: '10px',
                  border: '.1px solid #4f4f4f',
                  borderRadius: '10px',
                  boxShadow: '5px 5px 0px #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 'calc(100% - 5px)',
                }}
              >
                <p>{task.name}</p>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  {!task.completed && (
                    <button
                      onClick={() => completeTask(task.id)}
                      style={{
                        padding: '7px',
                        border: '.1px solid green',
                        background: 'rgba(0, 155, 0, .2)',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      <IconCheck color='green' />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      padding: '7px',
                      border: '.1px solid red',
                      background: 'rgba(155, 0, 0, .2)',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <IconTrash color='red' />
                  </button>
                </div>
              </div>
            )
          })}
        </section>
      </MagicMotion>
    </main>
  )
}

export default App
