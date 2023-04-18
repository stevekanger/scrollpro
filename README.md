# ScrollPro

Smooth momentum scrolling library

## Installation

```sh
npm install scrollpro
```

## Usage

### Simple momentum scrolling with content and scrollbar

##### JS

```js
import Controller from 'scrollpro'

const ctl = new Controller()
const viewport = ctl.createViewport()

const contentEl = document.getElementById('content')
const content = ctl.createContent({ element: contentEl })

const scrollbarEl = document.getElementById('content')
const scrollbar = ctl.createScrollbar({ element: scrollbarEl })
```

##### Css

this can be customized to your liking

```css
#viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 15px;
  height: 100%;
  z-index: 9999;
  background: #f0f0f0;
}

#scrollbar .bar {
  background: #c8c8c8;
}
```

Good practice to add a clearfix or an overflow property to the container to ensure margins are calculated.

```css
#content:before,
#content:after {
  display: block;
  clear: both;
  content: '\a0 ';
  visibility: hidden;
  height: 0;
}
```

##### HTML

```html
<div id="scrollbar"></div>
<div id="viewport">
  <div id="content"></div>
</div>
```

## Creating a controller

### `new Controller({Options})`

#### Args:

| Argument          | Required | Type   | Description                      |
| ----------------- | -------- | ------ | -------------------------------- |
| ControllerOptions | false    | Object | Parameters for virtual scrolling |

#### Options:

| Option      | Type   | Default | Description                                                                           |
| ----------- | ------ | ------- | ------------------------------------------------------------------------------------- |
| keystep     | number | 120     | The amount in px you want to scroll when the up and down keys are pressed             |
| firefoxMult | number | 25      | The speed multiplier used for firefox browser                                         |
| touchMult   | number | 2       | The speed multiplier used for touch screens                                           |
| mouseMult   | number | 1       | The speed multiplier used for the mouse wheel                                         |
| ease        | number | 0.06    | The ease value of the scroll container. The speed that the container comes to a stop. |

<br>

## Controller Events

`update` : fires when the controller updates the scroll. This event will be called with the scroll values. <br>
`init` : fires when the createViewport is called initializing the controllers event listeners. <br>
`refresh`: fires when refresh is called. This can be called via the controller methods or will fire automatically when the window resizes. <br>
`kill` : fires then the controller is killed.

<br>

## Public Controller Methods

### `on(event, fn)`

Allows you to set event listeners for the controller events stated above.

#### Args:

| Argument | Required | Type     | Description                                                                                                       |
| -------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| event    | true     | string   | The desired event type for your function to be fired on                                                           |
| fn       | true     | function | The desired function to be run on the event. If passed on the update event will be called with the scroll values. |

#### Returns: undefined

<br>

### `off(event, fn)`

Removes the function passed the the `on()` method.

#### Args:

| Argument | Required | Type     | Description                                                                                                       |
| -------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| event    | true     | string   | The desired event type for your function to be fired on                                                           |
| fn       | true     | function | The desired function to be run on the event. If passed on the update event will be called with the scroll values. |

#### Returns: undefined

<br>

### `fire(event)`

Fires event listeners for the specified event.

#### Args:

| Argument | Required | Type   | Description                                             |
| -------- | -------- | ------ | ------------------------------------------------------- |
| event    | true     | string | The desired event type for your function to be fired on |

#### Returns: undefined

<br>

### `kill()`

Kills the controller. Removes all event listeners from the viewport and removes all scroll listeners from the controller.

#### Args: none.

#### Returns: undefined

<br>

### `refresh()`

Recalculates the controller and all items in the controller. Will fire automatically when the window resizes.

#### Args: none

#### Returns: undefined

<br>

### `update()`

Updates the controller items with the current scroll values.

#### Args: none

#### Returns: undefined

<br>

### `createViewort({Options})`

Creates the viewport. This initializes the controller and sets the required event listeners for virtualized scrolling.

#### Args:

| Argument        | Required | Type   | Description                 |
| --------------- | -------- | ------ | --------------------------- |
| ViewportOptions | false    | Object | Parameters for the viewport |

#### Options:

| Option  | Required | Default | Type                  | Description                                                       |
| ------- | -------- | ------- | --------------------- | ----------------------------------------------------------------- |
| element | false    | window  | HTMLElement or window | Optional element to use as the viewport for the scroll controller |

