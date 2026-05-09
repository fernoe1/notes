Comment all the starter code in script.js.



Create Experience folder.



Create experience class, which will be a singleton and store all other classes that are required for the experience. It should have constructor with canvas parameter.



Create custom EventEmitter class in utils folder.



Create sizes class in Utils folder which controls window resizing and everything size based.

Listen to native resize event listener inside sizes and fire our own resize event.



Create time class in Utils folder which controls everything time based. 

It should fire tick custom function on each frame and have context of start, current, elapsed, delta fields.

Set delta to 16 initially for the first ever frame.



Create scene context in Experience class by importing THREE.



Create Camera class that instantiates camera, and sets orbit controls. In Experience listen to update and update camera.



Create Renderer class that instantiates renderer, and listen to resize and tick in the Experience.



Create World folder that stores everything that will be used in scene. 



Create sources.js file that stores every file source in this format: 

{

&#x09;name: string,

&#x09;type: string,

&#x09;path: string or array of strings

}
Create Resources.js file that handles loading of these files.



Resources.js should fire event when everything is finished loading, in World class listen to that event.



On finished loading event, create and instantiate Floor, Fox, Environment classes.



Floor class should only handle floor under the fox.



Fox class should only handle the fox.



Environment should only handle the lighting.



Using AnimationMixin, and update propogation, animate the fox with the first animation of the file.



Add Debug.js which only lets you access debug gui when #debug is present in the project link.



Using Debug.js, add debugs to Fox which lets you try all 3 animations, and debugs to Environment which lets you control intensity of environmentMap and directionalLighting, and position of directionalLighting.



Create destroy function in environment that destroys/disposes of everything.



