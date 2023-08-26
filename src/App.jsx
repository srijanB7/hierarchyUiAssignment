import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Team } from "./pages/Team/Team";
import { Employee } from "./pages/Employee/Employee";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team/:id" element={<Team />} />
                <Route path="/employee/:id" element={<Employee />} />
            </Routes>
        </>
    );
}

export default App;
