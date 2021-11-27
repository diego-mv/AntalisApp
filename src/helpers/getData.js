export const getCurrentUser = () => (
     JSON.parse(localStorage.getItem('current_user'))
)

export const getCurrentRole =  () => (
    JSON.parse(localStorage.getItem('current_user')).role
)

export const getCurrentFullname=  () => (
    JSON.parse(localStorage.getItem('current_user')).fullname
)
