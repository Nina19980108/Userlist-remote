const BASE_USL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_USL = BASE_USL + "/api/v1/users/";
const USER_PER_PAGE = 12

const dataPanel = document.querySelector(".data-panel");
const modalFooter = document.querySelector('.modal-footer')
const pagination = document.querySelector('.pagination')

const users = JSON.parse(localStorage.getItem('favoriteUsers')) || [];


axios.get(INDEX_USL).then((response) => {
  showUserList(showCardByPage(1));
  renderPagination(users.length)
});

///////// Event Listener /////////////

dataPanel.addEventListener("click", function showDetalModal(event) {
  if (event.target.matches("img")) {
    let id = event.target.dataset.id;
    console.log();

    axios.get(INDEX_USL + id).then((response) => {
      const data = response.data;
      const name = document.querySelector("#modal-name");
      const email = document.querySelector("#modal-email");
      const avatar = document.querySelector("#modal-avatar");
      const gender = document.querySelector("#modal-gender");
      const age = document.querySelector("#modal-age");
      const region = document.querySelector("#modal-region");
      const birth = document.querySelector("#modal-birth");


      name.innerHTML = `${data.name} ${data.surname}`;
      email.innerHTML = `${data.email}`;
      gender.innerHTML = `GENDER : ${data.gender}`;
      age.innerHTML = `AGE : ${data.age}`;
      region.innerHTML = `REGION : ${data.region}`;
      birth.innerHTML = `BIRTH : ${data.birthday}`;
      avatar.innerHTML = ` <img src="${data.avatar}" alt="avatar">`;
      modalFooter.innerHTML = `<button type="button" id="add-to-favorite" class="btn btn-outline-danger" data-id="${data.id}">Add To Favorite</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    });
  }
});

pagination.addEventListener('click', function onClickPagination(event) {
  const page = event.target.dataset.page
  showUserList(showCardByPage(page))
})


modalFooter.addEventListener('click', function onClickFavorite(event) {
  if (event.target.matches('.btn-secondary')) { return }
  addToFavorite(event.target.dataset.id)
})



///////////// Function //////////////

function showUserList(data) {
  let rawHTML = "";

  data.forEach((user) => {
    rawHTML += `<div class="col my-3">
      <div class="card">
        <img src="${user.avatar}" class="card-img-top" alt="avatar" data-toggle="modal" data-target="#detailModal" data-id="${user.id}" style="cursor:pointer">
        <div class="card-body">
          <h6 class="card-title">${user.name} ${user.surname}</h6>
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
