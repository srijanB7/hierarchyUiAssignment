import { Navbar } from "../../components/Navbar/Navbar";
import { UseEmployee } from "../../contexts/EmployeeContext";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { useState } from "react";

import "./Home.css";

export const Home = () => {
    const { ceo, departmentDetails, addTeam, teams } = UseEmployee();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [teamName, setTeamName] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("HR");
    const [leaderName, setLeaderName] = useState("");
    const [leaderPhone, setLeaderPhone] = useState("");
    const [leaderEmail, setLeaderEmail] = useState("");

    const isTeamNameValid = teams.some((team) => team.teamName === teamName);

    function handleAddTeam(event) {
        event.preventDefault();
        if(isTeamNameValid) {
            return;
        }
        let chosenDepartment = "HR";
        if (selectedDepartment !== "HR") {
            chosenDepartment = `Head of ${selectedDepartment}`;
        }
        handleClose();
        const leaderDetails = {
            id: crypto.randomUUID(),
            name: leaderName,
            email: leaderEmail,
            phone: leaderPhone,
        };
        const teamDetails = {
            teamId: crypto.randomUUID(),
            teamName,
            leader: leaderDetails.id,
            members: [],
        };
        addTeam(chosenDepartment, teamDetails, leaderDetails);
        setTeamName("");
        setSelectedDepartment("HR");
    }

    return (
        <>
            <Navbar />
            <main className="employee-tree">
                <div className="ceo-details">
                    <Link to={`/employee/${ceo.id}`}>{ceo.name}</Link>
                    <p>Designation: {ceo.designation}</p>
                </div>
                <div className="departments">
                    {departmentDetails.map((department, ind) => (
                        <div key={ind} className="department">
                            <p>
                                <Link to={`/employee/${department.id}`}>
                                    {department.name}
                                </Link>
                            </p>
                            <p>Designation: {department.designation}</p>
                            <ul>
                                Leads
                                {department.teams.map((team) => (
                                    <li key={team.teamId}>
                                        <Link to={`/team/${team.teamId}`}>
                                            {team.teamName}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button onClick={handleOpen}>Add Team</button>
                <Modal open={open} onClose={handleClose}>
                    <form className="add-team-modal" onSubmit={handleAddTeam}>
                        <h1>Add Team</h1>
                        <div className="add-team-input-field">
                            <label>Team Name</label>
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                            />
                            {isTeamNameValid && (
                                <p className="error-msg">Team name already exists. Please change</p>
                            )}
                        </div>
                        <div className="add-team-input-field">
                            <label>Select Department</label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) =>
                                    setSelectedDepartment(e.target.value)
                                }
                            >
                                <option>HR</option>
                                <option>Engineering</option>
                                <option>Design</option>
                            </select>
                        </div>
                        <h2>Team Leader</h2>
                        <div className="add-team-input-field">
                            <label>Leader Name</label>
                            <input
                                type="text"
                                value={leaderName}
                                onChange={(e) => setLeaderName(e.target.value)}
                                required
                            />
                            
                        </div>
                        <div className="add-team-input-field">
                            <label>Leader Phone Number</label>
                            <input
                                type="tel"
                                value={leaderPhone}
                                onChange={(e) => setLeaderPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="add-team-input-field">
                            <label>Leader Email</label>
                            <input
                                type="email"
                                value={leaderEmail}
                                onChange={(e) => setLeaderEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button>Add Team</button>
                    </form>
                </Modal>
            </main>
        </>
    );
};
