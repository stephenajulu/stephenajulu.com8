---
categories:
- life
date: 2021-02-08 06:20:00+00:00
excerpt: ''
image: images/blog.jpg
image_alt: ''
layout: post
seo:
  description: ''
  extra:
  - keyName: property
    name: og:type
    value: article
  - keyName: property
    name: og:title
    value: How to Build Your First Blog Part 2
  - keyName: property
    name: og:description
    value: ''
  - keyName: property
    name: og:image
    relativeUrl: true
    value: images/blog.jpg
  - name: twitter:card
    value: summary_large_image
  - name: twitter:title
    value: How to Build Your First Blog Part 2
  - name: twitter:description
    value: ''
  - name: twitter:image
    relativeUrl: true
    value: images/blog.jpg
  title: How to Build Your First Blog Part 2
subtitle: ''
tags:
- blogging
title: How to Build Your First Blog Part 2
---
Recap: Today I showed you [how to buy your first share](/blog/how-to-buy-your-first-share/) and simple free ways to [build your first blog](/blog/how-to-build-your-first-blog/).

Now I'll show you the paid and slightly more technical ways to build your first blog.

NOTE: Below are ways that require a little technical knowledge, if you don't have that, kindly go to the [first post of the series](/blog/how-to-build-your-first-blog/).

## WordPress Org Way

1. Research and find a good hosting platform with a cpanel and wordpress quick install(softaculous or similar).
2. Buy a domain name and hosting.
3. Go to cpanel and click Wordpress or Softaculous then Wordpress. Let it install.
4. Once ready visit your wordpress site's admin panel and start editing or posting right away. You may be required to add ssl yourself but your host will provide you with details.

This guide isn't in-depth so visit the [official guide](https://wordpress.org/support/article/how-to-install-wordpress/).

## Ghost Way

Tip: Ghost is an awesome platform for bloggers.

Go to the official installation guide: [Ghost Install Guide](https://ghost.org/docs/install/)

## The JAMstack Way

This blog was built the JAMstack way, no servers, just built using hugo and rendered as html.

To build such,

1. You must first research your framework of choice, there's Hugo(the best in my opinion), Gatsby(fast page load), Gridsome(same as gatsby), Hexo, Jekyll(slow build times, excellent theme list) and Eleventy(mainly technical)
2. Once the decision is made, i'll proceed with hugo but the steps are pretty much the same. Find a theme. For example [hugo themes](https://themes.gohugo.io).
3. Fork, clone and start editing(i cut out how to clone because i prefer it being in another article for now do your research, you don't even need to clone to your machine, just work from the fork.
4. Editing should be simple, eg for Hugo, go into the config.toml or .yaml file and change the variables.
5. You can now go to content then posts, copy the structure of example posts and start writing.
6. Alternatively find a theme with a headless cms and start working from there
7. Alternatively again try [StackBit](http://stackbit.com/), it's free and you can build a great blog there.

That's it for today. To learn more about the JAMstack way, go check out [this](/blog/building-a-beautiful-progressive-jamstack-blog-part-1-day-1-to-3/), [this ](/blog/building-a-beautiful-progressive-jamstack-blog-part-2-day-4-to-7/)and [this]() where i show you exactly how this blog was built.
