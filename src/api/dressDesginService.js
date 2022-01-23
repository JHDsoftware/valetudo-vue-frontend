import hillo from 'hillo'

const DressDesignEndPoint = '/dressDesign'

//DressDesignController
export async function updateMyDesignParts (designId, dressPartIds) {
  return (await hillo.post(DressDesignEndPoint + '/' + `${designId}` + '/updateParts', {dressPartIds})).data
}

export async function completeDesign (id) {
  return (await hillo.post(DressDesignEndPoint + '/setComplete/' + `${id}`)).data
}

export async function placeSampleOrder (id, quantity, deliveryAddress, billingAddress) {
  return (await hillo.post(DressDesignEndPoint + '/placeSampleOrder/' + `${id}`, {
    quantity, deliveryAddress, billingAddress
  })).data
}

export async function loadDesign (id) {
  return (await hillo.get(DressDesignEndPoint + '/getById/' + id)).data
}

export async function createNewDesign (name) {
  return (await hillo.post(DressDesignEndPoint + '/createNew', {name})).data
}

export async function setDressComplete (id) {
  return (await hillo.post(DressDesignEndPoint + '/setComplete/' + id))
}
