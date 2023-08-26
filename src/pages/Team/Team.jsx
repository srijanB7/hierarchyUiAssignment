import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { UseEmployee } from "../../contexts/EmployeeContext";
import { Modal } from "@mui/material";
import { useState } from "react";
import "./Team.css";

export const Team = () => {
    const { id } = useParams();
    const { teams, employees, removeEmployee, addEmployee } = UseEmployee();
    const team = teams.find((team) => team.teamId === id);
    const teamLeader = employees.find((employee) => employee.id == team.leader);
    const teamMembers = [];
    team.members.forEach((member) =>
        teamMembers.push(employees.find((employee) => employee.id == member))
    );
    console.log(team)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [designation, setDesignation] = useState("");
    function handleAddMember(event) {
        event.preventDefault();
        handleClose();
        const memberDetails = {
            id: crypto.randomUUID(),
            name,
            phone,
            email,
            designation
        };
        addEmployee(memberDetails, team.teamId);
        setName("");
        setEmail("");
        setPhone("");
    }

    return (
        <>
            <Navbar />
            <main className="team-container">
                <h2 className="team-header">Team Name: {team.teamName}</h2>
                <p className="team-leader">
                    Team Leader:{" "}
                    <Link to={`/employee/${teamLeader.id}`}>
                        {teamLeader.name}
                    </Link>
                </p>
                <div className="team-members">
                    Members:
                    {teamMembers.length > 0 ? 
                        teamMembers.map((member, ind) => (
                        <div key={ind} className="member">
                            <Link to={`/employee/${member?.id}`}>
                                {member.name}
                            </Link>
                            <button
                                className="delete-btn"
                                onClick={() =>
                                    removeEmployee(member.id, team.teamId)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )): <p>No Team Members! Add Team Members</p>}
                </div>
                <button onClick={handleOpen} className="add-member-btn">Add Member</button>
                <Modal open={open} onClose={handleClose}>
                    <form
                        className="add-member-modal"
                        onSubmit={handleAddMember}
                    >
                        <div className="input-field">
                            <label>Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label>Designation</label>
                            <input
                                type="text"
                                required
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </Modal>
            </main>
        </>
    );
};
