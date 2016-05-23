"use strict"

const PostHTML = require("posthtml");
const html =
      `
      <em class="col-sm-push-7">Hello world</em>
      <p class="col-lg-offset-11 super col-sm-push-7 superPuper">bootstrap class</p>
      <p class="col-lg-offset-11 col-sm-push-7 superPuper">bootstrap class</p>
      <p class="js-smth js-smth js-smth blalbalba col-sm-push-1">sdfsf</p>
      `
const bootstrapCls = /(?:col)-(?:lg|xs|sm|md)-(?:(?:\d{1,2})|(?:(?:push|pull|offset)-\d{1,2}))/ig
const bootstrapJSCls = /js-/ig

const plugin = tree => tree
  .match({ attrs: { class: true }}, node => {
    node.attrs.class = node.attrs.class.replace(bootstrapCls, '').trim()
    node.attrs.class = node.attrs.class.replace(bootstrapJSCls, 'data-')
    if (node.attrs.class.length === 0) {
      delete node.attrs.class
    }
    return node
  })



PostHTML([plugin])
  .process(html)
  .then(result =>
  {
    console.log(result.html)
  })
