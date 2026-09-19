# Bird Jump for iOS

A small tap-to-fly game built with SwiftUI and SpriteKit. It has procedurally drawn graphics, randomized obstacles, scoring, collision detection, and a locally saved best score.

## Add it to Xcode

1. Open Xcode and choose **File > New > Project**.
2. Select **iOS > App**.
3. Set the product name to `BirdJump`, choose **SwiftUI** for Interface, and choose **Swift** for Language.
4. Replace the generated `BirdJumpApp.swift` and `ContentView.swift` files with the files in this folder.
5. Drag `GameScene.swift` into the project navigator and enable **Copy items if needed**.
6. In the target settings, choose **Portrait** as the supported device orientation.
7. Run the app on an iPhone simulator or device.

No assets, packages, or third-party dependencies are required.

## Controls

- Tap once to start.
- Tap while playing to make the bird jump.
- Pass between pipes to earn points.
- Tap after a collision to restart.
