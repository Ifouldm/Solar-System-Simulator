let easycam;
let planetData;
let textures = new Map();
let speedSlider;
let distScaleSlider;
let radScaleSlider;
const planets = [];
let font;
let speed = 5;
let radScale;
let distScale;

class Planet {
    constructor(name, dis, rad, days, col, tex){
        this.name = name;
        this.dis = dis;
        this.rad = rad;
        this.days = days;
        this.col = col;
        this.tex = tex;
        this.rotation = 0;
        this.img = textures.get(name);
        console.log(this.rad * radScale);
        noStroke();
        noFill();
    }

    move() {
        this.rotation = this.days == 0 ? 0 : this.rotation + speed / this.days;
    }
    
    show() {
        push();
        const x = int(this.dis * distScale * sin(this.rotation));
        const y = int(this.dis * distScale * cos(this.rotation));
        const z = 0;
        translate(x, y, z);
        texture(this.img);
        sphere(this.rad * radScale);
        textFont(font);
        //text(this.name, 0, 0, -this.rad);
        pop();
    } 
}

function loadTextures(data) {
    for (let i = 0; i < Object.values(data).length; i++) {
        const text =  Object.values(data)[i];
        textures.set(text['Name'], loadImage('data/'+text['Texture']));
    }
}

function preload() {
    planetData = loadJSON("./data/data.json", loadTextures);
    font = loadFont('./assets/Inconsolata-Regular.ttf');
}

function setup() {
    createCanvas(1200, 800, WEBGL);
    easycam = createEasyCam();
    document.oncontextmenu = function() { return false; }
    distScl = width / 2 / 5913520.0; // max distance
    radScl = 200 / 695000.0; // max radius
    for (let i = 0; i < Object.values(planetData).length; i++) {
        let planet = Object.values(planetData)[i];
        let days = planet["O_Period (days)"];
        let rad = round(planet["Radius"] * radScl);
        let dis = round(planet["Distance (000 km)"] * distScl);
        let name = planet["Name"];
        let strCol = planet["Color"];
        let tex = planet["Texture"];
        planets.push(new Planet(name, dis, rad, days, unhex(strCol), tex));
    }
    createElement('h3', 'Orbit Speed: ');
    speedSlider = createSlider(0, 300, 50, 5);
    createElement('h3', 'Distance Scale: ');
    distScaleSlider = createSlider(0, 200, 100);
    createElement('h3', 'Radius Scale: ');
    radScaleSlider = createSlider(0, 200, 100);
}

function draw() {
    speed = speedSlider.value();
    distScale = distScaleSlider.value() / 100;
    radScale = radScaleSlider.value() / 100;
    background(30);
    ambientLight(80);
    pointLight(255, 255, 255, 0, 0, 0);
    for (let planet of planets) {
        planet.show();
        planet.move();
    }
}

function mouseClicked() {
    return false;
}