#### Returns: Viewport Methods

`getBounds()`: returns the bounds of the viewport.<br>
`kill()` : kills the viewport.

<br>

### `createContent({Options})`

Creates the content. This is the div that will be translated up and down when virtual scrolling happens. It will also serve as the scrolling limit.

#### Args:

| Argument       | Required | Type   | Description                |
| -------------- | -------- | ------ | -------------------------- |
| ContentOptions | true     | Object | Parameters for the content |

#### Options:

| Option  | Required | Default | Type        | Description                            |
| ------- | -------- | ------- | ----------- | -------------------------------------- |
| element | true     | null    | HTMLElement | Element to use as the content wrapper. |

#### Returns: Content Methods

`init()`: Initializes the content. This will be automatically called during init.<br>
`kill()`: Kills the content and removes it from event list.<br>
`refresh()`: Recalculates the content and sets new scroll limits.<br>
`update()`: Updates the content position with the current scroll values.<br>

<br>

### `createScrollbar({Options})`

Creates as scrollbar inside of an html element.

#### Args:

| Argument         | Required | Type   | Description                  |
| ---------------- | -------- | ------ | ---------------------------- |
| ScrollbarOptions | true     | Object | Parameters for the Scrollbar |

#### Options:

| Option       | Required | Default    | Type        | Description                                                                                             |
| ------------ | -------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| element      | true     | null       | HTMLElement | Element to use as the scrollbar wrapper.                                                                |
| axis         | false    | 'y'        | string      | This is the axis you want to use as the basis for the scrollbar. 'y' is scrollY and 'x' is scrollX.     |
| orientation  | false    | 'vertical' | string      | This is which direction your scrollbar is oriented. Top to bottom 'vertical'. Side to side 'horizontal' |
| useAnimation | false    | true       | boolean     | This is whether or not you want your scrollbar to use the same scrolling animation as the scroll uses.  |

#### Returns: Scrollbar Methods

`init()`: Initializes the scrollbar. This will automatically be called during intialization.<br>
`kill()`: Kills the scrollbar removing it from the event list.<br>
`refresh()`: Recalculates the scrollbar and updates it.<br>
`update()`: Updates the scrollbar thumb with the current scroll values.<br>

<br>

### `createObserver({Options})`

Creates an observer for an html element. This will observe the elements place in the scroll relative to the viewport.

#### Args:

| Argument        | Required | Type   | Description                 |
| --------------- | -------- | ------ | --------------------------- |
| ObserverOptions | true     | Object | Parameters for the Observer |

#### Options:

| Option               | Required | Default                    | Type        | Description                                                                                                                                                                                                                                                                                |
| -------------------- | -------- | -------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| element              | true     | null                       | HTMLElement | Element to observe in the scroll                                                                                                                                                                                                                                                           |
| normalizeInitialView | false    | false                      | boolean     | This normalizes the start and end values of the observer. This is handy for uniform parallax scrolling if your element starts in the initial viewport.                                                                                                                                     |
| offsetStart          | false    | 0                          | number      | This sets an offset from the start of the observation.                                                                                                                                                                                                                                     |
| offsetEnd            | false    | 0                          | number      | This sets an offset from the end of the observation.                                                                                                                                                                                                                                       |
| start                | false    | undefined                  | number      | If you want to manually set the start of the observation this value will be used instead of calculating it.                                                                                                                                                                                |
| distance             | false    | undefined                  | number      | If you want to manullly set the distance for your element to be observed for this will be used intead of calculating it.                                                                                                                                                                   |
| addClasses           | false    | false                      | boolean     | If set to true the controller will set 'aboveViewport', 'belowViewport' and 'inViewport' classes to your element relative to where they are.                                                                                                                                               |
| callback             | false    | ({progress, inView}) => {} | function    | This is a callback function that will be fired every time the scroll is updated. It will be called with an object that has `{ progress, inView }`. Progress is a 0 to 1 value of the elements progress through the viewport. And inView is whether or not your element is in the viewport. |
| tween                | false    | undefined                  | object      | <a href="#tweening">See Tweening for further details.</a> This is an object that has an element and css properties that can be applied based on scroll position.                                                                                                                           |

#### Returns: Observer Methods

