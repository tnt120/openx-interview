const {
  getCart,
  getCategories,
  getFurthestAwayUsers,
  calculateDistance,
} = require("./task2");

describe("task2", () => {
  const MOCKED_CARTS = [
    {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [
        { productId: 1, quantity: 4 },
        { productId: 2, quantity: 1 },
        { productId: 3, quantity: 6 },
      ],
      __v: 0,
    },
    {
      id: 2,
      userId: 2,
      date: "2020-01-02T00:00:00.000Z",
      products: [
        { productId: 2, quantity: 4 },
        { productId: 1, quantity: 10 },
        { productId: 3, quantity: 2 },
      ],
      __v: 0,
    },
  ];

  const MOCKED_PRODUCTS = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 },
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 },
    },
  ];

  const MOCKED_USERS = [
    {
      address: {
        geolocation: { lat: "-37.3159", long: "81.1496" },
        city: "kilcoole",
        street: "new road",
        number: 7682,
        zipcode: "12926-3874",
      },
      id: 1,
      email: "john@gmail.com",
      username: "johnd",
      password: "m38rmF$",
      name: { firstname: "john", lastname: "doe" },
      phone: "1-570-236-7033",
      __v: 0,
    },
    {
      address: {
        geolocation: { lat: "-37.3159", long: "81.1496" },
        city: "kilcoole",
        street: "Lovers Ln",
        number: 7267,
        zipcode: "12926-3874",
      },
      id: 2,
      email: "morrison@gmail.com",
      username: "mor_2314",
      password: "83r5^_",
      name: { firstname: "david", lastname: "morrison" },
      phone: "1-570-236-7033",
      __v: 0,
    },
    {
      address: {
        geolocation: { lat: "40.3467", long: "-30.1310" },
        city: "Cullman",
        street: "Frances Ct",
        number: 86,
        zipcode: "29567-1452",
      },
      id: 3,
      email: "kevin@gmail.com",
      username: "kevinryan",
      password: "kev02937@",
      name: { firstname: "kevin", lastname: "ryan" },
      phone: "1-567-094-1345",
      __v: 0,
    },
    {
      address: {
        geolocation: { lat: "50.3467", long: "-20.1310" },
        city: "San Antonio",
        street: "Hunters Creek Dr",
        number: 6454,
        zipcode: "98234-1734",
      },
    },
  ];

  test("Should properly getCart based on carts, products, users", () => {
    const EXPECTED_CART = {
      name: {
        firstname: "david",
        lastname: "morrison",
      },
      value: 1300.68,
    };

    expect(getCart(MOCKED_CARTS, MOCKED_PRODUCTS, MOCKED_USERS)).toEqual(
      EXPECTED_CART
    );
  });

  test("Should properly getCategories based on products", () => {
    const EXPECTED_CATEGORIES = {
      "men's clothing": 3,
    };

    expect(getCategories(MOCKED_PRODUCTS)).toEqual(EXPECTED_CATEGORIES);
  });

  test("Should properly getFurthestAwayUsers based on users", () => {
    const EXPECTED_USERS = [
      {
        __v: 0,
        address: {
          city: "kilcoole",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
          number: 7682,
          street: "new road",
          zipcode: "12926-3874",
        },
        email: "john@gmail.com",
        id: 1,
        name: {
          firstname: "john",
          lastname: "doe",
        },
        password: "m38rmF$",
        phone: "1-570-236-7033",
        username: "johnd",
      },
      {
        __v: 0,
        address: {
          city: "Cullman",
          geolocation: {
            lat: "40.3467",
            long: "-30.1310",
          },
          number: 86,
          street: "Frances Ct",
          zipcode: "29567-1452",
        },
        email: "kevin@gmail.com",
        id: 3,
        name: {
          firstname: "kevin",
          lastname: "ryan",
        },
        password: "kev02937@",
        phone: "1-567-094-1345",
        username: "kevinryan",
      },
    ];

    expect(getFurthestAwayUsers(MOCKED_USERS)).toEqual(EXPECTED_USERS);
  });

  test("Should properly calculateDistance", () => {
    const EXPECTED_DISTANCE = 7551.001964081086;

    expect(
      calculateDistance(
        MOCKED_USERS[0].address.geolocation,
        MOCKED_USERS[2].address.geolocation
      )
    ).toEqual(EXPECTED_DISTANCE);
  });
});
