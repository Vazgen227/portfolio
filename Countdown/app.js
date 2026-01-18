const items = document.querySelectorAll(".countdown-item > h4");
const counddownElement = document.querySelector(".countdown")
//! Назначаем дату отсчета
let countdownDate = new Date(2026, 11, 24, 16, 38, 0).getTime();

function getCountdownTime() {
  //! Получить текущее время
  const now = new Date().getTime();

  //! Найти разницу
  const distans = countdownDate - now;

  //*1c = 1000мс
  //*1м = 60с
  //*1ч = 60м
  //*1д = 24ч

  //* Создаем переменные в милисекундах
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinuts = 60 * 1000;

  //! Подсчет для дней, часов и т.д.
  let day = Math.floor(distans / oneDay);
  let hours = Math.floor((distans % oneDay) / oneHour);
  let minutes = Math.floor((distans % oneHour) / oneMinuts);
  let second = Math.floor((distans % oneMinuts) / 1000);

  //!Создаем массив с переменными
  const value = [day, hours, minutes, second];

  //!Добавление переменных на страницу
  items.forEach(function (items, index) {
    items.textContent = value[index];
  });

  //* Исправление отрицательногоо отсчетаю. Время когда заканчвиает наш отсчет оно начинае идти в минус
//* тут вот фикс
if(distans < 0){
  clearInterval(countdown)//! Встроеная функция в js clearInterval
  counddownElement.innerHTML = "<h4 class ='expaired'>Время вышло</h4>"
}
}
//* Таким образом мы делаем так что бы у нас итерировалась функция каждую секунду ну в плане
//* без этого счетчик идти в реальном времени не будет только при перезагрузке
//* но теперь при обновление буквально на секунду показывает старые данные это тоже исправимо
let countdown = setInterval(getCountdownTime, 1000);

//* Вот так исправляется
getCountdownTime();

