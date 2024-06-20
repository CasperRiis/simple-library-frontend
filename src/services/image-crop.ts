import noImagePlaceholder from "../assets/no-image-placeholder.webp";

const getCroppendImageUrl = (url: string) => {
  if (!url) return noImagePlaceholder;
  return url;

  // if (!url) return noImagePlaceholder;
  // return url.replace("media/books", "media/crop/600/400/books");
};

export default getCroppendImageUrl;
