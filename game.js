var currentMode = 'edit';

$(document).ready(function() {
    $("#game").click(function(event) {
        if (event.target.id == 'game') {
            const game = document.getElementById('game');
            let dot = document.createElement('span');
            dot.className = 'dot';
            dot.style.top = event.pageY - 10;
            dot.style.left = event.pageX - 10;
            game.appendChild(dot);
        } else if (event.target.className == 'dot') {
            if (currentMode == 'edit') {
                $(event.target).remove();
            } else if (currentMode == 'line') {

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
