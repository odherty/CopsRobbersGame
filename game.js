var id = 0;

var a = '';
var b = '';

var graph = {};

graph['example'] = {'posX': 500, 'posY' : 500, 'next': [0, 1, 2, 3, 5]};
graph['example']['next'].push(6);

console.log(graph);

var currentMode = 'edit';

$(document).ready(function() {
    $("#game").click(function(event) {
        if (event.target.id == 'game') {
            const game = document.getElementById('game');
            let dot = document.createElement('span');
            graph[id] = {'posX' : event.pageX, 'posY': event.pageY, 'next': []};
            console.log(graph);
            dot.className = 'dot';
            dot.id = id++;
            dot.style.top = event.pageY - 10;
            dot.style.left = event.pageX - 10;
            game.appendChild(dot);
        } else if (event.target.className == 'dot') {
            if (currentMode == 'edit') {
                $(event.target).remove();
            } else if (currentMode == 'line') {
                console.log(event.target);
                if (a == '') {
                    a = event.target.id;
                } else if (b == '') {
                    //check if b is already in a's 'next' array
                    b = event.target.id;
                    for (let node of graph[a]['next']) {
                        if (node == b || node == a) {
                            return;
                        }
                    }
                    //connect dots and make lines and update 'next' array
                    console.log('line between ' + a + ' and ' + b);
                    graph[a]['next'].push(b);
                    graph[b]['next'].push(a);
                    a = ''; 
                    b = '';
                }
            }
        }
    });
    $("#clearBtn").click(function() {
        $('.dot').remove();
    });
});

function changeMode(mode) {
    currentMode = mode;
    console.log(currentMode);
}
