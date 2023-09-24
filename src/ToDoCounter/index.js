import React from 'react';
import './ToDoCounter.css';                                             

function ToDoCounter({ completedToDos, totalToDos, loading }) {                                   // Destructuramos la importacion de los 'props', 'props' es un Objeto que tiene distintas propiedades, antes usamos React Context pero ahora usaremos Composición de Componentes

  const progressPercent = totalToDos > 0 ? Math.round(completedToDos / totalToDos * 100) : 0;     // Calculamos el porcentage de los ToDos que se han completado

  return(
    totalToDos > 0 ?                                                                              // Solo renderizamos el contador si tenemos ToDos
      completedToDos === totalToDos ?                                                               // Si completamos todos los ToDos renderizamos un mensaje de felicitacion
      <div className='ToDoCounter'>
        <span className={`bold ${!!loading && "ToDoCounter--loading"}`}>You've completed all <br></br>🥳 your ToDo'S 🥳</span>
        <div className={`bar ${!!loading && "bar--loading"}`}>
            <div className="progress" style={{width: `${progressPercent}%`}}></div>
        </div>
      </div>
      :                                                                                             // Si todavia faltan ToDos por completar mostramos el avance que tiene el usuario
      <div className="ToDoCounter">                                                                 
        <span>You have completed </span>
        <span className='bold'>{completedToDos} / {totalToDos}</span> 
        <span> To Do's</span>
        <div className="bar">
          <div className="progress" style={{width: `${progressPercent}%`}}></div>
        </div>
      </div>
    :                                                                                               // Si no hay ToDos renderizamos un mensaje de que no hay ToDos
    <div></div>
  );
}

export { ToDoCounter };                                                                           // Hacemos un "export nombrado" usando '{}' en vez de hacer un "default export"