document.addEventListener('DOMContentLoaded', function () {
    add_banner();
  });
  
function add_banner()
{
            // Create a new div element
            const newDiv = document.createElement('div');
            newDiv.className = "bb-banner"
            // Add some content to the new div
            newDiv.textContent = 'Demo Banner By BlackBytt';
            
            // Optionally add some styles to the new div
            newDiv.style.backgroundColor = '#e3fc02';
            newDiv.style.padding = '10px';
            newDiv.style.textAlign = 'center';
            newDiv.style.color = 'black'
            
            // Insert the new div at the top of the body
            document.body.insertBefore(newDiv, document.body.firstChild);
}

