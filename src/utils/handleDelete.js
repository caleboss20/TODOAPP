

  export function handleDelete(i,totalItems){
    const newItems = [...totalItems];
    newItems.splice(i, 1); 
    return newItems;
   
  }