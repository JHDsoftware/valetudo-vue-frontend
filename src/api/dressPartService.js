import hillo from 'hillo'

export async function refreshCurrentPartInfo (selectedDressPartIds) {
  return (await hillo.post('/dressPart/refreshCurrentPartInfo', {
    dressPartIds: selectedDressPartIds
  })).data
}

export async function getDressPartList () {
  return (await hillo.get('/dressPart/getList')).data
}
