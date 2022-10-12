const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);
const modal = c(".pizzaWindowArea");

let modalQt = 1;
let cart = [];
let modalKey = 0;

const formatPrice = (item) =>
	item.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});

// Listagem das Pizzas
pizzaJson.map((item, index) => {
	// preencher as informações da pizzaItem
	let pizzaItem = c(".models .pizza-item").cloneNode(true);

	const price = formatPrice(item.price);

	pizzaItem.querySelector(".pizza-item--img img").src = item.img;

	pizzaItem.querySelector(".pizza-item--price").innerHTML = price;

	pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
	pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

	pizzaItem.querySelector("a").addEventListener("click", (e) => {
		e.preventDefault();
		modalQt = 1;
		modalKey = item.id;

		c(".pizzaBig img").src = item.img;
		c(".pizzaInfo h1").innerHTML = item.name;
		c(".pizzaInfo--desc").innerHTML = item.description;
		c(".pizzaInfo--actualPrice").innerHTML = price;

		c(".pizzaInfo--size.selected").classList.remove("selected");

		cs(".pizzaInfo--size").forEach((size, sizeIndex) => {
			if (sizeIndex === 2) size.classList.add("selected");

			size.querySelector("span").innerHTML = item.sizes[sizeIndex];
		});

		c(".pizzaInfo--qt").innerHTML = modalQt;

		modal.style.opacity = 0;
		modal.style.display = "flex";

		setTimeout(() => (modal.style.opacity = 1), 200);
	});

	c(".pizza-area").append(pizzaItem);
});

// Eventos do Modal
const closeModal = () => {
	modal.style.opacity = 0;

	setTimeout(() => (modal.style.display = "none"), 100);
};

const withOnOutside = (fn) => (event) => {
	if (event.target === event.currentTarget) fn(event);
};

modal.addEventListener(
	"click",
	withOnOutside(() => closeModal()),
);

cs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) =>
	item.addEventListener("click", closeModal),
);

c(".pizzaInfo--qtmenos").addEventListener("click", () => {
	if (modalQt > 1) {
		modalQt--;
		c(".pizzaInfo--qt").innerHTML = modalQt;
	}
});

c(".pizzaInfo--qtmais").addEventListener("click", () => {
	modalQt++;
	c(".pizzaInfo--qt").innerHTML = modalQt;
});

cs(".pizzaInfo--size").forEach((size, sizeIndex) => {
	size.addEventListener("click", () => {
		c(".pizzaInfo--size.selected").classList.remove("selected");
		size.classList.add("selected");
	});
});

c(".pizzaInfo--addButton").addEventListener("click", () => {
	let size = parseInt(
		c(".pizzaInfo--size.selected").getAttribute("data-key"),
	);

	let identifier = modalKey + "@" + size;
	let key = cart.findIndex((item) => item.identifier === identifier);

	if (key > -1) {
		cart[key].qt += modalQt;
	} else {
		cart.push({
			identifier,
			id: modalKey,
			size,
			qt: modalQt,
		});
	}

	updateCart();
	closeModal();
});

c(".menu-openner").addEventListener("click", () => {});

const updateCart = () => {
	c(".menu-openner span").innerHTML = cart.length;

	if (cart.length > 0) {
		c("aside").classList.add("show");
		c(".cart").innerHTML = "";

		let subtotal = 0;
		let desconto = 0;
		let total = 0;

		for (let i in cart) {
			let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id);
			let cartItem = c(".models .cart--item").cloneNode(true);
			let pizzaSizeName;

			subtotal += pizzaItem.price * cart[i].qt;

			switch (cart[i].size) {
				case 0:
					pizzaSizeName = "P";
					break;
				case 1:
					pizzaSizeName = "M";
					break;
				case 2:
					pizzaSizeName = "G";
					break;
			}

			let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

			cartItem.querySelector("img").src = pizzaItem.img;
			cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
			cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;

			cartItem
				.querySelector(".cart--item-qtmenos")
				.addEventListener("click", () => {
					if (cart[i].qt > 1) {
						cart[i].qt--;
					} else {
						cart.splice(i, 1);
					}

					updateCart();
				});

			cartItem
				.querySelector(".cart--item-qtmais")
				.addEventListener("click", () => {
					cart[i].qt++;
					updateCart();
				});

			c(".cart").append(cartItem);
		}

		desconto = subtotal * 0.1;
		total = subtotal - desconto;

		c(".subtotal span:last-child").innerHTML = `R$ ${formatPrice(
			subtotal,
		)}`;
		c(".desconto span:last-child").innerHTML = `R$ ${formatPrice(
			desconto,
		)}`;
		c(".total span:last-child").innerHTML = `R$ ${formatPrice(total)}`;
	} else {
		c("aside").classList.remove("show");
	}
};