`init()`: Initializes the Observer. This will be called automatically during init.<br>
`kill()`: Kills the Observer removing it from the event list.<br>
`refresh()`: Recalculates the Observer and updates it.<br>
`update()`: Updates the Observer with the current scroll values.<br>

<br>

### `createSticky({Options})`

Creates a sticky element just like position sticky in css.

#### Args:

| Argument      | Required | Type   | Description                       |
| ------------- | -------- | ------ | --------------------------------- |
| StickyOptions | true     | Object | Parameters for the Sticky element |

#### Options:

| Option       | Required | Default   | Type    | Description                                                                                                                       |
| ------------ | -------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| top          | false    | 0         | number  | Sets the distance from the top the item will stick                                                                                |
| bottom       | false    | 0         | number  | Sets the distance from the bottom the item will stop sticking                                                                     |
| start        | false    | undefined | number  | If you want to set the start position that the element will start to stick it will use this instead of calculating                |
| distance     | false    | undefined | number  | If you want to set the distance the item will stick for it will use this instead of calculating.                                  |
| ignoreBounds | false    | false     | boolean | Whether you want your sticky element to stay within the parents bounds. If set to true it will stick to the top all the way down. |

#### Returns: Sticky Methods

`init()`: Initializes the Sticky element. This will be called automatically during the initialization.<br>
`kill()`: Kills the Sticky element removing it from the event list.<br>
`refresh()`: Recalculates the Sticky element and updates it.<br>
`update()`: Updates the Sticky element with the current scroll values.<br>

<br>

### `scrollTo({Options})`

Allows you to scroll to a specific part of the page.

#### Args:

| Argument        | Required | Type   | Description                                     |
| --------------- | -------- | ------ | ----------------------------------------------- |
| ScrollToOptions | true     | Object | Parameters specifiying where you want to scroll |

#### Options:

| Option       | Required | Default   | Type    | Description                                            |
| ------------ | -------- | --------- | ------- | ------------------------------------------------------ |
| x            | false    | undefined | number  | Sets the x axis scroll                                 |
| y            | false    | undefined | number  | Sets the y axis scroll                                 |
| useAnimation | false    | true      | boolean | Whether or not you want to use the animation to scroll |

#### Returns: undefined

<br>

### `setLimit({Options})`

#### Args:

| Argument        | Required | Type   | Description              |
| --------------- | -------- | ------ | ------------------------ |
| SetLimitOptions | true     | Object | Sets the scrolling limit |

#### Options:

| Option | Required | Default   | Type   | Description           |
| ------ | -------- | --------- | ------ | --------------------- |
| x      | false    | undefined | number | Sets the x axis limit |
| y      | false    | undefined | number | Sets the y axis limit |

#### Returns: undefined

<br>

## Tweening

A little extra explaination on how to tween. The Observer allows you to set a tween object.

#### Options:

| Option  | Required | Default              | Type        | Description                                                                                                                                                                               |
| ------- | -------- | -------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element | false    | the observer element | HTMLElement | The element that you want to tween. If not specified it will default to the element passed in as the observer                                                                             |
| css     | true     | undefined            | object      | This is an object of valid javascript css values. The key will be a javascript css key and the value can only be specified as a string. No numbers allowed and it will explain why below. |

To specify a tween you start with a javascript css object notation eg. `marginTop: '20px'`. To set the from and to values that you want to use you would place them comma seperated in curly brackets inside the value string like so: `{ marginTop: '{0, 300}px'}`. So in this example you would tween the css `margin-top` from 0px to 300px while the element is in the viewport. Below we will do a full example of you setting up a tween to translateY 500px.

```js
const element = document.getElementById('tween')
const tween = ctl.createObserver({
  element,
  offsetEnd: -500, // Replace the 500px movement at the end of the observation
  tween: {
    css: {
      transform: 'translateY({0, 500}px)',
    },
  },
})
```

So there is no limit to what css properties you want to tween or how many values in a css string you want to specify. As long as you place your values inside of curly braces and seperate them with commas you can tween from and to whatever your heart desires. It will use the progress value of observer to set the tween's value. <b>Note: just remember when using things like widths, margins, and things that can affect the page flow you can create performance and page breaking issues. Performance wise it is best to stick to translate and matrix.</b>

<br>

## License

Distributed under the MIT License. See `LICENSE` for more information.
