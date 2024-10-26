var mealsContainer = document.querySelector(".meals-container");
 var instructionsContainer = document.querySelector(".instructions-container");
 var searchInputs = document.querySelector("#searchInputs");
 var inputsearch = document.querySelector(".searchinput");
 var contactcontainer= document.querySelector(".contact-container")
 var contact = document.querySelector(".contact-us")
             ///// Regex 
    var nameregex = /^[a-z][a-z]{2,}$/;
    var EmailRegex = /^[a-z][a-z]{2,}[0-9]{3,}@(yahoo|gmail)\.com$/
    var phoneRegex = /^01[0125][0-9]{8}$/;
    var AgeRegex  = /^([1-9][0-9]|100)$/
    var passwordRegex = /^[a-z][a-z]{4,}[#*!][0-9]{3,}$/
    var RepasswordRegex = passwordRegex;
    
    // Hide contact Us
    document.querySelector(".contact").classList.add("d-none");

    $("#search").on("click" , function() {
      document.querySelector(".contact").classList.add("d-none");
      showsearchInputs()
      closenavTab()
      $("html","body").animate({scrollTop:0} , 1000)
    })
    $(".category").on("click" , function() {
      document.querySelector(".contact").classList.add("d-none");
      getcategories();
      closenavTab()
    })
    $(".area").on("click" , function() {
      document.querySelector(".contact").classList.add("d-none");
      getarea();
      closenavTab()
     })
    $(".Ingredients").on("click" , function() {
      document.querySelector(".contact").classList.add("d-none");
        getingredients();
        closenavTab()
     })
    $(".contact-us").on("click" , function() {
        showContactUs();
        closenavTab();
        searchInputs.innerHTML = ""
    }) 
var navtabwidth = $("#nav-tabs").outerWidth();
$(".aside").animate({left:`-${navtabwidth}px`} , 500);
$(".gear").on("click", function() {
  closenavTab()
})
  var navtabStatus = false;
  function closenavTab() {
      if(navtabStatus == true) {
          $(".aside").animate({left:`-${navtabwidth}px`} , 500);
          $(".nav-header .close i").removeClass("fa-xmark").addClass("fa-bars");
          $(".links ul li ").animate({top:300} ,500);
          navtabStatus = false
      } else {
          $(".aside").animate({left:"0px"} , 500);  
          $(".nav-header .close i").removeClass("fa-bars").addClass("fa-xmark");
          for(let i = 0 ; i < 5 ; i++) {
            $(".links ul li ").eq(i).animate({top:0} , (i+5)*100);
          }
          navtabStatus = true
      }
      
    };

  function opennavtab() {
    $(".gear").on("click", function() {
      if(navtabStatus == true) {
          $(".aside").animate({left:`-${navtabwidth}px`} , 500);
          $(".nav-header .close i").removeClass("fa-xmark").addClass("fa-bars");
          $(".links ul li ").animate({top:300} ,500);
          navtabStatus = false
      } else {
          $(".aside").animate({left:"0px"} , 500);  
          $(".nav-header .close i").removeClass("fa-bars").addClass("fa-xmark");
          for(let i = 0 ; i < 5 ; i++) {
            $(".links ul li ").eq(i).animate({top:0} , (i+5)*100);
          }
          navtabStatus = true
      }
      
    });
  }
     searchByName("")
  function displaymeals(arr) {
      let cartona = "";
      for(var i = 0 ; i<arr.length ; i++) {
        cartona += ` <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getinstructions('${arr[i].idMeal}')">
                <img src="${arr[i].strMealThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-dark p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
      }
      mealsContainer.innerHTML = cartona;
    }

    async function getcategories() {
      $(".inner-loading-screen").fadeIn(500)
      var response = await fetch ("https://www.themealdb.com/api/json/v1/1/categories.php")
     var data = await response.json();
     displaycategories(data.categories)
     $(".inner-loading-screen").fadeOut(500)
    }

    function displaycategories(arr) {
      let cartona = "";
      for(var i = 0 ; i<arr.length ; i++) {
        cartona += ` <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick= "getCategoryMeals('${arr[i].strCategory}')">
                <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute text-center  text-dark p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p> ${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>`
      }
      mealsContainer.innerHTML = cartona;
       searchInputs.innerHTML = ""
    }
     async function getarea() {
      $(".inner-loading-screen").fadeIn(500)
      var response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      var data =  await response.json()
      displayAreas(data.meals);
      $(".inner-loading-screen").fadeOut(500)
    }
    function displayAreas(arr) {
      let cartona = "";
      for(var i = 0 ; i<arr.length ; i++) {
        cartona += ` <div class="col-md-3">
            <div class="rounded-2 text-center cursor-pointer" onclick="getAreaMeals('${arr[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${arr[i].strArea}</h3>
            </div>
        </div>`
      }
      mealsContainer.innerHTML = cartona;
       searchInputs.innerHTML = ""
    };
      async function getingredients() {
        $(".inner-loading-screen").fadeIn(500)
      var response =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
      var data = await response.json();
      displayIngredients(data.meals.slice(0,20))
      $(".inner-loading-screen").fadeOut(500)
     };

     function displayIngredients(arr) {
      let cartona = "";
      for(var i = 0 ; i<arr.length ; i++) {
        cartona += ` <div class="col-md-3">
            <div class="rounded-2 text-center cursor-pointer" onclick = "getingredientmeals('${arr[i].strIngredient}')">
                   <i class="fa-solid fa-drumstick-bite fa-4x w-100"></i>
                      <h3>${arr[i].strIngredient}</h3>
                      <p> ${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>`
      }
      mealsContainer.innerHTML = cartona;
       searchInputs.innerHTML = "";
    };
     async function getCategoryMeals(category) {
      $(".inner-loading-screen").fadeIn(500)
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        var data = await response.json();
        displaymeals(data.meals.slice(0,20));
        $(".inner-loading-screen").fadeOut(500)
      }

    async function getAreaMeals(area) {
      $(".inner-loading-screen").fadeIn(500)
     var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
     var data =  await response.json();
     displaymeals(data.meals.slice(0,20))
     $(".inner-loading-screen").fadeOut(500)
  }

    async function getingredientmeals(ingredient) {
      $(".inner-loading-screen").fadeIn(500)
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    var data = await response.json();
    displaymeals(data.meals.slice(0,20));
    $(".inner-loading-screen").fadeOut(500)
  }

    async function getinstructions(id) {
      $(".inner-loading-screen").fadeIn(500)
       var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
       var data = await response.json();
       console.log(data)
       displyinstructions(data.meals[0]);
       $(".inner-loading-screen").fadeOut(500)
    } ; 

    function displyinstructions(meal) {

    let Ingredients = ``
    for(let i = 0 ; i<=20 ;i++) {
      if(meal[`strIngredient${i}`]) {
        Ingredients += `<span class="h6 receipes p-2 mb-2 d-inline-block rounded-2 mx-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>` 
      };
    };
    let tags = meal.strTags?.split(",");
    if(!tags) tags = [];
    let tagsstr = '';
    for( var i = 0 ; i< tags.length ; i++) {
        tagsstr += `<span class="h6 alert alert-danger  p-2 mb-2 me-2 d-inline-block rounded-2">${tags[i]}</span>`
     }
         var cartona = ` 
         <div class="col-md-4">
                <img class="rounded-2 w-100" src="${meal.strMealThumb}" alt="">
                <h4 class = "fw-bolder fs-1 text-center">${meal.strMeal}</h4>
            </div>
            <div class="col-md-8">
                <div class="meal-instructions">
                    <h2>instructions</h2>
                    <p>
                        ${meal.strInstructions}
                    </p>
                    <h3><span class="fw-bolder"> Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder"> Category : </span>${meal.strCategory}</h3>
                    <h3 class=""> Recipes :
                       <div class="mt-2">
                       ${Ingredients}
                    </h3>
                    <h3>
                        Tags :<br>
                       <div class="mt-2">
                         ${tagsstr}
                       </div>
                        <a href="${meal.strSource}" class="btn btn-success mt-3" target="_blank">Source</a>
                        <a href="${meal.strYoutube}" class="btn btn-danger mt-3" target="_blank">Youtube</a>
                    </h3>
                </div>`
                mealsContainer.innerHTML = cartona;
                searchInputs.innerHTML=""
      }

    function showsearchInputs() {
        searchInputs.innerHTML = `
             <div class="row py-4">
            <div class="col-md-6 searchbyname">
                <input type="text" onkeyup = "searchByName(this.value)" placeholder="Search By Name" class="form-control bg-transparent search text-white mb-4">
            </div>
            <div class="col-md-6 searchbychar">
                <input type="text" onkeyup = "searchByChar(this.value)" maxlength="1" placeholder="Search By first Letter" class="form-control bg-transparent text-white">
            </div>
        </div>
        `
        mealsContainer.innerHTML = ""
        contactcontainer.innerHTML = ""
      }

      async function searchByName(meal) {
        $(".inner-loading-screen").fadeIn(500)
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
        var data =  await response.json();
        data.meals ? displaymeals(data.meals) : displaymeals([]);
        $(".inner-loading-screen").fadeOut(500)
       }
  
       async function searchByChar(char) {
        $(".inner-loading-screen").fadeIn(500)
        char == "" ? char = "a" : "";
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
        var data = await response.json();
        displaymeals(data.meals);
        $(".inner-loading-screen").fadeOut(500)
       }

       function showContactUs() {
        document.querySelector(".contact").classList.remove("d-none");
        contactcontainer.innerHTML = `
        <div class="row g-4 d-flex">
          <div class="col-md-6">
              <input onkeyup="validateForm(this)" type="text" placeholder="Enter Your Name" class="form-control" id="nameinput">
              <p class="alert alert-danger w-100 mt-2 d-none mb-0" id ="namealert">Special characters and numbers not allowed</p>
          </div>
          <div class="col-md-6">
              <input onkeyup="validateForm(this)" type="email" placeholder="Enter Your Email" class="form-control" id="emailinput">
               <p class="alert alert-danger w-100 mt-2 d-none mb-0">Email not valid *exemple1234@yyy.zzz</p>
          </div>
          <div class="col-md-6">
              <input onkeyup="validateForm(this)" type="number" placeholder="Enter Your phone" class="form-control" id="phoneinput">
              <p class="alert alert-danger w-100 mt-2 d-none mb-0">Enter valid Phone Number</p>
          </div>
          <div class="col-md-6">
              <input onkeyup="validateForm(this)" type="number" placeholder="Enter Your Age" class="form-control" id="ageinput">
              <p class="alert alert-danger w-100 mt-2 d-none mb-0">Enter valid age</p>
          </div>
          <div class="col-md-6">
              <input onkeyup="validateForm(this)" type="password" placeholder="Enter Your password" class="form-control" id="passwordinput">
              <p class="alert alert-danger w-100 mt-2 d-none mb-0">Your password must start with a lowercase letter, contain at least five lowercase letters, include at least one special character (#, *, or !), and end with at least three digits like as abcde#123</p>
          </div>
          <div class="col-md-6">
              <input onkeyup="validateForm(this)" type="password" placeholder="Repassword" class="form-control" id="repasswordinput">
              <p class="alert alert-danger w-100 mt-2 d-none mb-0">Enter valid Repassword</p>
          </div>
        </div>
        <button class="btn disabled btn-outline-danger mt-3 text-center" id="submit">Submit</button>
        `
    
        mealsContainer.innerHTML = "";

    }
      

       function validation(regex, element) {
        if (regex.test(element.value)) {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            return true;
        } else {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            return false;
        }
    };
       function validateForm(element) {
        let regex;
    if (element.id === 'nameinput') {
        regex = nameregex;
    } else if (element.id === 'emailinput') {
        regex = EmailRegex;
    } else if (element.id === 'phoneinput') {
        regex = phoneRegex;
    } else if (element.id === 'ageinput') {
        regex = AgeRegex;
    } else if (element.id === 'passwordinput') {
        regex = passwordRegex;
    } else if (element.id === 'repasswordinput') {
        regex = RepasswordRegex;
    }
    
    const isValid = validation(regex, element);

  
    if (isValid) {
        element.nextElementSibling.classList.add("d-none");
    } else {
        element.nextElementSibling.classList.remove("d-none");
    }
        const isNameValid = validation(nameregex, document.getElementById('nameinput'));
        const isEmailValid = validation(EmailRegex, document.getElementById('emailinput'));
        const isPhoneValid = validation(phoneRegex, document.getElementById('phoneinput'));
        const isAgeValid = validation(AgeRegex, document.getElementById('ageinput'));
        const isPasswordValid = validation(passwordRegex, document.getElementById('passwordinput'))
        const isRepasswordValid = validation(RepasswordRegex, document.getElementById('repasswordinput'));
     
        const submitButton = document.getElementById("submit");
        if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {
            submitButton.classList.remove("disabled");
            submitButton.classList.add("enabled");
        } else {
            submitButton.classList.add("disabled");
            submitButton.classList.remove("enabled");
        }
    }

    jQuery(function() {
      searchByName("").then( function() {
        $(".loading").fadeOut(1000 , function() {
          $("body").css({ overflow : "auto" });
        } );
        
      })
      
    })