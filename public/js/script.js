console.log('From js file');


const weatherData=document.querySelector('form');
const search=document.querySelector('input');


const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');
messageOne.textContent='loading...'
weatherData.addEventListener('submit',(e)=>{
    e.preventDefault();
        const address=search.value;
        fetch('/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }
        
    })
})


})