const DepartmentApi = "/departments";
const StudentApi = "/students";

let SelectedDepartment = "";

// Page Load
window.onload = function () {
  LoadDepartments();

  document
    .getElementById("addDepartmentBtn")
    .addEventListener("click", OpenDepartmentModal);

  document
    .getElementById("saveDepartment")
    .addEventListener("click", SaveDepartment);

  document
    .getElementById("closeModal")
    .addEventListener("click", CloseDepartmentModal);

  document
    .getElementById("closeLogin")
    .addEventListener("click", CloseLoginModal);

  document
    .getElementById("loginButton")
    .addEventListener("click", LoginDepartment);
};

// ===============================
// Load Departments
// ===============================

async function LoadDepartments() {
  try {
    const response = await fetch(DepartmentApi + "/summary");

    const departments = await response.json();

    const table = document.getElementById("departmentTable");

    table.innerHTML = "";

    document.getElementById("totalDepartments").innerHTML = departments.length;

    let totalStudents = 0;

    departments.forEach((department) => {
      totalStudents += department.studentCount;

      table.innerHTML += `

            <tr>

                <td>${department.id}</td>

                <td>${department.departmentName}</td>

                <td>${department.studentCount}</td>

                <td>

                    <button
                        class="enter-btn"
                        onclick="OpenLogin('${department.departmentName}')">

                        Enter

                    </button>

                </td>

            </tr>

            `;
    });

    document.getElementById("totalStudents").innerHTML = totalStudents;
  } catch (error) {
    alert("Unable To Load Departments");
  }
}

// ===============================
// Department Modal
// ===============================

function OpenDepartmentModal() {
  document.getElementById("departmentModal").style.display = "flex";
}

function CloseDepartmentModal() {
  document.getElementById("departmentModal").style.display = "none";
}

// ===============================
// Save Department
// ===============================

async function SaveDepartment() {
  const departmentName = document.getElementById("departmentName").value.trim();

  const password = document.getElementById("departmentPassword").value.trim();

  if (departmentName == "" || password == "") {
    alert("Fill All Fields");

    return;
  }

  const department = {
    departmentName: departmentName,

    password: password,
  };

  const response = await fetch(DepartmentApi, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(department),
  });

  if (response.ok) {
    CloseDepartmentModal();

    document.getElementById("departmentName").value = "";

    document.getElementById("departmentPassword").value = "";

    LoadDepartments();
  }
}

// ===============================
// Login
// ===============================

function OpenLogin(departmentName) {
  SelectedDepartment = departmentName;

  document.getElementById("loginDepartmentTitle").innerHTML =
    departmentName + " Department";

  document.getElementById("loginPassword").value = "";

  document.getElementById("loginModal").style.display = "flex";
}

function CloseLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

// ===============================
// Verify Password
// ===============================

async function LoginDepartment() {
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(DepartmentApi + "/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      departmentName: SelectedDepartment,

      password: password,
    }),
  });

  const success = await response.json();

  if (success) {
    window.location.href =
      "student.html?department=" + encodeURIComponent(SelectedDepartment);
  } else {
    alert("Wrong Password");
  }
}
