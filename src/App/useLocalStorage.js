import React from 'react';

function useLocalStorage(itemName, initialValue){                                 // Definimos un 'Custom Hook' para acceder a los datos guardados en LocalStorage
  const [sincronizedItem, setSincronizedItem] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);                             // Creamos un State "artificial" de 'loading' con valor inicial a 'true' para que muestre un 'Loading Skeleton' mientras obtenemos los valores de los ToDos del LocalStorage
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => {                                                         // El 'useEffect()' hook recibe una funcion y un Array, si es un Array vacio solo se ejecuta una vez
    setTimeout(() => {                                                            // Simulamos una solicitud a una API de 500 milisegundos de tiempo de espera
      try {
        const localStorageItem = localStorage.getItem(itemName);                  // Tratamos de obtener los valores guardados en el LocalStorage guardado en el nombre que le enviamos ('ToDos_V1')
        let parsedItem;
        if (!localStorageItem) {                                                  // Si no devolvio ningun valor entonces le ponemos como 'initialValue' un Array vacío
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);                              // Si '.getItem(itemName)' devuelve un valor lo convertimos a formato JSON
          setItem(parsedItem);                                                    // Y cambiamos el State de 'Item' con 'setItem' lo que provoca que se vuelva a renderizar el componente
        }
        setLoading(false);                                                        // Cambiamos el valor del State 'loading' a False
        setSincronizedItem(true);
      } catch(error) {
        setLoading(false);
        setError(true);                                                           // Si hay un error actualizamos el State y se lo mostramos al usuario
      }
    }, 500)
  }, [sincronizedItem]);

  const saveItem = (newItem) => {                                                 // Función para guardar un nuevo ToDo en el LocalStorage y actualizar el State
    localStorage.setItem(itemName, JSON.stringify(newItem))                       // Guardamos el valor del 'newItem' en formato 'JSON.stringify' al Object con nombre 'itenName' ('ToDos_V1')
    setItem(newItem)                                                              // Actualizamos el State con el valor de 'newItem'
  };

  const sincronizeItem = () => {
    setLoading(true);
    setSincronizedItem(false);
  };

  return {
    item, 
    saveItem,
    loading,
    error,
    sincronizeItem 
  };
}

export { useLocalStorage };                                                       // Exportamos este Componente en especifico