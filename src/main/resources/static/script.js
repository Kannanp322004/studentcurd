const api = "/students";

let editMode = false;

// ==========================
// Page Load
// ==========================

window.onload = function () {
  loadStudents();

  document.getElementById("saveBtn").addEventListener("click", saveStudent);

  const search = document.getElementById("searchInput");

  if (search) {
    search.addEventListener("keyup", filterStudents);
  }
};

// ==========================
// Toast Notification
// ==========================

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.innerHTML = message;

  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// ==========================
// Add / Update Student
// ==========================

async function saveStudent() {
  const id = document.getElementById("studentId").value;

  const name = document.getElementById("name").value.trim();

  const age = document.getElementById("age").value;

  const gender = document.getElementById("gender").value;

  const department = document.getElementById("department").value.trim();

  if (
    id === "" ||
    name === "" ||
    age === "" ||
    gender === "" ||
    department === ""
  ) {
    showToast("⚠ Please fill all fields", "warning");
    return;
  }

  const student = {
    id: parseInt(id),
    name: name,
    age: parseInt(age),
    gender: gender,
    department: department,
  };

  try {
    let response;

    if (editMode) {
      response = await fetch(api + "/" + id, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      if (response.ok) {
        showToast("✏ Student Updated Successfully");
      }
    } else {
      response = await fetch(api, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      if (response.ok) {
        showToast("✅ Student Added Successfully");
      }
    }

    clearFields();

    loadStudents();
  } catch (error) {
    showToast("❌ " + error, "error");
  }
}
// ==========================
// Display Students
// ==========================

async function loadStudents() {
  try {
    const response = await fetch(api);

    const students = await response.json();
    animateCounter(students.length);

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    // Update Dashboard Count

    students.forEach((student) => {
      table.innerHTML += `
      <tr>

        <td>${student.id}</td>

        <td>${student.name}</td>

        <td>${student.age}</td>

        <td>${student.gender}</td>

        <td>${student.department}</td>

        <td>

          <button
            class="edit-btn"
            onclick="editStudent(${student.id})">
              ✏ Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteStudent(${student.id})">
              🗑 Delete
          </button>

        </td>

      </tr>
      `;
    });
  } catch (error) {
    showToast("❌ Unable to load students", "error");
  }
}

// ==========================
// Edit Student
// ==========================

async function editStudent(id) {
  try {
    const response = await fetch(api + "/" + id);

    const student = await response.json();

    document.getElementById("studentId").value = student.id;

    document.getElementById("name").value = student.name;

    document.getElementById("age").value = student.age;

    document.getElementById("gender").value = student.gender;

    document.getElementById("department").value = student.department;

    editMode = true;

    document.getElementById("saveBtn").innerHTML = "💾 Save Changes";

    document.querySelector(".form-card h3").innerHTML = "✏ Edit Student";

    document.getElementById("name").focus();
  } catch (error) {
    showToast("❌ Unable to load student", "error");
  }
}

// ==========================
// Modern Delete Confirmation
// ==========================

let deleteId = null;

function deleteStudent(id) {
  deleteId = id;

  document.getElementById("deleteModal").classList.add("show");
}

document.getElementById("cancelDelete").addEventListener("click", function () {
  document.getElementById("deleteModal").classList.remove("show");
});

document
  .getElementById("confirmDelete")
  .addEventListener("click", async function () {
    try {
      const response = await fetch(api + "/" + deleteId, {
        method: "DELETE",
      });

      if (response.ok) {
        showToast("🗑 Student Deleted Successfully");

        loadStudents();
      } else {
        showToast("❌ Delete Failed", "error");
      }
    } catch (error) {
      showToast("❌ Server Error", "error");
    }

    document.getElementById("deleteModal").classList.remove("show");
  });
// ==========================
// Clear Form
// ==========================

function clearFields() {
  document.getElementById("studentId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("age").value = "";

  document.getElementById("gender").value = "";

  document.getElementById("department").value = "";

  editMode = false;

  document.getElementById("saveBtn").innerHTML = "➕ Add Student";

  document.querySelector(".form-card h3").innerHTML = "Add New Student";
}

// ==========================
// Live Search
// ==========================

function filterStudents() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const rows = document.querySelectorAll("#studentTable tr");

  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();

    row.style.display = text.includes(keyword) ? "" : "none";
  });
}

// ==========================
// Enter Key Support
// ==========================

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const active = document.activeElement;

    if (
      active.id === "name" ||
      active.id === "age" ||
      active.id === "gender" ||
      active.id === "department"
    ) {
      saveStudent();
    }
  }
});

// ==========================
// Input Focus Animation
// ==========================

document.querySelectorAll(".form input, .from select").forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.transform = "scale(1.03)";
  });

  input.addEventListener("blur", () => {
    input.style.transform = "scale(1)";
  });
});

// ==========================
// Auto Refresh Every 30 Seconds
// ==========================

setInterval(() => {
  loadStudents();
}, 30000);

// ==========================
// Total Student Counter Animation
// ==========================

function animateCounter(total) {
  document.getElementById("totalStudents").innerHTML = total;
}
