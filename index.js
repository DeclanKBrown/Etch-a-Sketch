const sketchPad = document.querySelector('.sketchPad');

//Set dims vars
let dims = document.getElementById('dims');
let dims2 = document.getElementById('dims2');

//Function to created grid
function createGrid(l, h) {
    localStorage.setItem('l', l);
    localStorage.setItem('h', h);

    //reset grid
    resetGrid();
    //columns
    for (let i = 0; i < l; ++i){
        //rows
        for (let j = 0; j < h; ++j) {
            //create  grid sections
            const div = document.createElement('div');
            //add class
            div.classList.add('grid');

            //set grid section heaight to fit
            let height = 619/ h;
            let width = 1100/ l;
            div.style.cssText = `height: ${height}px; width: ${width}px;`;
            //add to DOM
            sketchPad.appendChild(div);
            
            //add event listener to each div
            addEvent(div);
        }
    }
}

//Set on page load
window.addEventListener("load", () => {
    let l = 16;
    let h = 9;
    dims.value = l;
    dims2.value = h;
    createGrid(l, h);
  });

//Event listener to get user input 
dims.addEventListener('change', (e) => {
    l = parseInt(e.target.value);
    
    //Check if val is over 64
    if (l > 100) {
        dims.classList.add('error');
    } else {
        //remove error class
        dims.classList.remove('error');
        //Push value on change into disable input 2
        h = ((l * 9) / 16);
        if (isNaN(h)) {
            dims2.value = "";
        } else {
            console.log(h);
            dims2.value = h;
        }
        //Call create grid funcition
        createGrid(l, h);
    }
});

// event to color in grid section
function addEvent(div) {
    div.addEventListener('mouseover', (event) => {
        event.target.id = 'gridActive'
    });
}

//Reset button 
let resetBtn = document.getElementById('left');
resetBtn.addEventListener('click', resetButton);

function resetButton() {
    l = localStorage.getItem('l')
    h = localStorage.getItem('h')
    createGrid(l, h);
}

//function to rest grid
function resetGrid() {
    const section = document.querySelectorAll('.grid');
    section.forEach((grid) => {
        grid.remove();
    })
};
