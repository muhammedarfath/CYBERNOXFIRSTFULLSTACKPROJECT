import { backendUrl } from "../Constants/Constants";


const requests = {
    registeruser :`${backendUrl}/auth/users/`,
    getProfileFor :`${backendUrl}/auth/get-create-for/`,
    getGender :`${backendUrl}/auth/get-gender/`,

}
export default requests