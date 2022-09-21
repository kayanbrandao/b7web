const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

pizzaJson.map((item, index) => {
	// preencher as informações da pizzaItem
	let pizzaItem = c(".models .pizza-item").cloneNode(true);

	pizzaItem.querySelector(".pizza-item--img img").src = item.img;
	pizzaItem.querySelector(
		".pizza-item--price",
	).innerHTML = `R$ ${item.price.toFixed(2)}`;
	pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
	pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

	c(".pizza-area").append(pizzaItem);
});
