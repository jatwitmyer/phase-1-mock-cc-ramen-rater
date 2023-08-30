// - Create a new ramen after submitting the `new-ramen` form. The new ramen should
//   be added to the`#ramen-menu` div. The new ramen does not need to persist; in
//   other words, if you refresh the page, it's okay that the new ramen is no
//   longer on the page.

fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(ramens => {
        renderRamens(ramens)
    }) //ramens is an array of objects. each object is a ramen

function renderRamens(ramens) { //ramens is an array of objects. each object is a ramen
    console.log("array of ramen objects", ramens)
    renderReviews(ramens) //pass array of ramens to reviews function

    ramens.forEach(ramen => {
        //place images in the div with id of ramen-menu
        ramenImg = document.createElement("img")
        ramenImg.src = ramen.image
        ramenImg.alt = `Picture of ${ramen.name} from ${ramen.restaurant}.`
        ramenImg.title = `${ramen.name} from ${ramen.restaurant}`
        ramenImg.addEventListener("click", e => {
            // console.log("clicked image", (e.target.src))
            // console.log("ramens[0]", (ramens[0].image.slice(1)))
            // console.log("ramens array", ramens)
            const newRamens = []
            ramens.forEach(ramen => {
                if (e.target.src.includes(ramen.image.slice(1))) {
                    newRamens.push(ramen)
                } else if (e.target.src.includes(ramen.image)) {
                    newRamens.push(ramen)
                }
            })
            // console.log(newRamens)
            renderFeaturedRamen(newRamens)
        })
        divContainer = document.getElementById("ramen-menu")
        divContainer.append(ramenImg)
    }) 
}

function renderReviews(ramens) {
    // console.log("array of ramen objects", ramens)
    renderFeaturedRamen(ramens) //expects an array of objects
    // console.log(reviewsDiv)
}

function renderFeaturedRamen(ramens) { 
    //render default image
    const imgDiv = document.getElementById("featured-ramen-image")
    // console.log(imgDiv)
    const img = imgDiv.querySelector("img")
    img.src = ramens[0].image
    img.alt = `Picture of ${ramens[0].name} from ${ramens[0].restaurant}.`
    img.title = `${ramens[0].name} from ${ramens[0].restaurant}`
    const featuredName = imgDiv.getElementsByClassName("name")[0]
    const featuredRestaurant = imgDiv.getElementsByClassName("restaurant")[0]
    featuredName.textContent = ramens[0].name
    featuredRestaurant.textContent = ramens[0].restaurant
    //render default ratings
    const reviewsDiv = document.getElementById("featured-ramen-reviews")
    // console.log(reviewsDiv)
    const rating = document.getElementById("rating-display")
    rating.textContent = ramens[0].rating
    //render default comments
    const commentSection = document.getElementById("comment-display")
    commentSection.textContent = ""
    ramens[0].comment.forEach(comment => {
        const individualComment = document.createElement("p")
        individualComment.className = "individualComment"
        commentSection.append(individualComment)

        const reviewText = document.createElement("span")
        reviewText.className = "reviewText"
        reviewText.textContent = `"${comment.text}"`
        individualComment.append(reviewText)

        const commenter = document.createElement("span")
        commenter.className = "commenter"
        commenter.textContent = ` -${comment.name}`
        individualComment.append(commenter)
    })
}

const addNewRamenForm = document.getElementById("new-ramen")
addNewRamenForm.addEventListener("submit", e => {
    e.preventDefault()
    const enteredRamen = {
        comment: [{
            name: "anonymous",
            text: e.target["new-comment"].value
        }],
        image: e.target.image.value,
        name: e.target.name.value,
        rating: e.target.rating.value,
        restaurant: e.target.restaurant.value
    }
    renderRamens([enteredRamen])
})