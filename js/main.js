//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE LA CLASS USER-------------------------------------------------------
class User {
    constructor(username, passWord, firstName, lastName, email, dateOfBirth, cityName, streetName, streetNumber) {

        this.username = username;
        this.passWord = passWord;
        // this.picture = picture;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.cityName = cityName;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
    }
}

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE REGISTRATION--------------------------------------------------------

$(document).on(`click`, `#valid1`, (event) => {
    event.preventDefault();
    let error = "";
    let username = $(`#username`).val();
    let passWord = $(`#password`).val();
    let comfirmPassWord = $(`#confirmation-password`).val();
    /*$('#imageInput').change(function() {
        var frm = new FormData();
        frm.append('imageInput', input.files[0]);
        $.ajax({
            method: 'POST',
            address: 'url/to/save/image',
            data: frm,
            contentType: false,
            processData: false,
            cache: false
        });
    });
    */
    let firstName = $(`#firstname`).val();
    let lastName = $(`#secondname`).val();
    let email = $(`#mail`).val();
    let dateOfBirth = new Date($(`#date`).val());
    let cityName = $(`#city`).val();
    let streetName = $(`#street`).val();
    let streetNumber = $(`#num`).val();

    //debugger

    if (streetNumber == "" || streetNumber < 1) {
        error = `You need enter your number street correct\n`;
    }

    if (streetName == "") {
        error = `You need enter your street\n`;
    }

    if (cityName == "") {
        error = `You need enter your city\n`;
    }


    //date

    let dateNow = new Date();
    let yearNow = dateNow.getFullYear(); // 2020
    let yearHold = dateNow.getFullYear() - 120 // 1900
    if (dateOfBirth == "" || dateOfBirth.getFullYear() > yearNow || dateOfBirth.getFullYear() < yearHold) {
        error = `You need enter your date of birth between 0 -120\n`;
    }


    let verificationEmail = EmailVerification(email)
    if (email == "" || verificationEmail == false) { // 
        error = `You need enter your adress mail correct whith @ and .com\n`;
    }
    if (lastName == "" || FirstNameLastName(lastName) == false) {
        error = `You need enter your second name\n`;
    }

    if (firstName == "" || FirstNameLastName(firstName) == false) {

        error = `You need enter your first name\n`;
    }

    if (comfirmPassWord != passWord) {
        error = `You need confirm your password\n`;
    }

    if (passWord.length < 8) {
        error = `Your password need minimum 8 letters\n`
    }

    if (username == "" || username.legth > 61 || NameAndNameUser(username) == false) {
        error = `Your name User is not valid !\n`;
    }



    if (error != "") {
        event.preventDefault();
        $("#error1").append(error);
        return false;
    } else {
        alert(`your form is send !!`);
    }
    let user = new User(username, passWord, firstName, lastName, email, dateOfBirth, cityName, streetName, streetNumber);
    localStorage.setItem(`user`, JSON.stringify(user))
    console.log(localStorage.getItem(user));

    location.href = "./login.html";

});


//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE LOGIN---------------------------------------------------------------


// login.html
$(document).on(`click`, `#valid2`, (event) => {


    let error;
    let user = JSON.parse(localStorage.getItem(`user`));

    let username = $(`#username1`).val();
    let passWord = $(`#passeword1`).val();

    //debugger
    if (username == user.username && passWord == user.passWord) {
        sessionStorage.setItem(`loginUser`, JSON.stringify(user));
        location.href = `./profile.html`;

    } else {
        error = "Invalid !"
    }

    if (username == "admin" && passWord == "admin1234admin") {

        location.href = `./admin.html`;
    }

    if (error != "") {
        event.preventDefault();
        $("#error2").append(error);
        return false;
    }

});


//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE PROFIL 3 BOUTTONS---------------------------------------------------

$(document).on(`click`, `#disconnection`, (event) => {
    location.href = `./login.html`;
});
// envoi au  jeu du serpent
$(document).on(`click`, `#snake-play`, (event) => {
    location.href = `SnakeGame/index.html`;
});
//boutton de modification de donner
$(document).on(`click`, `#modification-profile`, (event) => {
    location.href = `./modificationdata.html`;
});



//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE MODIFICATION--------------------------------------------------------

