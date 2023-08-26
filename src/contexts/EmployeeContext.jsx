import { createContext, useContext, useState } from "react";
import { dept_data, employeesData } from "../data/employeeData";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    
    const [employees, setEmployees] = useState(
        JSON.parse(localStorage.getItem("employees")) ?? employeesData
    );
    const [departmentData, setDepartmentData] = useState(
        JSON.parse(localStorage.getItem("departmentData")) ?? dept_data
    );

    const ceo = employees.find((employee) => employee.designation === "CEO");
    const departments = Object.keys(departmentData["CEO"].departments);

    const departmentDetails = departments.reduce((acc, val) => {
        let departmentObj = {
            ...employees.find((employee) => employee.designation === val),
            teams: departmentData["CEO"].departments[val].teams,
        };
        acc.push(departmentObj);
        return acc;
    }, []);

    const teams = departmentDetails.reduce((acc, val) => {
        acc.push(...val.teams);
        return acc;
    }, []);

    function removeEmployee(id, teamId) {
        const updatedEmployees = employees.filter(
            (employee) => employee.id !== id
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        const updatedDepartmentData = structuredClone(departmentData);
        departments.forEach((department) => {
            let currDept = updatedDepartmentData["CEO"].departments[
                department
            ].teams.find((team) => team.teamId === teamId);
            if (currDept !== undefined) {
                currDept.members = currDept.members.filter(
                    (member) => member != id
                );
                updatedDepartmentData["CEO"].departments[department].teams =
                    updatedDepartmentData["CEO"].departments[
                        department
                    ].teams.map((team) => {
                        if (team.id == teamId) {
                            return currDept;
                        }
                        return team;
                    });
            }
        });
        setDepartmentData(updatedDepartmentData);
        localStorage.setItem("departmentData", JSON.stringify(updatedDepartmentData));
    }

    function addEmployee(empDetail, teamId) {
        const updatedEmployees = [...employees, empDetail];
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        const updatedDepartmentData = structuredClone(departmentData);
        departments.forEach((department) => {
            let currDept = updatedDepartmentData["CEO"].departments[
                department
            ].teams.find((team) => team.teamId === teamId);
            if (currDept !== undefined) {
                currDept.members.push(empDetail.id);
                updatedDepartmentData["CEO"].departments[department].teams =
                    updatedDepartmentData["CEO"].departments[
                        department
                    ].teams.map((team) => {
                        if (team.id == teamId) {
                            return currDept;
                        }
                        return team;
                    });
            }
        });
        localStorage.setItem("departmentData", JSON.stringify(updatedDepartmentData));
        setDepartmentData(updatedDepartmentData);
    }

    function addTeam(chosenDepartment, teamDetails, leaderDetails) {
        const updatedDepartmentData = structuredClone(departmentData);
        updatedDepartmentData["CEO"].departments[chosenDepartment].teams.push(
            teamDetails
        );
        localStorage.setItem("departmentData", JSON.stringify(updatedDepartmentData));
        setDepartmentData(updatedDepartmentData);
        const updatedEmployees = [...employees, leaderDetails];
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
    }

    function editEmployee(id, name, phone, email, switchTo) {
        const updatedEmployees = employees.map((employee) => {
            if (employee.id === id) {
                return {
                    id,
                    name,
                    phone,
                    email,
                    designation: employee.designation,
                };
            }
            return employee;
        });
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        if (switchTo !== "None") {
            const currTeam = teams.find((team) =>
                team.members.find((member) => member === id)
            );
            const updatedDepartmentData = structuredClone(departmentData);
            departments.forEach((department) => {
                let currDept = updatedDepartmentData["CEO"].departments[
                    department
                ].teams.find((team) => team.teamId === currTeam.teamId);
                if (currDept !== undefined) {
                    currDept.members = currDept.members.filter(
                        (member) => member != id
                    );
                }
                let newTeam = updatedDepartmentData["CEO"].departments[
                    department
                ].teams.find((team) => team.teamName === switchTo);
                if (newTeam !== undefined) {
                    newTeam.members.push(id);
                }
            });
            setDepartmentData(updatedDepartmentData);
            localStorage.setItem("departmentData", JSON.stringify(updatedDepartmentData));
        }
    }

    function getOtherTeams(id, designation) {
        let department = "HR";
        if (designation === "Engineer") {
            department = "Head of Engineering";
        } else if (designation === "Designer") {
            department = "Head of Design";
        } else if (designation !== "Sales" && designation !== "Marketing")
            return [];

        const otherTeams = departmentData["CEO"].departments[
            department
        ].teams.filter((team) => !team.members.find((member) => member === id));
        return otherTeams;
    }

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                departmentData,
                addTeam,
                ceo,
                departmentDetails,
                teams,
                removeEmployee,
                addEmployee,
                editEmployee,
                getOtherTeams,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};

export const UseEmployee = () => useContext(EmployeeContext);
