export default defineEventHandler(async (event: any) => {
  try {
    // Get file ID from route params
    const id = getRouterParam(event, "id");

    if (!id || id === "undefined") {
      throw createError({
        statusCode: 400,
        message: "File ID is required and cannot be undefined",
      });
    }

    // Get configuration from environment variables
    const config = useRuntimeConfig();
    const fileStorage = config.fileStorage;

    // If using local storage, just return success (no real deletion needed for blob URLs)
    if (fileStorage === "local") {
      return {
        success: true,
        message: "File deleted successfully (local mode)",
      };
    }

    // Otherwise, use Directus API
    const bearerToken = config.directusToken;
    const directusUrl = config.directusUrl;

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

    // Delete file from Directus using DELETE method
    await $fetch(`${directusUrl}/files/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return {
      success: true,
      message: "File deleted successfully",
    };
  } catch (error: any) {
    console.error("File delete error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "File delete failed",
    });
  }
});
