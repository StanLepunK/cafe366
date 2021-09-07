export function get_lang() {
  const brownser_is = typeof window !== "undefined";
  let lang = "fr";
  if (brownser_is) {
    lang = localStorage.getItem("lang");
  }
  return lang;
}

export function find_lang(arr, target, lang) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === target) {
      if (lang === "en") return arr[i].label_en;
      else return arr[i].label_fr;
    }
  }
  return null;
}
