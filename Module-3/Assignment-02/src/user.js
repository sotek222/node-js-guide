const userList = document.querySelector('.users-container__user-list');
const users = [
  { name: "Matt", age: 27 },
  { name: "John", age: 33 },
  { name: "Calvin", age: 7 },
  { name: "Jack", age: 1 },
  { name: "Samantha", age: 24 }
];
  
users.forEach(user => {
  const html = `
    <li class="users-container__user-item" >
      <div class="users-container__user">
        <h3>Name: ${user.name}</h3>
        <h4>Age: ${user.age}</h4>
      </div>
    </li>
  `;

  userList.insertAdjacentHTML('beforeend', html);
});