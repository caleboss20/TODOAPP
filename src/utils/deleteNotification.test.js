import {expect,it,describe} from "vitest";
import { handleNotifydelete } from "./deleteNotification";


 describe("deleteNotification",()=>{
  it("delete the notification at the given index",()=>{
 const notifications=[
    {message:"first"},
    {message:"second"},
    {message:"third"},
   ];
   const result=handleNotifydelete(notifications,1);
  expect(result).toEqual([
    {message:"first"},
    {message:"third"}
  ])
})
 })