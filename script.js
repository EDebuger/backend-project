//webShop skript

const { response } = require("express");

//Här går in fetch requests
let variable = undefined;


class productPage {

    constructor(title,category,description,price,plusCounter) {
        this.title=title;
        this.category=category;
        this.description=description;
        this.price=price;
        this.plusCounter=plusCounter;

        this.createPage();
    }


    createPage() { // Skapar en produktflik inuti 'productPage' sectionen
        const page = document.createElement("div").className("product");
        document.getElementById("productPage").appendChild(page);
        const title = document.createElement("h2").className("productTitle"); title.innerHTML() = String(this.title); // Redundant
        document.getElementsByClassName("product").appendChild(String(this.title));
        title.innerHTML(fetch('/productInfo/:title')
        .then(response => {if(!response.ok) throw new Error('Not OK'); return response.json();}) )
        const category = document.createAttribute();
        const description = document.createElement("p").className("productDescription");         
        document.getElementsByClassName("product").appendChild(this.description); description.innerHTML() = String(this.description);
        const price = document.createElement("h3").className("productPrice");
        document.getElementsByClassName("product").appendChild(Number(this.price));
        const plus = document.createElement("div").className("plusButton");
        document.getElementsByClassName("product").appendChild("plusButton");
        document.querySelector("plusButton").addEventListener(onclick, this.counting(0));

        console.log(`Produkten ${this.title} visas nu`);
        
    }

    counting(plusCounter) {
        
        if(this.counting.call) {
            return plusCounter++;
        }
    }

   
}
//Just an example
const exampleProduct = new productPage('ProductTitle','stuff','lorem ipsum and all that other stuff about stuff',100.00,0);



// WORK IN PROGRESS...  
class cartItems {

    constructor(title) {
        title=this.title;
        price=this.price;
        totalNumber=0;
    }
}
let cartItems = [] //array of objects
// vad borde användas för att räkna grejer i kärran
function countItems(number) {
    for(let i=0; i<number.length; i) {

    }
}

function cartPage() {
    let page = document.createElement("div").id("cartPage");
    document.querySelector("body").appendChild(page);
    let identifier = document.createElement("p").id("cusID");
    document.querySelector("cartPage").appendChild(identifier);

    if(countItems(number) > 0) {

    }
}


function userPage() { // user logs in
    let page = document.createElement("div",{id:'userLoginPage'});
    document.querySelector("body").appendChild(page);
    let form = document.createElement("form",{id:'userLoginForm', action: '', name:'loginForm'}); // put in fetch later
    document.querySelector("userLoginPage").appendChild(form);
    let cross = document.createElement("div",{id:'formExit'}); cross.innerHTML('X');
    document.querySelector("userLoginForm").appendChild(cross);
    let nameInput = document.createElement("label",{id:'loginName',type:'text', name:'uName', placeholder:'user123'});
    document.querySelector("userLoginForm").appendChild(nameInput);
    let passwordInput = document.createElement("label",{id:'loginPassword',type:'password', name:'uPass', placeholder:'password'});
    document.querySelector("userLoginForm").appendChild(passwordInput);
    let submit = document.createElement("label",{id:'submitButton',for:'loginForm', type:'submit', value:'submit'});
    let question = document.createElement("p",{id:'createAccount'});
    document.querySelector("userLoginForm").appendChild("createAccount");
    question.onclick(userCreate());
    cross.onClick = () => { //krysset pressas och fliken försvinner
        document.querySelector("userLoginPage").removeChild(document.querySelector("createAccount"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("loginPassword"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("loginName"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("formExit"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("userLoginForm"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("submitButton"));
        document.querySelector("body").removeChild(document.querySelector("userLoginPage"));
    }
    // Adoptering

}


function userCreate() { // user creates login
    if(document.querySelector("body").hasChildNodes(document.querySelector("userLoginForm"))) {
        document.querySelector("userLoginPage").removeChild(document.querySelector("createAccount"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("loginPassword"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("loginName"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("formExit"));
        document.querySelector("body").removeChild(document.querySelector("userLoginPage"));
        return; // ^Removes the login page
    }
    let page = document.createElement("div",{id:'userCreatePage'});
    document.querySelector("body").appendChild(page);
    let form = document.createElement("form",{id:'userCreateForm', action:'', name:'createForm'});
    let cross = document.createElement("div",{id:'formExit'}); cross.innerHTML('X');
    document.querySelector("userLoginForm").appendChild(cross);
    let userName = document.createElement("label",{id:'createName', type:'text', name:'uName', placeholder:'at least 3 characters'});
    let userFirstInput = document.createElement("label",{id:'createPassword', type:'password', name:'pass1', placeholder:'do not type password'}); // first password input
    let userSecondInput = document.createElement("label",{id:'confirmPassword', type:'password', name:'pass2'}); // second to confirm password
    let userEmail = document.createElement("label",{id:'confirmEmail', type:'email', name:'uEmail', placeholder:'example@mail.com'}); //mandatory
    // Adoptering
    page.appendChild(form); form.appendChild(userName); form.appendChild(userFirstInput); 
    form.appendChild(userSecondInput); form.appendChild(userEmail);

    cross.onClick = () => { //Krysset pressas och allt försvinner
        document.querySelector("userCreatePage").removeChild(document.querySelector("createAccount"));
        document.querySelector("userCreatePage").removeChild(document.querySelector("userCreateForm"));
        document.querySelector("userCreatePage").removeChild(document.querySelector("createName"));
        document.querySelector("userCreatePage").removeChild(document.querySelector("createPassword"));
        document.querySelector("userCreatePage").removeChild(document.querySelector("confirmPassword"));
        document.querySelector("userCreatePage").removeChild(document.querySelector("confirmEmail"));
        document.querySelector("userCreatePage").removeChild(document.querySelector("formExit"));
        document.querySelector("body").removeChild(document.querySelector("userLoginPage"));}
}


function userLoggedIn() { //inloggning händer när backend bekgräftar att användaren existerar och detta funktionen körs
    if(document.querySelector("body").hasChildNodes("userLoginPage")) {
        document.querySelector("userLoginPage").removeChild(document.querySelector("createAccount"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("loginPassword"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("loginName"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("formExit"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("userLoginForm"));
        document.querySelector("userLoginPage").removeChild(document.querySelector("submitButton"));
        document.querySelector("body").removeChild(document.querySelector("userLoginPage"));
    }
}
