import { useEffect, useState } from "react";
import "./Navbar.css";
import { UseEmployee } from "../../contexts/EmployeeContext";
import { Link } from "react-router-dom";

export const Navbar = ({id}) => {
    const { employees } = UseEmployee();
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setSearchText("")
        setSearchResults([]);
    }, [id])
    function handleChange(event) {
        setSearchText(event.target.value);
        if (event.target.value === "") {
            setSearchResults([]);
            return;
        }
        setSearchResults(
            employees.filter(
                (employee) =>
                    employee.name
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase()) 
                        ||
                    employee.phone.includes(event.target.value)
            )
        );
    }
    

    return (
        <nav>
            <Link to="/"><h1>Random HQ</h1></Link>
            <input
                type="text"
                placeholder="search for employee by name, number and email"
                value={searchText}
                onChange={handleChange}
            />
            {searchResults.length > 0 ? (
                <div className="search-results">
                    {searchResults.map((searchItems, index) => (
                        <Link to={`/employee/${searchItems.id}`} key={index}>
                            <p>{searchItems.name}</p>
                        </Link>
                    ))}
                </div>
            ) : searchText.length > 0 ? (
                <p className="no-results">No Results Found</p>
            ) : (
                <></>
            )}
        </nav>
    );
};
