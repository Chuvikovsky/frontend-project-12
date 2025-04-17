import filter from "leo-profanity";

// filter.loadDictionary("ru");

export default (text) => {
  return filter.clean(text);
};
