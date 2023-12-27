// varibales
const folders = document.querySelectorAll(".folder");
let courseIteam = document.querySelector("#course-iteam");
let middleNavber;
let fetchData;
//eventListener
folders.forEach((folder) => {
  folder.addEventListener("click", () => {
    folder.classList[1] == "Server"
      ? serverPart(folder.classList[1])
      : handleTheClick(folder.classList[1]);
  });
});

// function

function serverPart(classList) {
  courseIteam.innerHTML = `
        <div id="computer-window">
         <div id="window-top-navbar">
           <div id="delete">x</div>
           <h3 id="wincow-category">${classList}</h3>
        </div>
       <div id="middle-navber">
        <div class="table-wrapper">
          <table class="table" id="myTable">
            <thead>
            <tr>
                <th>PlayersCount</th>
                <th>WeaponInServer</th>
                <th>MoneyInServer</th>
                <th>RichPersonInVehs</th>
                <th>name</th>
                <th>vehs</th>
                <th>RichPersonInWeapon</th>
                <th>name</th>
                <th>weapon</th>
                <th>RichPersonInMoney</th>
                <th>name</th>
                <th>money</th>
            </tr>
          </thead>
            <tbody id="parent-tr">
          
            <tbody>
          </table>
       </div>
       </div>
  </div>
  `;
  middleNavber = document.querySelector("#middle-navber");
  const parentTr = document.querySelector("#parent-tr");
  const deleted = document.querySelector("#delete");
  ServerData(parentTr);
  handleTheDeleted(deleted);
}

async function ServerData(parentTr) {
 await fetch("./../js/data.json")
    .then((response) => response.json())
    .then((data) => {
      const Server = data.Server;
      console.log(Server.PlayersCount);
      parentTr.innerHTML += `
            <tr>
              <th>${Server.PlayersCount}</th>
              <th>${Server.WeaponInServer}</</th>
              <th>${Server.MoneyInServer}</</th>
              <th>||</</th>
              <th>${Server.RichPersonInVehs.name}</</th>
              <th>${Server.RichPersonInVehs.vehs}</</th>
              <th>||</</th>
              <th>${Server.RichPersonInWeapon.name}</</th>
              <th>${Server.RichPersonInWeapon.weapon}</</th>
              <th>||</</th>
              <th>${Server.RichPersonInMoney.name}</</th>
              <th>${Server.RichPersonInMoney.money}</</th>
            </tr>

        `;
    });
}

function handleTheClick(classList) {
  courseIteam.innerHTML = `
        <div id="computer-window">
         <div id="window-top-navbar">
           <div id="delete">x</div>
           <h3 id="wincow-category">${classList}</h3>
        </div>
       <div id="middle-navber">
        <div class="table-wrapper">
        <input type="text" id="myInput" onkeyup="searchBar()" placeholder="Search for names.." title="Type in a name">
          <table class="table" id="myTable">
            <thead>
            <tr>
                <th>Count</th>
                <th>ID</th>
                <th>Name</th>
                <th>userName</th>
                <th>vehcount</th>
                <th>homescount</th>
                <th>injail</th>
            </tr>
          </thead>
            <tbody id="parent-tr">
          
            <tbody>
          </table>
       </div>
       </div>
  </div>
`;
  middleNavber = document.querySelector("#middle-navber");
  const parentTr = document.querySelector("#parent-tr");
  const deleted = document.querySelector("#delete");
  getData(parentTr);
  handleTheDeleted(deleted);
}

function handleTheDeleted(deleted) {
  //adding eventListener to the deleted parts
  deleted.addEventListener("click", () => {
    //removing the mac windows
    deleted.parentNode.parentNode.remove();
  });
}

function searchBar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

async function getData(parentTr) {
  await fetch("./../js/data.json") 
    .then((response) => response.json())
    .then((data) => {
      fetchData = data.Players;
      const players = data.Players;
      let counter = 1;
      for (const [key, value] of Object.entries(players)) {
        parentTr.innerHTML += `
            <tr onclick="infoHandler(event)">
                <td>${counter}</td>
                <td>${key}</td>
                <td>${value.name}</td>
                <td>${value.username}</td>
                <td>${value.vehcount}</td>
                <td>${value.homescount}</td>
                <td>${value.injail}</td>
            </tr>

        `;
        counter++;
      }
    });
}

function infoHandler(e) {
  const CitizanId = e.target.parentNode.childNodes[3].innerHTML;
  const user = fetchData[CitizanId];
  middleNavber.innerHTML = ` 
    <div class="table-wrapper" style= "display: flex; flex-wrap: wrap;">
      <table class="table" id="myTable">
        <thead>
        <tr>
            <th>Job</th>
            <th>grade</th>
            <th>hoghogh</th>
        </tr>
      </thead>
        <tbody id="parent-tr">
        <tr>
          <td>${user.job.name}</td>
          <td>${user.job.grade}</td>
          <td>${user.job.hoghogh}</td>
       </tr>
        <tbody>
      </table>
      <hr/ style="color: white;width:5px">
      <table class="table" id="myTable">
        <thead>
        <tr>
            <th>bank</th>
            <th>crypto</th>
            <th>cash</th>
        </tr>
      </thead>
        <tbody id="parent-tr">
        <tr>
          <td>${user.money.bank}</td>
          <td>${user.money.crypto}</td>
          <td>${user.money.cash}</td>
       </tr>
        <tbody>
      </table>
      <table class="table" id="myTable">
        <thead>
        <tr>
            <th>Phone</th>
            <th>nationality</th>
        </tr>
      </thead>
        <tbody id="parent-tr">
        <tr>
          <td>${user.charinfo.phone}</td>
          <td>${user.charinfo.nationality}</td>
       </tr>
        <tbody>
      </table>  
 </div>

`;
  user.vehicles.map((veh) => {
    middleNavber.innerHTML += `
    <p>Model: ${veh.model} PLate: ${veh.plate}</p> `;
  });
}
