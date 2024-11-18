// Экспортируем функцию formatUrl, которая принимает URL в качестве параметра
export const formatUrl = (url) => {
  // Возвращаем строку, которая состоит из './data/' и переданного URL
  return './data/' + url;
};
