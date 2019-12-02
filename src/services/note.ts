import { API } from 'aws-amplify';

import { fileUpload, fileGet, fileDelete } from './file';

import { INote } from '../store/reducers/note';

const ENDPOINT = 'notes';

export const addNote = async (note: string, attachment?: File) => {
  let fileKey: string | undefined;

  if (attachment) {
    const file = await fileUpload(attachment);
    fileKey = file.key;
  }

  const { data } = await API.post(ENDPOINT, '/notes', {
    body: {
      content: note,
      attachment: fileKey,
    },
  });

  return data;
};

export const fetchNotes = async (): Promise<INote[]> => {
  const { data } = await API.get(ENDPOINT, '/notes', null);
  return data;
};

export const fetchNote = async (id: string): Promise<INote> => {
  const { data }: { data: INote } = await API.get(
    ENDPOINT,
    `/notes/${id}`,
    null
  );

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
  note: INote,
  attachment?: File | null
): Promise<INote> => {
  let fileKey = note.attachment;

  if (attachment) {
    if (fileKey) await fileDelete(fileKey);
    const file = await fileUpload(attachment);
    fileKey = file.key;
  }

  const { data } = await API.put(ENDPOINT, `/notes/${note.noteId}`, {
    body: { ...note, attachment: fileKey },
  });

  return data;
};

export const billNote = async (storage: number, source: string) => {
  return await API.post(ENDPOINT, `/billing`, {
    body: {
      storage,
      source,
    },
  });
};
