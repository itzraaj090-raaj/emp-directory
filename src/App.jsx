import React, { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rohan",
      employeeId: "EMP001",
      department: "IT",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Kolkata",
    },
    {
      id: 2,
      name: "Priya",
      employeeId: "EMP002",
      department: "HR",
      gender: "Female",
      phone: "9876543211",
      localAddress: "Delhi",
      permanentAddress: "Delhi",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.employeeId ||
      !form.department ||
      !form.gender ||
      !form.phone ||
      !form.localAddress ||
      !form.permanentAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...employee, ...form }
            : employee
        )
      );

      setEditingId(null);
      alert("Employee updated successfully!");
    } else {
      const newEmployee = {
        id: Date.now(),
        ...form,
      };

      setEmployees([...employees, newEmployee]);
      alert("Employee added successfully!");
    }

    resetForm();
  };

  // Delete employee
  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // Edit employee
  const editEmployee = (employee) => {
    setForm({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });

    setEditingId(employee.id);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Search and filter
  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.employeeId.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <header>
        <h1>Employee Directory</h1>
        <p>Employee Management System</p>
      </header>

      <div className="container">

        {/* Top Section */}
        <div className="top-section">
          <h2>Employee Directory</h2>

          <button
            className="add-btn"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Add Employee
          </button>
        </div>

        {/* Employee Count */}
        <div className="count-box">
          <h3>Total Employees: {employees.length}</h3>
          <p>Showing {filteredEmployees.length} employee(s)</p>
        </div>

        {/* Search and Filter */}
        <div className="filters">

          <input
            type="text"
            placeholder="Search by name, ID or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Production">Production</option>
          </select>
        </div>

        {/* Conditional Rendering of Form */}
        {showForm && (
          <div className="form-container">
            <h2>
              {editingId !== null
                ? "Edit Employee"
                : "Add New Employee"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="Enter employee ID"
                  />
                </div>

                <div>
                  <label>Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Production">Production</option>
                  </select>
                </div>

                <div>
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label>Local Address</label>
                  <input
                    type="text"
                    name="localAddress"
                    value={form.localAddress}
                    onChange={handleChange}
                    placeholder="Enter local address"
                  />
                </div>

                <div className="full-width">
                  <label>Permanent Address</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={form.permanentAddress}
                    onChange={handleChange}
                    placeholder="Enter permanent address"
                  />
                </div>

              </div>

              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  {editingId !== null ? "Update Employee" : "Add Employee"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Employee List */}
        <div className="employee-list">

          {filteredEmployees.length === 0 ? (
            <div className="no-data">
              <h3>No Employees Found</h3>
              <p>Try another search or add a new employee.</p>
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <div className="employee-card" key={employee.id}>

                <div className="employee-header">
                  <div>
                    <h2>{employee.name}</h2>
                    <span className="employee-id">
                      {employee.employeeId}
                    </span>
                  </div>

                  <span className="department">
                    {employee.department}
                  </span>
                </div>

                <div className="employee-details">

                  <p>
                    <strong>Gender:</strong> {employee.gender}
                  </p>

                  <p>
                    <strong>Phone:</strong> {employee.phone}
                  </p>

                  <p>
                    <strong>Local Address:</strong>{" "}
                    {employee.localAddress}
                  </p>

                  <p>
                    <strong>Permanent Address:</strong>{" "}
                    {employee.permanentAddress}
                  </p>

                </div>

                <div className="actions">

                  <button
                    className="edit-btn"
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

      <footer>
        <p>© 2026 Employee Directory | React Assignment</p>
      </footer>
    </div>
  );
}

export default App;