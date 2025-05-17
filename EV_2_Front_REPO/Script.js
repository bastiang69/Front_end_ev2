const students = [];
const table = document.getElementById("studentsTable");
const tableBody = table.querySelector("tbody");
const form = document.getElementById("studentForm");
const averageDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const firstName = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);

  if (!firstName || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
    alert("Error al ingresar datos. Verifique las calificaciones.");
    return;
  }

  const student = {
    firstName: firstName,
    lastName: lastName,
    grade: grade
  };

  students.push(student);

  addStudentToTable(student, students.length - 1);

  calcularPromedio();
  this.reset();
  
});

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("eliminar-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));

    students.splice(index, 1);
    
    actualizarTabla();
    calcularPromedio();
  }
});

function addStudentToTable(student, index) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>
      <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">
        🗑️
      </button>
    </td>
  `;
  tableBody.appendChild(row);
}

function calcularPromedio() {
  if (students.length === 0) {
    averageDiv.textContent = "0.00";
    return;
  }

  const suma = students.reduce((acc, student) => acc + student.grade, 0);
  const promedio = suma / students.length;

  averageDiv.textContent = `${promedio.toFixed(2)}`;
}

function actualizarTabla() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    addStudentToTable(student, index);
  });
}
