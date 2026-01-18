const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div');

//* Написать Форму
//* Написать инпут
//* Написать кнопку поиск

//* Добавить импут и кнопку к форме
//* Добавить форму к main

//* Добавить ко всем этим элементам необходимые атрибуты и классы

//* Написать функцию для создания карточек
//* Написать функцию для удаления карточки

const formEl = document.createElement('form');
formEl.classList.add('search')
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputsValue = Object.fromEntries(new FormData(e.target));//! Запись которая позволяет забрать не ограниченое число значений из нашей формы
    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`);
    
    if(response.ok){
     const data = await response.json();
     wrapper.appendChild(createProfileEl(data));
     mainEl.appendChild(wrapper);
     //* wrapper/Использовать функцию для создания карточки(класть карточку в wrapper)
     //* Добавить результат выше исполненой функции в mainEl
    }else{
        alert('Пользователь не найден')
    }
    
})

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');

const seatchBtnEL = document.createElement('button');
seatchBtnEL.classList.add('search-button');
seatchBtnEL.setAttribute('type', 'submit');//! Если бы у нашей кнопки не было значения submit то приклике нечего бы не срабатывало почему видно на строке под номером 17
seatchBtnEL.textContent = 'Поиск'

formEl.appendChild(inputEl);
formEl.appendChild(seatchBtnEL);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
 const element = document.createElement('div');
 element.classList.add('profile');
 element.innerHTML =`
    <img class="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.location}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
 `
 element.appendChild(createDeleteBtn())
 return element
}

function createDeleteBtn() {
 const element = document.createElement('button');
 element.classList.add('delete-button');
 element.textContent = 'Удалить';
 element.addEventListener('click', e =>{
wrapper.innerHTML =''
 })

 return element
  
}

window.addEventListener('keydown', e =>{
    if(e.key === 'enter'){
      createProfileEl(data)
    }
})

