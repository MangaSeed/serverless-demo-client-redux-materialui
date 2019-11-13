import { API } from 'aws-amplify';

import { fileUpload, fileGet, fileDelete } from './file';

import { INotes } from '../containers/Note/Notes';

const ENDPOINT = 'notes';

export const addNote = async (content: string, attachment?: File) => {
  let fileKey: string | undefined;

  if (attachment) {
    const file = await fileUpload(attachment);
    fileKey = file.key;
  }

  return await API.post(ENDPOINT, '/notes', {
    body: {
      content,
      attachment: fileKey
    }
  });
};

export const fetchNotes = async (): Promise<INotes[]> => {
  return await API.get(ENDPOINT, '/notes', null);
};

export const fetchNote = async (id: string): Promise<INotes> => {
  const data: INotes = await API.get(ENDPOINT, `/notes/${id}`, null);

  if (data.attachment) {
    const fileAttachment = await fileGet(data.attachment);
    if (typeof fileAttachment === 'string') data.attachmentURL = fileAttachment;
  }

  return data;
};

export const deleteNote = async (id: string, fileName?: string) => {
  if (fileName) {
    await fileDelete(fileName);
  }

  await API.del(ENDPOINT, `/notes/${id}`, null);
};

export const updateNote = async (
  note: INotes,
  attachment?: File
): Promise<INotes> => {
  let fileKey = note.attachment;

  if (attachment) {
    if (fileKey) await fileDelete(fileKey);
    const file = await fileUpload(attachment);
    fileKey = file.key;
  }

  return await API.put(ENDPOINT, `/notes/${note.noteId}`, {
    body: { ...note, attachment: fileKey }
  });
};

export const billNote = async (storage: number, source: string) => {
  return await API.post(ENDPOINT, `/billing`, {
    body: {
      storage,
      source
    }
  });
};
