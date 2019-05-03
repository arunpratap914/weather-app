console.log("client side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const msg3 = document.querySelector("#msg3");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  msg3.textContent = "";
  fetch("/weather?address=" + search.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        //console.log(data);
        msg1.textContent = "Location : " + data.location;
        msg2.textContent = "Summary : " + data.summary;
        msg3.textContent = "Temprature : " + data.temprature;
      }
    });
  });
});
