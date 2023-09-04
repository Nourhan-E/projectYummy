
let rowData = document.getElementById("rowData")
let searchInput = document.getElementById("searchInput")




$(document).ready(()=>{
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")
    })


})


// open side nav
function openNav(){
    $(".side-nav-menu").animate({
        left:0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify")
    $(".open-close-icon").addClass("fa-x")

    
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

// close side nav 
function closeNav(){
    let width = $(".side-nav-menu .nav-item").outerWidth()
    $(".side-nav-menu").animate({
        left: -width
    },500)

    $(".open-close-icon").addClass("fa-align-justify")
    $(".open-close-icon").removeClass("fa-x")

    $("links .li").animate({
        top:300
    },500)


}

closeNav()
$(".side-nav-menu i.open-close-icon").click( ()=>{
    if($(".side-nav-menu").css("left")== "0px"){
        closeNav()
    }
    else{
        openNav()
    }
})





function displayMeals(data) {
    let boxInner = "";

    for (let i = 0; i < data.length; i++) {
        boxInner += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = boxInner
}


// get data categories
async function getCategory(){
    rowData.innerHTML=""
    $(".inner-loading").fadeIn(300)
    searchInput.innerHTML = "";


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    console.log(response)
    console.log("getCategory")


   let req= displayCategories(response.categories)
   console.log(req);

    $(".inner-loading").fadeOut(300)

}


// display  categories
function displayCategories(data){
    let  boxInner =" "

    for(let i =0; i < data.length ; i++){
        boxInner +=`
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
            <div class="layer position-absolute text-center text-dark d-block">
                <h3 class="text-dark">${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")} </p>
            </div>
        </div>

    </div>
        `
        

    }

    rowData.innerHTML= boxInner
   

}

//    .........................................
 async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    console.log(response);


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

// get data Area
async function getAreaData(){
    rowData.innerHTML =''
    $(".inner-loading").fadeIn(300)

    let getApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    getApi = await getApi.json()

    console.log(getApi.meals);


    displayAreaData(getApi.meals)
    $(".inner-loading").fadeOut(300)

}

// display  Area Data
async function displayAreaData(data){
    let boxInner = ""
    for(let i =0; i<data.length; i++){
        boxInner +=`
        <div class="col-md-3">
                    <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 cursor-pointer text-center">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = boxInner
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    console.log(response);


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

// get data Ingredients
async function getIngredientData(){
    rowData.innerHTML =''
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()

    console.log(response.meals);


    displayIngredientsData(response.meals.slice(0,20))
    $(".inner-loading").fadeOut(300)

}

// display Ingredients 
async function displayIngredientsData(data){
    let boxInner=""
    for(let i= 0; i< data.length ; i++){
        boxInner +=`
        <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 cursor-pointer text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>

        `
    }
    rowData.innerHTML=boxInner
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    console.log(response);


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

// get Meal Details
async function getMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    searchInput.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading").fadeOut(300)

}


// display Meal Details
function displayMealDetails(meal) {
    
    searchInput.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let data = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = data
}



// display Search Input
function displaySearchInput(){
    searchInput.innerHTML=`
    <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white " placeholder="Search By Name " type="text">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)"  maxlength="1" class="form-control bg-transparent text-white " placeholder="Search By First Letter " type="text">
            </div>

        </div>

    `
    rowData.innerHTML= ""


}

// search By Name
async function searchByName(name){
    closeNav()
    rowData.innerHTML=""
    $(".inner-loading").fadeIn(300) 

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()


    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(300)
}

// search By  Letter
async function searchByLetter(letter){
    closeNav()
    rowData.innerHTML=""
    $(".inner-loading").fadeIn(300) 

    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()


    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(300)
}



// display Contacts 
function displayContacts(){
    rowData.innerHTML=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input id="nameInput" onkeyup="inputsValidation()" class="form-control" placeholder="Enter Your Name" type="text">
                                <div id="alertName" class=" alert alert-danger w-100 mt-2 d-none  ">
                                    Special Characters and Number Not Allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" class="form-control" onkeyup="inputsValidation()" placeholder="Enter Your Email" type="email">
                                <div id="alertEmail" class=" alert alert-danger w-100 mt-2 d-none  ">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneInput" class="form-control" onkeyup="inputsValidation()" placeholder="Enter Your Phone" type="text">
                                <div id="alertPhone" class=" alert alert-danger w-100 mt-2 d-none  ">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput" class="form-control" onkeyup="inputsValidation()" placeholder="Enter Your Age" type="number">
                                <div id="alertAge" class=" alert alert-danger w-100 mt-2 d-none  ">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="passwordInput" class="form-control" onkeyup="inputsValidation()" placeholder="Enter Your Password" type="password">
                                <div id="alertPassword" class=" alert alert-danger w-100 mt-2 d-none  ">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:* 
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="repasswordInput" class="form-control" onkeyup="inputsValidation()" placeholder="Repassword" type="password">
                                <div id="alertRepassword" class=" alert alert-danger w-100 mt-2 d-none  ">
                                    Enter valid repassword 
                                </div>
                            </div>
                        </div>
                        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled >
                            Submit
                        </button>
                    </div>
                </div>
    `


    let submitBtn = document.getElementById("submitBtn")

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched =true

    })
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched =true

    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched =true

    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched =true

    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched =true

    })
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched =true

    })
    

} 

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


// Validation
function inputsValidation(){

    let alertName = document.getElementById("alertName")
    let alertEmail = document.getElementById("alertEmail")
    let alertPhone = document.getElementById("alertPhone")
    let alertAge = document.getElementById("alertAge")
    let alertPassword = document.getElementById("alertPassword")
    let alertRepassword = document.getElementById("alertRepassword")


    if(nameInputTouched){
        if(nameValidation()) {
            alertName.classList.replace("d-block", "d-none")
        }
        else{
            alertName.classList.replace("d-none", "d-block")
        }
    }
    if(emailInputTouched){
        if(emailValidation()) {
            alertEmail.classList.replace("d-block", "d-none")
        }
        else{
            alertEmail.classList.replace("d-none", "d-block")
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            alertPhone.classList.replace("d-block", "d-none")
        } else {
            alertPhone.classList.replace("d-none", "d-block")

        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            alertAge.classList.replace("d-block", "d-none")
        } else {
            alertAge.classList.replace("d-none", "d-block")

        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            alertPassword.classList.replace("d-block", "d-none")
        } else {
            alertPassword.classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            alertRepassword.classList.replace("d-block", "d-none")
        } else {
            alertRepassword.classList.replace("d-none", "d-block")

        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}







function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

