document.addEventListener("DOMContentLoaded", async() => {


    let productList= (await axios.get("http://localhost:3000/products")).data;
    console.log(productList);

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.isLogined);
    let userIndex = users.findIndex(user => user.id === currentUser?.id);
     


    if (!currentUser) {
      toast("No logged in user found");
      return;
    }
  
    let register = document.querySelector(".register");
    let  login = document.querySelector(".login");
    let logout = document.querySelector(".logout");
    let  btnusername = document.querySelector(".username");
  
    register.classList.add("d-none");
    login.classList.add("d-none");
    logout.classList.remove("d-none");
    btnusername.classList.remove("d-none");
    btnusername.textContent = currentUser.username;
  
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      currentUser.isLogined = false;
      localStorage.setItem("users", JSON.stringify(users));
      toast("Logout account");
      setTimeout(() => window.location.reload(), 2000);
    });
  
    let deleteAllBtn = document.querySelector(".deleteAllBtn");
    deleteAllBtn.addEventListener("click", deleteAll);
  
    function createBasketItem() {
      let basketArea = document.querySelector(".basket");
      basketArea.innerHTML = "";
  
      if (!currentUser.basket || currentUser.basket.length === 0) {
        deleteAllBtn.style.display = "none";
        basketArea.innerHTML = "<p>Your basket is empty</p>";
        return;
      }
  
      deleteAllBtn.style.display = "inline-block";
  
      currentUser.basket.forEach(product => {
        let basketItem = document.createElement("div");
        basketItem.className = "basket-item";
  
    
        let imageDiv = document.createElement("div");
        imageDiv.className = "image";
        let img = document.createElement("img");
        img.src = product.image;
        imageDiv.appendChild(img);
  
       
        let area = document.createElement("div");
        area.className = "area";
  
        
        const titleArea = document.createElement("div");
        titleArea.className = "title-area";
  
        const title = document.createElement("h6");
        title.className = "title";
        title.textContent = product.title;
  
        const price = document.createElement("p");
        price.className = "price";
        price.textContent = (product.price * product.count).toFixed(2) + " $";
  
        titleArea.append(title, price);
  
        
        const size = document.createElement("p");
        size.className = "size";
        size.innerHTML = "Size: XS<br>Color: Grey<br>Delivery: 25-32 days<br>Quality";
  
        
        let qualityBtn = document.createElement("button");
        qualityBtn.className = "quality";
        qualityBtn.innerHTML = '2-9 <i class="fa fa-chevron-right"></i>';
  
        
        let favorite = document.createElement("div");
        favorite.className = "favorite";

        
        let countArea = document.createElement("div");
        countArea.className = "count-area";
  
        let minusBtn = document.createElement("button");
        minusBtn.className = "minus-btn";
        minusBtn.textContent = "-";
        if (product.count === 1) minusBtn.setAttribute("disabled", true);
  
        let countElem = document.createElement("p");
        countElem.className = "count";
        countElem.textContent = product.count;
  
        const plusBtn = document.createElement("button");
        plusBtn.className = "plus-btn";
        plusBtn.textContent = "+";
  
        
        let wishlist = document.createElement("button");
        wishlist.className = "wishlistBtn";
  
        let heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-heart", "wish");
        if (currentUser.wishlist?.some(p => p.id === product.id)) {
          heartIcon.classList.add("fa-solid");
          heartIcon.style.color = "#DF4244";
        } else {
          heartIcon.classList.add("fa-regular");
        }
        heartIcon.addEventListener("click",()=>{
            addUserWishlist(product.id,heartIcon)
        })
  
        wishlist.append(heartIcon, " Favorite");
  
        // Remove Button
        let removeBtn = document.createElement("button");
        removeBtn.className = "btn-dangerBtn";
        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash", "dump");
        removeBtn.append(trashIcon, " Remove");
  
        // Plus Minus
        plusBtn.addEventListener("click", () => {
          product.count++;
          updateBasket();
        });
  
        minusBtn.addEventListener("click", () => {
          if (product.count > 1) {
            product.count--;
            updateBasket();
          }
        });
  
        removeBtn.addEventListener("click", () => {
          currentUser.basket = currentUser.basket.filter(p => p.id !== product.id);
          updateBasket(true);
          toast("Product removed from basket");
        });
  
       
        countArea.append(minusBtn, countElem, plusBtn);
        favorite.append(countArea, wishlist, removeBtn);
        area.append(titleArea, size, qualityBtn, favorite);
        basketItem.append(imageDiv, area);
        basketArea.appendChild(basketItem);
      });
  
      updateTotal();
      updateCount();
    }

    // Add Wishlist
    function addUserWishlist(productID,HeardIcon) {
        if (!currentUser) {
            toast("Login to add product to wishlist")
            setTimeout(() => {
                window.location.href="login.html"
            }, 2000);
        }
    
        let loginedUserProduct=currentUser.wishlist.some((product)=>product.id===productID)
        if (loginedUserProduct) {
            let loginedUserProductIndex=currentUser.wishlist.findIndex((product)=>product.id===productID)
            currentUser.wishlist.splice(loginedUserProductIndex,1)
            users[userIndex].wishlist=currentUser.wishlist
            HeardIcon.classList.add("fa-regular")
            HeardIcon.classList.remove("fa-solid")
            localStorage.setItem("users",JSON.stringify(users))
            toast("Product removed wishlist.")
        }
        else{
           let userAddProduct=productList.find((product)=>product.id===productID)
           currentUser.wishlist.push(userAddProduct)
           users[userIndex].wishlist=currentUser.wishlist
           HeardIcon.classList.remove("fa-regular")
           HeardIcon.classList.add("fa-solid")
           localStorage.setItem("users",JSON.stringify(users))
           toast("Product add wishlist")
        }
     }
  
    function updateBasket(reRender = true) {
      users[userIndex] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
      if (reRender) createBasketItem();
    }
  
    function deleteAll() {
      currentUser.basket = [];
      updateBasket();
      toast("All products removed from basket");
    }
  
    function updateTotal() {
      let total = currentUser.basket.reduce((sum, item) => sum + item.price * item.count, 0);
      document.querySelector(".total-price").textContent = total.toFixed(2);
      document.querySelector(".totalPriceEnd").textContent = total.toFixed(2);
    }
  
    function updateCount() {
      let count = currentUser.basket.reduce((acc, p) => acc + p.count, 0);
      let countElem = document.querySelector(".basketIcon sup");
      if (countElem) countElem.textContent = count;
    }
  
    createBasketItem();
  });
  
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
  