const category = {
  basic: 1.0,
  standard: 1.3,
  medium: 1.6,
  premium: 2.0,
};
let availability = {
  audi: 10.0,
  bmw: 5,
  toyota: 4,
  mercedes: 2,
};
let netPrice,
  yearsOfDrivingLicense,
  priceForAvailability,
  fuel,
  place,
  selectedSize,
  typeOfCategory,
  info,
  combustion = 5.0;
const priceFuel = 6.49;
const priceRentalForDay = 20.0;

const menu_slide = () => {
  const logo = document.querySelector(".logo");
  const menu = document.querySelector(".menu_list");
  const menu_list = document.querySelectorAll(".menu_list li");

  logo.addEventListener("click", () => {
    menu.classList.toggle("menu_list_active");
    menu_list.forEach((list, index) => {
      if (list.style.animation) {
        list.style.animation = "";
      } else {
        list.style.animation = `menu_listFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
  });
};
menu_slide();

const numberOfDay = () => {
  const end = document.querySelector("#end").value;
  const start = document.querySelector("#start").value;
  console.log(start, end);
  const timeStart = new Date(start).getTime();
  const timeEnd = new Date(end).getTime();
  const result = timeEnd - timeStart;
  const rentDays = result / (1000 * 60 * 60 * 24);
  netPrice = rentDays * priceRentalForDay;

  if (netPrice >= 0) {
    document.querySelector("#totalPrice").innerHTML = netPrice;
    console.log(netPrice);
    console.log(rentDays);
    document.querySelector("#text_days").innerHTML = "Number of days:";
    document.querySelector("#days").innerHTML = rentDays;
  } else {
    document.querySelector("#days").innerHTML =
      "The numer of day was not specificed";
    document.querySelector("#totalPrice").innerHTML = "empty";
    console.log("The numer of day was not specificed");
    netPrice = 0;
  }
  const output = document.querySelector("#selected");
  const radioButtons = document.querySelectorAll('input[name="choose"]');

  //radio buttons
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedSize = radioButton.value;
      typeOfCategory = radioButton.value;
    }
  }
  switch (typeOfCategory) {
    case "basic":
      netPrice * category.basic;
      console.log("b");
      break;
    case "standard":
      netPrice * category.standard;
      console.log("s");
      break;
    case "medium":
      netPrice * category.medium;
      console.log("m");
      break;
    case "premium":
      netPrice * category.premium;
      console.log("p");
      break;
    default:
      console.log("You have not selected any option");
      break;
  }
  const numberOfKilometers = document.querySelector(
    "#numberOfKilometers"
  ).value;
  fuel = (numberOfKilometers * combustion) / priceFuel;

  const drivingLicense = document.querySelector("#year").value;
  console.log(drivingLicense);
  const warning = document.querySelector("#drivingLicense");

  if (drivingLicense >= 2017) {
    yearsOfDrivingLicense = netPrice * 0.2;
    warning.innerText = `Your amount has increased becouse you have had a driving license for less than 5 years`;
    netPrice = yearsOfDrivingLicense + netPrice;
  } else if (drivingLicense < 2017) {
    warning.innerText = `You have a license for more than 5 years`;
    yearsOfDrivingLicense = 0;
  }
  if (drivingLicense >= 2019 && typeOfCategory == "premium") {
    info = `You cannot rent the premium version becouse you have had a driving license for less than 3 years, choose another version`;
    netPrice = 0;
    yearsOfDrivingLicense = 0;
    fuel = 0;
    warning.innerText = `${info}`;
  }

  let ok;
  const car = document.querySelector("#car").value;
  console.log(car);

  if (car == "audi" && availability.audi > 3) {
    ok = `The price of your car has not increased`;
    priceForAvailability = 0;
  } else if (car == "bmw" && availability.bmw > 3) {
    ok = `The price of your car has not increased`;
    priceForAvailability = 0;
  } else if (car == "toyota" && availability.toyota > 3) {
    ok = `The price of your car has not increased`;
    priceForAvailability = 0;
  } else if (car == "mercedes" && availability.mercedes > 3) {
    ok = `The price of your car has not increased`;
    priceForAvailability = 0;
  } else {
    priceForAvailability = netPrice * 0.15;
    netPrice = priceForAvailability + netPrice;
    console.log(priceForAvailability);
  }

  if (!numberOfKilometers || !rentDays) {
    alert("The number of days and kilometers to be traveled was not specified");
    fuel = 0;
    netPrice = 0;
    console.log(
      "The number of days and kilometers to be traveled was not specified"
    );
  } else {
    netPrice = fuel + netPrice;
    console.log(numberOfKilometers);
    const priceGrossCalculation = netPrice * 0.23;
    const grossPrice = netPrice + priceGrossCalculation;
    totalPrice.innerText = `Total price:
    Net price:${netPrice.toFixed(2)} 
    Gross price: ${grossPrice.toFixed(2)}
    
    `;
    addition.innerText = `Adittion:
  -Years of driving license :${yearsOfDrivingLicense}
  -Price for availability: ${priceForAvailability}
  -Fuel ${fuel.toFixed(2)}`;
  }

  output.innerText = selectedSize
    ? `You have selected ${selectedSize}`
    : `You haven't selected any type`;
};
