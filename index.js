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
            div.style.cssText = `height: ${height}px; width: ${width}px; background-color: #ffffee;`;
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
    localStorage.setItem('col', false)
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
        let col = localStorage.getItem('col');
        if (col === 'true') { 
            let a = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            let c = Math.floor(Math.random() * 255);
            event.target.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
        } else {
            let opacity = 0.1;
            let e = event.target.style.backgroundColor;
            if (e.includes('rgba')) {
                let a = e.split('.');
                let b = a[1].replace(')', '');
                let c = parseInt(b);
                    c++;
                    opacity = c / 10.0;
            }
            event.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`; 
        }
    });
}



//Reset button 
let resetBtn = document.getElementById('left');
resetBtn.addEventListener('click', resetButton);

function resetButton() {
    //adding shake 
    const main = document.querySelector('.main-container');
    for (const child of main.children) {
        main.classList.add('shake')
        child.classList.add('shake')
    }
    //remove after timout
    setTimeout(removeShake, 500)
    function removeShake() {
        for (const child of main.children) {
            main.classList.remove('shake')
            child.classList.remove('shake')
        }
    }

    l = localStorage.getItem('l')
    h = localStorage.getItem('h')
    createGrid(l, h);
}

//Rbadom Colour
let randCol = document.getElementById('right');
randCol.addEventListener('click', () => {
    let l = localStorage.getItem('l');
    let h = localStorage.getItem('h');

    //toggle
    let col = false;
    if (randCol.classList.contains('randActive')) {
        col = false
        randCol.classList.remove('randActive');
    } else if (!randCol.classList.contains('randActive')) {
        col = true
        randCol.classList.add('randActive');
    }
    //set to local storage
    localStorage.setItem('col', col)
});

//function to rest grid
function resetGrid() {
    const section = document.querySelectorAll('.grid');
    section.forEach((grid) => {
        grid.remove();
    })
};

