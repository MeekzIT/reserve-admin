export const getWord = (data) => {
  const language = localStorage.getItem("language");
  console.log(language, data, "languagelanguage");
  if (language === "am") {
    return data?.nameAm;
  } else if (language === "ru") {
    return data?.nameRu;
  } else if (language === "en") {
    return data?.nameEn;
  } else if (language === "ge") {
    return data?.nameGe;
  } else if (language === "az") {
    return data?.nameAz;
  } else return data?.nameRu;
};
