const mainEl = document.querySelector('.main');

const passwordEl = document.createElement('input');
passwordEl.className = 'password';
passwordEl.placeholder = 'Сгенерировать пароль';
passwordEl.readOnly = true;

const copyBtn = document.createElement('button');
copyBtn.className = 'password-button'
copyBtn.textContent = 'Скопировать';

const generateBtn = document.createElement('button');
generateBtn.classList ='password-button'
generateBtn.textContent = 'Сгенерировать';

generateBtn.addEventListener('click', () => {
  passwordEl.value = generatePassword(12);
});

copyBtn.addEventListener('click', async () => {
  if (!passwordEl.value) return;
  await navigator.clipboard.writeText(passwordEl.value);
  alert('Пароль скопирован');
});

function generatePassword(length) {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#!#$%&@^&*()_+';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

mainEl.append(passwordEl, generateBtn, copyBtn);
