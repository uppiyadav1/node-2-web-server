console.log("javascript loaded");

  let weatherForm = document.querySelector("form");
  let search = document.querySelector("input");
  let messageOne = document.querySelector("#message-1");
  let messageTwo = document.querySelector("#message-2");


  weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(search){
      fetch("http://localhost:3000/weather?search="+search.value).then((response)=>{
        response.json().then((data)=>{
          if(data.error){
            console.log(error.message)
            messageOne.textContent = error.message;
          }else{
            messageOne.textContent = "Temprature is "+data.temperature + ", humidity "+data.humidity+", feels like "+data.feelslike+", wind speed "+data.wind_speed;

            console.log(data);
          }
        });
      });
    }else{
      messageOne.textContent = "No data present";
    }

  });