const API_URL = 'https://usersdogs.dmytrominochkin.cloud/dogs';
const IMAGE_BASE_URL = 'https://usersdogs.dmytrominochkin.cloud';
const request = new XMLHttpRequest();
let popupCloseButton = document.getElementById('popup_close');
let bodyElement = document.getElementsByTagName('body')[0];
let index = 0;

fetch(API_URL)
    .then(response => response.json())
    .then(dogList => {
        dogList.forEach(dog => {
            main_section.insertAdjacentHTML("beforebegin",
                `<div class="card open_popup" onclick="showDetails(this)"  value="${index}">
            <img src="${IMAGE_BASE_URL}${dog.dogImage}" alt="dog">
            <div class="text_center">
            <h2>${dog.title}</h2>
            <p>${dog.sex}</p>
            </div>
            </div>`);
            index++;
        });
    })
    .catch(error => console.error(error));

function showDetails(element) {
    index = element.getAttribute('value');
    fetch(API_URL)
        .then(response => response.json())
        .then(dogList => {
            dogList.forEach(dog => {
                document.getElementById("image").src = IMAGE_BASE_URL + dogList[index].dogImage;
                document.getElementById("dog_name").innerHTML = dogList[index].title;
                document.getElementById("dog_sex").innerHTML = dogList[index].sex;
                document.getElementById("dog_age").innerHTML = dogList[index].age;
                document.getElementById("dog_description").innerHTML = dogList[index].description;
                popup.classList.add('popup_visible');
                bodyElement.classList.add('no_scroll');
            });

        })
        .catch(error => console.error(error));
}

popupCloseButton.onclick = function () {
    popup.classList.remove('popup_visible');
    bodyElement.classList.remove('no_scroll');
};
