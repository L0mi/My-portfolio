import SpriteKit
import UIKit

final class GameScene: SKScene, SKPhysicsContactDelegate {
    private enum PhysicsCategory {
        static let bird: UInt32 = 1 << 0
        static let obstacle: UInt32 = 1 << 1
        static let scoreGate: UInt32 = 1 << 2
    }

    private enum GameState {
        case ready
        case playing
        case gameOver
    }

    private let bird = SKShapeNode(circleOfRadius: 18)
    private let scoreLabel = SKLabelNode(fontNamed: "AvenirNext-Heavy")
    private let messageLabel = SKLabelNode(fontNamed: "AvenirNext-Bold")
    private let detailLabel = SKLabelNode(fontNamed: "AvenirNext-Medium")

    private var gameState = GameState.ready
    private var score = 0
    private var bestScore = UserDefaults.standard.integer(forKey: "BirdJumpBestScore")
    private let obstacleWidth: CGFloat = 72
    private let obstacleGap: CGFloat = 185
    private let obstacleSpeed: TimeInterval = 4.0

    override func didMove(to view: SKView) {
        backgroundColor = UIColor(red: 0.37, green: 0.78, blue: 0.94, alpha: 1)
        physicsWorld.gravity = CGVector(dx: 0, dy: -6.5)
        physicsWorld.contactDelegate = self

        createBackground()
        createBird()
        createLabels()
        resetGame()
    }

    override func didChangeSize(_ oldSize: CGSize) {
        guard oldSize != .zero else { return }
        removeAllChildren()
        removeAllActions()
        createBackground()
        createBird()
        createLabels()
        resetGame()
    }

    private func createBackground() {
        let sun = SKShapeNode(circleOfRadius: 48)
        sun.fillColor = UIColor(red: 1, green: 0.87, blue: 0.35, alpha: 0.9)
        sun.strokeColor = .clear
        sun.position = CGPoint(x: size.width - 70, y: size.height - 100)
        sun.zPosition = -10
        addChild(sun)

        for index in 0..<4 {
            let cloud = makeCloud()
            cloud.position = CGPoint(
                x: CGFloat(index) * (size.width / 3) - 30,
                y: size.height * (0.66 + CGFloat(index % 2) * 0.1)
            )
            cloud.zPosition = -9
            addChild(cloud)
        }

        let ground = SKSpriteNode(
            color: UIColor(red: 0.31, green: 0.67, blue: 0.25, alpha: 1),
            size: CGSize(width: size.width, height: 42)
        )
        ground.position = CGPoint(x: size.width / 2, y: 21)
        ground.zPosition = 5
        ground.physicsBody = SKPhysicsBody(rectangleOf: ground.size)
        ground.physicsBody?.isDynamic = false
        ground.physicsBody?.categoryBitMask = PhysicsCategory.obstacle
        ground.physicsBody?.contactTestBitMask = PhysicsCategory.bird
        addChild(ground)

        let ceiling = SKNode()
        ceiling.position = CGPoint(x: 0, y: size.height)
        ceiling.physicsBody = SKPhysicsBody(edgeFrom: .zero, to: CGPoint(x: size.width, y: 0))
        ceiling.physicsBody?.categoryBitMask = PhysicsCategory.obstacle
        ceiling.physicsBody?.contactTestBitMask = PhysicsCategory.bird
        addChild(ceiling)
    }

    private func makeCloud() -> SKNode {
        let cloud = SKNode()
        let circles: [(CGFloat, CGFloat, CGFloat)] = [
            (-24, 0, 19), (0, 9, 26), (28, 0, 20), (5, -5, 29)
        ]

        for (x, y, radius) in circles {
            let puff = SKShapeNode(circleOfRadius: radius)
            puff.fillColor = UIColor.white.withAlphaComponent(0.72)
            puff.strokeColor = .clear
            puff.position = CGPoint(x: x, y: y)
            cloud.addChild(puff)
        }
        return cloud
    }

