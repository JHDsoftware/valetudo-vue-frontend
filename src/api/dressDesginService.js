import hillo from 'hillo'


//DressDesignController
export async function updateMyDesignParts (designId, dressPartIds) {
  return (await hillo.post('/dressDesign/' + `${designId}` + '/updateParts', {dressPartIds})).data
}






export async function loadDesign (id) {
  return (await hillo.get('/dressDesign/getById/' + id)).data
}

export async function createNewDesign (name) {
  return (await hillo.post('/dressDesign/createNew', {name})).data
}

export async function setDressComplete (id) {
  return (await hillo.post('/dressDesign/setComplete/' + id)).data
}

export async function getDressDesignList () {
  return (await hillo.post('/dressDesign/myList')).data
}

export async function deleteDress (id) {
  return (await hillo.post(`/dressDesign/setHidden/${id}`)).data
}

export async function paypalCapture (PayerID, token) {
  return (await hillo.get(`/dressDesign/paypal/capture?PayerID=${PayerID}&token=${token}`))
}

export async function myDesignListCount(){
  return (await hillo.post('/dressDesign/myListCount', {}))
}

export async function myDesignListComplete() {
  return (await hillo.post('/dressDesign/myListComplete'))
}
