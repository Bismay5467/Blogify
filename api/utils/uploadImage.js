import { DEFAULT_IMAGE } from "../constants.js";

export const getDataURIFromImage = (image) => {
  try {
    const mimetype = image.mimetype;
    const base64Data = image.data.toString("base64");
    const dataURI = `data:${mimetype};base64,${base64Data}`;
    return dataURI;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return "";
  }
};

export const getImageLinkFromDataURI = (dataURI, defaultImageURL) => {
  if (dataURI.length === 0) return defaultImageURL;
  const matches = dataURI.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches || matches.length !== 3) return defaultImageURL;
  const [_, mimetype, base64Data] = matches;
  const tempImageURL = `data:${mimetype};base64,${base64Data}`;
  return tempImageURL;
};

export const getUserInfoSanitized = (user) => {
  const { password, ...userInfo } = user;
  const { profilePicture, ...rest } = userInfo;
  Object.assign(rest, {
    profilePicture: getImageLinkFromDataURI(profilePicture, DEFAULT_IMAGE.PROFILE),
  });
  return rest;
};

export const getPostInfoSanitized = (post) => {
  const { image, ...postInfo } = post;
  Object.assign(postInfo, { image: getImageLinkFromDataURI(image, DEFAULT_IMAGE.POST) });
  return postInfo;
};
