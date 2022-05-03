let numbers = [4, 5, 6, 1, 2, 3];
let url = "https://swapi.dev/api/films";
let i = 0;

async function getdata(number) {
  let ul = document.querySelector("#ul");
  let fe = await fetch(`${url}/${number}`);
  let jas = await fe.json();
  const li = document.createElement("li");
  const div2 = document.createElement("div");
  const div = document.createElement("div");
  const title = document.createElement("p");
  title.innerText = jas.title;
  const ep = document.createElement("p");
  ep.innerText = jas.episode_id;
  const data = document.createElement("p");
  data.innerText = jas.release_date;
  div2.appendChild(title);
  div2.appendChild(ep);
  div2.appendChild(data);
  div2.className = "movie2";
  const b = document.createElement("button");
  b.innerText = "Starship";
  b.className = "b";
  b.onclick = () => secondPage(jas);
  div.appendChild(div2);
  div.appendChild(b);
  div.className = "movie";
  li.appendChild(div);
  li.className = "li";
  ul.appendChild(li);
}


function makeTitle() {
  let sec = document.querySelector("#sec");
  sec.innerHTML = "";
  const h1 = document.createElement("h1");
  const ul = document.createElement("ul");
  h1.innerText = "Movie";
  ul.className = "ul";
  ul.id = "ul";
  sec.appendChild(h1);
  sec.appendChild(ul);
}

async function makeMovie() {
  i = 0;
  makeTitle();
  await getdata(numbers[0]);
  await getdata(numbers[1]);
  await getdata(numbers[2]);
  await getdata(numbers[3]);
  await getdata(numbers[4]);
  await getdata(numbers[5]);
}
function makeCol(data) {
  let col1 = document.querySelector(".col1");
  col1.innerHTML = "";
  const row1 = document.createElement("div");
  const row2 = document.createElement("div");
  row1.className = "row1";
  row2.className = "row2";
  const h1 = document.createElement("h1");
  h1.innerText = "StarShips";
  const ul = document.createElement("ul");
  ul.id = "ul2";
  row1.appendChild(h1);
  row1.appendChild(ul);
  col1.appendChild(row1);
  col1.appendChild(row2);
  let ships = data.starships.slice(i * 10, i * 10 + 10);
  ships.map((e) => makeship(e));
  makeButtom(ships, data);
}
function secondPage(data) {
  let sec = document.querySelector("#sec");
  sec.innerHTML = "";
  const star = document.createElement("div");
  star.id = "star";
  star.className = "star";
  sec.appendChild(star);
  const col1 = document.createElement("div");
  const col2 = document.createElement("div");
  col2.className = "col2";
  col1.className = "col1";
  star.appendChild(col1);
  star.appendChild(col2);
  makeCol(data);
}
async function makeship(url) {
  let ul2 = document.querySelector("#ul2");
  const li = document.createElement("li");
  const button = document.createElement("button");
  li.className = "li2";
  button.className = "b";
  let fe = await fetch(`${url}`);
  let jas = await fe.json();
  button.onclick = () => details(jas);
  button.innerText = jas.name;
  li.appendChild(button);
  ul2.appendChild(li);
}
function details(data) {
  let col2 = document.querySelector(".col2");
  col2.innerHTML = "";
  const h = document.createElement("h1");
  const ul = document.createElement("ul");
  ul.id = "ul3";
  h.innerText = data.name;
  col2.appendChild(h);
  const model = document.createElement("li");
  model.className = "li";
  const manufacturer = document.createElement("li");
  manufacturer.className = "li";
  const crew = document.createElement("li");
  crew.className = "li";
  const passengers = document.createElement("li");
  passengers.className = "li";
  model.innerText = `Model : ${data.model}`;
  manufacturer.innerText = `Manufacturer : ${data.manufacturer}`;
  crew.innerHTML = `Crew : ${data.crew}`;
  passengers.innerHTML = `Passengers : ${data.passengers}`;
  ul.appendChild(model);
  ul.appendChild(manufacturer);
  ul.appendChild(crew);
  ul.appendChild(passengers);
  col2.appendChild(ul);
  moviedetails(data.films);
}
function moviedetails(data) {
  let ul = document.querySelector("#ul3");
  const dt = document.createElement("dt");
  dt.innerText = "Movies :";
  dt.className = "dt";
  ul.appendChild(dt);
  if (!data.empty) {
    data.map((e) => movieToScreen(e));
  }
}
async function movieToScreen(url) {
  let ul = document.querySelector("#ul3");
  let fe = await fetch(`${url}`);
  let jas = await fe.json();
  const li = document.createElement("li");
  li.innerText = jas.title;
  li.className = "li";
  ul.appendChild(li);
}
function upi(data) {
  i = i + 1;
  makeCol(data);
}
function downi(data) {
  i = i - 1;
  makeCol(data);
}
function makeButtom(ships, data) {
  row = document.querySelector(".row2");
  const div = document.createElement("div");
  const back = document.createElement("button");
  const next = document.createElement("button");
  const page = document.createElement("p");
  const prev = document.createElement("button");
  div.className = "butd";
  next.innerText = "Next";
  prev.innerText = "Prev";
  page.innerText = `Page-${i + 1}`;
  next.className = "b";
  page.className = "parag";
  prev.className = "b";
  back.classList = "b back";
  div.appendChild(prev);
  div.appendChild(page);
  div.appendChild(next);
  back.innerText = "Back To Movies";
  row.appendChild(div);
  row.appendChild(back);
  back.onclick = makeMovie;
  if (ships.length == 10) {
    next.onclick = () => upi(data);
  }
  if (i != 0) {
    prev.onclick = () => downi(data);
  }
}
makeMovie();
