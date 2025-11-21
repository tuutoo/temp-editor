export default defineEventHandler(async (event: any) => {
  try {
    // Read the multipart form data
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        message: "No file provided",
      });
    }

    // Find the file in form data
    const fileData = formData.find((item: any) => item.name === "file");

    if (!fileData) {
      throw createError({
        statusCode: 400,
        message: "File field is required",
      });
    }

    // Get configuration from environment variables
    const config = useRuntimeConfig();
    const fileStorage = config.fileStorage;

    // If using local storage, return a blob URL
    if (fileStorage === "local") {
      // Generate a unique ID for the file
      const id = crypto.randomUUID();

      // Convert buffer to base64 for blob URL
      const base64 = Buffer.from(fileData.data).toString("base64");
      const mimeType = fileData.type || "application/octet-stream";
      const blobUrl = `data:${mimeType};base64,${base64}`;

      return {
        id: id,
        url: blobUrl,
      };
    }

    // Otherwise, use Directus API
    // Create new FormData for the Directus API request
    const directusFormData = new FormData();
    const bearerToken = config.directusToken;
    const directusUrl = config.directusUrl;
    const folderId = config.directusFolderId;

    if (!bearerToken) {
      throw createError({
        statusCode: 500,
        message: "Directus token not configured",
      });
    }

    if (!directusUrl) {
      throw createError({
        statusCode: 500,
        message: "Directus URL not configured",
      });
    }

    if (!folderId) {
      throw createError({
        statusCode: 500,
        message: "Directus folder ID not configured",
      });
    }

    // Add folder ID
    directusFormData.append("folder", folderId);

    // Add the file as a Blob - convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(fileData.data);
    const blob = new Blob([uint8Array], {
      type: fileData.type || "application/octet-stream",
    });
    directusFormData.append("file", blob, fileData.filename || "file");

    // Upload to Directus
    const response = await $fetch<{ data: { id: string } }>(
      `${directusUrl}/files`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: directusFormData,
      }
    );

    // Return the response in the format UMO Editor expects: {id, url}
    return {
      id: response.data.id,
      url: `${directusUrl}/assets/${response.data.id}`,
    };
  } catch (error: any) {
    console.error("File upload error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "File upload failed",
    });
  }
});
