import React from "react";
import { useLocalStorage } from "./useLocalStorage";


function useToDos() {                                                                     // Convertiremos este Provider en un Custom Hook, ya que no envolvera al Componente App ya no es necesario aplicar la lóciga de desctructuración de 'children'. Este Custom Hook puede consumir otros Custom Hooks como 'useLocalStorage'
  const {
    item: toDos,                                                                          // Array de items guardados en LocalStorage le cambiamos el nombre a 'toDos'
    saveItem: saveToDos,                                                                  // Le cambiamos el nombre al método 'saveItem' a 'saveToDos'
    sincronizeItem: sincronizedToDos,
    loading,                                                                            
    error
  } = useLocalStorage('ToDos_V1', []);                                                    // Usamos este Hook para obtener los Items de ToDos guardados en LocalStorage, le mandamos el nombre del Object que buscamos y un Array vacio como valor inicial si no existen datos registrados

  const [searchValue, setSearchValue] = React.useState('');                               // Definimos un estado (dentro de un array), el estado no solo se consume tambien se actualiza el estado es inmutable, le damos valor inicial de ''
  const [openModal, setOpenModal] = React.useState(false);
  const [newToDoValue, setNewToDoValue] = React.useState('');
  const [validStatus, setValidStatus] = React.useState(false);
  
  const completedToDos = toDos.filter(toDo => !!toDo.completed).length;                   // Usamos el método filter y lenght (con doble !! para que sean boolenas) para obtener el número de To Do's completadas
  const totalToDos = toDos.length;                                                        // Guardamos el valor de cuantos item ToDo tenemos guardados en el Array
  
  const searchedToDos = toDos.filter(toDo => toDo.text.toLowerCase().includes(            // Guardamos en un Array los ToDos que coinciden con un 'searchValue'
    searchValue.toLowerCase())
  );

  const addToDo = (text) => {                                                             // Funcion que agrega un nuevo ToDo al Array de Objecto con los 'newToDos', recibe el valor del 'text' del nuevo ToDo
    const newToDos = [...toDos];                                                          // Hacemos una copia que no afecta el valor por referencia del Array 'toDos' original                          
    newToDos.push({                                                                       // Agregamos un nuevo Object al Array con el value del 'text' y la propiedad de 'completed' a false por defecto ya que es un ToDo recien agregado
      text,
      completed: false,
    });
    saveToDos(newToDos);                                                                  // Mandamos este nuevo Array de Objects para que sea guardado en LocalStorage al ejecutar esta función
    setNewToDoValue('');                                                                  // Reiniciamos el valor del 'newToDoValue' a un String vacío
  };

  const validatingToDo = (text) => {
    const newToDos = [...toDos];                                                          // Copiamos el Array
    const toDoIndex = newToDos.findIndex( (toDo) => toDo.text === text );                 // Guardamos el Index del ToDo que aparece ya registrado, osea esta repetido, si no hay repetidos devuelve -1

    if (toDoIndex !== -1) {                                                               // Si ya existe el texto de ese ToDo guardado le decimos al usuario que no puede ingresar ToDos repetidos
      setValidStatus(!validStatus);                                                       // Volteamos el valor de 'validStatus'
      alert(`This To Do "${text}" already exists`);
      setNewToDoValue('');                                                                // Reiniciamos el valor del 'newToDoValue' a un String vacío, lo que borra el texto que ha escrito el usuario
    }
  }

  const completeToDo = (text) => {                                                        // Función que cambia el State de 'toDos' en el apartado de 'completed' de false a true
    const newToDos = [...toDos];                                                          // Creamos una copia del Array 'ToDos' usando destructuración [...]
    const toDoIndex = newToDos.findIndex( (toDo) => toDo.text === text );                 // Encontramos el index del elemento del Array de ToDos que queremos cambiar su estado de 'completed'
    const toDo = newToDos[toDoIndex]                                                      // Obtenemos el Object del Array al usar el 'toDoIndex'

    newToDos[toDoIndex].completed = !newToDos[toDoIndex].completed;                       // Cambiamos el valor de 'completed' ya sea a false o true dependiendo de su valor anterior, es un 'toggle'
    newToDos.splice(toDoIndex, 1)                                                         // Usando el método de Arrays '.splice()' removemos el Object del ToDo del Array 'newToDos'

    toDo.completed ? newToDos.push(toDo) : newToDos.unshift(toDo);                        // Si el valor de 'completed' del Object es true lo agregamos al final del Array 'newToDos' si es false lo agregamos al inicio del Array (usande el Array método '.unshift()')
    saveToDos(newToDos);                                                                  // Mandamos este nuevo Array de Objects para que sea guardado en LocalStorage al ejecutar esta función
  };

  const deleteToDo = (text) => {                                                          // Función que crea un nuevo Array de los toDos sin el ToDo que le dimos X para eliminar
    const newToDos = [...toDos];                                                          // Copiamos el Array de Objects sin afectar el valor por referencia
    const toDoIndex = newToDos.findIndex( (toDo) => toDo.text === text );                 // Encontramos y guardamos el Index del ToDo que queremos eliminar

    newToDos.splice(toDoIndex, 1);                                                        // Quitamos el ToDo seleccionado con la X del Array de ToDos que luego va a actualizar el State
    saveToDos(newToDos);                                                                  // Ejecutamos la función para guardar el nuevo Array de ToDos sin el ToDo eliminado y actualizamos el State
  };  

  return {                                                                                // En vez de retornar los valores, States, y funciones como un 'value' del Provider de un Context, ahora simplemente los devolvemos como un Objeto normal para que el Componente App lo consuma haciendo Composición de Componentes
    loading, 
    error,
    completedToDos, 
    totalToDos, 
    searchValue,
    setSearchValue,
    searchedToDos, 
    addToDo,
    completeToDo, 
    deleteToDo,
    openModal,
    setOpenModal,
    validatingToDo,
    newToDoValue,
    setNewToDoValue,
    sincronizedToDos
  };
}

export { useToDos };                                                                    // Ya no vamos a retornar el context ahora será un Custom Hook nada mas