import { Storage } from 'aws-amplify'

export const fileUpload = async (file: File) => {
  const name = `${Date.now()}-${file.name}`
  return await Storage.vault.put(name, file, {
    contentType: file.type
  })
}

export const fileGet = async (key: string) => {
  return await Storage.vault.get(key)
}

export const fileDelete = async (key: string) => {
  return await Storage.vault.remove(key)
}
