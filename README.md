# ScrollPro

Smooth scrolling wrapper for gsap tweens

## Installation

```sh
npm install scrollpro gsap
```

## Usage

### Simple scrolling container

#### JS

```js
import scrollpro from 'scrollpro'

const container = document.querySelector('.container')
const ctl = scrollpro({
  container,
})
```

##### Css

Good practice to add a clearfix or an overflow property to the container to ensure margins are calculated.

```css
.container:before,
.container:after {
  display: block;
  clear: both;
  content: '\a0 ';
  visibility: hidden;
  height: 0;
}
```

### Scroll container with custom viewport and scrollbar

#### JS

```js
import scrollpro from 'scrollpro'

const scrollbar = document.querySelector('.scrollbar')
const viewport = document.querySelector('.viewport')
const container = document.querySelector('.container')
const ctl = scrollpro({
  scrollbar,
  viewport,
  container,
})
```

##### HTML

```html
<div class="scrollbar"></div>
<div class="viewport">
  <div class="scroll-container"></div>
</div>
```

##### Css

this can be customized to your liking

```css
.viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 15px;
  height: 100%;
  z-index: 9999;
  background: #f0f0f0;
}

.scrollbar .bar {
  background: #c8c8c8;
}
```

### Adding tweens on scroll

For tweening we use gsap's `timeline` and the `to()` and `from()` methods. A `to` object and a valid dom node are required for tweening. Check the link below for documentation on gsap's `timeline` and pay special attention to the `to()` and `from()` methods.

[`GSAP Timeline`](https://greensock.com/docs/v3/GSAP/Timeline)

#### JS

```js
const ctl = scrollpro({
  container,
})

// translateY tween div 200px
const div = document.querySelector('.tween')
ctl.addTween({
  el: div,
  to: {
    y: '200px',
  },
})
```

### Adding Sticky on scroll

#### JS

```js
const ctl = scrollpro({
  container,
})

// Acts like position sticky css
const div = document.querySelector('.sticky')
ctl.addSticky({
  el: div,
})
```

## Controller options

| Option           | Type     | Default          | Description                                                                           |
| ---------------- | -------- | ---------------- | ------------------------------------------------------------------------------------- |
| container        | Dom node | null \*reqiuired | Reserved for the div you want to use as the scroll container.                         |
| viewport         | Dom node | null             | Reserved for the element you want to use as the viewport of your scrolling container. |
| scrollbar        | Dom node | null             | Reserved for the element you want the scrollbar track and bar to be placed into.      |
| layoutHorizontal | boolean  | false            | If you want the layout to scroll horizontally.                                        |
| keystep          | number   | 120              | The amount in px you want to scroll when the up and down keys are pressed             |
| firefoxMult      | number   | 25               | The speed multiplier used for firefox browser                                         |
| touchMult        | number   | 2                | The speed multiplier used for touch screens                                           |
| mouseMult        | number   | 1                | The speed multiplier used for the mouse wheel                                         |
| ease             | number   | 0.06             | The ease value of the scroll container. The speed that the container comes to a stop. |

## Controller Methods

| Method                                                                          | Description                                                                           | Returns                  | Arguments                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialize()                                                                    | Starts the controller. Will be called automatically when controller is intialiated.   | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| update()                                                                        | Updates the items, scrollbar, container to the current scroll position.               | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| kill()                                                                          | Kills the controller and all items in the controller.                                 | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| recalibrate()                                                                   | Reworks where in the scroll items will be triggered.                                  | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| getScroll()                                                                     | Retrieves the current scroll position.                                                | `number` scroll position | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| on(e, fn)                                                                       | Triggered when an event happens.                                                      | `number` scroll position | <ol><li>`e` the event you want to envoke. Accepts `'scroll'` and `'resize'`</li><li>`fn` is the function you want to run on each event. Returns the scroll position. eg. `fn((scrollPos) => {})`</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| off(e, fn)                                                                      | Remove triggered events.                                                              | nothing                  | <ol><li>`e` the event you want to remove from. Accepts `'scroll'` and `'resize'`</li><li>`fn` is the function you want to remove from that event.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| addTween({ el, to, from, trigger, offsets, ignoreInitialView, peak, callback }) | Creates a tween and adds it to the item list.                                         | `string` item id         | <div>This takes in a single object of the following params.</div><ol><li>`el` - `dom node` <b>REQUIRED</b> the element that you want to tween</li><li>`to` - `object` this is the gsap to object. This will be the elements final position after its progress through the viewing area.</li><li>`from` - `object` Another gsap object that specifies the begining position of the element. This is handy if your elements have percentage widths and margins. This way you can ensure that gsap will return to your elements correct starting position.</li><li>`start` - `string` If you want to set the absolute scroll position you want the tween to start. Support `px, rems, vw, vh` units.</li><li>`distance` - `string` If you want to manually set the scrolling distance you want your element to tween for. Support `px, rems, vw, vh` units.</li><li>`trigger` - `dom node` if you want the tween to be triggered by an element in the scrolling view other than the one you are tweening.</li><li>`offsets` - `object` accepts `start` and `end` in string format. These offsets will be added to the tween either on the start or end of the viewing area. Support `px, rems, vw, vh` units.</li><li>`ignoreIntialView` - `boolean` If the tween is in the initial view this will ignore the starting view offset. Handy for making items move the same speed even if they are in the intial view or not.</li><li>`peak` - `number` from 0 to 1 if you want the peak of the tween to happen at a percentage of viewing area.</li><li>`callback` - `function` will be envoked each time the progress of the tween is updated. Returns the progress and scroll position. eg. `callback((progress, scrollPos) => {})`</li></ol> |
| addSticky({ el, offsets, ignoreBounds, callback })                              | Creates and adds a sticky element to the item list. Behaves like css position sticky. | `string` item id         | <div>This will take in a single object of the following params.</div><ol><li>`el` - `dom node` <b>REQUIRED</b> the element that you want to become sticky.</li><li>`offsets` - `object` takes in `start` and `end` which is how far from the top and bottom you want your element to stick.</li><li>`ignoreBounds` - `boolean` Normally a sticky element stops when it reaches the end of the space in the parent element. This allows your element to continue being sticky outside of the parent.</li><li>`callback` - `function` will be envoked each time the progress of the sticky element is updated. Returns the progress and scroll position. eg. `callback((progress, scrollPos) => {})`</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| removeItem(id)                                                                  | Removes an item from the items list                                                   | nothing                  | <ol><li>`id` <b>REQUIRED</b> the items id that was returned after creating it.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| modifyItem(id, newData)                                                         | Modifies an already created item                                                      | nothing                  | <ol><li>`id` - `string` <b>REQUIRED</b> the items id that was returned after creating it.</li><li>`newData` - `object` <b>REQUIRED</b> An object with the new data you want to apply or override for the item.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| scrollTo(position, useAnimation)                                                | Scrolls to a certian position                                                         | nothing                  | <ol><li>`position` - `number` <b>Required</b> The position that you want to scroll to.</li><li>`useAnimation` - `boolean` Whether or not you want to animate to that position. Default is true.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| scrollToElement(el, offset, useAnimation)                                       | Scrolls to the top of a certain element                                               | nothing                  | <ol><li>`el` - `dom node` <b>Required</b> The element you want to scroll to.</li><li>`offset` - `number` How far from the top you would like to scroll.</li><li>`useAnimation` - `boolean` If you want to animate to that position. Default is true.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## License

Distributed under the MIT License. See `LICENSE` for more information.
