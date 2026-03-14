Download your country's flag and replace the current flag in the textures directory if you want.



Using textureLoader load that flag.



Create uTexture and send the texture you loaded as value.



In fragment shader, fetch uTexture using uniform sampler2D.



Using uv attribute set texture color to gl\_FragColor.



Create elevation variable in the vertex shader.



Send it to fragment shader using varying.



Inside fragment shader brighten/darken the textureColor using that elevation.

