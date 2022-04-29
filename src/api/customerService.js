//CustomerController
import hillo from 'hillo'

// const redirectUrl = 'http://localhost:8080/#/registerComplete'
// const redirectUrl = 'http://valetudo.aaden.online/#/Login'

const redirectUrl = document.location.href + '#/registerComplete'

export async function customerRegister (registerData) {
  return await hillo.post('/customer/register', registerData, {
    params: {
      mailRedirect: redirectUrl
    }
  })
}

/**
 *
 * @param email
 * @return {Promise<number>}
 */
export async function customerCheckEmailRegistered (email) {
  return await hillo.post('/customer/checkEmailRegistered', {email})
}

export async function customerForgetPassword (email) {
  return await hillo.post('/customer/forgetPassword', {email})
}

export async function customerConfirmRegister (uuid) {
  return await hillo.get('/customer/confirmRegister/', {uuid})
}

export async function customerLogin (userName, password) {
  return (await hillo.post('/customer/login', {userName, password}))
}

export async function customerMe () {
  return await hillo.get('/customer/me')
}

export async function customerEditMe (data) {
  return await hillo.post('/customer/editMe', data)
}

export async function customerUploadDressOrderAddress (data) {
  return await hillo.post('/customer/uploadDressOrderAddress', data)
}

export async function customerChangePassword ({oldPassword, newPassword}) {
  return await hillo.post('/customer/changePassword', {oldPassword, newPassword})
}

export async function customerChangeEmail (email) {
  return await hillo.post('/customer/changeEmail', email)
}

export async function customerInit (customer, weddingDate, likeAndHate, imgs) {
  return await hillo.post('/customer/init', {customer, weddingDate, likeAndHate, imgs})
}

export async function resetPassword ({token, newPassword}) {
  return await hillo.post('/customer/resetPassword', {token, newPassword})
}


export async function contactUsUpdate (id, data) {
  return await hillo.post('/contactUs/' + `${id}` + '/update', data)
}

export async function contactUsAdd (data) {
  return await hillo.post('/contactUs/add', data)
}

export async function changeDressName (id, name) {
  return await hillo.post(`/dressDesign/changeName/${id}`, {name})
}
