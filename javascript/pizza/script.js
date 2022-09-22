const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

pizzaJson.map((item, index) => {
	// preencher as informações da pizzaItem
	let pizzaItem = c(".models .pizza-item").cloneNode(true);

	pizzaItem.querySelector(".pizza-item--img img").src = item.img;
	pizzaItem.querySelector(
		".pizza-item--price",
	).innerHTML = `${item.price.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	})}`;
	pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
	pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

	pizzaItem.querySelector("a").addEventListener("click", (e) => {
		e.preventDefault();

		c(".pizzaWindowArea").style.opacity = 0;
		c(".pizzaWindowArea").style.display = "flex";

		setTimeout(() => {
			c(".pizzaWindowArea").style.opacity = 1;
		}, 200);
	});

	c(".pizza-area").append(pizzaItem);
});
