const sketchPad = document.querySelector('.sketchPad');

//Function to created 16x16 grid
function createGrid() {
    //columns
    for (let i = 0; i < 16; ++i){
        //rows
        for (let j = 0; j < 16; ++j) {
            const div = document.createElement('div');
            div.classList.add('grid');
            sketchPad.appendChild(div);
        }
    }
}
createGrid();

//event to color in grid section
const gridSection = document.querySelectorAll('.grid');

gridSection.forEach((grid) => {
    grid.addEventListener("mouseover", (event) => {
    event.target.classList.add('gridActive')
})
});
