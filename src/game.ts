import { Scene } from '../scenes/scene'

const baseScene = new Entity()
engine.addEntity(baseScene)
baseScene.addComponent(new GLTFShape('models/store.glb'))

baseScene.addComponent(
  new Transform({
    position: new Vector3(7, 0, 15.8)
    // scale: new Vector3(1, 0, 0),
    // rotation: Quaternion.Euler(0, -90, 0)
  })
)

//variable to store if door is open
let isDoorOpen = false

//create door entity
const door = new Entity()

//add gltf shape
door.addComponent(new GLTFShape('models/Puzzle01_Door.glb'))

//add transform and set it in position
door.addComponent(
  new Transform({
    position: new Vector3(9.7, 0, 16.6),
    scale: new Vector3(0.5, 0.65, 1),
    rotation: Quaternion.Euler(0, -90, 0)
  })
)

//create animator and add animation clips
const doorAnimator = new Animator()

doorAnimator.addClip(new AnimationState('Door_Open', { looping: false }))
doorAnimator.addClip(new AnimationState('Door_Close', { looping: false }))

door.addComponent(doorAnimator)

//create audio source component, set audio clip and add it to door entity
door.addComponent(new AudioSource(new AudioClip('sounds/door_squeak.mp3')))

//ui

const canvas = new UICanvas()

const atlas = new Texture('images/example.png')

const uiContainer = new UIContainerRect(canvas)
uiContainer.width = '100%'
uiContainer.height = '100%'
uiContainer.visible = false

const bg = new UIImage(uiContainer, atlas)
bg.sourceHeight = 800
bg.sourceWidth = 1000
bg.sourceLeft = 0
bg.sourceTop = 0
bg.width = 500
bg.height = 400

const yes = new UIImage(uiContainer, atlas)
yes.sourceHeight = 121
yes.sourceWidth = 379
yes.sourceLeft = 0
yes.sourceTop = 801
yes.width = 100
yes.height = 45
yes.positionX = -60
yes.onClick = new OnClick(() => {
  Scene()
})

// eslint-disable-next-line prefer-const
let no = new UIImage(uiContainer, atlas)
no.sourceHeight = 121
no.sourceWidth = 359
no.sourceLeft = 379
no.sourceTop = 801
no.width = 100
no.height = 45
no.positionX = 60
no.onClick = new OnClick(() => {
  uiContainer.visible = false
  isDoorOpen = false
  doorAnimator.getClip('Door_Close').play()
  door.getComponent(AudioSource).playOnce()
})

//listen to onclick event to toggle door state
door.addComponent(
  new OnClick((event) => {
    if (!isDoorOpen) {
      isDoorOpen = true
      uiContainer.visible = true
      doorAnimator.getClip('Door_Open').play()
      door.getComponent(AudioSource).playOnce()
    } else if (isDoorOpen) {
      isDoorOpen = false
      doorAnimator.getClip('Door_Close').play()
      door.getComponent(AudioSource).playOnce()
    }
  })
)

//add door entity to engine
engine.addEntity(door)
