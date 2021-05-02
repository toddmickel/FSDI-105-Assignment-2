var coverageArea1Triggered = false;
var coverageArea2Triggered = false;
var inputName = document.getElementById('pet-name');
var inputAge = document.getElementById('age');
var inputGender = document.getElementById('gender');
var inputType = document.getElementById('pet-type');
var inputBreed = document.getElementById('breed');
var inputService = document.getElementById('service');
var inputOwner = document.getElementById('owner-name');
var inputPhone = document.getElementById('phone');
var inputAddress = document.getElementById('address');
var inputCity = document.getElementById('city');
var inputState = document.getElementById('state');
var inputZip = document.getElementById('zip');

// Supporting functions
function displayPetNames() {
    let petNames = '';
    for (var i = 0; i < salon.pets.length; i++) {
        if (i === salon.pets.length - 1 && salon.pets.length > 1) {
            petNames += ` and ${salon.pets[i].name} `;
        } else if (salon.pets.length === 1){
            petNames = ` ${salon.pets[i].name} `;
        } else {
        petNames += ` ${salon.pets[i].name},`;            
        }
    }
    return petNames;
}

function register() {
    if (
        inputName.value === '' ||
        inputAge.value === '' ||
        inputGender.value === '' ||
        inputType.value === '' ||
        inputBreed.value === '' ||
        inputService.value === '' ||
        inputOwner.value === '' ||
        inputPhone.value === '' ||
        inputAddress.value === '' ||
        inputCity.value === '' ||
        inputState.value === '' ||
        inputZip.value === '') {
            alert('You must input information into each field.  Please try again.');
        } else {
    // create a generic obj and pass info from the vars
        var thePet = new Pet(
            inputName.value, 
            inputAge.value, 
            inputGender.value, 
            inputType.value,
            inputBreed.value, 
            inputService.value, 
            inputOwner.value, 
            inputPhone.value,
            inputAddress.value,
            inputCity.value,
            inputState.value,
            inputZip.value
        );

    // push object into the array
        salon.pets.push(thePet);
        clear();
        reDisplayPetNames();
        
        //document.getElementById('pets').innerHTML = display();
        displayTable(thePet);
//        display();
        updateProfits();
        if(testTop()) {
            displayPetCount1();
        } else {
            coverageArea1Triggered = false;
        }
        
        if (testBottom()) {
            displayPetCount2();
        } else {
            coverageArea2Triggered = false;
        }
    }
/*    $('.del-btn').on('click', function() {
        deletePet(this.id)
    });*/
    
}

function clear() {
    inputName.value = '';
    inputAge.value = '';
    inputGender.value = '';
    inputType.value = 'Dog';
    inputBreed.value = '';
    inputService.value = 'Grooming';
    inputOwner.value = '';
    inputPhone.value = '';
    inputAddress.value = '';
    inputCity.value = '';
    inputState.value = 'MT';
    inputZip.value = '';
}

function reDisplayPetNames() {
    document.getElementById('regnum').innerHTML = salon.pets.length;
    document.getElementById('petnames').innerHTML = displayPetNames();
    if (salon.pets.length > 1) {
        document.getElementById('petpl').innerHTML = 'pets';
    } else {
        document.getElementById('petpl').innerHTML = 'pet';
    }  

}

function updateProfits() {
    var profit = 0;
    for (var i = 0; i < salon.pets.length; i++) {
        profit += salon.pets[i].price;
    }
    document.getElementById('profits').innerHTML = `We have made a total of $${profit}.00 today!`;
}

function deletePet(petId){
    // select the card with the pet
    var delRow = $('#row' + petId);
    console.log('delete pet ' + petId);
    // search for the pet in the array 
    var indexDelete;
    for(i = 0; i < salon.pets.length; i++) {
        var selected = salon.pets[i];
        console.log(`petId: ${petId}`);
        console.log(`selID: ${selected.id}`);
        if (selected.id == petId) {
            indexDelete = i;
            console.log(`indexDelete: ${indexDelete}`);
            break;
        }
    }
    // delete the pet from the array
    salon.pets.splice(indexDelete, 1);
    // delete the pet from the html
    delRow.remove();
    updateProfits();
    if(testTop()) {
        displayPetCount1();
    } else {
        coverageArea1Triggered = false;
    }
    
    if (testBottom()) {
        displayPetCount2();
    } else {
        coverageArea2Triggered = false;
    }
}

