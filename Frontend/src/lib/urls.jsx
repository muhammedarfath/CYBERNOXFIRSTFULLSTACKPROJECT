import { backendUrl } from "../Constants/Constants";


const requests = {
    registeruser :`${backendUrl}/auth/users/`,
    getProfileFor :`${backendUrl}/auth/get-create-for/`,
    getGender :`${backendUrl}/auth/get-gender/`,
    checkProfile :`${backendUrl}/auth/check-user-details/`,
    getReligion :`${backendUrl}/auth/religions/`,
    getCast :`${backendUrl}/auth/castes/`,
    getMarital :`${backendUrl}/auth/marital/`,
    getTongue :`${backendUrl}/auth/mother-tongue/`,
    BodyType :`${backendUrl}/auth/bodytype/`,
    Education :`${backendUrl}/auth/educations/`,
    Employement :`${backendUrl}/auth/employements/`,
    Occupation :`${backendUrl}/auth/occupations/`,
    Income :`${backendUrl}/auth/annualincome/`,
    familyType :`${backendUrl}/auth/familytype/`,
    familyStatus :`${backendUrl}/auth/familystatus/`,
    profileGroomFamily :`${backendUrl}/auth/profile-groom-bride-family-create/`,
    fetchProfileDetails :`${backendUrl}/auth/fetch-profile-details/`,
    Posts :`${backendUrl}/auth/posts/`,
    UpdateProfile :`${backendUrl}/auth/update-profile/`,
    fetchUsers :`${backendUrl}/auth/fetch-users/`,
    fetchPhysicalStatus :`${backendUrl}/partner/fetch-physical-status/`,
    fetchDrinkingStatus :`${backendUrl}/partner/fetch-drinking-status/`,
    fetchSmokingStatus :`${backendUrl}/partner/fetch-smoking-status/`,
    fetchMaritalStatus :`${backendUrl}/partner/fetch-marital-status/`
}
export default requests