# Solar-System-Simulator

A solar system simulator in processing using real planetary data to provide a relative 3D representation of the solar system with the planets textured using images, point lighting from the position of the sun, and animated orbits. Using a camera library you can move the viewpoint and change the level of zoom.

The relative sizes are based on the actual data as are the relative distances and relative orbit speeds although these are not respective to each other to keep the model interesting (An artistic liberty). I also implemented labels for each planet but I personally prefer it without. Another learning exercise in data extraction, processing, and presentation with additional challenges such as 3D spatial coordinates, conversions, and scaling.

- [x] Find solar system data & format to JSON
- [x] Import data into processing
- [x] Draw sphere for each planet using common scale for size
- [x] Distribute spheres using common scale from distances from center (sun)
- [x] apply rotation according to relative orbit speed
- [x] Remove sun
- [x] Find textures for each planet & import into processing
- [x] Apply textures to each planet
- [x] Directional lighting (from sun)


## Additional Goals:
- [ ] Port to P5.js
- [ ] Moons orbitting planets
- [ ] Option to show/hide Sun

## Libraries

- [Processing](https://processing.org/)

## Images

![Solar System Simulator](https://i.imgur.com/LsUHLGH.png "Solar System Simulator")

## Run Application

Run application in processing
