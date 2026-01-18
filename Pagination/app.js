async function getData(){
    const respons =await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await respons.json();
    return data
}

async function main() {
    const postsData = await getData();
    let currentPage = 1;
    let rows = 10;//! Сколько постов на страницу выводить ну или каких либо других объектов

        function displayList(arrData, rowPerPage, page){//! Отрисовует данные которые нам нужный
        const postsEl = document.querySelector(".posts");
        postsEl.innerHTML = "";
        page--;

        const start =  rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) =>{
            const postEl = document.createElement("div");
            postEl.classList.add("post");
            postEl.innerText = `${el.title}`;
            postsEl.appendChild(postEl);
        })
    }

    function displayPagination(arrData, rowPerPage){//! Отрисовует кнопки типо количество страниц будет отрисовывать
      const paginationEl = document.querySelector(".pagination");
      const pagesCount = Math.ceil(arrData.length / rowPerPage);//! Формула что бы понять сколько отобржать кнопок пагинации 
      const ulEL = document.createElement("ul")
      ulEL.classList.add("pagination__list")

      for(let i = 0; i < pagesCount; i++){
        const liEl = displayPaginationBtn (i + 1)
        ulEL.appendChild(liEl)
      }
      paginationEl.appendChild(ulEL)
    }

    function displayPaginationBtn(page){//! Это функция которая будет вызываться внутри displayPagination() в цыкле что бы отрисовывать кнопки
      const liEl = document.createElement("li");
      liEl.classList.add("pagination__item")
      liEl.innerText = page

      if(currentPage == page) liEl.classList.add("pagination__item--active")

      liEl.addEventListener("click", () =>{
        currentPage = page
        displayList(postsData, rows, currentPage);

        let currentItemLi = document.querySelector("li.pagination__item--active");
        currentItemLi.classList.remove("pagination__item--active");

        liEl.classList.add("pagination__item--active");
      })

      return liEl
    }

   displayList(postsData, rows, currentPage)
   displayPagination(postsData, rows)
}

main()