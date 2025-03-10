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
    editLanguages :`${backendUrl}/auth/update-languages/`,
    editLocation :`${backendUrl}/auth/update-present-location/`,
    editNumber :`${backendUrl}/auth/update-secondary-number/`,
    editTimeToCall :`${backendUrl}/auth/update-time-to-call/`,
    editAddress :`${backendUrl}/auth/update-full-address/`,
    editCompany :`${backendUrl}/auth/update-company-name/`,
    editExperience:`${backendUrl}/auth/update-experience/`,
    fetchReligiousness:`${backendUrl}/auth/fetch-reliousnes/`,
    updateReligiousness:`${backendUrl}/auth/update-religiousness/`,
    fetchPhysicalStatus :`${backendUrl}/partner/fetch-physical-status/`,
    fetchDrinkingStatus :`${backendUrl}/partner/fetch-drinking-status/`,
    fetchSmokingStatus :`${backendUrl}/partner/fetch-smoking-status/`,
    fetchMaritalStatus :`${backendUrl}/partner/fetch-marital-status/`,
    fetchHeightOptions:`${backendUrl}/partner/fetch-height-status/`,
    fetchBodyArt:`${backendUrl}/partner/fetch-body-art/`,
    fetchCookingSkill:`${backendUrl}/partner/fetch-cooking-status/`,
    fetchEatingHabits:`${backendUrl}/partner/fetch-eating-status/`,
    fetchExercise:`${backendUrl}/partner/fetch-exercise-status/`,
    UpdatePartner:`${backendUrl}/partner/update-partner-expectation/`,
    fetchReligiousnesServices :`${backendUrl}/auth/fetch-religious-services/`,
    updateReligiousnesServices :`${backendUrl}/auth/update-religiousnes-services/`,
    fetchPolygamyOptions :`${backendUrl}/auth/fetch-polygamy/`,
    editPolygamy :`${backendUrl}/auth/update-polygamy/`,
    getPoliticalViewOptions :`${backendUrl}/auth/fetch-political/`,
    editPoliticalView :`${backendUrl}/auth/update-political/`,
    fetchSkinColorOptions :`${backendUrl}/auth/fetch-skin-color/`,
    editSkinColor :`${backendUrl}/auth/update-skin-color/`,
    fetchBloodGroupOptions :`${backendUrl}/auth/fetch-blood-group/`,
    editBloodGroup :`${backendUrl}/auth/update-blood-group/`,
    getHairColorOptions :`${backendUrl}/auth/fetch-hair-color/`,
    editHairColor :`${backendUrl}/auth/update-hair-color/`,
    getHairTypeOptions :`${backendUrl}/auth/fetch-hair-type/`,
    editHairType :`${backendUrl}/auth/update-hair-type/`,
    editAppearance :`${backendUrl}/auth/update-appearance/`,
    getHomeTypeOptions :`${backendUrl}/auth/fetch-home-type/`,
    editHomeType :`${backendUrl}/auth/update-home-type/`,
    getLivingSituationOptions :`${backendUrl}/auth/fetch-living-situation/`,
    editLivingSituation :`${backendUrl}/auth/update-living-situation/`,
    editMotherName :`${backendUrl}/auth/update-mothername/`,
    getMessageUser :`${backendUrl}/auth/message-user/`,
    UpdateHobbies :`${backendUrl}/partner/update_hobbies/`,
    MarkAsRead :`${backendUrl}/auth/mark-as-read/`,
    
    SendOtp :`${backendUrl}/aadhaarotp/send-otp/`,
    VerifyOtp:`${backendUrl}/aadhaarotp/verify-otp/`,

    Messages:`${backendUrl}/socketconnection/messages/`,
    getMessage:`${backendUrl}/socketconnection/getmessage/`,
    UnreadNotification:`${backendUrl}/socketconnection/unread-notifications/`,
    readNotification:`${backendUrl}/socketconnection/mark-all-as-read/`,
    UnreadMessageCount:`${backendUrl}/socketconnection/message-unread-counts/`,

    Search:`${backendUrl}/auth/search/`,
    savePost:`${backendUrl}/auth/save-profile/`
}
export default requests  