    private func createBird() {
        bird.removeAllChildren()
        bird.path = CGPath(ellipseIn: CGRect(x: -18, y: -18, width: 36, height: 36), transform: nil)
        bird.fillColor = UIColor(red: 1, green: 0.78, blue: 0.12, alpha: 1)
        bird.strokeColor = UIColor(red: 0.82, green: 0.48, blue: 0.04, alpha: 1)
        bird.lineWidth = 3
        bird.zPosition = 10

        let wing = SKShapeNode(ellipseOf: CGSize(width: 21, height: 13))
        wing.fillColor = UIColor(red: 1, green: 0.56, blue: 0.08, alpha: 1)
        wing.strokeColor = .clear
        wing.position = CGPoint(x: -8, y: -4)
        bird.addChild(wing)

        let eye = SKShapeNode(circleOfRadius: 4)
        eye.fillColor = .white
        eye.strokeColor = .clear
        eye.position = CGPoint(x: 8, y: 7)
        bird.addChild(eye)

        let pupil = SKShapeNode(circleOfRadius: 2)
        pupil.fillColor = .black
        pupil.strokeColor = .clear
        pupil.position = CGPoint(x: 1, y: 0)
        eye.addChild(pupil)

        let beakPath = CGMutablePath()
        beakPath.move(to: CGPoint(x: 16, y: 4))
        beakPath.addLine(to: CGPoint(x: 29, y: 0))
        beakPath.addLine(to: CGPoint(x: 16, y: -4))
        beakPath.closeSubpath()
        let beak = SKShapeNode(path: beakPath)
        beak.fillColor = UIColor(red: 1, green: 0.35, blue: 0.05, alpha: 1)
        beak.strokeColor = .clear
        bird.addChild(beak)

        bird.physicsBody = SKPhysicsBody(circleOfRadius: 17)
        bird.physicsBody?.allowsRotation = false
        bird.physicsBody?.restitution = 0
        bird.physicsBody?.categoryBitMask = PhysicsCategory.bird
        bird.physicsBody?.collisionBitMask = PhysicsCategory.obstacle
        bird.physicsBody?.contactTestBitMask = PhysicsCategory.obstacle | PhysicsCategory.scoreGate
        addChild(bird)
    }

    private func createLabels() {
        scoreLabel.fontSize = 46
        scoreLabel.fontColor = .white
        scoreLabel.position = CGPoint(x: size.width / 2, y: size.height - 86)
        scoreLabel.zPosition = 20
        addChild(scoreLabel)

        messageLabel.fontSize = 31
        messageLabel.fontColor = .white
        messageLabel.position = CGPoint(x: size.width / 2, y: size.height * 0.58)
        messageLabel.zPosition = 20
        addChild(messageLabel)

        detailLabel.fontSize = 18
        detailLabel.fontColor = UIColor.white.withAlphaComponent(0.9)
        detailLabel.position = CGPoint(x: size.width / 2, y: size.height * 0.58 - 38)
        detailLabel.zPosition = 20
        addChild(detailLabel)
    }

    private func resetGame() {
        enumerateChildNodes(withName: "obstaclePair") { node, _ in node.removeFromParent() }
        removeAction(forKey: "spawnObstacles")

        gameState = .ready
        score = 0
        scoreLabel.text = "0"
        messageLabel.text = "BIRD JUMP"
        detailLabel.text = "Tap anywhere to fly"

        bird.position = CGPoint(x: size.width * 0.28, y: size.height * 0.55)
        bird.zRotation = 0
        bird.physicsBody?.velocity = .zero
        bird.physicsBody?.affectedByGravity = false
        let hover = SKAction.sequence([
            SKAction.moveBy(x: 0, y: 8, duration: 0.55),
            SKAction.moveBy(x: 0, y: -8, duration: 0.55)
        ])
        bird.run(SKAction.repeatForever(hover), withKey: "hover")
    }

    private func startGame() {
        gameState = .playing
        messageLabel.text = ""
        detailLabel.text = ""
        bird.removeAction(forKey: "hover")
        bird.physicsBody?.affectedByGravity = true

        spawnObstaclePair()
        let wait = SKAction.wait(forDuration: 1.65)
        let spawn = SKAction.run { [weak self] in self?.spawnObstaclePair() }
        run(SKAction.repeatForever(.sequence([wait, spawn])), withKey: "spawnObstacles")
    }

    private func flap() {
        bird.physicsBody?.velocity.dy = 380
        bird.run(.sequence([
            .scaleY(to: 0.82, duration: 0.06),
            .scaleY(to: 1, duration: 0.08)
        ]))
    }

