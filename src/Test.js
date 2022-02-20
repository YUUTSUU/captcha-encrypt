import {useEffect} from "react";

export const Test = () => {
  // const decrypt = (url) => {
  //   let result = ''
  //   const params = decodeURI(url.slice(17))
  //   for (let i = 0; i < params.length; i++) {
  //     let code = params.charCodeAt(i)
  //     result += String.fromCharCode(code - 4)
  //   }
  //   return result
  // }

  // function convertStringToObject(params) {
  //   let result = {}
  //   const data = params.split('&').map(item => item.split('='))
  //   for (let [key, value] of data) {
  //     result[key] = value
  //   }
  //   return result
  // }

  function translitEngtoRus(text) {
    const converter = {
      'sch': 'щ', 'yo': 'ё', 'zh': 'ж', 'ch': 'ч', 'sh': 'ш',
      'yu': 'ю', 'ya': 'я', "e'": 'э', "''": 'ъ',
      'SCH': 'Щ', 'YO': 'Ё', 'ZH': 'Ж', 'CH': 'Ч', 'SH': 'Ш',
      'YU': 'Ю', 'YA': 'Я', "E'": 'Э', "''": 'Ъ',
      'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
      'e': 'е', 'z': 'з', 'i': 'и', 'y': 'й', 'k': 'к',
      'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п',
      'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф',
      'h': 'х', 'c': 'ц', 'y': 'ы', "'": 'ь',
      'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д',
      'E': 'Е', 'Z': 'З', 'I': 'И', 'Y': 'Й', 'K': 'К',
      'L': 'Л', 'M': 'М', 'N': 'Н', 'O': 'О', 'P': 'П',
      'R': 'Р', 'S': 'С', 'T': 'Т', 'U': 'У', 'F': 'Ф',
      'H': 'Х', 'C': 'Ц', 'Y': 'Ы', "'": 'Ь'
    };

    for (const [key, value] of Object.entries(converter)) {
      text = text.replaceAll(key, value);
    }

    return text;
  }

  const decrypt = (url) => {
    let string = ''
    const params = decodeURI(url.slice(17))
    for (let i = 0; i < params.length; i++) {
      let code = params.charCodeAt(i)
      string += String.fromCharCode(code - 4)
    }
    let result = {}
    let data = string.split('&').map(item => item.split('='))
    const time = data.splice(-1, 1)
    for (let [key, value] of data) {
      result[key] = value
    }
    if (Date.parse(new Date()) - time[0][1] > 300000) {
      return null
    } else {
      return result
    }
  }

  useEffect(() => {
    // console.log(convertStringToObject(decrypt(window.location.pathname)))
    console.log(decrypt(window.location.pathname))
  }, [])

  return (
    <div>Document</div>
  )
}