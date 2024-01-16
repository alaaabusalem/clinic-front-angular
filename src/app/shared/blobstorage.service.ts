import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class BlobStorageService {
  private blobServiceClient: BlobServiceClient;
  private readonly accountName = 'projectsstorage2001'; // Replace with your actual storage account name
  private readonly sasToken = 'tE9f9Cb8N/YikaB+aghaOCaSwLikaFf9F6y/VABTYNDG4lhk1LedLmOY5ZRdlynGnAHa9LlyKKGy+ASt9kQhbg=='; // Replace with your actual SAS token

  constructor() {
    // Construct BlobServiceClient with SAS token
    this.blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net${this.sasToken}`);
  }

  private generateRandomFileName(): string {
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    return `file_${uniqueId}`;
  }

  async uploadBlob(content: Uint8Array): Promise<{ blobUrl: string; fileName: string }> {
    const fileName = this.generateRandomFileName();
    const containerClient = this.blobServiceClient.getContainerClient('recipeimages'); // Replace with your actual container name
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Upload binary content to Azure Blob Storage
    await blockBlobClient.upload(content, content.length);

    // Return the generated blob URL and file name
    return { blobUrl: blockBlobClient.url, fileName };
  }
}


  
  
  //private readonly containerName: string = 'recipeimages';
//accountName="projectsstorage2001";

    
    //const connectionString = "DefaultEndpointsProtocol=https;AccountName=projectsstorage2001;AccountKey=tE9f9Cb8N/YikaB+aghaOCaSwLikaFf9F6y/VABTYNDG4lhk1LedLmOY5ZRdlynGnAHa9LlyKKGy+ASt9kQhbg==;EndpointSuffix=core.windows.net";
    //this.blobServiceClient = new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net`);
        //this.blobServiceClient = new BlobServiceClient(connectionString);

