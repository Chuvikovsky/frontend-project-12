import filter from 'leo-profanity';

// filter.loadDictionary("ru");

export default text => filter.clean(text);
