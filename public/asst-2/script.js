
const restaurant = [];

fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
  .then(response => response.json())
  .then(data => restaurant.push(...data));
 

  function findMatches(wordToMatch, restaurant){
    return restaurant.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.city.match(regex);
    })

}

function displayArray() {
    return restaurant;
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurant);
    const html = matchArray.map(place => {
        return `
            <li>
                <p class="nameLabel">${place.name}</p>
                <p>Address: ${place.address_line_1}</p>
                <p>City: ${place.city}</p>
                <p>Category: ${place.category}</p>
                <p>Proper Hand Washing: ${place.proper_hand_washing}</p>
            </li>
            `
    }).join('');
    suggestions.innerHTML = html;
    
}

const searchInput = document.querySelector('.textentry');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);