Continuation from the previous task.

Create a plane behind the mesh to observe shadow issue, this is happening because youre twisting the MeshStandardMaterial, but not the MeshDepthMaterial that is used to generate shadows, the core shadow issue is also because of this.

To fix this create new MeshDepthMaterial and twist it the same way you did using hooks.

That will use casted shadow being wrong, to fix the core shadow hook objectNormal from beginnormal_vertex and twist it as well.