async function logJSONData(api) {
  const response = await fetch(api);
  const jsonData = await response.json();
  return jsonData;
}

async function main() {
  const usersData = await logJSONData("https://fakestoreapi.com/users");
  const cartsData = await logJSONData(
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
  );
  const productsData = await logJSONData("https://fakestoreapi.com/products");

  console.log("Task 2");
  console.log("Zadanie 1: ", { usersData, cartsData, productsData });

  // Zadanie 2
  const categories = getCategories(productsData);
  console.log("Zadanie 2: ", categories);

  // Zadanie 3
  const cart = getCart(cartsData, productsData, usersData);

  console.log("Zadanie 3: ", cart);

  // Zadanie 4
  const usersPair = getFurthestAwayUsers(usersData);

  console.log("Zadanie 4: ", usersPair);
}

function calculateDistance(a, b) {
  const RADIUS = 6371;
  return (
    Math.acos(
      Math.sin(Number(a.lat)) * Math.sin(Number(b.lat)) +
        Math.cos(Number(a.lat)) *
          Math.cos(Number(b.lat)) *
          Math.cos(Number(b.long) - Number(a.long))
    ) * RADIUS
  );
}

function getCategories(products) {
  const categories = {};
  products.forEach((product) => {
    const category = product.category;
    if (!(category in categories)) {
      categories[category] = 0;
    }

    categories[category]++;
  });

  return categories;
}

function getCart(carts, products, users) {
  return carts
    .map((cart) => {
      const { name } = users.find((user) => user.id === cart.userId);
      const value = cart.products.reduce((value, item) => {
        const product = products.find((p) => p.id === item.productId);
        value += product.price * item.quantity;
        return value;
      }, 0);

      return { name, value };
    })
    .sort((a, b) => b.value - a.value)[0];
}

function getFurthestAwayUsers(users) {
  let distanceDiif = 0;
  let userPair;
  users.forEach((user) => {
    users
      .filter((u) => u.id !== user.id)
      .forEach((userToCompare) => {
        const currentDistance = calculateDistance(
          user.address.geolocation,
          userToCompare.address.geolocation
        );
        if (currentDistance > distanceDiif) {
          distanceDiif = currentDistance;
          userPair = [user, userToCompare];
        }
      });
  });

  return userPair;
}

module.exports = {
  calculateDistance,
  getCategories,
  getCart,
  getFurthestAwayUsers,
  main,
};
