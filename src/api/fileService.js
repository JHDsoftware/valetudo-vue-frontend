import hillo from 'hillo'

export async function uploadFile(data) {
    await hillo.postWithUploadFile('/file/upload', data)
}

export async function getFile(id){
    await hillo.get('/file/get/'+id)
}