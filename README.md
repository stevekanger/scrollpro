# ScrollPro

Smooth momentum scrolling library

<small>Disclaimer: As of now nested instances has partial support. Nested scrollbars may not work as intended.</small>

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

There will be a couple of elements that will be added to your scrollbar element `.track` and `.bar` but there is no default css added to the scrollbar element you provide and no colors added to the `.bar`. You will need to style it yourself so you can customize it to your liking.

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

Syntax: `new Controller({Options})`

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

<br>

### getScroll

Syntax: `controller.getScroll()`

Gets the current scroll values.

#### Args: none

#### Returns: Scroll

| value     | type   | Description                                                                                                              |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| scrollX   | number | The current scroll value of the x axis.                                                                                  |
| scrollY   | number | The current scroll value of the y axis.                                                                                  |
| deltaX    | number | The scrollX value will animate until it reaches this value.                                                              |
| deltaY    | number | The scrollY value will animate until it reaches this value.                                                              |
| limitX    | number | This is the limit the scrollX can get to. If you don't have content set or manually set a limit this will be `Infinity`. |
| limitY    | number | This is the limit the scrollY can get to. If you don't have content set or manually set a limit this will be `Infinity`. |
| progressX | number | This is the progress the scrollX has made relative to the limitX from 0 to 1.                                            |
| progressY | number | This is the progress the scrollY has made relative to the limitY from 0 to 1                                             |

<br>

### setOptions

Syntax: `controller.setOptions({Options})`

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

### on

Syntax: `controller.on(event, fn)`

Allows you to set event listeners for the controller events stated above.

#### Args:

| Argument | Required | Type     | Description                                              |
| -------- | -------- | -------- | -------------------------------------------------------- |
| event    | true     | string   | The desired event type for your function to be fired on. |
| fn       | true     | function | The desired function to be run on the event.             |

#### Returns: undefined

<br>

### off

Syntax: `controller.off(event, fn)`

Removes the function passed the the `on()` method.

#### Args:

| Argument | Required | Type     | Description                                              |
| -------- | -------- | -------- | -------------------------------------------------------- |
| event    | true     | string   | The desired event type for your function to be fired on. |
| fn       | true     | function | The desired function to be run on the event.             |

#### Returns: undefined

<br>

### fire

Syntax: `controller.fire(event)`

Fires event listeners for the specified event.

#### Args:

| Argument | Required | Type   | Description                                              |
| -------- | -------- | ------ | -------------------------------------------------------- |
| event    | true     | string | The desired event type for your function to be fired on. |

#### Returns: undefined

<br>

### kill

Syntax: `controller.kill()`

Kills the controller. Removes all event listeners from the viewport and removes all scroll listeners from the controller.

#### Args: none.

#### Returns: undefined

<br>

### refresh

Syntax: `controller.refresh()`

Recalculates the controller and all items in the controller. This will fire automatically when the window resizes and when the documents fonts are loaded.

#### Args: none

#### Returns: undefined

<br>

### update

Syntax: `controller.update()`

Updates the controller items with the current scroll values.

#### Args: none

#### Returns: undefined

<br>

### createViewport

Syntax: `controller.createViewort({Options})`

Creates the viewport. This initializes the controller and sets the required event listeners for virtualized scrolling.

#### Args:

| Argument        | Required | Type   | Description                 |
| --------------- | -------- | ------ | --------------------------- |
| ViewportOptions | false    | Object | Parameters for the viewport |

#### Options:

| Option      | Required | Default          | Type                  | Description                                                                                                |
| ----------- | -------- | ---------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| element     | false    | window           | HTMLElement or window | Optional element to use as the viewport for the scroll controller                                          |
| eventTarget | false    | viewport element | HTMLElement or window | This is if you want the virtual scrolling event listeners to listen for something other than the viewport. |

#### Returns:

| value     | type     | Description                             |
| --------- | -------- | --------------------------------------- |
| getBounds | function | returns the bounds of the viewport.     |
| kill      | function | kills the viewport.                     |
| refresh   | function | Recalculates the bounds of the viewport |

<br>

### createContent

Syntax: `controller.createContent({Options})`

