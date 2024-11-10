import cookierCutter from "./cookie-cutter";

export const getGrantIdCookie = () => cookierCutter.get('nylas_user_grant_id')

export const removeGrantIdCookie = () => cookierCutter.set('nylas_user_grant_id', undefined, { expires: new Date(0) })

export const getUserEmailCookie = () => cookierCutter.get('nylas_user_email')