import SpriteKit
import SwiftUI

struct ContentView: View {
    private let scene: GameScene = {
        let scene = GameScene()
        scene.scaleMode = .resizeFill
        return scene
    }()

    var body: some View {
        SpriteView(scene: scene)
            .ignoresSafeArea()
            .statusBarHidden()
    }
}
