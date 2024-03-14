const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const nameError=document.getElementById('nameError');
const email=document.getElementById('formEmail');
const emailError=document.getElementById('emailError');
const phone=document.getElementById('formPhone');
const phoneError=document.getElementById('phoneError');
const dropdown=document.getElementsByTagName('option');
const selector=document.getElementById('workout');
const errorSelect=document.getElementById('selectError');
const inquiry=document.getElementById('inquiry');
const inquiryError=document.getElementById('inqError');
const saveBtn=document.getElementById('btnSave');
const sendBtn=document.getElementById('btnSend');

function requiredInput(input, errorField){
    if (input.value.trim() == ""){
        errorField.innerText = "This field needs a value";
        return false;
    }else{
        errorField.innerText="";
        return true;
    }
}

function inputLength(input, errorField, minLength, maxLength){
    if (input.value.length < minLength){
        errorField.innerText = `This input requires a minimum of ${minLength} characters`;
        return false;
    }else if (input.value.length > maxLength){
        errorField.innerText = `This input can't contain more than ${maxLength} characters`;
        return false;
    }else{
        errorField.innerText = '';
        return true;
    }
}

function validName() {
    let isValid = true;
    if (!requiredInput(firstName, nameError) || !inputLength(firstName, 2, 30, nameError)) {
        isValid = false;
    }
    return isValid;
}
function validEmail() {
    let isValid = true;
    if (!requiredInput(email, emailError)) {
        isValid = false;
    }
    return isValid;
}

function validPhone() {
    let isValid = true;
    if (phone.value.trim() !== "") {
        if (!inputLength(phone, phoneError, 8, 20)){
        isValid = false;
        }
    }
    return isValid;
}

function validInquiry() {
    let isValid = true;
    if (!requiredInput(inquiry, inquiryError) || !inputLength(inquiry, inquiryError, 15, 300)){
        isValid = false;
    }
    return isValid;
}

function validSelect(){
        let isValid = true;
        for (let i = 0; i < dropdown.length; i++) {
            if (i === 0 && dropdown[i].selected) {
                errorSelect.innerText = `Please choose an option`;
                isValid = false;
            } else if (dropdown[i].selected) {
                errorSelect.innerText = '';
                isValid = true;
            }
        }
    
        return isValid;
}


function validFields(){
    isValid=true;
    isValid= validName();
    isValid= validEmail();
    isValid= validPhone();
    isValid= validSelect();
    isValid= validInquiry();
    return isValid;
}

let msgTarget= document.getElementById("targetMsge");

function printMessage(e){
    e.preventDefault();
    let validMsge= validFields();
    fullMessage=[];
    if(validMsge === true){
        const user={
            firstName: firstName.value,
            lastName: (lastName.value)? lastName.value : "",
            email: email.value,
            phone: (phone.value)? phone.value : '-',
            option: selector.options[selector.selectedIndex].value,
            message: inquiry.value
        }
        fullMessage.push(user);
        localStorage.setItem('userData', JSON.stringify(fullMessage));
    }
    if(fullMessage.length>0){
        let userData= JSON.parse(localStorage.getItem('userData'));
        for (const data of userData) {
            msgTarget.innerHTML=` <div class="info_content">
            <h1 class="info_h1">Please double check the information before sending</h1>
            <div class="info_group">
                <h4  class="info_h4 info_name">Your Name</h4>
                <div class="info_name-div">
                    <p class="info_p">${data.firstName} ${data.lastName}</p>
                </div>
            </div>
            <div class="info_group">
                <h4  class="info_h4 info_email">Your Email</h4>
                <div class="info_email-div">
                    <p class="info_p">${data.email}</p>
                </div>
            </div>
            <div class="info_group">
                <h4  class="info_h4 info_phone">Phone number</h4>
                <div class="info_phone-div">
                    <p class="info_p">${data.phone}</p>
                </div>
            </div>
            <div class="info_group">
                <h4  class="info_h4 info_class">Class selected</h4>
                <div class="info_class-div">
                    <p class="info_p">${data.option}</p>
                </div>
            </div>
            <div class="info_group group_msge">
                <h4  class="info_h4 info_inq">Your Message</h4>
                <div class="info_inq-div">
                    <p class="info_p">${data.message}</p>
                </div>
            </div>
            <div class="btn_group">
            <a class="btn btn-edit" href="#formSection">Edit</a>
            <button class="btn form_btn" id="btn-send" onclick="sendMsge()">Send</button>
            </div>
            <div>`
        }
    }

}

saveBtn.addEventListener('click',printMessage);

inputList=document.getElementsByTagName("input");

function sendMsge(){
    msgTarget.innerHTML="";
    alert("the message was successfully sent");
    inquiry.value="";
    for (let i = 0; i < inputList.length; i++) {
       inputList[i].value=""
    }
}
