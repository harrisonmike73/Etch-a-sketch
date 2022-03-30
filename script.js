const containerDiv = document.querySelector("#container");

function makeGrid(rows, columns) {
    
//check for existing button to remove if played already
    while (document.querySelector("button") !== null) {
        document.querySelector("button").remove();
    }
     
// create the grid
    containerDiv.style.setProperty("--grid-rows", rows);
    containerDiv.style.setProperty("--grid-columns", columns);
    containerDiv.style.width = "960px";
    containerDiv.style.overflow = "hidden";
        for (i = 0; i < (rows * columns); i++) {
            let square = document.createElement("div");
            square.style.minHeight = "0";
            square.style.minWidth = "0";
            square.style.overflow = "hidden";
            containerDiv.appendChild(square).className = "grid-item";    
            
            //add event listen to check for background presence
            square.addEventListener("mouseover", () => {

                //run check to see if background color is present, if NOT, apply random color; apply 10% opacity interval
                if (square.style.backgroundColor == "") {
                    let color = getRandomColor();
                    square.style.backgroundColor = color;
                    square.style.opacity = ".10";
                    return square.style.backgroundColor;
                }
                // apply additional opacity at 10% intervals, hard stop at 1.0 (100%) IF background color is present
                if ((square.style.backgroundColor !== "") && (square.style.opacity <= "0.90")) {
                    square.style.opacity = parseFloat(square.style.opacity) + .10;
                    return square.style.backgroundColor;
                }
            })
        }
        createButton();
    }
    
    //make grid (16, 16);

    function createButton() {
        const buttonDiv = document.querySelector("#buttonDiv");
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset Grid";
        resetButton.style.margin = "20px";
        buttonDiv.appendChild(resetButton);

        
    // adds event listen to button and prompt user/reset grid/throw error > 100
        resetButton.addEventListener('click', () => {
            document.querySelectorAll(".grid-item").forEach(e => e.remove());
            let userInput = prompt("Please enter the number of grid squares per side (Max: 100): ");
            if (userInput > 100) {
                alert("ERROR!  You specified a grid size that is larger than the number of 100. ");
                return;
            }
            rows = userInput;
            columns = userInput;
            makeGrid(rows, columns);
        })
    }

    function getRandomColor() {
        let o = Math.round;
        let r = Math.random;
        let s = 255;
        return "rgb(" + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    }

    // make initial call on page load as per project requirements
    makeGrid(16,16);