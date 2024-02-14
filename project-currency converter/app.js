const BASEURL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")

const fromcurr = document.querySelector(".from select")
const toCurrd = document.querySelector(".to select")

const message = document.querySelector(".msg")


for(let select of dropDown){
    for (currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name === "from" && currcode === "USD"){
        newOption.selected= "selected";
    }
    else if(select.name === "to" && currcode === "INR"){
        newOption.selected= "selected";
    }
    select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}
const updateFlag = (element) =>{
    // console.log(element)
    let currcode = element.value;
    // console.log(currcode);
    let cuntryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}



const updateExcahngeRate = async () =>{
    let amount =document.querySelector(".amount input")
    let amtval =amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value ="1"
    }

    // console.log(fromcurr.value)
    // console.log(toCurrd.value)
    const Url = `${BASEURL}/${fromcurr.value.toLowerCase()}/${toCurrd.value.toLowerCase()}.json`;
    let response = await fetch(Url)
    let data = await response.json();
    let rate = data[toCurrd.value.toLowerCase()];
    // console.log(rate)
    // console.log(amount)
    let finalAmount =  amount.value *rate;
    message.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${toCurrd.value}`
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExcahngeRate();

})

window.addEventListener("load", () =>{
    updateExcahngeRate();
})
