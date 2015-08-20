![alt text](http://fc01.deviantart.net/fs71/f/2011/279/b/2/pixel_art_creator_by_kaikidan-d4c1amh.png)

Create your own Pixel Art Maker, which lets you click on a grid to "paint" pixel art. The interface is completely up to you, but it could look something like this:

It boils down to this: A user selects a color and clicks on pixels to paint them with the selected color.

Here's the order of steps that I would implement:

Get 10 or so small divs on the screen
Add an event listener to each so that when I click on a pixel it turns red
Add a color palette div with 2 colors(red and purple)which allows the user to set the current "paintbrush" color instead of it always being set to red
Add the rest of the standard rainbow colors to the color palette
Add enough divs to fill up the entire screen
Bonus Challenges:

Add a color picker which allows the user to select any color. Look into the HTML5 color input.
Add the ability to click and drag to paint multiple pixels at once
Add a paintbucket tool which allows a user to drag a box across the screen and paint all pixels that fall inside that box
In
