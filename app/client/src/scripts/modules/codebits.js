
function setup() {
    console.log('babel codebits');

    createCanvas(window.innerWidth, window.innerHeight);
    noLoop();
}

function draw() {
    const a1 = 50;
    const a2 = 400;
    const points = [
        [a1, a1, a2, a1],
        [a1, a2, a2, a2],
        [a1, a1, a1, a2],
        [a2, a1, a2, a2]
    ];
    const setBase = (n) => n + 400;
    for (let i = 0; i < 60; i++) {
        let randomNum = random(200);
        points.forEach((p) => {
            line(...p.map((e) => (e + randomNum > a2 ? a2 : e + randomNum)));
            line(
                ...p.map((e) =>
                    setBase(e - randomNum) < setBase(a1)
                        ? setBase(a1)
                        : setBase(e - randomNum)
                )
            );
        });
    }
}
// setup();
// draw();
