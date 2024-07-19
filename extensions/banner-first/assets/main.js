var productName;

document.addEventListener('DOMContentLoaded', function () {
  identifyProductfromReq();
});

async function decodeJson() {
  try {
    // Make an HTTP GET request to the server-side endpoint
    const response = await fetch('https://lionfish-app-hrorj.ondigitalocean.app/app/mapping');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const obj = await response.json();
    console.log("obj ", obj)
    return obj.data;
  }
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

function findCurrentPage() {
  const currentPageUrl = removeParam(window.location.href);
  let currentPage = "";
  // Check if the URL contains a specific path or query parameter indicating the page
  if (currentPageUrl.urlWithoutParams.endsWith('/')) {
    currentPage = "Home"
  }
  else if (location.href.indexOf("products") != -1) {
    currentPage = "Product"
  }
  else if (location.href.indexOf("collection") != -1 || location.href.indexOf("collections") != -1) {
    currentPage = "Collection";
  } else if (location.href.indexOf("cart") != -1) {
    currentPage = "Cart"
  } else if (location.href.indexOf("search") != -1) {
    currentPage = "Search"
  } else {
    currentPage = "All"
  }

  return currentPage;
}

function removeParam(sourceURL) {
  // Create a new URL object
  const parsedUrl = new URL(sourceURL);
  const params = {};

  // Extract parameters
  parsedUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  parsedUrl.search = '';
  return {
    urlWithoutParams: parsedUrl.toString(),
    params: params
  }
}

function identifyProductfromReq() {
  console.log("location.href.indexOf('products') ", location.href.indexOf("products"));
  if (location.href.indexOf("products") != -1)
  {
    console.log("In product page")
    const currentPageUrl = removeParam(window.location.href);
    const parsedUrl = new URL(currentPageUrl.urlWithoutParams);
  
    const segments = parsedUrl.pathname.split('/');
    productName = segments.filter(segment => segment).pop();
    sessionStorage.setItem('productName', productName);
  }


    // If set, retrieve the value
    productName = sessionStorage.getItem('productName');
    console.log('Variable already set. Value:', productName);

  console.log("productName ",productName)
  // Get the current page URL
  decodeJson().then(edges => {
    console.log("edges ", edges)
    //  for (let index = 0; index < edges.length; index++) {

    add_banner(edges[edges.length - 1].bannerText, edges[edges.length - 1].topValue, edges[edges.length - 1].bottomValue, edges[edges.length - 1].leftValue, edges[edges.length - 1].rightValue)
    // }
  }).catch(error => {
    console.error('Error fetching JSON in identifyProductfromReq:', error);
  });
}


function add_banner(bannerText, top, bottom, left, right) {
  if(productName != "undefined")
  {
  const headerTag = document.querySelectorAll('[class*="header"]')[0];
  console.log('Header Tag:', headerTag.clientHeight, headerTag.scrollHeight);

  // Create a new div element
  const parentDiv = document.createElement('div');
  parentDiv.classList.add("bb-container")

  const newDiv = document.createElement('div');
  newDiv.className = "bb-banner"
  // Add some content to the new div
  newDiv.textContent = productName;

  newDiv.style.backgroundColor = 'white';
  newDiv.style.textAlign = 'center';
  newDiv.style.color = 'black';
  const buttonDiv = document.createElement('div');
  const button = document.createElement('button');
  button.textContent = 'Click Me';
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#007bff'; // Bootstrap primary color
  button.style.color = 'white';
  buttonDiv.appendChild(button);
  parentDiv.appendChild(newDiv);
  newDiv.insertAdjacentElement('afterend', buttonDiv)
  // Insert the new div at the top of the body
  if (headerTag) {
    parentDiv.style.top = headerTag.clientHeight + "px";
    parentDiv.style.right = '0px';
    headerTag.insertAdjacentElement('afterend', parentDiv);
  }
  else{
    parentDiv.style.top = top + "px";
    parentDiv.style.left = left + "px";
    document.insertBefore(document.firstChild, parentDiv)
  }
}
}
