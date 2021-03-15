const BASE_USL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_USL = BASE_USL + "/api/v1/users/";
const USER_PER_PAGE = 12

const dataPanel = document.querySelector(".data-panel");
const pagination = document.querySelector('.pagination')

const users = JSON.parse(localStorage.getItem('favoriteUsers')) || [];


axios.get(INDEX_USL).then((response) => {
  showUserList(showCardByPage(1));
  renderPagination(users.length)
});

///////// Event Listener /////////////
pagination.addEventListener('click', function onClickPagination(event) {
  const page = event.target.dataset.page
  showUserList(showCardByPage(page))
})


///////////// Function //////////////

function showUserList(data) {
  let rawHTML = "";

  data.forEach((user) => {
    rawHTML += `<div class="col my-3">
        <div class="card">
          <div class="card-header">${user.name} ${user.surname}</div>
          <img src="${user.avatar}" class="card-img-top" alt="avatar"
            data-toggle="modal" data-target="#detailModal" style="cursor:pointer">
          <div class="card-body">
            <a href="#" class="card-text" id="modal-email" style="cursor: pointer">${user.email}</a>
            <p class="card-text mt-3" id="modal-gender">GENDER : ${user.gender}</p>
            <p class="card-text" id="modal-age">AGE : ${user.age}</p>
            <p class="card-text" id="modal-region">REGION : ${user.region}</p>
            <p class="card-text" id="modal-birth">BIRTH : ${user.birth}</p>
          </div>
          <div class="card-footer d-flex flex-row-reverse">
            <a href="#" class="btn btn-danger" data-id="${user.id}">x</a>
          </div>
        </div>
      </div>`;
  });

  dataPanel.innerHTML = rawHTML;
}

function showCardByPage(page) {
  let startPage = (page - 1) * USER_PER_PAGE
  return users.slice(startPage, startPage + USER_PER_PAGE)
}


function renderPagination(amount) {

  const numOfPage = Math.ceil(amount / USER_PER_PAGE)
  let rawHTML = ''

  for (page = 1; page <= numOfPage; page++) {
    rawHTML += `<li class="page-item"><a class="page-link text-dark" href="#" data-page='${page}'>${page}</a></li>`
  }

  pagination.innerHTML = rawHTML
}


function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteUser')) || []
  const user = users.find(user => user.id === id)
  console.log(id)
  console.log(users)
}
