import { promises as fs } from "fs";

async function createDocument(fileName: string, document: string) {
  const baseAddress =
    "/Users/user/projects/my-projects/godot/learning-with-ghosts/data/lessons/";
  const filePath = baseAddress + fileName;
  await fs.writeFile(filePath, document);
}

async function readDocument(fileName: string) {
  console.log("#HERE process.cwd()", process.cwd());
}

export const fileServices = {
  createDocument,
  readDocument,
};
