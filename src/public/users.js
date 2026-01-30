function validateEntries(emailInput, nameInput) {

  nameValue = nameInput.value.trim();
  emailValue = emailInput.value.trim();


  if (!emailValue || !nameValue) {
    alert("Por favor completa todos los campos.");
    return false;
  }
  if (!emailInput.checkValidity()) {
    alert("Por favor ingresa un email válido.");
    return false;
  }
  if (nameValue.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres.");
    return false;
  }

  return true;
}


fetch("/api/users")
  .then((response) => response.json())
  .then((users) => {
    const tbody = document.getElementById("users-table");

    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.setAttribute("data-id", user.ID);
      tr.innerHTML = `
        <td>${user.ID}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
        <button class="delete-btn" data-id="${user.ID}">
         Eliminar
        </button>
        </td>
        <td>
        <button 
            class="edit-btn"
            data-id="${user.ID}"
            data-name="${user.name}"
            data-email="${user.email}">
            Editar
        </button>
        </td>`;

      tbody.appendChild(tr);
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", openEditModal);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", handleDelete);
    });
  });

function openEditModal(event) {
    const button = event.target;

    // 1. Esto te mostrará el objeto completo con todos los data-attributes
    console.log("Objeto Dataset completo:", button.dataset);

    // 2. Esto te mostrará un valor específico
    console.log("ID extraído:", button.dataset.id);
    
    //leer data-attributes
    const id = button.dataset.id;
    const name = button.dataset.name;
    const email = button.dataset.email;

    // cargar el formulario
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-email").value = email;

    //mostrar el modal
    document.getElementById("edit-modal").style.display = "block";

}
 document.getElementById("edit-form").addEventListener("submit", submitEdit);

function submitEdit(event) {
    event.preventDefault(); 

    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;

    // console.log(typeof email);
    // console.log(typeof name);
    if (!validateEntries(document.getElementById("edit-email"),document.getElementById("edit-name"))) {
        return;
    }

    fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email})
    })
    .then((response) => {
        if (!response.ok) throw new Error()
        return response.json();    
    })
    .then(() => {
        updateRowInTable(id, name, email);
        closeModal();
    })
    .catch((err) => {
        alert("Error al editar el usuario");
        console.error(err);
    })
}

function updateRowInTable(id, name, email) {
  const row = document.querySelector(`tr[data-id="${id}"]`);

  if (!row) {
    console.warn(`updateRowInTable: no row found for id=${id}`);
    return;
  }

  row.children[1].textContent = name;
  row.children[2].textContent = email;

  const editBtn = row.querySelector(".edit-btn")
  editBtn.dataset.name = name;
  editBtn.dataset.email = email;
}

function closeModal() {
    document.getElementById("edit-modal").style.display = "none";
}

document.getElementById("cancel-edit").addEventListener("click", closeModal);

function handleDelete(event) {
  const button = event.target;
  const userId = button.dataset.id;

  const confirmed = confirm(
    "¿Estás seguro de que deseas eliminar este usuario?",
  );
  if (!confirmed) return;

  fetch(`/api/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      const row = button.closest("tr");
      row.remove();
    })
    .catch((err) => {
      alert("No se pudo eliminar el usuario.");
      console.error(err);
    });
}
