var express = require('express');
var router = express.Router();
const usersModel = require("../models/users-model");

router.get('/', function(req, res, next) {
let logIn = `<h2>Hi Admin!</h2>
<h3>Please log in:</h3>
<form>
<label for="adminName">Username: </label>
<input type="text" name="adminName" id="adminName">
<label for="adminPassword">Password: </label>
<input type="text" name="adminPassword" id="adminPassword">
</form>
<button id="submitBtn">Log in</button>
</section>
<script>
  document.getElementById("submitBtn").addEventListener("click", () => {
  if (adminName.value === "admin" && adminPassword.value ===  "admin") {
  location.href = "/admin/loggedin";
  } else {
  let wrongInput = document.createElement("p");
  wrongInput.innerText = "Wrong username or password, please try again.";
  document.body.append(wrongInput);
}})
</script>
`;
res.send(logIn)
});

router.get("/loggedin", async(req, res) => {
await usersModel.find().then((data)=>{
userList = data
})
let PrintUser = `<a href="/admin"><button>Log out </button></a>`
let allUserThatSub = "<h1> All subscribers</h1>";
let allUserThatNotSub = "<h1>Everyone who doesn't subscribe</h1>";
notSubscribeUser = [];
subscribeUsers = [];
  
for (let i = 0; i < userList.length; i++) {
if (!userList[i].subscriber) {
notSubscribeUser.push(userList[i].username + " ");
} else {
subscribeUsers.push(userList[i].username);
}}
res.send(PrintUser + allUserThatSub + subscribeUsers + allUserThatNotSub + notSubscribeUser);
});
module.exports = router;
