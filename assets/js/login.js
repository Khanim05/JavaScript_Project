document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let form = document.querySelector("form");
  
    form.addEventListener("submit", login);
  
    function login(e) {
      e.preventDefault();
  
      let loginUser = users.find(
        (user) =>
          user.username === username.value || user.email === username.value
      );
  
      if (!loginUser) {
        toast("User not found");
        return;
      }
  
      
      if (
        loginUser.lockUntil &&
        new Date(loginUser.lockUntil) > new Date()
      ) {
        toast("Account access blocked");
        return;
      }
  
      
      if (loginUser.password !== password.value) {
        loginUser.attemps = (loginUser.attemps || 0) + 1;
  
        if (loginUser.attemps >= 3) {
          loginUser.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
          localStorage.setItem("users", JSON.stringify(users)); 
          toast("Account 15 minutes blocked");
          return;
        } else {
          toast("Invalid password");
          localStorage.setItem("users", JSON.stringify(users)); 
          return;
        }
      }
  
      
      let letters = /[a-zA-Z]+/;
      let numbers = /[0-9]+/;
      let line = /[@_-]+/;
      let ps = /[@#$%&.]+/;
  
      if (
        !(
          letters.test(username.value) &&
          numbers.test(username.value) &&
          line.test(username.value) &&
          letters.test(password.value) &&
          ps.test(password.value)
        )
      ) {
        toast("Username or password don't match the condition");
        return;
      }
  
     
      loginUser.isLogined = true;
      loginUser.attemps = 0;
      loginUser.lockUntil = null;
  
      localStorage.setItem("users", JSON.stringify(users));
      toast("Logged in");
  
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  
    let toast=(text)=>{
        Toastify({
            text: `${text}`,
            duration:3000,
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

  });