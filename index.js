const sketchPad = document.querySelector('.sketchPad');

//Set dims vars
let dims = document.getElementById('dims');
let dims2 = document.getElementById('dims2');

//Function to created grid
function createGrid(lxw) {
    localStorage.setItem('lxw', lxw);
    //reset grid
    resetGrid();
    //columns
    for (let i = 0; i < lxw; ++i){
        //rows
        for (let j = 0; j < lxw; ++j) {
            //create  grid sections
            const div = document.createElement('div');
            //add class
            div.classList.add('grid');
            //set grid section heaight to fit
            let height = 900/lxw;
            let width = 900/lxw;
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
    let lxw = 16;
    dims.value = lxw;
    dims2.value = lxw;
    createGrid(lxw);
  });

//Event listener to get user input 
dims.addEventListener('change', (e) => {
    lxw = parseInt(e.target.value);
    
    //Check if val is over 64
    if (lxw > 64) {
        dims.classList.add('error');
    } else {
        //remove error class
        dims.classList.remove('error');
        //Push value on change into disable input 2
        dims2.value = lxw;
        //Call create grid funcition
        createGrid(lxw);
    }
});

// event to color in grid section
function addEvent(div) {
    div.addEventListener('mouseover', (event) => {
        event.target.id = 'gridActive'
    });
}

//Reset button 
let resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetButton);

function resetButton() {
    lxw = localStorage.getItem('lxw')
    createGrid(lxw);
}

//function to rest grid
function resetGrid() {
    const section = document.querySelectorAll('.grid');
    section.forEach((grid) => {
        grid.remove();
    })
};

//Get clicked colour call set function
let colours = document.querySelectorAll('.colour')
colours.forEach((colour) => {
    colour.addEventListener('click', () => {
        let col = colour.id;
        console.log(col);
        setColour(col);
    })
})

//Set color palette
function setColour(colour) {
    let grids = document.querySelectorAll('#gridActive')
    grids.forEach((grid) => {
        grid.style.cssText = `Background-color: ${colour}`;
    })
}