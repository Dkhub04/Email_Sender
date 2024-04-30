import { CustomAxios } from "./helper"

export const sendemail = async (Emaildata)=>{

   const result = (await CustomAxios.post('/email/send' ,Emaildata)).data;

   return result;
}