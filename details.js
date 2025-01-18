const countryName = new URLSearchParams(location.search).get('name');
document.title = countryName;

const countryDetailsContainer = document.querySelector('.country-details-container');
console.log(countryName);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json())
.then((data)=>{
    console.log(data[0]);
    createCountryFullDetails({...data[0]});
    
}).catch((error)=>{
    console.log(error);
})


function createCountryFullDetails({flags,name,population,region,subregion,capital,languages,borders,tld,currencies}){
    // console.log(nativeName);
    const detailsWrapper = document.createElement('div');
    detailsWrapper.className='country-details-wrapper';
    detailsWrapper.innerHTML=`
                <div class="country-details-wrapper">
                <div class="country-flag-container">
                    <img src="${flags.svg}" alt="${flags.alt}">
                </div>
                <div class="country-detail-container">
                    <h1 class="country-name">${name.common}</h1>
                    <div class="country-info">
                        <div class="left-container">
                            <p><b>Native Name:</b> ${getNativeName(name.nativeName)}</p>
                            <p><b>Population:</b> ${population.toLocaleString("EN-IN")} </p>
                            <p><b>Region:</b> ${region}</p>
                            <p><b>Sub Region:</b> ${subregion}</p>
                            <p><b>Capital:</b> ${capital}</p>
                        </div>
                        <div class="right-container">
                            <p><b>Top Level Domain:</b> ${tld[0]}</p>
                            <p><b>Currencies:</b> ${getCurrencies(currencies).name}</p>
                            <p><b>Symbol:</b> ${getCurrencies(currencies).symbol}</p>
                            <p><b>Languages:</b> ${getLanguages(languages)}</p>
                        </div>
                    </div>
                    <div class="border-countries">
                        <h3>Border Countries:</h3>
                        <a href=""><button>Sri Lanka</button></a>
                        <a href=""><button>Bhutan</button></a>
                        <a href=""><button>Nepal</button></a>
                    </div>
                </div>
            </div>`
    
            countryDetailsContainer.appendChild(detailsWrapper);
}

function getNativeName(nativeName){
    let names="";
    for (const key in nativeName) {
        if(nativeName.hasOwnProperty(key)){
            names+=nativeName[key].common;
            names+=" , "
        }
    }
    if(names.endsWith(", ")) {
        names=names.slice(0,-2);
    }
    return names;
}

function getLanguages(languages){
    let languageSet="";
    for (const key in languages) {
        if(languages.hasOwnProperty(key)){
            languageSet+=languages[key];
            languageSet+=" , "
        }
    }
    if(languageSet.endsWith(", ")) {
        languageSet=languageSet.slice(0,-2);
    }
    return languageSet;
}

const getCurrencies = (currencies)=>{
    for(const currency in currencies){
        if(currencies.hasOwnProperty(currency)){
            return currencies[currency]
        }else return false
    }
}