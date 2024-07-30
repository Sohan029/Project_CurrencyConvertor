let select = document.querySelectorAll('select');
let submit = document.querySelector('button');

let fromOptions = document.getElementById('select1');
let toOptions = document.getElementById('select2');

let button = document.querySelector('button');
let number = document.querySelector('#amount');

let flag;
let amount=1;
let from ='USD';
let to='INR';

number.addEventListener('change',()=>{
    amount = number.value;
})

for(let options of select){
    for(country in countryList){
        let option = document.createElement('option');
        option.innerText = country;
        if(options.name === 'from' && country === 'USD'){
            option.selected = 'true';
        }
        else if(options.name === 'to' && country === 'INR'){
            option.selected = 'true';
        }
        options.appendChild(option);
    }
    options.addEventListener('change',(event)=>{
        flag = event.target.value;
        let src = `https://flagsapi.com/${countryList[flag]}/flat/64.png`;
        let img = event.target.parentElement.querySelector('img');
        img.setAttribute('src',src);

        if(event.target.parentElement.id === 'from'){
            from = flag;
            console.log(from);
        }
        else if (event.target.parentElement.id === 'to') {
            to = flag;
            console.log(to);
        } 
    })
}

var myHeaders = new Headers();
myHeaders.append("apikey", "LNdBSNsyeuv21dnFMWkaxoHT3pmxEiDn");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


console.log(amount);

button.addEventListener('click',(event)=>{
    event.preventDefault();
    fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,requestOptions)
    .then(response => response.json())
    .then((data) => {
        let {result} =data;
        document.querySelector('.rateBox').innerHTML = `${number.value} ${from} = ${result} ${to}`;
    })
    .catch(error => console.log('error', error));
})


