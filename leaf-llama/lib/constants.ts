export const navButtons: { [id: string]: string } = {
  MENU: "menu",
  ORDER: "order",
  LOCATIONS: "locations",
  JOIN_THE_TEAM: "careers",
  FAQ: "faq",
  OUR_STORY: "story",
};

export const faqNav = {
  REFERENCES_PAGE: "references",
  CONTACT: "contact",
  WORK_LOG: "/worklog.pdf",
  COPYRIGHT_CHECKLIST: "/copyright.pdf",
};

export const foodCatagories = ["all", "salads", "smoothies", "sides", "others"];

export const EMAIL = "rayden.yu3@gmail.com";

import vegetableSalad from "@/public/salads/vegetable.jpg";
import fruitSalad from "@/public/salads/fruit.jpg";
import potatoSalad from "@/public/salads/potato.jpg";
import strawberrySalad from "@/public/salads/strawberry.jpg";
import caesarSalad from "@/public/salads/caesar.jpg";
import plainSalad from "@/public/salads/salad.jpg";

export const optionTypes = {
  multiple: ["sauce", "dressing"],
  singular: ["pickles", "size", "dressing preperation"],
};

export const salads = [
  {
    name: "Vegetable Salad",
    img: vegetableSalad,
    desc: "Crunchy mix of organic spinach, romaine, tomatoes, cucumber, shredded carrots, and radishes",
    price: 11.95,
    customization: {
      size: ["Small", "Medium", "Large"],
      pickles: ["Yes pickles", "NO pickles"],
      dressing: ["Ranch", "Honey Mustard", "Vinaigrette"], //sides list
      "dressing preperation": ["Mixed", "Dressing On The Side"],
    },
  },
  {
    name: "Fruit Salad",
    img: fruitSalad,
    desc: "Seasonal selection of ripe pear, strawberries, grapes, pineapple, and blueberry. Drizzled with fresh lime juice",
    price: 9.75,
    customization: {
      size: ["Small", "Medium", "Large"],
      pickles: ["Yes pickles", "NO pickles"],
      dressing: ["Ranch", "Honey Mustard", "Vinaigrette"], //sides list
      "dressing preperation": ["Mixed", "Dressing On The Side"],
    },
  },
  {
    name: "Potato Salad",
    img: potatoSalad,
    desc: "Creamy vegan version featuring potatoes in a dill-infused cashew dressing with pepper, and a hint of whole-grain mustard",
    price: 12.25,
    customization: {
      size: ["Small", "Medium", "Large"],
      pickles: ["Yes pickles", "NO pickles"],
      dressing: ["Ranch", "Honey Mustard", "Vinaigrette"], //sides list
      "dressing preperation": ["Mixed", "Dressing On The Side"],
    },
  },
  {
    name: "Strawberry Salad",
    img: strawberrySalad,
    desc: "Fresh strawberries, baby arugula, and pecans. Served with strawberry",
    price: 10.25,
    customization: {
      size: ["Small", "Medium", "Large"],
      pickles: ["Yes pickles", "NO pickles"],
      dressing: ["Ranch", "Honey Mustard", "Vinaigrette"], //sides list
      "dressing preperation": ["Mixed", "Dressing On The Side"],
    },
  },
  {
    name: "Caesar Salad",
    img: caesarSalad,
    desc: "Lettuce with garlicky croutons and tomato, shaved Parmesan, in our signature vegetarian dairy-free Caesar dressing",
    price: 10.95,
    customization: {
      size: ["Small", "Medium", "Large"],
      pickles: ["Yes pickles", "NO pickles"],
      dressing: ["Ranch", "Honey Mustard", "Vinaigrette"], //sides list
      "dressing preperation": ["Mixed", "Dressing On The Side"],
    },
  },
  {
    name: "Plain Salad",
    img: plainSalad,
    desc: "Simple garden freshness - Lettuce with a choice of dressing",
    price: 8.25,
    customization: {},
  },
];

import bananaSmoothie from "@/public/smoothies/banana.jpg";
import blueberrySmoothie from "@/public/smoothies/blueberry.jpg";
import chocolateSmoothie from "@/public/smoothies/chocolate.jpg";
import strawberrySmoothie from "@/public/smoothies/strawberry.jpg";
import vanillaSmoothie from "@/public/smoothies/vanilla.jpg";
export const smoothies = [
  {
    name: "Banana Smoothie",
    img: bananaSmoothie,
    desc: "Creamy blend of frozen bananas, almond milk, Greek yogurt, and a dash of cinnamon. Vegan option available",
    price: 4.3,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
  {
    name: "Blueberry Smoothie",
    img: blueberrySmoothie,
    desc: "Antioxidant-packed with wild blueberries, spinach, banana, and coconut water. Boosted with flaxseed for extra nutrition",
    price: 4.3,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
  {
    name: "Chocolate Smoothie",
    img: chocolateSmoothie,
    desc: "Decadent mix of cacao powder, frozen banana, peanut butter, and oat milk - a healthy dessert in a glass",
    price: 4.3,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
  {
    name: "Strawberry Smoothie",
    img: strawberrySmoothie,
    desc: "Sun-ripened strawberries blended with vanilla protein powder, almond milk, and dates for natural sweetness",
    price: 4.3,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
  {
    name: "Vanilla Smoothie",
    img: vanillaSmoothie,
    desc: "Silky combination of Madagascar vanilla bean, cashew milk, frozen cauliflower (trust us!), and maple syrup",
    price: 4.3,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
];

import frenchFries from "@/public/sides/fries.jpg";
import bananaMuffin from "@/public/sides/muffin.jpg";
import garlicRoastedPotatoes from "@/public/sides/garlicRoastedPotatoes.jpg";
export const sides = [
  {
    name: "French Fries",
    img: frenchFries,
    desc: "Double-fried golden russet potatoes with crispy exterior and fluffy center. Served with garlic aioli",
    price: 2.0,
    customization: {},
  },
  {
    name: "Banana Muffin",
    img: bananaMuffin,
    desc: "Moist whole-wheat muffin bursting with ripe bananas and dark chocolate chips. Made with coconut oil",
    price: 2.05,
    customization: {},
  },
  {
    name: "Garlic Roasted Potatoes",
    img: garlicRoastedPotatoes,
    desc: "Herb-roasted baby potatoes with rosemary, thyme, and roasted garlic. Finished with lemon zest",
    price: 3.95,
    customization: {},
  },
];

import veggieBurger from "@/public/others/burger.jpg";
import marinaraPasta from "@/public/others/pasta.jpg";
import veggiePizza from "@/public/others/pizza.jpg";
export const others = [
  {
    name: "Veggie Burger",
    img: veggieBurger,
    desc: "House-made patty of black beans, quinoa, and roasted beets. Served on brioche bun with avocado spread and caramelized onions",
    price: 9.99,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
  {
    name: "Mariana Pasta",
    img: marinaraPasta,
    desc: "Al dente spaghetti tossed in slow-simmered tomato sauce with fresh basil. Topped with vegan Parmesan and chili flakes",
    price: 11.25,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
  {
    name: "Veggie Pizza",
    img: veggiePizza,
    desc: "Wood-fired crust with roasted red peppers, artichokes, Kalamata olives, and vegan mozzarella. Drizzled with pesto",
    price: 14.25,
    customization: {
      size: ["Small", "Medium", "Large"],
    },
  },
];
