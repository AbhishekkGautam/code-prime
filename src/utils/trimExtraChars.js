export const trimExtraChars = (text, chars) => {
  return text.length < chars ? text : text.substr(0, chars - 3) + "...";
};
