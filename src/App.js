import React from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { setFirstName, setLastName } from './features/user/userSlice';
import { addTodo, toggleCompletedTodo, removeTodo } from './features/todo/todoSlice';
import { getPosts, deletePostById } from './features/post/postSlice';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';


function App() {

  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.firstName);
  const lastname = useSelector((state) => state.user.lastName);

  const [todoValue, setTodoValue] = React.useState('');

  const addTodoHandler = () => {
    const todo = {
      id: v4(),
      text: todoValue,
      completed: false,
    }
    dispatch(addTodo(todo));
    setTodoValue('');
  }

  const todos = useSelector((state) => state.todo.todos);

  const toggleTodoHandler = (id) => {
    dispatch(toggleCompletedTodo(id));
  }

  const removeTodoHandler = (id) => {
    dispatch(removeTodo(id));
  }

  const posts = useSelector((state) => state.post.posts);

  return (
    <div className="App">
      <div className='block blockOne'>
        <p>Enter your name:</p>
        <input onChange={(e) => dispatch(setFirstName(e.target.value))} type="text" placeholder='First Name' />
        <input onChange={(e) => dispatch(setLastName(e.target.value))} type="text" placeholder='Last Name' />
        <div className='firstBlockOutput'>
          <div>
            <p>First Name:</p>
            <p className='outName'>{name}</p>
          </div>
          <div>
            <p>Last Name:</p>
            <p className='outName'>{lastname}</p>
          </div>
        </div>
      </div>
      <div className='block blockTwo'>
        <p>ToDo App</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input onChange={(e) => setTodoValue(e.target.value)} value={todoValue} type="text" placeholder='Type something...' />
          <button onClick={() => addTodoHandler()} type="submit">Submit</button>
        </form>

        {
          todos?.map((todo) => (
            <div className='todoItem'>
              <div className='completeItem' onClick={() => toggleTodoHandler(todo.id)}>Complete</div>
              <div className={`textItem ${todo.completed ? 'todoCompleted' : ''}`}>{todo.text}</div>
              <div className='deleteItem' onClick={() => removeTodoHandler(todo.id)}>Delete</div>
            </div>
          ))
        }

      </div>
      <div className='block blockThree'>
        <p>Async</p>
        <button type="submit" onClick={() => dispatch(getPosts())}>Get posts</button>

        {
          posts?.map((post) => (
            <div className='postItem' onClick={() => dispatch(deletePostById(post.id))}>
              {post.title}
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default App;
