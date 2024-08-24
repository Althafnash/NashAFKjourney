const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i,70 + i))
}

const boundaries = [];

const offset = {
    x: -700,
    y: -550
};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
        }
    });
});

const c = canvas.getContext("2d");

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./Images/Pellet Town.png";

const ForegroundImage = new Image();
ForegroundImage.src = "./Images/foreground.png";

const PlayerImage = new Image();
PlayerImage.src = "./Images/playerDown.png";

const PlayerUpImage = new Image();
PlayerUpImage.src = "./Images/playerUp.png";

const PlayerLeftImage = new Image();
PlayerLeftImage.src = "./Images/playerLeft.png";

const PlayerRightImage = new Image();
PlayerRightImage.src = "./Images/playerRight.png";

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (PlayerImage.width / 4) / 8,
        y: canvas.height / 2 - (PlayerImage.height / 2) / 8 + 50,
    },
    image: PlayerImage,
    frames: {
        max: 4
    },
    sprites:{
        up:PlayerUpImage,
        Down: PlayerImage,
        left: PlayerLeftImage,
        right: PlayerRightImage,
    }
});

const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: image
})

const Foreground = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: ForegroundImage
})

const keys ={
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    },
}

const movable = [background , ...boundaries ,Foreground]

function RectangularCollision({Rectangle1 , Rectangle2}) {
    return (
        Rectangle1.position.x + Rectangle1.width >= Rectangle2.position.x &&
        Rectangle1.position.x <= Rectangle2.position.x + Rectangle2.width &&
        Rectangle1.position.y <= Rectangle2.position.y + Rectangle2.height &&
        Rectangle1.position.y + Rectangle1.height >= Rectangle2.position.y
    )
}

let moving = true
function animate() {
    window.requestAnimationFrame(animate);

    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });

    player.draw();

    Foreground.draw();
    player.moving = false

    if (keys.w.pressed && lastkey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        let moving = true; // Assume moving is true until collision is detected

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                RectangularCollision({
                    Rectangle1: player,
                    Rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x ,
                            y: boundary.position.y + 3 
                        }
                    }
                })
            ) {
                moving = false; // Stop moving if collision is detected
                break;
            }
        }

        if (moving) {
            movable.forEach((item) => {
                item.position.y += 3; // Moving upwards; adjust as needed
            });
        }
    } else if (keys.a.pressed && lastkey === "a") {
        player.moving = true
        player.image = player.sprites.left
        let moving = true; // Assume moving is true until collision is detected

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                RectangularCollision({
                    Rectangle1: player,
                    Rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3 ,
                            y: boundary.position.y 
                        }
                    }
                })
            ) {
                moving = false; // Stop moving if collision is detected
                break;
            }
        }

        if (moving) 
            movable.forEach((movable) => {
                movable.position.x += 3;
            });
    } else if (keys.s.pressed && lastkey === "s") {
        player.moving = true
        player.image = player.sprites.Down
        let moving = true; // Assume moving is true until collision is detected

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                RectangularCollision({
                    Rectangle1: player,
                    Rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x ,
                            y: boundary.position.y - 3 
                        }
                    }
                })
            ) {
                moving = false; // Stop moving if collision is detected
                break;
            }
        }

        if (moving) 
            movable.forEach((movable) => {
                movable.position.y -= 3;
            });
    } else if (keys.d.pressed && lastkey === "d") {
        player.moving = true
        player.image = player.sprites.right
        let moving = true; // Assume moving is true until collision is detected

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                RectangularCollision({
                    Rectangle1: player,
                    Rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y  
                        }
                    }
                })
            ) {
                moving = false; // Stop moving if collision is detected
                break;
            }
        }

        if (moving) 
            movable.forEach((movable) => {
                movable.position.x -= 3;
            });
    }
}
animate();

let lastkey = ""
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastkey = "w"
            break;
        case "a":
            keys.a.pressed = true;
            lastkey = "a"
            break;
        case "s":
            keys.s.pressed = true;
            lastkey = "s"
            break;
        case "d":
            keys.d.pressed = true;
            lastkey = "d"
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});

