import peasy.*;

int speed = 5;
PeasyCam cam;

class Planet {
    String name;
    int dis;
    int rad;
    float days;
    float rotation;
    color col;
    String tex;
    PShape planet;
  
    Planet(String name, int dis, int rad, float days, color col, String tex){
        this.name = name;
        this.dis = dis;
        this.rad = rad;
        this.days = days;
        this.col = col;
        this.tex = tex;
        rotation = 0;
        noStroke();
        noFill();
        PImage img = loadImage(tex);
        planet = createShape(SPHERE, rad);
        planet.setTexture(img);
    }
    
    public void move() {
        rotation = days == 0 ? 0 : rotation + speed / days;
    }
    
    public void show() {
        push();
        int x = int(dis * sin(rotation));
        int y = int(dis * cos(rotation));
        int z = 0;
        translate(x, y, z);
        shape(planet);
        
        fill(255);
        text(name, 0, 0, -rad);
        pop();
    }        
}

Planet[] planets;

void setup(){
    fullScreen(P3D);
    cam = new PeasyCam(this, 400);
    JSONArray jsonArr = loadJSONArray("data.json");
    planets = new Planet[jsonArr.size()];
    for (int i = 0; i < jsonArr.size(); i++) {
        JSONObject planet = jsonArr.getJSONObject(i);
        float days = planet.getFloat("O_Period (days)");
        float disscl = width / 2 / 5913520.0; // max distance
        float radscl = 200 / 695000.0; // max radius
        int rad = round(planet.getInt("Radius") * radscl);
        int dis = round(planet.getInt("Distance (000 km)") * disscl);
        String name = planet.getString("Name");
        String strCol = planet.getString("Color");
        String tex = planet.getString("Texture");
        planets[i] = new Planet(name, dis, rad, days, unhex(strCol), tex);
  }
}

void draw() {
    background(0);
    pointLight(255, 255, 255, 0, 0, 0);
    for (Planet planet : planets) {
        planet.show();
        planet.move();
    }
}
