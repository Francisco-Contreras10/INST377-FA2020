const restaurant = [];
fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
  .then(response => response.json())
  .then(data => restaurant.push(...data))

  function findMatches(wordToMatch, restaurant){
    return restaurant.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.city.match(regex)
    });

}

