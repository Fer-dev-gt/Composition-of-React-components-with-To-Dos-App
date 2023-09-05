import React from 'react';
import { useToDos } from './useToDos';
import { ToDoCounter } from '../ToDoCounter';
import { ToDoSearch } from '../ToDoSearch';
import { ToDoList } from '../ToDoList';
import { ToDoItem } from '../ToDoItem';
import { ToDosLoading } from '../ToDoLoading';
import { ToDosError } from '../ToDosError';
import { EmptyToDos } from '../EmptyToDos';
import { CreateToDoButton } from '../CreateToDoButton';
import { Modal } from '../Modal';
import { Footer } from '../Footer';
import { ToDoForm } from '../ToDoForm';
import { ToDoHeader } from '../ToDoHeader';

function App() {                                                                // Esto es un Componente de React, por convención se escriben con mayuscula
  const {
    loading, 
    error,
    searchedToDos,
    completeToDo, 
    deleteToDo,
    openModal,
    setOpenModal,
    validatingToDo,
    completedToDos,
    totalToDos,
    searchValue,
    setSearchValue,
    addToDo,
    newToDoValue,
    setNewToDoValue,
  } = useToDos();                                                               // Importamos los States, funciones y props que vamos a usar en la lógica de la UI de un Custom Hook y ya no seguiremos usando el React Context

  return (                                                                      // Esto es lo que retorna nuestro Componente, son sus elementos internos, NO ES UN COMPONENTE, lo de abajo NO ES HTML, es JSX una sintaxis que facilita la lectura de código y luego se reenderiza a HTML clásico
    <>                                                                          { /* Aqui vamos a implementar la Composición de Componentes para que ya no tengamos problemas de 'props drilling' o usar React Context, pasamos los valores directamente a los Componentes que los van a consumir */ }
      <h1>To-Do's Goals</h1>
      <ToDoHeader>                                                              { /* Creamos un nuevo Componente para ya no usar React Context en multiples Componentes. Esto lo logramos al hacer una buen 'Composición de Componentes'*/}
        <ToDoCounter 
          completedToDos={completedToDos}
          totalToDos={totalToDos}
          loading={loading}
        />
        <ToDoSearch 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          loading={loading}
        />  
      </ToDoHeader>        

      <ToDoList                                                               // Ahora en vez de imprementar Render Functions para decidir la logica del render ahora usaremos Render Props para que dentro del Componente <ToDolist> se decida que se va a hace render
        error={error}                                                         // Mandamos los States como propiedades que seran usados para la lógica del Render dentro del Componenete ToDoList
        loading={loading}
        searchedToDos={searchedToDos}
        searchText={searchValue}
        totalToDos={totalToDos}

        onError={() => <ToDosError />}                                        // Ya no haremos esta lógica acá como una Render Function, en su lugar vamos a declarar una Render Prop para que esta función se ejecute dentro del Componente al que se envia
        onEmptyToDos={() => <EmptyToDos />}                                   
        onEmptySearchResults={(searchText) => 
          <p>No hay resultados para: {searchText}</p>
        }
        onLoading={() =>                                                      // Dentro de una Render Prop podemo mandar a que se Renderizen varios Components de una vez siempre y cuando este envuelta en un React.Frangmet o <></>
        <>
          <ToDosLoading />
          <ToDosLoading />
          <ToDosLoading />
        </> }

        // render={toDo => (                                                     // Creamos la propiedad 'render' que se engargara de Reenderizar cada Componente que tiene adentro segun el Array con el método map que retorna y muestra los ToDos que fueron buscados en el buscador, si el buscador esta vacío muestra todo los ToDos guardados
        //   <ToDoItem 
        //     key={ toDo.text } 
        //     text={ toDo.text }                                                // Muestra el texto del ToDo correspondiente
        //     completed={ toDo.completed }                                   
        //     onComplete={ () => completeToDo(toDo.text) }                      // Guardamos la función que ejecutará el completado de un ToDo, recibe como parámetro el texto del ToDo para poder ubicarlo en el Array de Object
        //     onDelete={ () => deleteToDo(toDo.text) }                          // Guardamos la función que ejecutará la elinación de un Todo, recibe como parámetro el texto del ToDo para poder ubicarlo en el Array de Object
        //   />
        // )}
      >
      {toDo => (                                                     
          <ToDoItem 
            key={ toDo.text } 
            text={ toDo.text }                                                
            completed={ toDo.completed }                                   
            onComplete={ () => completeToDo(toDo.text) }                     
            onDelete={ () => deleteToDo(toDo.text) }                         
          />
        )}  
      </ToDoList>

      <CreateToDoButton
        setOpenModal={setOpenModal}
      />

      {openModal && (                                                         // Si el valor de 'openModal' es true renderizamos el componente 'Modal' que tiene adentro el 'ToDoForm' para agregar un nuevo ToDo
        <Modal>
          <ToDoForm 
            validatingToDo={validatingToDo} 
            setOpenModal={setOpenModal}
            addToDo={addToDo}
            newToDoValue={newToDoValue}
            setNewToDoValue={setNewToDoValue}
          />
        </Modal>
      )}
      <Footer />
    </>
  );
}

export default App;                                                         // Forma de exportar un Component por defecto