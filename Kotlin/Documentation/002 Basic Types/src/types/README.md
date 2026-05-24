Compared to Java, Kotlin has zero primitive types, instead it uses JVM's object wrappers and compiles them to JVM primitives whenever possible.

In total, Kotlin has the following basic types:

Integers: `Byte`, `Short`, `Int`, `Long` | E.g.: `val year: Int = 2026`

Unsigned Integers: `UByte`, `UShort`, `UInt`, `ULong` | E.g.: `val score: UInt = 100u`

Floating-point numbers: `Float`, `Double` | E.g.: `val currentTemp: Float = 24.5f`, `val price: Double = 19.99`

Booleans: `Boolean` | E.g.: `val isEnabled: Boolean = true`

Characters: `Char` | E.g.: `val separator: Char = ','`

Strings: `String` | E.g.: `val message: String = "Hello, world!"`

With this, you can declare variables and then initialize them later. E.g.:
```kotlin
val d: Int 
d = 3
```