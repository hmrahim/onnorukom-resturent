// get id from elements
const row = document.getElementById("row")
const speener = document.getElementById("speener")
speener.style.display = "none"


const productCategorys = async () => {
    speener.style.display = "block"
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
    const res = await fetch(url)
    const data = await res.json()
    row.innerHTML = `<h1 class="text-center my-3">Our Product Categorys</h1>`

    for (const category of data.categories) {
        const collum = document.createElement("div")
        collum.classList.add("col-6")
        collum.classList.add("col-sm-6")
        collum.classList.add("col-md-4")
        collum.classList.add("col-lg-4")
        collum.innerHTML = `
                <div class="card" onclick="productCategory('${category.strCategory}')" style="cursor: pointer;">
                <img src="${category.strCategoryThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title text-center ">${category.strCategory}</h5>
                
                
                </div>
            </div>
        `
        row.appendChild(collum)
    }
    speener.style.display = "none"


}
productCategorys();

const productCategory = async (categoryName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${categoryName}`
    const res = await fetch(url);
    const data = await res.json()
    // if (data.meals.length == 0) {
    //     console.log("no data found");
    // }
    row.innerHTML = ""
    speener.style.display = "block"

    row.innerHTML = `<h1 class="text-center my-3 text-capitalize">product from ${categoryName} categories</h1>`

    const meals = data.meals

    if (meals == null) {
        row.innerHTML = `<h1 class="text-center my-3 text-capitalize">Item not available</h1>
        <a href="" class="text-center text-decoration-none">Please go back</a>
        `
    }



    for (const item of meals) {
        const collum = document.createElement("div")
        collum.classList.add("col-6")
        collum.classList.add("col-sm-6")
        collum.classList.add("col-md-4")
        collum.classList.add("col-lg-4")
        collum.innerHTML = `
            <div class="card">
            <img src="${item.strMealThumb}" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.strMeal}</h5>
            <p class="card-text">${item.strInstructions.slice(0, 100)}</p>
            <a href="#details"  onclick="singleItem('${item.idMeal}')" class="btn btn-primary id">See details</a>
            </div>
        </div>
        `
        row.appendChild(collum)

    }
    speener.style.display = "none"



}



const input = document.getElementById("input")

const button = document.getElementById("button")


input.addEventListener("keyup", async () => {
    speener.style.display = "block"
    searchResult()
   
})

button.addEventListener("click", (e) => {
    e.preventDefault()
    speener.style.display = "block"
    searchResult()
})


const searchResult = async() => {
    if (input.value == "") {
        window.location.href="index.html"
    }else{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
    const res = await fetch(url);
        const data = await res.json()
        detailsRow.style.display="none"
    const meals = data.meals
        row.innerHTML = ""
        row.innerHTML=`<h1 class="text-center my-3 text-capitalize">Search Results for '${input.value}'</h1>`

        if (meals == null) {
            row.innerHTML = `
            <h1 class="text-center my-3 text-capitalize">Item not available</h1>
            `
            
        }
        

    for (const item of meals) {
        const collum = document.createElement("div")
        collum.classList.add("col-6")
        collum.classList.add("col-sm-6")
        collum.classList.add("col-md-4")
        collum.classList.add("col-lg-4")
        collum.innerHTML = `
            <div class="card">
            <img src="${item.strMealThumb}" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.strMeal}</h5>
            <p class="card-text">${item.strInstructions.slice(0, 100)}</p>
            <a href="#details" onclick="singleItem('${item.idMeal}')"  class="btn btn-primary">See details</a>
            </div>
        </div>
        `
        row.appendChild(collum)

        }
        speener.style.display = "none"

}
    
}
const detailsRow = document.getElementById("detailsRow")
detailsRow.style.display="none"
const singleItem = async id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const res = await fetch(url);
    const data = await res.json()
    const item = data.meals
    console.log(item);
    detailsRow.style.display="block"
    detailsRow.innerHTML = `
                <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <img src="${item[0].strMealThumb}" class="img-fluid rounded" alt="">
                

                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                <h3 class="text-center py-2">${item[0].strMeal}</h3> <hr>
                <p class="p-0 m-0"><strong>Item Name: </strong>${item[0].strMeal}</p>
                <p class="p-0 m-0"><strong>Categorie: </strong>${item[0].strCategory}</p>
                <p class="p-0 m-0"><strong>Item Area: </strong>${item[0].strArea}</p>
                <p class="p-0 m-0"><strong>Tags: </strong>${item[0].strTags}</p>
                <p class="p-0 m-0"><strong>Youtube: </strong><a target="_blank" href="${item[0].strYoutube}">Watch video review</a></p>
                
                </div>
            </div>
            <div> <p class="m-1 p-2"><strong>Details: </strong>${item[0].strInstructions}</p></div>
    `
}





