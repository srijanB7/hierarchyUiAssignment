import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { UseEmployee } from "../../contexts/EmployeeContext";
import { useState } from "react";
import "./Employee.css";
import { Modal } from "@mui/material";

export const Employee = () => {
    const { id } = useParams();
    const { employees, editEmployee, getOtherTeams, teams } = UseEmployee();
    const employee = employees.find((employee) => employee.id == id);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [phone, setPhone] = useState(employee.phone);
    const otherTeams = getOtherTeams(employee.id, employee.designation);
    const [switchTo, setSwitchTo] = useState("None");
    
    
   
    function handleEditEmployee(event) {
        event.preventDefault();
        handleClose();
        editEmployee(employee.id, name, phone, email, switchTo);
        setName(name);
        setPhone(phone);
        setEmail(email);
        setSwitchTo("None");
    }
    return (
        <>
            <Navbar id={employee.id}/>
            <main className="employee-container">
                <div className="employee-details">
                    <h1>Employee Details</h1>
                    <p>Name: {employee.name}</p>
                    <p>Email: {employee.email}</p>
                    <p>Phone: {employee.phone}</p>
                    <p>Designation: {employee.designation}</p>
                </div>
                <button onClick={handleOpen}>Edit</button>
                <Modal open={open} onClose={handleClose}>
                    <form
                        className="edit-employee"
                        onSubmit={handleEditEmployee}
                    >
                        <h1>Edit Employee Details</h1>
                        <div className="edit-employee-field">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="edit-employee-field">
                            <label>Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="edit-employee-field">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {otherTeams.length > 0 && (
                            <div className="edit-employee-field">
                                <label>Switch to</label>
                                <select value={switchTo} onChange={(e) => setSwitchTo(e.target.value)}>
                                    <option>None</option>
                                    {otherTeams?.map((team) => (
                                        <option key={team.teamId}>
                                            {team.teamName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button className="modal-btn" type="submit">Save Changes</button>
                    </form>
                </Modal>
            </main>
        </>
    );
};
