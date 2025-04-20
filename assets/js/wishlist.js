document.addEventListener("DOMContentLoaded", async()=>{
    let products= (await axios.get("http://localhost:3000/products")).data

    console.log(products);
    // basketCount()
     
    let users=JSON.parse(localStorage.getItem("users")) || []
    let register=document.querySelector(".register")
    let login=document.querySelector(".login")
    let logout=document.querySelector(".logout")
    let btnusername=document.querySelector(".username")


    let loginedUser=users.find((user)=>user.isLogined==true)
    let userIndex=loginedUser ? users.findIndex((user)=>user.id===loginedUser.id) : -1
    if (!loginedUser) {
        register.classList.remove("d-none")
        login.classList.remove("d-none")
        logout.classList.add("d-none")
    }
    else{
        register.classList.add("d-none")
        login.classList.add("d-none")
        logout.classList.remove("d-none")
        btnusername.classList.remove("d-none")
        btnusername.textContent=loginedUser.username
    }


    logout.addEventListener("click", logoutUser)

    function logoutUser(e) {
        e.preventDefault()
        loginedUser.isLogined=false
        localStorage.setItem("users",JSON.stringify(users))
        toast("Logout account")
        setTimeout(() => {
            window.location.reload()
        }, 2000);
        return
    }

    let cards=document.querySelector(".cards")
    

    function createCard() {
        loginedUser.wishlist.forEach(product => {
            let card=document.createElement("div")
            card.classList.add("card")
           

            let cardImage=document.createElement("div")
            cardImage.classList.add("card-image")

            let cardSale=document.createElement("p")
            cardSale.classList.add("card-sale")
            cardSale.textContent=`${product.sale}`

            let cardHeart=document.createElement("i")
            cardHeart.classList.add("fa-solid", "fa-x","card-heart")
            if (loginedUser && loginedUser.wishlist.some(item => item.id === product.id)) {
                cardHeart.classList.remove("fa-regular");
                cardHeart.classList.add("fa-solid");
              }
            cardHeart.addEventListener("click", (e)=>{
                e.stopPropagation()
                removeProduct(product.id,cardHeart)
            })

            let cardImg=document.createElement("img")
            cardImg.classList.add("card-img")
            cardImg.src=`${product.image}`

            let cardContent=document.createElement("div")
            cardContent.classList.add("card-content")

            let cardStar1=document.createElement("i")
            cardStar1.classList.add("fa-solid", "fa-heart", "card-star")


            let cardStar2=document.createElement("i")
            cardStar2.classList.add("fa-solid", "fa-heart", "card-star")

            let cardStar3=document.createElement("i")
            cardStar3.classList.add("fa-solid", "fa-heart", "card-star")

            let cardStar4=document.createElement("i")
            cardStar4.classList.add("fa-solid", "fa-heart", "card-star")

            let cardStar5=document.createElement("i")
            cardStar5.classList.add("fa-solid", "fa-heart", "card-star")

            let cardTitle=document.createElement("p")
            cardTitle.classList.add("card-title")
            cardTitle.textContent=`${product.title}`

            let price=document.createElement("span")
            price.classList.add("price")
            price.textContent=`$${product.price}`

            let spanSale=document.createElement("span")
            spanSale.classList.add("saleSpan")
            spanSale.textContent=`From $${product.saleprice}`

            let cardFooter=document.createElement("div")
            cardFooter.classList.add("cardFooter")

            let addBtn=document.createElement("button")
            addBtn.classList.add("addBtn")
            addBtn.textContent="Add to card"
            addBtn.addEventListener("click", (e)=>{
                e.stopPropagation()
                UserBasket(product.id)
            })

            cardFooter.appendChild(addBtn)
            cardContent.append(cardStar1,cardStar2,cardStar3,cardStar4,cardStar5,cardTitle,price,spanSale)
            cardImage.append(cardSale,cardHeart,cardImg)
            card.append(cardImage,cardContent,cardFooter)
            cards.appendChild(card)

        });
    }

    function removeProduct(productId, btnElement) {
        let loginedUserProductIndex = loginedUser.wishlist.findIndex((product) => product.id == productId);
             
        if (loginedUserProductIndex !== -1) {
            loginedUser.wishlist.splice(loginedUserProductIndex, 1);
            users[userIndex].wishlist = loginedUser.wishlist;
            localStorage.setItem("users", JSON.stringify(users)); 
            toast("Mehsul sevimlilerden silindi");  
            
            btnElement.closest(".card").remove();
        }
    }
   //basket add
   function UserBasket(productID) {
    if (!loginedUser) {
        toast("Login to add product to basket")
        setTimeout(() => {
            window.location.href="login.html"
        }, 2000);
    }
    let userProduct=products.find((item)=>item.id===productID)
    let existProduct=loginedUser.basket.find((item)=>item.id===productID)
    if (!existProduct) {
        loginedUser.basket.push({...userProduct,count:1})
    }
    else{
        existProduct.count+=1
    }
    users[userIndex].basket=loginedUser.basket
    localStorage.setItem("users",JSON.stringify(users))
    toast("Product added basket")

    basketCount()
}

function basketCount() {
    if (loginedUser) {
        let result = loginedUser.basket.reduce((acc, product) => acc + (product.count || 0), 0);
        let basketIcon = document.querySelector(".basketIcon sup");
        if (basketIcon) {
            basketIcon.textContent = result;
        }
    }
}

createCard()

let toast=(text)=>{
    Toastify({
        text: `${text}`,
        duration:1000,
        position:"right",
        stopOnFocus: true,
        style:{
            background:"linear-gradient(to right, #d93025, #e57373)",
            color: "white",
            borderRadius:"6px",
            boxShadow:"0 4px 8px rgba(0,0,0,0.1)"
        },
        onClick:function () {} //Calback after click  
    }).showToast()
}
})