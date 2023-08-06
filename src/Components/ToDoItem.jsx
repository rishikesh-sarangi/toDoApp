import {
  faPlus,
  faSquare,
  faCheckSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import localforage from "localforage";
import { useEffect, useState } from "react";

const ToDoItem = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  // useEffect is always called atleast once even if we give it or dont give it a dependancy array
  useEffect(() => {
    localforage.getItem("localTodos", (err, todos) => {
      if (err) {
        console.log(err);
        return;
      }

      if (todos) {
        setTodoList(todos);
      }
    });
  });

  const storeNotes = (todos) => {
    setTodoList(todos);
    localforage.setItem("localTodos", todos);
  };

  const addTodo = () => {
    if (todo.length === 0) return;

    if (todo.length > 25) {
      alert("toDo's can only be of length 25");
      return;
    }

    const newToDo = {
      content: todo,
      completed: false,
    };

    storeNotes([newToDo, ...todoList]);
    setTodo("");
  };

  const deleteTodo = (index) => {
    const newTodo = [...todoList];
    newTodo.splice(index, 1); // remove from index elements, how many elements ? 1 element
    storeNotes(newTodo);
  };

  const toggleCompleted = (index) => {
    const newTodo = [...todoList];
    newTodo.splice(index, 1, {
      content: newTodo[index].content,
      completed: !newTodo[index].completed,
    });
    storeNotes(newTodo);
  };

  return (
    <>
      <div className="textarea-add-btn mr-12 flex justify-center gap-4">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-56 rounded-md border-2 border-solid border-sky-500 p-3
        text-2xl text-white hover:border-sky-700 focus:border-green-700 focus:outline-none md:w-96 lg:w-96"
        ></input>
        <button>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={addTodo}
            className="rounded-full bg-slate-700 p-2 text-green-400 duration-300 ease-in-out hover:bg-slate-500"
          />
        </button>
      </div>
      <div className="todos flex flex-col gap-1">
        {todoList.map((todoItem, noteIndex) => (
          <div
            className="todo-bar flex items-center justify-center gap-4"
            key={noteIndex}
          >
            <div
              key={noteIndex}
              className={`each-todo mb-3 flex w-56 content-center justify-center rounded-md border-2 border-solid border-sky-500 p-3 text-xl text-white md:w-96 lg:w-96
              ${
                todoItem.completed
                  ? "bg-green-600 line-through duration-300 ease-in-out"
                  : "bg-red-600 duration-300 ease-in-out"
              }`}
            >
              {todoItem.content}
            </div>
            <button className="flex gap-4">
              <FontAwesomeIcon
                key={noteIndex}
                icon={todoItem.completed ? faCheckSquare : faSquare}
                onClick={() => toggleCompleted(noteIndex)}
                className={`rounded-full bg-slate-700 p-2  duration-300 ease-in-out hover:bg-slate-500
                  ${todoItem.completed ? "text-green-400" : "text-red-400"}`}
              />
              <FontAwesomeIcon
                key={todoItem.id}
                icon={faTrash}
                onClick={() => deleteTodo(noteIndex)}
                className="rounded-full bg-slate-700 p-2 text-red-400 duration-300 ease-in-out hover:bg-slate-500"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToDoItem;
