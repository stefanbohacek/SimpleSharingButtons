SimpleSharingButtons
====================
[Simplesharingbuttons.com](http://simplesharingbuttons.com/) lets you create **simple HTML sharing buttons** to share your web content on **Facebook, Twitter, Google+** and other social networks.

**No JavaScript**, [100% privacy for your users](http://en.wikipedia.org/wiki/Like_button#Privacy_issues), you can choose from **several styles** and it's **completely free**.

This repository hosts the basic code for the HTML sharing buttons for all supported social networks:
* Facebook
* Twitter
* Google+
* Tumblr
* Pinterest
* Pocket
* Reddit
* LinkedIn

The URL of the website you want to share and other parameters, such as description, need to be encoded. [Here](http://meyerweb.com/eric/tools/dencoder) is a simple URL encoding tool -- or you can just use the [generator app](http://simplesharingbuttons.com/).



To use the image-based sharing buttons, you will need to include this CSS:

    .share-buttons{
	    list-style: none;
    }

    .share-buttons li{
    	display: inline;
    }

To use the Font Awesome icon font you can either download it from the [official website](http://fontawesome.io/) or you can include this code inside your *head* element

    <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css" rel="stylesheet">


You can read more about the generator [on my blog](http://blog.fourtonfish.com/tagged/simple-sharing-buttons).


Please also see included *LICENSE.txt* and *License for Flat Web Icon Set.rtf*.