export const formatSlug = (title: string): string => {
    return title
      .toLowerCase() // convert to lowercase
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // remove special characters
      .replace(/-+/g, '-') // replace multiple hyphens with single hyphen
  }