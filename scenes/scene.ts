export function Scene(): void {
  const baseScene = new Entity()
  engine.addEntity(baseScene)
  baseScene.addComponent(new GLTFShape('models/scene.glb'))
}
