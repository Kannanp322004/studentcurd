const api = "http://localhost:8080/students";

let editMode = false;

// Load students when website opens

window.onload = function () {
  loadStudents();
};

// Add or Update Student

async function saveStudent() {
  const id = document.getElementById("studentId").value;

  const name = document.getElementById("name").value;

  const age = document.getElementById("age").value;

  const department = document.getElementById("department").value;

  if (name === "" || age === "" || department === "") {
    alert("Please fill all fields");
    return;
  }

  const student = {
    name: name,

    age: parseInt(age),

    department: department,
  };

  try {
    let response;

    // Update Student

    if (editMode) {
      response = await fetch(api + "/" + id, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert("Student Updated Successfully");
      }
    }

    // Add Student
    else {
      response = await fetch(api, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert("Student Added Successfully");
      }
    }

    clearFields();

    loadStudents();
  } catch (error) {
    alert("Error : " + error);
  }
}

// Display Students

async function loadStudents() {
  const response = await fetch(api);

  const students = await response.json();

  const table = document.getElementById("studentTable");

  table.innerHTML = "";

  students.forEach((student) => {
    table.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.age}</td>

            <td>${student.department}</td>


            <td>

                <button class="edit-btn" 
                onclick="editStudent(${student.id})">
                    Edit
                </button>


                <button class="delete-btn" 
                onclick="deleteStudent(${student.id})">
                    Delete
                </button>


            </td>


        </tr>

        `;
  });
}

// Edit Student

async function editStudent(id) {
  const response = await fetch(api + "/" + id);

  const student = await response.json();

  document.getElementById("studentId").value = student.id;

  document.getElementById("name").value = student.name;

  document.getElementById("age").value = student.age;

  document.getElementById("department").value = student.department;

  editMode = true;

  document.getElementById("saveBtn").innerHTML = "Save Changes";
}

// Delete Student

async function deleteStudent(id) {
  let confirmDelete = confirm("Do you want to delete this student?");

  if (confirmDelete) {
    const response = await fetch(api + "/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Student Deleted Successfully");

      loadStudents();
    }
  }
}

// Clear Fields

function clearFields() {
  document.getElementById("studentId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("age").value = "";

  document.getElementById("department").value = "";

  editMode = false;

  document.getElementById("saveBtn").innerHTML = "Add Student";
}

// Button Connection

document.getElementById("saveBtn").addEventListener("click", saveStudent);