Creates the content. This is the div that will be translated up and down when virtual scrolling happens. It will also serve as the scrolling limit.

#### Args:

| Argument       | Required | Type   | Description                |
| -------------- | -------- | ------ | -------------------------- |
| ContentOptions | true     | Object | Parameters for the content |

#### Options:

| Option  | Required | Default | Type        | Description                            |
| ------- | -------- | ------- | ----------- | -------------------------------------- |
| element | true     | null    | HTMLElement | Element to use as the content wrapper. |

#### Returns:

| value   | type     | Description                                                             |
| ------- | -------- | ----------------------------------------------------------------------- |
| init    | function | Initializes the content. This will be automatically called during init. |
| kill    | function | Kills the content and removes it from event list.                       |
| refresh | function | Recalculates the content and sets new scroll limits.                    |
| update  | function | Updates the content position with the current scroll values.            |

<br>

### createScrollbar

Syntax: `controller.createScrollbar({Options})`

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

#### Returns:

| value      | type     | Description                                                                        |
| ---------- | -------- | ---------------------------------------------------------------------------------- |
| setOptions | function | Sets the options. Will combine already set options.                                |
| init       | function | Initializes the scrollbar. This will automatically be called during intialization. |
| kill       | function | Kills the scrollbar removing it from the event list.                               |
| refresh    | function | Recalculates the scrollbar and updates it.                                         |
| update     | function | Updates the scrollbar thumb with the current scroll values.                        |

<br>

### createObserver

Syntax: `contorller.createObserver({Options})`

Creates an observer for an html element. This will observe the elements place in the scroll relative to the viewport. <b>Avoid placing observers inside of sticky elements or other observers.</b>

#### Args:

| Argument        | Required | Type   | Description                 |
| --------------- | -------- | ------ | --------------------------- |
| ObserverOptions | true     | Object | Parameters for the Observer |

#### Options:

| Option               | Required | Default   | Type        | Description                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | -------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| element              | true     | null      | HTMLElement | Element to observe in the scroll                                                                                                                                                                                                                                                                                                                                                     |
| normalizeInitialView | false    | false     | boolean     | This normalizes the start and end values of the observer. This is handy for uniform parallax scrolling if your element starts in the initial viewport.                                                                                                                                                                                                                               |
| offsetStart          | false    | 0         | number      | This sets an offset from the start of the observation.                                                                                                                                                                                                                                                                                                                               |
| offsetEnd            | false    | 0         | number      | This sets an offset from the end of the observation.                                                                                                                                                                                                                                                                                                                                 |
| start                | false    | undefined | number      | If you want to manually set the start of the observation this value will be used instead of calculating it.                                                                                                                                                                                                                                                                          |
| distance             | false    | undefined | number      | If you want to manullly set the distance for your element to be observed for this will be used intead of calculating it.                                                                                                                                                                                                                                                             |
| callback             | false    | () => {}  | function    | This is a callback function that will be fired every time the scroll is updated and is also fired when the observer is constructed to ensure the element is in it's original start position. It is called with an object that contains `{element, progress, applyClasses, applyTween}` see <a href="#observer-callback-event">Observer Callback Event</a> for further documentation. |

<b>You have the ability to set up a tween on scroll with the observer. See <a href="#tweening">Tweening</a> for further details on how to set up a tween element.</b>

#### Returns:

| value      | type     | Description                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------- |
| setOptions | function | Sets the options. Will combine already set options.                               |
| init       | function | Initializes the observer. This will automatically be called during intialization. |
| kill       | function | Kills the observer removing it from the event list.                               |
| refresh    | function | Recalculates the observer and updates it.                                         |
| update     | function | Updates the observer with the current scroll values.                              |

<br>

### createSticky

Syntax: `contorller.createSticky({Options})`

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

#### Returns:

| value      | type     | Description                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------- |
| setOptions | function | Sets the options. Will combine already set options.                                     |
| init       | function | Initializes the sticky element. This will automatically be called during intialization. |
| kill       | function | Kills the sticky element removing it from the event list.                               |
| refresh    | function | Recalculates the sticky element and updates it.                                         |
| update     | function | Updates the sticky element with the current scroll values.                              |

