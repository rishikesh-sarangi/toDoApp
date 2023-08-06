import "./App.css";
import "./Components/ToDoItem";
import ToDoItem from "./Components/ToDoItem";

const App = () => {
  return (
    <>
      <div className="app-container my-10 flex flex-col gap-14">
        <ToDoItem />
      </div>
    </>
  );
};

export default App;
