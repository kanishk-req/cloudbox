# CloudBox API Documentation

CloudBox is a web-based application that provides storage and file management services similar to Google Drive. This API documentation outlines the endpoints and functionality available for interacting with the CloudBox API.

To access the CloudBox API, you will need a `secret-token` which will be provided to you. All API endpoints are accessed using the following base URL: `https://cloudbox.ikanishk.me`.

## Smart Share

CloudBox offers a feature called "Smart Share" where users can create time-limited links for sharing files or folders. This feature is accessible through the CloudBox API, although the specific endpoint for creating a smart share link is not provided in this documentation.

Please refer to the CloudBox API documentation for further details on the smart share feature and its corresponding API endpoint.

## Authentication

All API requests must be authenticated using the `secret-token` provided to you. The `secret-token` should be included in the request headers as follows:

## API Endpoints

### Get User's Photos

Endpoint: `GET /api/{secret-token}/getPhotos/`

This endpoint retrieves all photos associated with the user's CloudBox account.

### Upload Photo

Endpoint: `POST /api/{secret-token}/postPhotos/`

This endpoint allows the user to upload a new photo to their CloudBox account.

### Get Folder

Endpoint: `GET /api/{secret-token}/getFolder/`

This endpoint retrieves all folders associated with the user's CloudBox account.

### Create Folder

Endpoint: `POST /api/{secret-token}/postFolder/`

This endpoint allows the user to create a new folder in their CloudBox account.

### Get Documents

Endpoint: `GET /api/{secret-token}/getDocs/`

This endpoint retrieves all documents associated with the user's CloudBox account.

### Upload Document

Endpoint: `POST /api/{secret-token}/postDocs/`

This endpoint allows the user to upload a new document to their CloudBox account.