    private func spawnObstaclePair() {
        guard gameState == .playing else { return }

        let pair = SKNode()
        pair.name = "obstaclePair"
        pair.position = CGPoint(x: size.width + obstacleWidth, y: 0)
        pair.zPosition = 4

        let safeBottom: CGFloat = 120
        let safeTop: CGFloat = size.height - 130
        let gapCenter = CGFloat.random(in: (safeBottom + obstacleGap / 2)...(safeTop - obstacleGap / 2))

        let bottomHeight = gapCenter - obstacleGap / 2
        let topStart = gapCenter + obstacleGap / 2
        let topHeight = size.height - topStart

        let bottomPipe = makePipe(height: bottomHeight)
        bottomPipe.position = CGPoint(x: 0, y: bottomHeight / 2)
        pair.addChild(bottomPipe)

        let topPipe = makePipe(height: topHeight)
        topPipe.position = CGPoint(x: 0, y: topStart + topHeight / 2)
        pair.addChild(topPipe)

        let scoreGate = SKNode()
        scoreGate.position = CGPoint(x: obstacleWidth / 2 + 20, y: gapCenter)
        scoreGate.physicsBody = SKPhysicsBody(rectangleOf: CGSize(width: 3, height: obstacleGap))
        scoreGate.physicsBody?.isDynamic = false
        scoreGate.physicsBody?.categoryBitMask = PhysicsCategory.scoreGate
        scoreGate.physicsBody?.collisionBitMask = 0
        scoreGate.physicsBody?.contactTestBitMask = PhysicsCategory.bird
        pair.addChild(scoreGate)

        addChild(pair)

        let distance = size.width + obstacleWidth * 2
        let move = SKAction.moveBy(x: -distance, y: 0, duration: obstacleSpeed)
        pair.run(.sequence([move, .removeFromParent()]))
    }

    private func makePipe(height: CGFloat) -> SKNode {
        let pipe = SKSpriteNode(
            color: UIColor(red: 0.18, green: 0.68, blue: 0.27, alpha: 1),
            size: CGSize(width: obstacleWidth, height: max(height, 1))
        )
        pipe.physicsBody = SKPhysicsBody(rectangleOf: pipe.size)
        pipe.physicsBody?.isDynamic = false
        pipe.physicsBody?.categoryBitMask = PhysicsCategory.obstacle
        pipe.physicsBody?.collisionBitMask = PhysicsCategory.bird
        pipe.physicsBody?.contactTestBitMask = PhysicsCategory.bird

        let highlight = SKSpriteNode(
            color: UIColor.white.withAlphaComponent(0.2),
            size: CGSize(width: 8, height: max(height - 8, 1))
        )
        highlight.position = CGPoint(x: -obstacleWidth * 0.27, y: 0)
        pipe.addChild(highlight)
        return pipe
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        switch gameState {
        case .ready:
            startGame()
            flap()
        case .playing:
            flap()
        case .gameOver:
            resetGame()
        }
    }

    override func update(_ currentTime: TimeInterval) {
        guard gameState == .playing else { return }

        let verticalSpeed = bird.physicsBody?.velocity.dy ?? 0
        bird.zRotation = max(-0.65, min(0.35, verticalSpeed / 900))

    }

    func didBegin(_ contact: SKPhysicsContact) {
        let categories = contact.bodyA.categoryBitMask | contact.bodyB.categoryBitMask

        if categories == PhysicsCategory.bird | PhysicsCategory.scoreGate {
            let gateBody = contact.bodyA.categoryBitMask == PhysicsCategory.scoreGate
                ? contact.bodyA
                : contact.bodyB
            guard gateBody.node?.parent != nil else { return }
            gateBody.node?.removeFromParent()
            score += 1
            scoreLabel.text = "\(score)"
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
            return
        }

        if categories & PhysicsCategory.bird != 0,
           categories & PhysicsCategory.obstacle != 0 {
            endGame()
        }
    }

    private func endGame() {
        guard gameState == .playing else { return }
        gameState = .gameOver
        removeAction(forKey: "spawnObstacles")

        enumerateChildNodes(withName: "obstaclePair") { node, _ in node.speed = 0 }
        bird.physicsBody?.affectedByGravity = false
        bird.physicsBody?.velocity = .zero

        if score > bestScore {
            bestScore = score
            UserDefaults.standard.set(bestScore, forKey: "BirdJumpBestScore")
        }

        messageLabel.text = "GAME OVER"
        detailLabel.text = "Score: \(score)   Best: \(bestScore)  •  Tap to retry"
        UINotificationFeedbackGenerator().notificationOccurred(.error)

        let shake = SKAction.sequence([
            .moveBy(x: -7, y: 0, duration: 0.04),
            .moveBy(x: 14, y: 0, duration: 0.08),
            .moveBy(x: -7, y: 0, duration: 0.04)
        ])
        camera?.run(shake)
    }
}
