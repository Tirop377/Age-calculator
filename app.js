const button = document.querySelector(".button");
const date = new Date();
let errorInInput = false;
let missionCompleted = false;

button.addEventListener('click', ()=>{
    getInput();
    button.style.backgroundColor = "hsl(259, 100%, 65%)"
})

function getInput(){
    let dayInput = parseInt(document.querySelector(".dayInput").value);
    let monthInput = parseInt(document.querySelector(".monthInput").value);
    let yearInput = parseInt(document.querySelector(".yearInput").value);

    if(!isNaN(dayInput) && !isNaN(monthInput) && !isNaN(yearInput)){
        verifyDate(dayInput, monthInput, yearInput);
    }else{
        errorInInput = true;
        if(isNaN(dayInput)){
            document.querySelector(".dayError").style.display = "inline-block"
            document.querySelector(".dayInput").style.borderColor = "hsl(0, 100%, 67%)"
            document.querySelector(".dayInput").placeholder = "DD"
            document.querySelector(".labelDay").style.color = "hsl(0, 100%, 67%)"
        }

        if(isNaN(monthInput)){
            document.querySelector(".monthError").style.display = "inline-block"
            document.querySelector(".monthInput").style.borderColor ="hsl(0, 100%, 67%)"
            document.querySelector(".monthInput").placeholder = "MM"
            document.querySelector(".labelMonth").style.color = "hsl(0, 100%, 67%)"
        }

        if(isNaN(yearInput)){
            document.querySelector(".yearError").style.display = "inline-block"
            document.querySelector(".yearInput").style.borderColor ="hsl(0, 100%, 67%)"
            document.querySelector(".yearInput").placeholder = "YY"
            document.querySelector(".labelYear").style.color = "hsl(0, 100%, 67%)"   
        }
        reset();
    
    }
}

function calculateAge(days, month, year){
    let Day = date.getDate();
    let Month = date.getMonth() + 1;
    let Year = date.getFullYear();
    
    let numberOfYears = Year - year;
    let numberOfDays;
    let numberOfMonths;

    if(Month < month){
        numberOfYears = numberOfYears - 1;
        Month += 12;
        numberOfMonths = Month - month;
    }else{
       numberOfMonths = Month - month; 
    }

    if(Day < days){
        numberOfMonths -= 1;
        Day += 31;
        numberOfDays = Day - days;
    }else{
        numberOfDays = Day - days;
    }

    if(numberOfYears < 0){
        numberOfYears = 0;
    }

    displayAge(numberOfDays, numberOfMonths, numberOfYears);
}

function displayAge(days, months, years){
    document.querySelector(".years").textContent = years;
    document.querySelector(".months").textContent = months;
    document.querySelector(".days").textContent = days;
}

function reset(){
    if (missionCompleted) {
        document.querySelectorAll('input').forEach((item)=>{
            item.addEventListener('keypress', ()=>{
                displayAge("--", "--", "--"); 
            })
        })
        missionCompleted = false;   
    }

    if(errorInInput){
        document.querySelectorAll('input').forEach((item, index)=>{
            item.addEventListener('keypress', ()=>{
                document.querySelectorAll(".error")[index].style.display = "none";     
                document.querySelectorAll("input")[index].style.borderColor ="hsl(0, 1%, 44%)"
                document.querySelectorAll("label")[index].style.color = "hsl(0, 1%, 44%)"
                document.querySelectorAll(".error")[index].innerText = `This field is required`;
            });   
        });
        errorInInput = false; 
    }   
}

function verifyDate(day, month, year) {

    if(year <= date.getFullYear()){
        if(month <= 12 && month >= 1){
            let expectedNoOfdays = generateExpectedMaxDays(month);
            if(day <= expectedNoOfdays && day>=1){
                calculateAge(day, month, year);
                missionCompleted = true;
                reset();
            }else{
                errorInInput = true;
                document.querySelector(".dayError").style.display = "inline-block"
                document.querySelector(".dayInput").style.borderColor = "hsl(0, 100%, 67%)"
                document.querySelector(".labelDay").style.color = "hsl(0, 100%, 67%)"
                document.querySelector(".dayError").innerText = `Must be a valid day`; 
                reset();
            }
        }else{
            errorInInput = true;
            document.querySelector(".monthError").style.display = "inline-block"
            document.querySelector(".monthInput").style.borderColor ="hsl(0, 100%, 67%)"
            document.querySelector(".labelMonth").style.color = "hsl(0, 100%, 67%)"
            document.querySelector(".monthError").innerText = `Must be a valid month`;
            reset();
        }
    }else{
        errorInInput = true;
        document.querySelector(".yearError").style.display = "inline-block"
        document.querySelector(".yearInput").style.borderColor ="hsl(0, 100%, 67%)"
        document.querySelector(".labelYear").style.color = "hsl(0, 100%, 67%)"
        document.querySelector(".yearError").innerText = `Must be in the past`;
        reset();
    }
    
}


function generateExpectedMaxDays(month) {
    let expectedNoOfdays = 31;

    if(month == 4 || month == 6|| month == 9 || month == 11){
        expectedNoOfdays = 30;
    }else if(month === 2){
        expectedNoOfdays = 29;
    }

    return expectedNoOfdays; 
}


