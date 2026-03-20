Continue from the starter, or rewrite it if you want to practise syntax.

Create a hook to change #include <begin_vertex> in materials vertex shader using material.onBeforeCompile = (shader).

Using that hook, replace #include <begin_vertex> with #include <begin_vertex> and your code which gets angle from position.y * 0.9.

Replace #include <common> with itself and get2dRotateMatrix function
```
mat2 get2dRotateMatrix(float _angle) {
	return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}
```

Use that function to build rotation matrix and use it on transformed.xz.