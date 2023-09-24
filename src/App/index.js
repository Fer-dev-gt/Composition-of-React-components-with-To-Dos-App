import React from 'react';
import { ChangeAlertWithStorageListener } from '../ChangeAlert';
import { CreateToDoButton } from '../CreateToDoButton';
import { EmptyToDos } from '../EmptyToDos';
import { Footer } from '../Footer';
import { Modal } from '../Modal';
import { ToDoCounter } from '../ToDoCounter';
import { ToDoForm } from '../ToDoForm';
import { ToDoHeader } from '../ToDoHeader';
import { ToDoItem } from '../ToDoItem';
import { ToDoList } from '../ToDoList';
import { ToDoSearch } from '../ToDoSearch';
import { ToDosError } from '../ToDosError';
import { ToDosLoading } from '../ToDoLoading';
import { useToDos } from './useToDos';

function App() {                                                                // Esto es un Componente de React, por convención se escriben con mayuscula.
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
    sincronizedToDos
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
          totalToDos={totalToDos}
        />  
      </ToDoHeader>        

      <ToDoList                                                               // Ahora en vez de imprementar Render Functions para decidir la logica del render ahora usaremos Render Props para que dentro del Componente <ToDolist> se decida que se va a hace render
        error={error}                                                         // Mandamos los States como propiedades que seran usados para la lógica del Render dentro del Componenete ToDoList
        loading={loading}
        searchedToDos={searchedToDos}
        searchText={searchValue}
        totalToDos={totalToDos}

        onError={() => <ToDosError />}                                        // Ya no haremos esta lógica acá como una Render Function, en su lugar vamos a declarar una Render Prop para que esta función se ejecute dentro del Componente al que se envia
        onEmptyToDos={() => <EmptyToDos setOpenModal={setOpenModal} />}                                   
        onEmptySearchResults={(searchText) => 
          <p>No hay resultados para: {searchText}</p>
        }
        onLoading={() =>                                                      // Dentro de una Render Prop podemo mandar a que se Renderizen varios Components de una vez siempre y cuando este envuelta en un React.Frangmet o <></>
        <>
          <ToDosLoading />
          <ToDosLoading />
          <ToDosLoading />
        </> }
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
        totalToDos={totalToDos}
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

      <ChangeAlertWithStorageListener 
        sincronize={sincronizedToDos}
        totalToDos={totalToDos}
      />
      <Footer totalToDos={totalToDos}/>
    </>
  );
}

export default App;                                                         // Forma de exportar un Component por defecto