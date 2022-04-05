let user = JSON.parse(localStorage.getItem(`user`));
console.log(user)


let nameAndLastName = document.getElementById("name-and-lastname");
nameAndLastName.innerHTML += user.firstName + " " + user.lastName;

let email = document.getElementById("mail");
email.innerHTML += user.email;

let nbStreetAndStreet = document.getElementById("street-and-streetnumber");
nbStreetAndStreet.innerHTML += user.cityName + " " + user.streetNumber + " " + user.streetName;


let dateOfBirth = new Date(user.dateOfBirth);
let NewdateOfBirth = dateOfBirth.getDay() + "/" + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear(); //dateOfBirth.substring(0, dateOfBirth.length - 14);
document.getElementById("date-of-birth").innerHTML += NewdateOfBirth;


//let ladate = ladate.getDate() + "/" + (ladate.getMonth() + 1) + "/" + ladate.getFullYear();

/*let dateOfBirth = document.getElementById("date-of-birth").innerHTML = NewdateOfBirth;*/

/*
document.getElementById("demo").innerHTML = d.toDateString()
*/