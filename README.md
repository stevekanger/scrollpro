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

There is no default css added to your scrollbar you need to style it yourself so you can customize it to your liking.

```css
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
<div id="content"></div>
```

### Adding a custom viewport to above example

##### JS

```js
import Controller from 'scrollpro'

const ctl = new Controller()
const viewportEl = document.getElementById('viewport')
const viewport = ctl.createViewport({ element: viewportEl })

const contentEl = document.getElementById('content')
const content = ctl.createContent({ element: contentEl })

const scrollbarEl = document.getElementById('content')
const scrollbar = ctl.createScrollbar({ element: scrollbarEl })
```

##### Css

```css
#viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

| Option               | Type    | Default | Description                                                                                         |
| -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------- |
| keystep              | number  | 120     | The amount in px you want to scroll when the up and down keys are pressed                           |
| firefoxMult          | number  | 25      | The speed multiplier used for firefox browser                                                       |
| touchMult            | number  | 2       | The speed multiplier used for touch screens                                                         |
| mouseMult            | number  | 1       | The speed multiplier used for the mouse wheel                                                       |
| ease                 | number  | 0.1     | The ease value of the scroll container. The speed that the container comes to a stop.               |
| disableKeyNavigation | boolean | false   | If you want to disable the ability to scroll with the keyboard eg. pageup and pagedown buttons ect. |

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

| Argument | Required | Type     | Description                                              |
| -------- | -------- | -------- | -------------------------------------------------------- |
| event    | true     | string   | The desired event type for your function to be fired on. |
| fn       | true     | function | The desired function to be run on the event.             |

#### Returns: undefined

<br>

### `off(event, fn)`

Removes the function passed the the `on()` method.

#### Args:

| Argument | Required | Type     | Description                                              |
| -------- | -------- | -------- | -------------------------------------------------------- |
| event    | true     | string   | The desired event type for your function to be fired on. |
| fn       | true     | function | The desired function to be run on the event.             |

#### Returns: undefined

<br>

### `fire(event)`

Fires event listeners for the specified event.

#### Args:

| Argument | Required | Type   | Description                                              |
| -------- | -------- | ------ | -------------------------------------------------------- |
| event    | true     | string | The desired event type for your function to be fired on. |

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

### `setOptions({Options})`

Sets controller options. It will combine the already set options with the options you pass in.

#### Args:

| Argument          | Required | Type   | Description                      |
| ----------------- | -------- | ------ | -------------------------------- |
| ControllerOptions | true     | Object | Parameters for virtual scrolling |

#### Options:

| Option               | Type    | Default | Description                                                                                         |
| -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------- |
| keystep              | number  | 120     | The amount in px you want to scroll when the up and down keys are pressed                           |
| firefoxMult          | number  | 25      | The speed multiplier used for firefox browser                                                       |
| touchMult            | number  | 2       | The speed multiplier used for touch screens                                                         |
| mouseMult            | number  | 1       | The speed multiplier used for the mouse wheel                                                       |
| ease                 | number  | 0.1     | The ease value of the scroll container. The speed that the container comes to a stop.               |
| disableKeyNavigation | boolean | false   | If you want to disable the ability to scroll with the keyboard eg. pageup and pagedown buttons ect. |

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
`setOptions({Options})`: sets the options. Will combine already set options.

<br>

### `createObserver({Options})`

Creates an observer for an html element. This will observe the elements place in the scroll relative to the viewport.

#### Args:

| Argument        | Required | Type   | Description                 |
| --------------- | -------- | ------ | --------------------------- |
| ObserverOptions | true     | Object | Parameters for the Observer |

#### Options:

| Option               | Required | Default          | Type        | Description                                                                                                                                                                                                                                                                                |
| -------------------- | -------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| element              | true     | null             | HTMLElement | Element to observe in the scroll                                                                                                                                                                                                                                                           |
| normalizeInitialView | false    | false            | boolean     | This normalizes the start and end values of the observer. This is handy for uniform parallax scrolling if your element starts in the initial viewport.                                                                                                                                     |
| offsetStart          | false    | 0                | number      | This sets an offset from the start of the observation.                                                                                                                                                                                                                                     |
| offsetEnd            | false    | 0                | number      | This sets an offset from the end of the observation.                                                                                                                                                                                                                                       |
| start                | false    | undefined        | number      | If you want to manually set the start of the observation this value will be used instead of calculating it.                                                                                                                                                                                |
| distance             | false    | undefined        | number      | If you want to manullly set the distance for your element to be observed for this will be used intead of calculating it.                                                                                                                                                                   |
| addClasses           | false    | false            | boolean     | If set to true the controller will set 'aboveViewport', 'belowViewport' and 'inViewport' classes to your element relative to where they are.                                                                                                                                               |
| callback             | false    | () => {}         | function    | This is a callback function that will be fired every time the scroll is updated. It will be called with an object that has `{ progress, inView }`. Progress is a 0 to 1 value of the elements progress through the viewport. And inView is whether or not your element is in the viewport. |
| tweenElement         | false    | observer element | HTMLElement | If you passed in tweenCss this is the element that it will be applied to. If you set this to something other than the observer element you can use your observer element as a trigger for tweening a different element.                                                                    |
| tweenCss             | false    | undefined        | TweenCss    | This is an object of javascript css values that you can set to tween your element based on its position in the viewport.                                                                                                                                                                   |

See <a href="#tweening">Tweening</a> for further details on how to set up a tween/parallax element.

#### Returns: Observer Methods

`init()`: Initializes the Observer. This will be called automatically during init.<br>
`kill()`: Kills the Observer removing it from the event list.<br>
`refresh()`: Recalculates the Observer and updates it.<br>
`update()`: Updates the Observer with the current scroll values.<br>
`setOptions({Options})`: sets the options. Will combine already set options.

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
`setOptions({Options})`: sets the options. Will combine already set options.

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

A little extra explaination on how to tween. The Observer allows you to set up css for tweening. If you set the `tweenCss` option then you can set up a `from` and `to` value in your css string that will use the observers progress through the viewport as a basis to tween your element.

#### Options:

| Option       | Required | Default              | Type        | Description                                                                                                                                                                         |
| ------------ | -------- | -------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tweenElement | false    | the observer element | HTMLElement | The element that you want to tween. If not specified it will default to the element passed in as the observer                                                                       |
| tweenCss     | false    | undefined            | object      | This is an object of valid javascript css values. The key will be a javascript css key and the value can only be specified as a string. No numbers allowed, explaination why below. |

To specify a tween you start by setting your `tweenCss` value with javascript css object notation eg. `{ marginTop: '20px' }`. To set the `from` and `to` values place them in curly braces seperated by a comma like so: `{ marginTop: '{0, 300}px'}`. So in this example you would tween the css `margin-top` from 0px to 300px while the element is in the viewport. You will have to account for any vertical movement by adding an offset to the beginning or end of the observation. Below we will do a full example of you setting up a tween to translateY 500px.

```js
const element = document.getElementById('tween')
const tween = ctl.createObserver({
  element,
  offsetEnd: -500, // Replace the 500px movement at the end of the observation
  tweenCss: {
    transform: 'translateY({0, 500}px)',
  },
})
```

There is no limit to what css properties you can tween or how many values in a css string you can specify. As long as you place your values inside of curly braces and seperate them with commas you can tween `from` and `to` whatever your heart desires. So in one css string you can specify as many `from` and `to` values as you like. For example if you have a css matrix you can do `matrix(1, 0, 0, 1, {0, 500}, {300, 500})`. This will translate the element from 0 to 500 on the x axis and 300 to 500 on the y axis. It is noteworthy to state that the `from` value set will override any default css values set.

<br>

<b>Note: just remember when using things like widths, margins, and things that can affect the page flow you can create performance and page breaking issues. Performance wise it is best to stick to css transform.</b>

<br>

## License

Distributed under the MIT License. See `LICENSE` for more information.