<br>

### scrollTo

Syntax: `controller.scrollTo({Options})`

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

### setLimit

Syntax: `controller.setLimit({Options})`

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

A little extra explaination on how to tween. The observer callback is called with an object that contains the following `{element, progress, applyClasses, applyTween}`. With these have what we need to set up a tween. To do so you can call the `applyTween` function with your element, the progress, and an object with valid javascript css keys and string values. The values must be in string format and in the string you can define `from` and `to` values for tweening inside curly braces separated by a comma. So something like `{ transform: 'translateY({0, 200}px)' }`. As you can see in curly braces is `{0, 500}`. This will translateY from 0 to 500px. There is no limit to how many times in a string you can define curly braces or what css properties you want to tween as long as you place a `from` and `to` value in curly braces. For example if you have a css matrix you can do `matrix(1, 0, 0, 1, {0, 500}, {300, 500})`. This will translate the element from 0 to 500 on the x axis and 300 to 500 on the y axis. It is noteworthy to state that the `from` value set will override any default css values set. Also if you are going to translate up or down then you may want to replace the elements distance traveled in the offset so the element keeps translating out of frame.

### Creating a tween

To create a tween we first need to create an observer. Then in the callback we can grab the applyTween function to apply our tween to whatever element we would like to apply it to. So in the example below we will just use the observer element as the tween element but you can tween whatever element you want.

```js
const observerElement = document.getElementById('tween')
const observer = ctl.createObserver({
  element: observerElement,
  offsetEnd: -500, // Replace the 500px movement at the end of the observation.
  callback: ({element, progress, applyTween}) => {
    applyTween(element, progress, {
      width: '{200, 500}px'
      transform: 'translateY({0, 500}px) rotate({0, 90}deg)'
    })
  }
})
```

So in the above example we have set up our tween to translate our observed element from 0 to 500px, rotate from 0 to 90deg, and increase the width from 200 to 500 px. We alse added an offsetEnd of -500 so our tween will translate all the way through the viewport. You can also apply a tween to a different element using your observer as a trigger. There are a lot of possibilities here.

<br>

### Adding classes

You can apply classes based on your elements position to the viewport. The applyClasses function will apply the following classes `aboveViewport`, `belowViewport`, and `inViewport` when the observer hits the respective place relative to the viewport.

```js
const observerElement = document.getElementById('tween')
const observer = ctl.createObserver({
  element: observerElement,
  callback: ({ element, progress, applyClasses }) => {
    applyClasses(element, progress)
  },
})
```

### Observer Callback Event

| Value       | Type        | Description                                                                     |
| ----------- | ----------- | ------------------------------------------------------------------------------- |
| element     | HTMLElement | This is the element being observed.                                             |
| progress    | number      | This is the current progress of the element through the viewport from 0 to 1.   |
| applyClases | function    | A function that applies classes to an element based on progress. Defined below. |
| applyTween  | function    | A function to apply a tween to an element based on progress. Defined below      |

<br>

### applyTween

Syntax: `applyTween(element, progress, css)`

#### Args

| Argument | Required | Type        | Description                                                                                                                                                 |
| -------- | -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element  | true     | HTMLElement | The element you want your tween to be applied to.                                                                                                           |
| progress | true     | number      | The current progress of your tween animation from 0 to 1.                                                                                                   |
| css      | true     | object      | This is an object of javascript valid css properties and string values. See <a href="#tweening">Tweening</a> for more details on how to set up your tweens. |

#### Returns: undefined

<br>

### applyClasses

Syntax: `applyClasses(element, progress)`

#### Args

| Argument | Required | Type        | Description                                         |
| -------- | -------- | ----------- | --------------------------------------------------- |
| element  | true     | HTMLElement | The element you want your classes to be applied to. |
| progress | true     | number      | The current progress of your element from 0 to 1.   |

#### Returns: undefined

<br>

<br>

<b>Note: just remember when using things like widths, margins, and things that can affect the page flow you can create performance and page breaking issues. Performance wise it is best to stick to css transform.</b>

<br>

## License

Distributed under the MIT License. See `LICENSE` for more information.
