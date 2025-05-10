import { promises as fs } from "fs";

async function createDocument(
  path: string,
  fileName: string,
  document: string
) {
  const filePath = path + fileName;
  await fs.writeFile(filePath, document);
}

async function readDocument(fileName: string) {
  throw new Error("Not implemented");
}

export const fileServices = {
  createDocument,
  readDocument,
};
