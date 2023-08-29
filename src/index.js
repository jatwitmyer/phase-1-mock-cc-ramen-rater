/*core deliverables

-See all ramen images in the div with the id of ramen-menu. When the page loads, request 
the data from the server to get all the ramen objects. Then, display the image for each 
of the ramen using an img tag inside the #ramen-menu div.
-Click on an image from the #ramen-menu div and see all the info about that ramen 
displayed inside the #ramen-detail div and where it says insert comment here and insert 
rating here.
-Create a new ramen after submitting the new-ramen form. The new ramen should be added 
to the#ramen-menu div. The new ramen does not need to persist; in other words, if you 
refresh the page, it's okay that the new ramen is no longer on the page.*/

const baseUrl = "http://localhost:3000/ramens"

const menu = document.getElementById("ramen-menu")
const detail = document.getElementById("ramen-detail")
const form = document.getElementById("new-ramen")
const menuArray = []

//First and Second Deliverables
fetch(baseUrl)
  .then(resp => resp.json())
  .then(menu => {
    renderMainImage(menu[0])
    deleteMainRamen(menu)
    menu.forEach(ramen => renderRamen(ramen))
}) //returns and array of objects. each object is a meanu item

function renderRamen(ramen) {
    //ramen is an object with keys id, name, restaurant, image, rating, and comment
    const img = document.createElement("img")
    img.src = ramen.image //might not work
    img.alt = `Picture of ${ramen.name} from ${ramen.restaurant}.`
    img.title = `${ramen.name} from ${ramen.restaurant}`
    img.id = ramen.id
    // img.addEventListener('click', e => showDetails(e))
    img.addEventListener('click', e => renderMainImage(ramen))
    menu.append(img)
}

//Third Deliverable
form.addEventListener("submit", e => {
    e.preventDefault()
    // console.log(e.target.name.value) same as below and below is clearer
    const newRamen = {
        // id: "",
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: form["new-comment"].value,
      }
    // console.log(newRamen)
    renderRamen(newRamen)
    form.reset()
})

/*advanced deliverables

-See the details for the first ramen as soon as the page loads (without clicking on an 
image)
-Update the rating and comment for a ramen by submitting a form. Changes should be 
reflected on the frontend. No need to persist. You can add this HTML to the index.html 
file to create the edit form:
-Delete a ramen (you can add a "delete" button if you'd like, or use an existing element 
to handle the delete action). The ramen should be removed from the ramen-menu div, and 
should not be displayed in the ramen-detail div. No need to persist.*/

//First Deliverable
function renderMainImage(ramen) {
    detail.querySelector("img").src = ramen.image
    detail.querySelector("img").alt = `Picture of ${ramen.name} from ${ramen.restaurant}`
    detail.querySelector("h2").textContent = ramen.name
    detail.querySelector("h3").textContent = ramen.restaurant
    document.getElementById("rating-display").textContent = ramen.rating
    document.getElementById("comment-display").textContent = ramen.comment
    featuredRamenId = ramen.id
}

//Second Deliverable
//html added at line 37
const editForm = document.getElementById("edit-ramen")

editForm.addEventListener("submit", e => {
    e.preventDefault()
    document.getElementById("rating-display").textContent = editForm.rating.value
    document.getElementById("comment-display").textContent = editForm["new-comment"].value
})

//Third Deliverable
const deleteForm = document.getElementById("delete-ramen")

let featuredRamenId = 0

function deleteMainRamen(menu) {
    console.log("menu", menu)
    deleteForm.addEventListener("submit", e => {
        e.preventDefault()
        const featuredRamen = document.getElementById(featuredRamenId)
        console.log("featured ramen", featuredRamen)
        console.log("featured ramen id", featuredRamenId)
        featuredRamen.remove()
        menu.splice(featuredRamenId -1, 1)
        console.log("new menu", menu)
        console.log("new first item", menu[0])
        renderMainImage(menu[0])
    })
}