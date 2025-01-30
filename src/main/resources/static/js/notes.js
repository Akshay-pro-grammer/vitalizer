function addnote() {
   
        name1='Anonymous';
    let el = document.getElementById("notes1");
    let inp = document.getElementById("input-note").value;
    
    // Check if the input is empty
    if (inp.trim() === "") {
        alert("Please enter a note before adding.");
        return;
    }
    
    // Create the parent div with specified classes
    let div = document.createElement("div");
    div.className = "p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow";
    
    // Create the paragraph element with specified classes
    let p = document.createElement("p");
    p.className = "text-gray-600 dark:text-gray-300";
    
    // Create and append the text nodes to the paragraph
    p.appendChild(document.createTextNode(`"${inp}" - `));
    
    // Create the strong element for the name and append it
    let strong = document.createElement("strong");
    strong.appendChild(document.createTextNode(name1));
    p.appendChild(strong);
    
    // Append the paragraph to the div, and the div to the notes container
    div.appendChild(p);
    // el.appendChild(div);

    el.insertBefore(div, document.getElementById("input-notes"));
    // Clear the input field
    document.getElementById("input-note").value = "";
}
