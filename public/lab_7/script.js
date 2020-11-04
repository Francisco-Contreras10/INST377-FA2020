function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const newData = restaurantList.reduce((collection, item, i) => {
    const findCat = collection.find((findItem) => findItem.label === item.category);
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1,
      });
    } else {
      findCat.y += 1;
    }
    return collection;
  }, []);
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet("customColorSet1", [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: "miscAdobe",
    title: {
      text: "Places To Eat Out In Future",
    },
    axisX: {
      interval: 1,
      labelFontSize: 12,
    },
    axisY2: {
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)",
      title: "Restaurant By Category",
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [
          {
            startValue: 40,
            endValue: 50,
            color: "orange",
          },
          {
            startValue: 85,
            endValue: 100,
            color: "orange",
          },
          {
            startValue: 140,
            endValue: 175,
            color: "orange",
          },
        ],
      },
      // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [
      {
        type: "bar",
        name: "restaurants",
        axisYType: "secondary",
        dataPoints: datapointsFromRestaurantsList,
      },
    ],
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log("jsonFromServer", jsonFromServer);
  sessionStorage.setItem("restaurantList", JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  CanvasJS.addColorSet("miscAdobe", [
    "#4F61F7",
    "#5DDDFC",
    "#60E69F",
    "#94FC5D",
    "#F2E75A",
  ]);
  const dataPoints = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(dataPoints);
  const chart = new CanvasJS.Chart("chartContainer", options);
  chart.render();
  $(window).on("resize", () => {
    chart.render();
  });
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener("submit", async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});
