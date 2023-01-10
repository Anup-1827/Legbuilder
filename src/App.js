import { useState } from "react";
import FetchData from "./Component/FetchData";
import LegBuilder from "./Component/LegBuilder";
import "./index.css"

function App() {
  const [allFields, setAllFields] = useState({})
  const [listJson, setListJson] = useState([])

  return (
    <div className="App">
      <LegBuilder listJson={listJson} setListJson={setListJson} allFields={allFields} setAllFields={setAllFields}/>
      <FetchData listJson={listJson} setListJson={setListJson} />
    </div>
  );
}

export default App;





