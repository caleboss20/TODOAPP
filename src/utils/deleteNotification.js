 export function handleNotifydelete(notifications,i){
  const newNotification=[...notifications];
  newNotification.splice(i,1);
  return newNotification;

  
 }
  
   