
function userPage() {

   const page = document.createElement("div"); // Själva modalen skapas och blir child till body
    page.id = 'userLoginPage';
    document.body.appendChild(page);
 
    const form = document.createElement("form"); // Create form
    form.id = 'userLoginForm';
    form.name = 'loginForm';
    form.action = '/login';
    form.method = `POST`;
    page.appendChild(form);
    
    const cross = document.createElement("div"); // Create close button
    cross.id = 'loginFormExit';
    cross.innerHTML = 'X';
    form.appendChild(cross);
 
    const nameInput = document.createElement("input"); // Create username input
    nameInput.id = 'loginName';
    nameInput.type = 'text';
    nameInput.name = 'userName';
    nameInput.placeholder = 'user123';
    nameInput.required;
    form.appendChild(nameInput);

    // Create password input
    const passwordInput = document.createElement("input");
    passwordInput.id = 'loginPassword';
    passwordInput.type = 'password';
    passwordInput.name = 'userPassword';
    passwordInput.placeholder = 'password';
    passwordInput.required;
    form.appendChild(passwordInput);

    // Create submit button
    const submitButton = document.createElement("input");
    submitButton.id = 'loginSubmitButton';
    submitButton.type = 'submit';
    submitButton.value = 'login';
    submitButton.innerHTML = 'submit';
    form.appendChild(submitButton);

    // Create "create an account" question
    const question = document.createElement("p");
    question.id = 'createAccount';
    question.innerHTML = 'Create an account?';
    form.appendChild(question);


    cross.onclick = () => { // Ta bort parrent och children följer
        document.body.removeChild(page);
    };

    // Den klickas och den andra modalen visar sin fula ansikte
    question.onclick = userCreate; // Vill du skapa konto, dra åt helvete

}
userPage();





function userCreate() { // user creates login
    if(document.body.hasChildNodes(document.querySelector("userLoginPage"))) {
        document.body.removeChild(document.querySelector("userLoginPage"))
        return; // ^Removes the login page
    }
    let page = document.createElement("div",{id:'userCreatePage'});
    document.body.appendChild(page);
    let form = document.createElement("form",{id:'userCreateForm', action:'', name:'createForm'});
    page.appendChild(form);
    let cross = document.createElement("div",{id:'createFormExit'}); cross.innerHTML('X');
    form.appendChild(cross);
    let userName = document.createElement("input",{id:'createName', type:'text', name:'uName', placeholder:'at least 3 characters'});
    form.appendChild(userName);
    let userFirstInput = document.createElement("input",{id:'createPassword', type:'password', name:'pass1', placeholder:'do not type password'}); // first password input
    form.appendChild(userFirstInput);
    let userSecondInput = document.createElement("input",{id:'confirmPassword', type:'password', name:'pass2'}); // second to confirm password
    form.appendChild(userSecondInput);
    let userEmail = document.createElement("input",{id:'confirmEmail', type:'email', name:'uEmail', placeholder:'example@mail.com'}); //mandatory
    form.appendChild(userEmail);
    let submit = document.createElement("input",{id:'createSubmitButton',for:'userCreateForm', type:'submit', value:'submit'});
    form.appendChild(submit);

       
      
    cross.onClick = () => { //Krysset pressas och allt försvinner
       document.body.removeChild(page);
    }
}