$(document).on(`click`, `#valid3`, (event) => {
    let error = "";
    let username = $(`#username`).val();
    let passWord = $(`#password`).val();
    let comfirmPassWord = $(`#confirmation-password`).val();
    //let picture = $(`#picture`).val();
    let firstName = $(`#firstname`).val();
    let lastName = $(`#secondname`).val();
    let email = $(`#mail`).val();
    let dateOfBirth = new Date($(`#date`).val());
    let cityName = $(`#city`).val();
    let streetName = $(`#street`).val();
    let streetNumber = $(`#num`).val();

    let user = JSON.parse(localStorage.getItem(`user`));
    let user1 = user;
    let user2 = new User(username, passWord, firstName, lastName, email, dateOfBirth, cityName, streetName, streetNumber);

    if (user2.streetNumber == "") {
        user2.streetNumber = user.streetNumber;
        streetNumber = user.streetNumber;

    }
    if (streetNumber != user1.streetNumber) {
        if (streetNumber >= 1)
            user2.streetNumber = streetNumber;
        else {
            error = 'your number need > 1'
        }
    }
   
   
    if (user2.streetName == " ") {
        user2.streetName = user.streetName;
        streetName = user1.streetName;
    }

    if (streetName != user1.streetName) {
        user2.streetName = streetName;
    }

    //---------------------------------------------------

    debugger
    if (user2.cityName == "") {
        user2.cityName = user.cityName;
        cityName = user.streetName;
    }
    if (cityName != user1.cityName) {
        user2.cityName = cityName;
    }
     //----------------------------------------------------

    
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear(); // 2020
    let yearHold = dateNow.getFullYear() - 120 // 1900
    if (user2.dateOfBirth == "") {
        user2.dateOfBirth = user.dateOfBirth;
        dateOfBirth = user.dateOfBirth;
    }
    if (dateOfBirth != user1.dateOfBirth) {
        if (dateOfBirth.getFullYear() > yearNow || dateOfBirth.getFullYear() < yearHold) {
            error = `You need enter your date of birth between 0 -120\n`;
        } else {
            user2.dateOfBirth = dateOfBirth;
        }

    }


    let verificationEmail = EmailVerification(email)
        //debugger
    if (user2.email == "") {
        user2.email = user.email;
        email = user.email;
    }
    if (email != user1.email) {
        if (verificationEmail == false) {
            error = `You need enter your adress mail correct whith @ and .com\n`;
        } else {
            user2.email = email;
        }
    }



    if (user2.lastName == "") {
        user2.lastName = user.lastName;
        lastName = user.lastName;
    }
    if (lastName != user1.lastName) {
        if (FirstNameLastName(lastName) == false) {
            error = `You need enter your second name\n`;
        } else {
            user2.lastName = lastName;
        }
    }



    if (user2.firstName == "") {
        user2.firstName = user.firstName;
        firstName = user.firstName;
    }
    if (firstName != user1.firstName) {
        if (FirstNameLastName(firstName) == false) {

            error = `You need enter your first name\n`;
        } else {
            user2.firstName = firstName;
        }

    }


    if (comfirmPassWord != passWord) {
        error = `You need confirm your password`;
    }
    if (user2.passWord == "") {
        user2.passWord = user.passWord;
        passWord = user.passWord;
    }
    if (passWord != user1.passWord) {
        user2.passWord = passWord;
    }



    if (user2.username == "") {
        user2.username = user.username;
        username = user.username;
    }
    if (username != user1.username) {
        if (username.legth > 61 || NameAndNameUser(username) == false) {
            error = `Your name User is not valid !\n`;
        } else {
            user2.username = username;
        }

    }



    if (error != "") {
        event.preventDefault();
        $("#error3").append(error);
        return false;
    } else {
        alert(`your modification is actual`);
    }

    localStorage.setItem(`user2`, JSON.stringify(user2));

    user = user2;
    localStorage.setItem(`user`, JSON.stringify(user));

    location.href = `./profile.html`;

});
//allez vert la page login
$(document).on(`click`, `#loginBack`, (event) => {

    location.href = `./login.html`;



});

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE ADMIN---------------------------------------------------------------

$(document).on(`click`, `#valid5`, (event) => {
    let user = JSON.parse(localStorage.getItem(`user`));
    let stat = document.getElementById('#profile-admin')


    if (confirm(`Are you sure you want to delete all his data ?`)) {
        window.onbeforeunload = function() {
            localStorage.removeItem(`user`);
            return '';
        };
        location.href = `./admin.html`;

    }



});



//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------------ZONE DE FONCTION------------------------------------------------------------


// fonction de verification mail
function EmailVerification(email) {
    let symbole = new Array('@', '.', 'c', 'o', 'm');
    let i = 0;
    let j = 0;
    let k = 0;
    let valide = false

    for (k = 0; k < email.length; k++) {

        console.log(email[k])
    }
    for (i = 0; i < email.length; i++) {
        if (email[i] == symbole[0]) {
            valide = true;
            break;
        }
        console.log(email[i])
    }
    if (valide) {
        valide = false;
        for (j = i + 1; j < email.length; j++) {
            if (email[j] == symbole[1]) {
                valide = true;
                break;
            }
            console.log(email[j])
        }
        if (valide) {
            if (email[k - 1] == symbole[4]) {
                if (email[k - 2] == symbole[3]) {
                    if (email[k - 3] == symbole[2]) {
                        return true;
                    } else {
                        valide = false
                    }
                } else {
                    valide = false
                }
            } else {
                valide = false
            }
        }

    }


    return valide;
}
// fonction de verification name user
function NameAndNameUser(name) {
    let i = 0;
    let validation
    for (i = 0; i < name.length; i++) {

        if (name[i] >= 'a' && name[i] <= 'z' || name >= 'A' && name <= 'Z' || name[i] >= '0' && name[i] <= '9') {
            validation = true;
        } else {
            return false;
        }
    }
    return validation;
}

function FirstNameLastName(name) {
    let i = 0;
    let validation
    for (i = 0; i < name.length; i++) {

        if (name[i] >= 'a' && name[i] <= 'z' || name >= 'A' && name <= 'Z') {
            validation = true;
        } else {
            return false;
        }
    }
    return validation;
}