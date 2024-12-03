import { IncomingMessage } from 'http';
import { Fields, Files, File } from 'formidable';

// Extension du type IncomingForm
declare module 'formidable' {
  interface IncomingForm {
    parse: <FieldKey extends string, FileKey extends string>(
      request: IncomingMessage,
      callback?: (err: any, fields: Fields<FieldKey>, files: Files<FileKey>) => void
    ) => void;
    uploadDir: string;
    keepExtensions: boolean;
  }

  // Optionnellement, tu peux aussi déclarer le type de "file" pour éviter l'usage d'`any`
  interface File {
    newFilename: string;
    originalFilename: string;
    fileSize: number;
  }
}
