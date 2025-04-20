let url = new URLSearchParams(location.search);
let id = (url.get("id"));
console.log(id)

async function products(e) {
    if (e) e.preventDefault();

    try {
        let result = (await axios.get("http://localhost:3000/products")).data;
        let findProd = result.find((product) => product.id === id);
        console.log(findProd)
        if (!findProd) {
          toast("Product not found")
            return;
        }

        let users=JSON.parse(localStorage.getItem("users")) || []
        let loginedUser=users.find((item)=>item.isLogined==true)
        let loginedUserindex=loginedUser ? users.findIndex((user)=>user.id===loginedUser.id) : -1

        let login=document.querySelector(".login")
        let logout=document.querySelector(".logout")
        let register=document.querySelector(".register")
        let btnusername=document.querySelector(".username")

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

        let topArea = document.querySelector(".top_area");
        let leftArea = document.querySelector(".left");
        let cards = document.querySelector(".cards");
        let rightArea = document.querySelector(".right");

        
        leftArea.innerHTML = "";
        cards.innerHTML = "";
        rightArea.innerHTML = "";

        
        let upArrow = document.createElement('i');
        upArrow.classList.add('fa-solid', 'fa-chevron-up');
        leftArea.appendChild(upArrow);

        
        let imgCount = 4;
        for (let i = 0; i < imgCount; i++) {
            let img = document.createElement('img');
            img.src = findProd.image;
            img.classList.add('asideImg');
            leftArea.appendChild(img);
        }

      
        let downArrow = document.createElement('i');
        downArrow.classList.add('fa-solid', 'fa-chevron-down');
        leftArea.appendChild(downArrow);

       
        let card = document.createElement('div');
        card.classList.add('card');

        let cardImage = document.createElement('div');
        cardImage.classList.add('card-image');

        let cardSale = document.createElement('p');
        cardSale.classList.add('card-sale');
        cardSale.textContent = findProd.sale;

        let cardHeart = document.createElement('i');
        cardHeart.classList.add('fa-regular', 'fa-heart', 'card-heart');
        if (loginedUser && loginedUser.wishlist.some(item => item.id === id)) {
            cardHeart.classList.remove("fa-regular");
            cardHeart.classList.add("fa-solid");
          }
        cardHeart.addEventListener("click", (e)=>{
            e.stopPropagation()
            addUserWishlist(findProd,cardHeart)
        })

        function addUserWishlist(product, HeardIcon) {
            if (!loginedUser) {
                toast("Login to add product to wishlist")
                setTimeout(() => {
                    window.location.href = "login.html"
                }, 2000);
                return;
            }
        
            let existingIndex = loginedUser.wishlist.findIndex((item) => item.id === product.id);
        
            if (existingIndex !== -1) {
                
                loginedUser.wishlist.splice(existingIndex, 1);
                HeardIcon.classList.add("fa-regular");
                HeardIcon.classList.remove("fa-solid");
                toast("Product removed from wishlist.");
            } else {
               
                loginedUser.wishlist.push(product);
                HeardIcon.classList.remove("fa-regular");
                HeardIcon.classList.add("fa-solid");
                toast("Product added to wishlist.");
            }
        
            users[loginedUserindex].wishlist = loginedUser.wishlist;
            localStorage.setItem("users", JSON.stringify(users));
        }

        let cardImg = document.createElement('img');
        cardImg.src = findProd.image;
        cardImg.classList.add('card-img');

        cardImage.append(cardSale, cardHeart, cardImg);
        card.appendChild(cardImage);
        cards.appendChild(card);

       
        let cardTitle = document.createElement('h3');
        cardTitle.classList.add('cardTitle');
        cardTitle.textContent = findProd.title;

        let starIcon1=document.createElement("i")
        starIcon1.classList.add("fa-solid", "fa-star", "card-star")
        let starIcon2=document.createElement("i")
        starIcon2.classList.add("fa-solid", "fa-star", "card-star")

        let starIcon3=document.createElement("i")
        starIcon3.classList.add("fa-solid", "fa-star", "card-star")

        let starIcon4=document.createElement("i")
        starIcon4.classList.add("fa-solid", "fa-star", "card-star")

        let starIcon5=document.createElement("i")
        starIcon5.classList.add("fa-solid", "fa-star", "card-star")


        let rate = document.createElement('span');
        rate.classList.add('rate');
        rate.textContent = '5.0';

        let line = document.createElement('span');
        line.classList.add('line');
        line.textContent = '|';

        let reviews = document.createElement('span');
        reviews.classList.add('reviews');
        reviews.textContent = '2 reviews';

        let priceArea = document.createElement('div');
        priceArea.classList.add('price_area');

        let priceBox1 = document.createElement('div');
        priceBox1.classList.add('price-box');
        priceBox1.innerHTML = '1-9 pieces <strong>US $20.00</strong>';

        let priceBox2 = document.createElement('div');
        priceBox2.classList.add('price-box');
        priceBox2.innerHTML = '10-49 pieces <strong>US $15.00</strong>';

        let priceBox3 = document.createElement('div');
        priceBox3.classList.add('price-box');
        priceBox3.innerHTML = '50 pieces <strong>US $13.00</strong>';

        let priceBox4 = document.createElement('div');
        priceBox4.classList.add('price-box');
        priceBox4.innerHTML = '1-1000+ <strong>US $20.00</strong>';

        priceArea.append(priceBox1, priceBox2, priceBox3, priceBox4);

        let titleSizeColor = document.createElement('div');
        titleSizeColor.classList.add('titleSizeColor');

        let size = document.createElement('div');
        size.classList.add('size');
        size.textContent = 'Size';

        let color = document.createElement('div');
        color.classList.add('color');
        color.textContent = 'Color';

        titleSizeColor.append(size, color);

        let footer = document.createElement('div');
        footer.classList.add('footer');

        let sizeColor = document.createElement('div');
        sizeColor.classList.add('sizeColor');

        let sizeArea = document.createElement('div');
        sizeArea.classList.add('size_area');

        ['XS', 'S', 'M'].forEach(size => {
            let box = document.createElement('div');
            box.classList.add('size-box');
            box.textContent = size;
            sizeArea.appendChild(box);
        });
        
        let colorArea=document.createElement("div")
        colorArea.classList.add("color_area")

        let colorOrange=document.createElement("div")
        colorOrange.classList.add("color-orange")

        let colorBlue=document.createElement("div")
        colorBlue.classList.add("color-blue")
        let colorGreen=document.createElement("div")
        colorGreen.classList.add("color-green")
        let colorPurple=document.createElement("div")
        colorPurple.classList.add("color-purple")

        colorArea.append(colorOrange,colorBlue,colorGreen,colorPurple)

        sizeColor.append(sizeArea, colorArea);

        let addArea = document.createElement('div');
        addArea.classList.add('add_area');

        let addBox1 = document.createElement('div');
        addBox1.classList.add('add-box');
        let addBtn = document.createElement('button');
        addBtn.classList.add('addBtn');
        addBtn.textContent = 'Add to card';
        addBox1.appendChild(addBtn);
        addBtn.addEventListener("click", ()=>{
            AddBasket(findProd)
        })

       
 function AddBasket(product) {
    if (!loginedUser) {
        toast("Login to add product to basket")
        setTimeout(() => {
            window.location.href="login.html"
        }, 2000);
    }

    let existproducts=loginedUser.basket.find((elem)=>elem.id==product.id)

    if (!existproducts) {
        loginedUser.basket.push({...product, count:1})
    }
    else{
        existproducts.count+=1
    }

    users[loginedUserindex].basket=loginedUser.basket
    localStorage.setItem("users",JSON.stringify(users))
    toast("Product added basket.")

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

basketCount()

        let addBox2 = document.createElement('div');
        addBox2.classList.add('add-box');
        let addCash = document.createElement('button');
        addCash.classList.add('addCash');
        addCash.textContent = 'Cash Payment';
        addBox2.appendChild(addCash);

        addArea.append(addBox1, addBox2);
        footer.append(sizeColor, addArea);

        rightArea.append(cardTitle,starIcon1,starIcon2,starIcon3,starIcon4,starIcon5, rate, line, reviews, priceArea, titleSizeColor, footer);

        topArea.append(leftArea, cards, rightArea);

        let desc=document.querySelector(".descruption")

        let decsText=document.createElement("p")
        decsText.classList.add("descruptionText")
        decsText.textContent=findProd.description
        desc.appendChild(decsText)

    } catch (error) {
        toast("Error")
        console.error(error);
        
    }
}
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
products()
