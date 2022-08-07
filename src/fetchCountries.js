export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then(responsive => {
            if (responsive.status === 404) throw new Error("Oops, there is no country with that name")
            return responsive.json()
        })
}
