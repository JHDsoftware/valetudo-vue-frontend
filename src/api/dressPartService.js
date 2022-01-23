import hillo from 'hillo'

const DressPartEndPoint = '/dressPart'

export async function refreshCurrentPartInfo (selectedDressPartIds) {
  return (await hillo.post(DressPartEndPoint + '/refreshCurrentPartInfo', {
    dressPartIds: selectedDressPartIds
  })).data
}

export async function getDressPartList () {
  return (await hillo.get(DressPartEndPoint + '/getList')).data
}
