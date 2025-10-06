import { Client, Databases, Storage, Account, ID } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('687fae4d000b0baf3ce7'); // Replace with your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);