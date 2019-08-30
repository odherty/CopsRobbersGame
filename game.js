var id = 0;

var dot1 = '';
var dot2 = '';

var graph = {};

graph['example'] = {'posX': 500, 'posY' : 500, 'next': [0, 1, 2, 3, 5]};
graph['example']['next'].push(6);

console.log(graph);

var currentMode = 'edit';

$(document).ready(function() {
    //On click of game area
    $("#game").click(function(event) {
        const game = document.getElementById('game');

        if (event.target.id == 'game') { //If click was on an empty space in the game area
            if (currentMode == 'edit') {
                let dot = document.createElement('span');
                graph[id] = {'posX' : event.pageX, 'posY': event.pageY, 'next': []};
                console.log(graph);
                dot.className = 'dot';
                dot.id = id++;
                dot.style.top = event.pageY - 10;
                dot.style.left = event.pageX - 10;
                game.appendChild(dot);
            }
        } else if (event.target.className == 'dot') { //If click was on a dot
            if (currentMode == 'edit') {
                $(event.target).remove();
                delete graph[event.target.id];
                $("div[id*=" + event.target.id + "]").remove();
            } else if (currentMode == 'line') {
                console.log(event.target);
                if (dot1 == '') {
                    dot1 = event.target.id;
                } else if (dot2 == '') {
                    //check if b is already in a's 'next' array
                    dot2 = event.target.id;
                    for (let node of graph[dot1]['next']) {
                        if (node == dot2 || node == dot1) {
                            return;
                        }
                    }
                    //connect dots and make lines and update 'next' array
                    console.log('line between ' + dot1 + ' and ' + dot2);
                    graph[dot1]['next'].push(dot2);
                    graph[dot2]['next'].push(dot1);

                    game.appendChild(createLine(dot1, dot2));
                    dot1 = ''; 
                    dot2 = '';
                }
            }
        } else if (event.target.id.includes('line')) { //If click was on a line
            $(event.target).remove();
        }
    });
    //On clear all
    $("#clearBtn").click(function() {
        $('.dot').remove();
        $('div[id*=line').remove();
        resetVars();
    });
});

function changeMode(mode) {
    currentMode = mode;
    console.log(currentMode);
}

function resetVars() {
    graph = {};
    dot1 = '';
    dot2 = '';
}

function createLineElement(x, y, length, angle, dot1, dot2) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
               + 'background-color: black; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);  
    line.setAttribute('id', 'line' + dot1 + dot2)
    return line;
}

function createLine(dot1, dot2) {
    var x1 = graph[dot1].posX;
    var y1 = graph[dot1].posY;
    var x2 = graph[dot2].posX;
    var y2 = graph[dot2].posY;
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha, dot1, dot2);
}