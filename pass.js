const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lenghtnumber]");
const passwordDisplay = document.querySelector("[data-passwprdDisplay]");
const copyBtn= document.querySelector("[data-copybtn]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".gene-btn")
const allcheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols =  "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

//default values
let password = "";
let passLength = 10;
let checkcount = 0;
 // set strength circle color white
 setIndicator('#ccc');



 // set password length
sliderHandle = () => {
    inputSlider.value = passLength;
    lengthDisplay.innerText = passLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passLength - min)*100/(max - min) ) + "% 100%";
 };
 sliderHandle();

 //set strength indicator color
function setIndicator(color) {
   indicator.style.backgroundColor = color;
   indicator.style.boxShadow = ` 0px 0px 12px 1px ${color}`;
}

 //generate randoms
 getRandomInteger = (min,max) =>{
    return Math.floor(Math.random()*(max-min))+min;
 };

 //generate random numbers
 getRandomNumbers = () =>{
    return getRandomInteger(0,9);
 };

 //get random lowercase
 getRandomLowercase = () =>{
    return String.fromCharCode(getRandomInteger(97,123)); //used to convert alphabets ascii code to alphabets
 };

 //get random uppercase
 getRandomUppercase = () =>{
    return String.fromCharCode(getRandomInteger(65,91)); //
 } ;  

 //get random symbols
 getRandomSymbols = () =>{
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
 };

 // strength calculate
 calcStrength = () =>{

    let hasupper = false;
    let haslower = false;
    let hasnumbers = false;
    let hassymbols = false;

    if(uppercaseCheck.checked) hasupper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numberCheck.checked) hasnumbers = true;
    if(symbolCheck.checked) hassymbols = true;

    if(haslower && hasupper &&(hasnumbers || hassymbols) && passLength >=8){
        setIndicator("#0f0");
    } else if ((haslower || hasupper) && (hasnumbers || hassymbols) && passLength >=6){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00")
    }

};


// to copy password to clipboard
 copyContent =  async () =>{
   try{

      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText = "copied";
      console.log("copied");

   }
   
   catch(e){

      copyMsg.innerText = "failed to copied";

   }

      copyMsg.classList.add("active");

      setTimeout(() =>{
         copyMsg.classList.remove("active"); 
      },2000);
};

//to shuffle password
   function shufflePassword(Array){
      for(let i=Array.length-1;i>0;i--){
         const j = Math.floor(Math.random()*(i+1));
         const temp = Array[i];
         Array[i] = Array[j];
         Array[j]=temp;
      }
      let str ="";
      Array.forEach((el) => (str += el));
      return str;
   };

   // to count the checkbox
   handleCheckboxChange = () => {
      checkcount = 0;
      allcheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
          checkcount++;
        }
      });

       // Sync password length with checkbox count
      // passLength = checkcount; // remove if you want

    
      sliderHandle(); // Only call once, after loop
    
      if (passLength < checkcount) {
        passLength = checkcount;
        sliderHandle();
      }
    };
    
// to count check box
allcheckBox.forEach( (checkbox) => {
   checkbox.addEventListener("change",handleCheckboxChange);
});


// to toggle between slider
inputSlider.addEventListener("input",(e) =>{
   passLength = e.target.value;
   sliderHandle();
});

// main button to generate password with the conditions
generateBtn.addEventListener("click", () =>{
   console.log("clicked");
   
   if(checkcount <= 0)
      return;

   // console.log("eror");

   if(passLength < checkcount){
      passLength = checkcount;
      sliderHandle();

      // console.log("small");
   };
   
   // to make poassword empty after refresh
   password = "";

   let funcArr = [];

   if(uppercaseCheck.checked)
      funcArr.push(getRandomUppercase());

   if(lowercaseCheck.checked)
      funcArr.push(getRandomLowercase());

   if(numberCheck.checked)
      funcArr.push(getRandomNumbers());

   if(symbolCheck.checked)
      funcArr.push(getRandomSymbols());

   //compulsory addition
   for(let i=0; i<funcArr.length; i++){
      password += funcArr[i];
   };
   console.log("compulsory done");

   //remaining addition 
   for(let i=0; i<passLength-funcArr.length; i++){
      let randIndex = getRandomInteger(0 , funcArr.length);
      // console.log("randIndex", randIndex);
      password += funcArr[randIndex];

      // console.log(password);
   };

   password = shufflePassword(Array.from(password));

   passwordDisplay.value = password;

   calcStrength();

});




 

