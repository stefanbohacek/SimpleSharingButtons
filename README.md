# Simple Sharing Buttons

Create [light-weight](http://www.ericmobley.net/social-media-share-buttons-impact-on-performance/), mobile-friendly sharing buttons for Facebook, Twitter, Google+ and other social media sites.

[Speed up your website or web app](http://zurb.com/article/883/small-painful-buttons-why-social-media-bu), avoid downloading [unnecessary JavaScript files](http://www.benmarshall.me/sharethis-slowing-down-site/) and [keep your user's activity private](https://en.wikipedia.org/wiki/Facebook_like_button#Privacy_issues). Choose from several styles, including [Font Awesome](http://fontawesome.io/) -- completely free.

See updates and version history at [blog.simplesharingbuttons.com](http://blog.simplesharingbuttons.com/).

## Notes

This is an old project I started three years ago and there's quite a few things I wanted to clean up before open-sourcing it. Not having enough time to do that, I decided to put the source code on GitHub as it is.

Also note that Facebook [no longer accepts custom parameters](https://developers.facebook.com/bugs/357750474364812), you need to use [Open Graph](http://ogp.me/) instead.

The generator doesn't aim to support every possible network, as many icon sets are missing certain icons. 

Check out [my blog](https://fourtonfish.com/blog/2013-09-simple-sharing-buttons-free/#other) to see how to implement buttons for some of the networks that are not included.

## Installation

```
npm install
gulp
```

The site will be accessible at `http://localhost:3000/`.

## Sites using SSB

- [thesocietypages.org](https://thesocietypages.org/) (on article pages)
- [explorableexplanations.com](http://explorableexplanations.com/)
- [earthprimer.com](http://www.earthprimer.com/)

And of course:

- [simplesharingbuttons.com](https://simplesharingbuttons.com/)
