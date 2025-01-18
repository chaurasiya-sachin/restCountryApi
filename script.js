const countriesCardContainer = document.querySelector(".countries-container");

fetch('https://restcountries.com/v3.1/all')
.then((response)=> response.json())
.then(
    (data)=>{
        data.forEach(country => {
            // console.log(country)
            createCountryCard({...country});
        });
    }
).catch((error)=>{
    console.log(error);
})


function createCountryCard({name,capital,flags,population,region}){
    const countryCard = document.createElement("a");  
    countryCard.classList.add('country-card');  
    countryCard.href=`/details.html?name=${name.common}`;  
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

