
const cryptoKeys = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat'
}

class EncryptAndDecryptWords {
  constructor() {
    this.inputText = document.querySelector('#input-text');
    this.btnEncrypt = document.querySelector('#btn-encrypt');
    this.btnDecrypt = document.querySelector('#btn-decrypt');
    this.btnCopyText = document.querySelector('#btn-copy-text');
    this.outputEl = document.querySelector('#output');
    this.alert = document.querySelector('#alert');
  }

  initialize() {
    
    this.btnEncrypt.addEventListener('click', () => {
      const text = this.inputText.value;
      if(!text.length) {
        return;
      }
      this.inputText.value = ''
      const encryptedWords = this.encrypt(text)
      this.updateScreen(encryptedWords)
    })
    this.btnDecrypt.addEventListener('click', () => {
      const text = this.inputText.value;
      if(!text.length) {
        return;
      }
      this.inputText.value = ''
      const decryptedWords = this.decrypt(text)
      this.updateScreen(decryptedWords)
    });
    this.btnCopyText.addEventListener('click', () => {
      this.copyText();
    })
    
  }
  encrypt(string) {
 
    let stringEncrypted = '';
    for(let i = 0 ; i < string.length; i++) {
      if(cryptoKeys.hasOwnProperty(string[i])) {
        stringEncrypted +=cryptoKeys[string[i]]
      } else {
        stringEncrypted += string[i]
      }
    }
  
    return stringEncrypted;
  }
  decrypt(string) {
    const regex = /(?:enter|imes|ai|ober|ufat)/g;
    return string.replace(regex, (match) => {
       return this.getKeyInObject(cryptoKeys,match)
    })
  }
  updateScreen(text) {
    this.outputEl.querySelector('img').classList.add('hidden');
    this.outputEl.querySelector('button').classList.remove('hidden');
    this.outputEl.querySelector('p').innerHTML = text;
  }
  copyText() {
    const content = this.outputEl.querySelector('p').textContent;
    const textArea = document.createElement('textarea');
    textArea.value = content;
    this.outputEl.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    this.outputEl.removeChild(textArea);

    this.alert.style.display = 'block'
    setTimeout(() => {
      this.alert.style.display = 'none'
    }, 1000);
    

  }
  getKeyInObject(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
}

