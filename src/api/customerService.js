//CustomerController
import hillo from 'hillo'


const CUSTOMER_STR = '/customer'

export async function customerRegister (email, password, firstName, lastName, city, phone) {
  return await hillo.post(CUSTOMER_STR + '/register', {email, password, firstName, lastName, city, phone})
}

/**
 *
 * @param email
 * @return {Promise<number>}
 */
export async function customerCheckEmailRegistered (email) {
  return await hillo.post(CUSTOMER_STR + '/checkEmailRegistered', {email})
}

export async function customerConfirmRegister (uuid) {
  return await hillo.get(CUSTOMER_STR + '/confirmRegister/', {uuid})
}

export async function customerLogin (userName, password) {
  return (await hillo.post(CUSTOMER_STR + '/login', {userName, password})).data
}

export async function customerMe () {
  return await hillo.get(CUSTOMER_STR + '/me')
}

export async function customerInit (customer, weddingDate, likeAndHate, imgs) {
  return await hillo.post(CUSTOMER_STR + '/init', {customer, weddingDate, likeAndHate, imgs})
}

