import { Client, Databases, Storage, Account } from 'appwrite';

export const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://nyc.cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '';

if (!projectId && typeof window !== 'undefined') {
  console.warn('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set. See .env.example.');
}

client
  .setEndpoint(endpoint)
  .setProject(projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);