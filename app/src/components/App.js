import '../App.css';
import ToDoForm from "./ToDoForm";
import {Route, Routes} from "react-router-dom";
import RecipeForm from "./RecipeForm";
import React from "react";

/**
 * App component
 * @returns {JSX.Element}
 */
function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<ToDoForm/>} />
          <Route path="recipes/create" element={<RecipeForm />} />
        </Routes>
      </>
  );
}

export default App;