function searchPet() {
    var found = false;
    // get the value from the input box
    var ss = $('#searchPet').val();
    if(ss === '') {
        alert('Please enter a search criteria in the search box');
        salon.pets.forEach(pet => {
            $('#row' + pet.id).removeClass('active');
        })
        return;
    }
    // search for the pet in the array (to get the ID)
    salon.pets.forEach(pet => {
        if(pet.name.toLowerCase().includes(ss.toLowerCase()) ||
            pet.service.toLowerCase().includes(ss.toLowerCase()) ||
            pet.type.toLowerCase().includes(ss.toLowerCase())
        ) {
            $('#row' + pet.id).addClass('active');
            found = true;
        } else {
            $('#row' + pet.id).removeClass('active');
        }
    });
    if (found === false) {
        alert('Name not found');
    }

}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function displayPetCount1(){
    const dogCount = document.getElementById('dog-num');
    const catCount = document.getElementById('cat-num');
    var dogNum = 0;
    var catNum = 0;
    salon.pets.forEach(pet => {
        if (pet.type.toLowerCase().includes('dog')) {
            dogNum++;
            console.log(`${dogNum} dogs`);
        } else if (pet.type.toLowerCase().includes('cat')) {
            catNum++;
            console.log(`${catNum} cats`);
        }
    });
    animateValue(dogCount, dogNum+100, dogNum, 500);
    animateValue(catCount, catNum+100, catNum, 500);
}

function displayPetCount2() {
    const birdCount = document.getElementById('bird-num');
    const otherCount = document.getElementById('other-num');
    var birdNum = 0;
    var otherNum = 0;
    salon.pets.forEach(pet => {
        if (pet.type.toLowerCase().includes('dog')) {} 
        else if (pet.type.toLowerCase().includes('cat')) {} else if (pet.type.toLowerCase().includes('bird')) {
            birdNum++;
            console.log(`${birdNum} birds`);
        } else {
            otherNum++;
            console.log(`${otherNum} others`);
        }
    });
    animateValue(birdCount, birdNum+100, birdNum, 500);
    animateValue(otherCount, otherNum+100, otherNum, 500);
}

function testTop() {
    var scrollTop = $(window).scrollTop(),
    windowHeight = $(window).height(),
    elem = $('#dog-num-cont').offset().top,
    final = elem - windowHeight,
    distance = final - scrollTop;
    if(distance < -75) {
        return true;
    }
}

function testBottom() {
    var scrollTop = $(window).scrollTop(),
    windowHeight = $(window).height(),
    elem = $('#bird-num-cont').offset().top,
    final = elem - windowHeight,
    distance = final - scrollTop;
    if(distance < -75) {
        return true;
    }
}

function watchForDel() {
 /*   $('.del-btn').on('click', function() {
        deletePet(this.id)
    });*/
}

function initReg() {
    document.getElementById('regnum').innerHTML = salon.pets.length;
    document.getElementById('petnames').innerHTML = displayPetNames();
    if (salon.pets.length > 1) {
        document.getElementById('petpl').innerHTML = 'pets';
    } else {
        document.getElementById('petpl').innerHTML = 'pet';
    }
    const pet1 = new Pet(
        'Scooby', 
        50, 
        'Male',
        'Dog', 
        'Dane', 
        'Grooming', 
        'Shaggy', 
        '555-555-5555', 
        '1224 Sesame Ct',
        'Sunnyvale',
        'CA',
        '94087'
        );

    const pet2 = new Pet(
        'Scrappy', 
        40, 
        'Male', 
        'Dog',
        'Dane', 
        'Full Service', 
        'Shaggy', 
        '555-555-5555',
        '1224 Sesame Ct',
        'Sunnyvale',
        'CA',
        '94087'
        );
        
    const pet3 = new Pet(
        'Speedy', 
        60, 
        'Male',
        'Bird', 
        'Mixed', 
        'Nails Cut', 
        'Bugs Bunny', 
        '888-888-8888',
        '35 Arlene Ct',
        'Hauppauge',
        'NY',
        '11788'
        );

    salon.pets.push(pet1);
    salon.pets.push(pet2);
    salon.pets.push(pet3);
    displayTable(pet1);
    displayTable(pet2);
    displayTable(pet3);
    reDisplayPetNames();

    // hook events
    $('#register-btn').on('click', register);
    $('#search-btn').on('click', searchPet);

    $(window).scroll(function() {
        if (!coverageArea1Triggered) {
            if (testTop()) {
                displayPetCount1();
                coverageArea1Triggered = true;
            }
            
        }
    });
    $(window).scroll(function() {
        if (!coverageArea2Triggered) {
            if (testBottom()) {
                displayPetCount2();
                coverageArea2Triggered = true;
            }

        }
    });
/*    $('.del-btn').on('click', function() {
        deletePet(this.id)
    });*/
    watchForDel();
}

window.onload=initReg;