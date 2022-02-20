import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CaptchaImage from './captcha-bg.png'
import './main.css'

export const Main = () => {
  const navigate = useNavigate()
  const data = {
    number: '//ФИН2',
    uniq_code: 'AB23487328873',
    date: '2022-01-12'
  }

  // const convertObjectToString = (obj) => {
  //   let result = ''
  //   for (let [key, value] of Object.entries(obj)) {
  //     result += `${ key }=${ value }&`
  //   }
  //   return result.slice(0, -1)
  // }

  // const encrypt = (url) => {
  //   let result = ''
  //   for (let i = 0; i < url.length; i++) {
  //     let code = url.charCodeAt(i)
  //     result += String.fromCharCode(code + 4)
  //   }
  //   return decodeURI(result)
  // }


  function translitRusToEng(text) {
    const converter = {
      'щ': 'sch', 'ё': 'yo', 'ж': 'zh', 'ч': 'ch', 'ш': 'sh',
      'ю': 'yu', 'я': 'ya', 'э': "e'", 'ъ': "''",
      'Щ': 'SCH', 'Ё': 'YO', 'Ж': 'ZH', 'Ч': 'CH', 'Ш': 'SH',
      'Ю': 'YU', 'Я': 'YA', 'Э': "E'",  'Ъ': "''",
      'а': 'a', 'б': 'b', 'в': 'v',
      'г': 'g', 'д': 'd', 'е': 'e', 'з': 'z', 'и': 'i',
      'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ы': 'y',
      'ь': "'",
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
      'Е': 'E', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K',
      'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
      'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
      'Х': 'H', 'Ц': 'C', 'Ы': 'Y',
      'Ь': "'",

    };
    for (const [key, value] of Object.entries(converter)) {
      text = text.replaceAll(key, value);
    }
    return text;
  }

  const encrypt = (obj) => {
    let string = ''
    for (let [key, value] of Object.entries(obj)) {
      string += `${ key }=${ value }&`
    }
    string += `time=${ Date.parse(new Date()) }`
    let result = ''
    for (let i = 0; i < string.length; i++) {
      let code = string.charCodeAt(i)
      result += String.fromCharCode(code + 4)
    }
    return result
  }

  const onClick = () => {
    navigate(`/verify/document/${ encrypt(data) }`)
  }



  const [securityCode, setSecurityCode] = useState('')
  const [code, setCode] = useState('')
  const [check, setCheck] = useState(false)
  const [status, setStatus] = useState(false)

  const createSecurityCode = () => {
    const latters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
      'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
      'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let code = ''
    for (let i = 0; i < 6; i++) {
      let captcha = latters[Math.floor(Math.random() * latters.length)];
      code += ` ${ captcha }`;
    }
    return code.slice(1)
  }

  const handlerCheckCode = () => {
    setStatus(true)
    if (securityCode === code.split('').join(' ')) {
      setCheck(true)
      setTimeout(() => {
        updateSecurityCode()
        setStatus(false)
      }, 2000)
    } else {
      setCheck(false)
      updateSecurityCode()
      setTimeout(() => {
        setStatus(false)
      }, 1000)
    }
  }

  const handlerChangeCode = (e) => {
    setCode(e.target.value)
  }

  const updateSecurityCode = () => {
    setCode('')
    setSecurityCode(createSecurityCode())
  }

  useEffect(() => {
    updateSecurityCode()
  }, [])


  useEffect(() => {
    // console.log(`/verify/document/${ encrypt(convertObjectToString(data)) }`)
    console.log(encrypt(data))
  }, [])

  return (

    <>
      <div className="wrapper">
        <h2>Код безопасности</h2>
        <div className="captcha-area">
          <div className="captcha-img">
            <img src={CaptchaImage} alt="captch-background" />
            <span className="captcha">{securityCode}</span>
          </div>
          <button className="button reload-btn" onClick={updateSecurityCode}><i className="fas fa-redo-alt"></i></button>
        </div>
        <div className="input-area">
          <input type="text" placeholder="Введите код" value={code} maxLength="6" spellCheck="false" required onChange={handlerChangeCode} />
          <button className="button check-btn" onClick={handlerCheckCode}>Проверить!</button>
        </div>
        <div className={status ? check ? "status-text success" : "status-text rejected" : 'status-text'}>{check ? "Код безопасности правильный!" : "Код безопасности не правильный!"}</div>
      </div>

      {/* <button onClick={onClick}>Перейти</button> */}
    </>
  )
}