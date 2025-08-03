//agregar const de los html

const inputTarea = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#totalTareas");
const tareasRealizadas = document.querySelector("#tareasRealizadas");

let tareas = [];

// Función para render
function renderizarTareas() {
  listaTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");

    // Si está completada, tachar o marcar
    const estilo = tarea.completado
      ? "style='text-decoration: line-through;'"
      : "";

    li.innerHTML = `
      <span ${estilo}>[ID: ${tarea.id}] ${tarea.descripcion}</span>
      <button class="btn-cambiar" data-id="${tarea.id}">✅</button>
      <button class="btn-eliminar" data-id="${tarea.id}">🗑️</button>
    `;

    listaTareas.appendChild(li);
  });

  totalTareas.textContent = tareas.length;
  tareasRealizadas.textContent = tareas.filter((t) => t.completado).length;

  //  cambiar estado y eliminar
  document.querySelectorAll(".btn-cambiar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const tarea = tareas.find((t) => t.id === id);
      if (tarea) {
        tarea.completado = !tarea.completado;
        renderizarTareas();
      }
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      tareas = tareas.filter((t) => t.id !== id);
      renderizarTareas();
    });
  });
}

// Evento para agregar tarea nueva
btnAgregar.addEventListener("click", () => {
  const descripcion = inputTarea.value.trim();
  if (descripcion === "") return;

  tareas.push({
    id: Date.now(),
    descripcion: descripcion,
    completado: false,
  });

  inputTarea.value = "";
  renderizarTareas();
});

renderizarTareas();
