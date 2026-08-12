const Api = "/students";

const UrlParams = new URLSearchParams(window.location.search);

const Department = UrlParams.get("department");

let EditMode = false;
let DatabaseId = null;

// ==========================
// PAGE LOAD
// ==========================

window.onload = function () {
  if (!Department) {
    alert("Department Not Found");

    window.location.href = "index.html";

    return;
  }

  document.getElementById("departmentTitle").innerHTML =
    Department + " Department";

  document.getElementById("saveBtn").addEventListener("click", SaveStudent);

  document.getElementById("search").addEventListener("keyup", SearchStudent);

  LoadStudents();
};

// ==========================
// LOAD STUDENTS
// ==========================

async function LoadStudents() {
  try {
    const Response = await fetch(
      Api + "/department/" + encodeURIComponent(Department),
    );

    if (!Response.ok) {
      throw new Error("Unable to load students");
    }

    const Students = await Response.json();

    console.log("Students received:", Students);

    // ==========================
    // TOTAL
    // ==========================

    document.getElementById("departmentStudentCount").innerHTML =
      "Total Students : " + Students.length;

    // ==========================
    // MALE
    // ==========================

    const MaleCount = Students.filter(
      (student) => student.gender === "Male",
    ).length;

    // ==========================
    // FEMALE
    // ==========================

    const FemaleCount = Students.filter(
      (student) => student.gender === "Female",
    ).length;

    document.getElementById("maleStudentCount").innerHTML =
      "👨 Male Students : " + MaleCount;

    document.getElementById("femaleStudentCount").innerHTML =
      "👩 Female Students : " + FemaleCount;

    // ==========================
    // TABLE
    // ==========================

    const Table = document.getElementById("studentTable");

    Table.innerHTML = "";

    Students.forEach((student) => {
      Table.innerHTML += `

                <tr>

                    <td>
                        ${student.studentId}
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.age}
                    </td>

                    <td>
                        ${student.gender}
                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="EditStudent(${student.databaseId})">

                            ✏ Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="DeleteStudent(${student.databaseId})">

                            🗑 Delete

                        </button>

                    </td>

                </tr>

            `;
    });
  } catch (Error) {
    console.error("Load Students Error:", Error);

    alert("Unable To Load Students");
  }
}

// ==========================
// SAVE STUDENT
// ==========================

async function SaveStudent() {
  const Name = document.getElementById("name").value.trim();

  const Age = document.getElementById("age").value;

  const Gender = document.getElementById("gender").value;

  // ==========================
  // VALIDATION
  // ==========================

  if (Name === "" || Age === "" || Gender === "") {
    alert("Please Fill All Fields");

    return;
  }

  // ==========================
  // STUDENT OBJECT
  // ==========================

  const Student = {
    name: Name,

    age: parseInt(Age),

    gender: Gender,

    department: Department,
  };

  try {
    let Response;

    // ==========================
    // UPDATE
    // ==========================

    if (EditMode) {
      console.log("Updating Database ID:", DatabaseId);

      Response = await fetch(Api + "/" + DatabaseId, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(Student),
      });
    }

    // ==========================
    // ADD
    // ==========================
    else {
      console.log("Adding student to:", Department);

      Response = await fetch(Api, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(Student),
      });
    }

    // ==========================
    // RESPONSE
    // ==========================

    if (Response.ok) {
      alert(
        EditMode
          ? "Student Updated Successfully"
          : "Student Added Successfully",
      );

      ClearForm();

      await LoadStudents();
    } else {
      const ErrorText = await Response.text();

      console.error("Server Error:", ErrorText);

      alert("Unable To Save Student\n\n" + ErrorText);
    }
  } catch (Error) {
    console.error("Save Student Error:", Error);

    alert("Server Error\n\n" + Error.message);
  }
}

// ==========================
// EDIT STUDENT
// ==========================

async function EditStudent(Id) {
  try {
    console.log("Editing Database ID:", Id);

    const Response = await fetch(Api + "/" + Id);

    if (!Response.ok) {
      throw new Error("Student not found");
    }

    const Student = await Response.json();

    console.log("Student received:", Student);

    // ==========================
    // STORE DATABASE ID
    // ==========================

    DatabaseId = Student.databaseId;

    // ==========================
    // DISPLAY STUDENT ID
    // ==========================

    document.getElementById("studentId").value = Student.studentId;

    // ==========================
    // DISPLAY NAME
    // ==========================

    document.getElementById("name").value = Student.name;

    // ==========================
    // DISPLAY AGE
    // ==========================

    document.getElementById("age").value = Student.age;

    // ==========================
    // DISPLAY GENDER
    // ==========================

    document.getElementById("gender").value = Student.gender;

    // ==========================
    // EDIT MODE
    // ==========================

    EditMode = true;

    document.getElementById("saveBtn").innerHTML = "Update Student";

    document.getElementById("name").focus();
  } catch (Error) {
    console.error("Edit Error:", Error);

    alert("Unable To Load Student\n\n" + Error.message);
  }
}

// ==========================
// DELETE STUDENT
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

      await LoadStudents();
    } else {
      const ErrorText = await Response.text();

      console.error(ErrorText);

      alert("Unable To Delete Student");
    }
  } catch (Error) {
    console.error("Delete Error:", Error);

    alert("Server Error");
  }
}

// ==========================
// CLEAR FORM
// ==========================

function ClearForm() {
  document.getElementById("studentId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("age").value = "";

  document.getElementById("gender").value = "";

  DatabaseId = null;

  EditMode = false;

  document.getElementById("saveBtn").innerHTML = "Save Student";
}

// ==========================
// SEARCH
// ==========================

function SearchStudent() {
  const Keyword = document.getElementById("search").value.toLowerCase();

  const Rows = document.querySelectorAll("#studentTable tr");

  Rows.forEach((Row) => {
    const Text = Row.innerText.toLowerCase();

    Row.style.display = Text.includes(Keyword) ? "" : "none";
  });
}

// ==========================
// HOME
// ==========================

function GoHome() {
  window.location.href = "index.html";
}

// ==========================
// AUTO REFRESH
// ==========================

setInterval(function () {
  LoadStudents();
}, 30000);

// ==========================
// ENTER KEY
// ==========================

document.addEventListener("keydown", function (Event) {
  if (Event.key === "Enter") {
    const Active = document.activeElement;

    if (Active.id === "name" || Active.id === "age" || Active.id === "gender") {
      SaveStudent();
    }
  }
});
