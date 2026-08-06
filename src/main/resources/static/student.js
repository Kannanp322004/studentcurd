const Api = "/students";

const UrlParams = new URLSearchParams(window.location.search);

const Department = UrlParams.get("department");

let EditMode = false;

// ==========================
// Page Load
// ==========================

window.onload = function () {
  if (Department == null || Department == "") {
    alert("Department Not Found");

    window.location.href = "index.html";

    return;
  }

  document.getElementById("departmentTitle").innerHTML =
    Department + " Department";

  LoadStudents();

  document.getElementById("saveBtn").addEventListener("click", SaveStudent);

  document.getElementById("search").addEventListener("keyup", SearchStudent);
};

// ==========================
// Load Students
// ==========================

async function LoadStudents() {
  try {
    const response = await fetch(
      Api + "/department/" + encodeURIComponent(Department),
    );

    const students = await response.json();

    console.log(students);
    console.log("Total Students:", students.length);

    // Total Students
    document.getElementById("departmentStudentCount").innerHTML =
      "Total Students : " + students.length;

    // Male Count
    const maleCount = students.filter(
      (student) => student.gender === "Male",
    ).length;

    // Female Count
    const femaleCount = students.filter(
      (student) => student.gender === "Female",
    ).length;

    // Display Counts
    document.getElementById("maleStudentCount").innerHTML =
      "👨 Male Students : " + maleCount;

    document.getElementById("femaleStudentCount").innerHTML =
      "👩 Female Students : " + femaleCount;
    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach((student) => {
      table.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.age}</td>

                <td>${student.gender}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="EditStudent(${student.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="DeleteStudent(${student.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;
    });
  } catch (error) {
    alert("Unable To Load Students");
  }
}

// ==========================
// Go Home
// ==========================

function GoHome() {
  window.location.href = "index.html";
}
// ==========================
// Save Student
// ==========================

async function SaveStudent() {
  const Id = document.getElementById("studentId").value;

  const Name = document.getElementById("name").value.trim();

  const Age = document.getElementById("age").value;

  const Gender = document.getElementById("gender").value;

  if (Name == "" || Age == "" || Gender == "") {
    alert("Please Fill All Fields");

    return;
  }

  const Student = {
    name: Name,

    age: parseInt(Age),

    gender: Gender,

    department: Department,
  };

  let Response;

  if (EditMode) {
    Response = await fetch(Api + "/" + Id, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(Student),
    });
  } else {
    Response = await fetch(Api, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(Student),
    });
  }

  if (Response.ok) {
    ClearForm();

    LoadStudents();
  } else {
    alert("Unable To Save Student");
  }
}

// ==========================
// Clear Form
// ==========================

function ClearForm() {
  document.getElementById("studentId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("age").value = "";

  document.getElementById("gender").value = "";

  EditMode = false;

  document.getElementById("saveBtn").innerHTML = "Save Student";
}
// ==========================
// Edit Student
// ==========================

async function EditStudent(Id) {
  try {
    const Response = await fetch(Api + "/" + Id);

    const Student = await Response.json();

    document.getElementById("studentId").value = Student.id;

    document.getElementById("name").value = Student.name;

    document.getElementById("age").value = Student.age;

    document.getElementById("gender").value = Student.gender;

    EditMode = true;

    document.getElementById("saveBtn").innerHTML = "Update Student";
  } catch (error) {
    alert("Unable To Load Student");
  }
}

// ==========================
// Delete Student
// ==========================

async function DeleteStudent(Id) {
  const ConfirmDelete = confirm(
    "Are You Sure You Want To Delete This Student?",
  );

  if (!ConfirmDelete) {
    return;
  }

  try {
    const Response = await fetch(Api + "/" + Id, {
      method: "DELETE",
    });

    if (Response.ok) {
      alert("Student Deleted Successfully");

      LoadStudents();
    } else {
      alert("Unable To Delete Student");
    }
  } catch (error) {
    alert("Server Error");
  }
}
// ==========================
// Search Student
// ==========================

function SearchStudent() {
  const Keyword = document.getElementById("search").value.toLowerCase();

  const Rows = document.querySelectorAll("#studentTable tr");

  Rows.forEach((Row) => {
    const Text = Row.innerText.toLowerCase();

    if (Text.includes(Keyword)) {
      Row.style.display = "";
    } else {
      Row.style.display = "none";
    }
  });
}
// ==========================
// Auto Refresh Every 30 Seconds
// ==========================

setInterval(function () {
  LoadStudents();
}, 30000);
// ==========================
// Enter Key Support
// ==========================

document.addEventListener("keydown", function (Event) {
  if (Event.key === "Enter") {
    SaveStudent();
  }
});
