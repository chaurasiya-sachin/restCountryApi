document.title="All countries Info"
const countriesCardContainer = document.querySelector(".countries-container");
const filter = document.querySelector(".filter");
const searchInput = document.querySelector(".serach-container input");
const body = document.querySelector("body")
const themeSwitcher = document.querySelector('.mode'); 
themeSwitcher.innerHTML='<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode</p>'
let allCountriesData

themeSwitcher.addEventListener('click',(e)=>{
    body.classList.toggle('light-mode');
    const token = body.classList;
    console.log(token.length);
    
    if(token.length){
        console.log(true);
        
        themeSwitcher.innerHTML='<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode</p>'
                
    }else{
        themeSwitcher.innerHTML='<p style="color:yellow"><i class="ri-sun-fill" style="color:yellow"></i>&nbsp;&nbsp; Light Mode</p>'
    } 
})

fetch('https://restcountries.com/v3.1/all')
.then((response)=> response.json())
.then(
    (data)=>{
        allCountriesData=data;
        
        data.forEach(country => {
            // console.log(country)
            createCountryCard({...country});

        });
    }
).catch((error)=>{
    console.log(error);
})


function createCountryCard({name,capital,flags,population,region},isDark){
    const countryCard = document.createElement("a");  
    countryCard.classList.add('country-card');  
    countryCard.href=`/details.html?name=${name.common}&mode=${isDark}`;  
    countryCard.innerHTML =`
                    <img src=${flags.svg} alt="${flags.svg}-flag">
                    <div class="country-card-text">
                        <h3 class="country-name">${name.common}</h3>
                         <p><b>Population :</b> ${(population).toLocaleString('en-IN')}</p>
                         <p><b>Region :</b> ${region}</p>
                         <p><b>Capital :</b> ${capital}</p>
                    </div>
                `;
    countriesCardContainer.appendChild(countryCard);
}


filter.addEventListener("change",(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=> res.json())
    .then((data)=>{        
    countriesCardContainer.innerHTML="";
        data.forEach((country)=>{
            console.log(country);
            createCountryCard({...country})
        })
    }).catch((error)=>{
        console.log(error);
    })
})

searchInput.addEventListener("keyup",(e)=>{

    let matchedCountry = allCountriesData.filter((countryObj)=>{   
        return countryObj.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    })
    
    countriesCardContainer.innerHTML=""
    matchedCountry.forEach((country,idx)=>{
        console.log(country);
        console.log(idx);                
        createCountryCard({...country})
    })
    
})