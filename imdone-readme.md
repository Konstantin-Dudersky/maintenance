---
title: Use a single file for all new cards
shortDescription: Imdone puts new cards in one file.
tags: [getting-started]
description: |
  This configuration uses the **Single File** journal type.  Every card created in imdone will be put in a single file.
props:
  kebabVertical: <svg data-v-5bf4cb66="" version="1.1" width="3" height="16" viewBox="0 0 3 16" aria-hidden="true" class="octicon octicon-kebab-vertical"><path data-v-5bf4cb66="" fill-rule="evenodd" d="M0 2.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM1.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path></svg>
  clone: <svg width="20px" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="clone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-clone fa-w-16"><path fill="currentColor" d="M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z" class=""></path></svg>
---

## [Get started with imdone](#TODO:0)
### Click on the green `getting-started` tag to filter your board for cards with the `getting-started` tag.
1. Start here, then work through the cards in TODO
2. Drag this card to DOING
3. Open to this card in context by hovering over the &nbsp;{{kebabVertical}}&nbsp; in the top right corner of this card and clicking the ":link: Open file".  Notice the list name has changed to DOING.
4. Now drag this card to DONE and click the file link again.
<!-- due:2022-06-05T09:50:07.182Z -->

## [Imdone supports task lists in markdown files.](#TODO:1)
1. Drag this card to DOING.
2. Click the box below.
    - [ ] check me
    - Click the file link again, and notice the x in the box
3. Click the expand icon below to see what's next. :point_down:
4. Drag this card to DONE and drag the next card in TODO to DOING.
    - I think you get the idea. :)
<!-- due:2022-06-05T09:50:07.182Z -->

## [Configure your editor](#TODO:1.5)
- [ ] Click the &nbsp;{{kebabVertical}}&nbsp; in the upper left corner and click _Board Settings_
- [ ] Select your favorite editor or enter a command that will open it
- [ ] Learn more about opening editors [here](https://imdone.io/docs/#/editors)
<!-- due:2022-06-05T09:50:07.182Z -->

## [Open the keyboard command map](#TODO:2)
Press `?` on the keyboard to see the keyboard command map.
<!-- due:2022-06-05T09:50:07.182Z -->


## [Add and Edit Cards](#TODO:3)
- [ ] Quickly add a card by clicking "+ **Add a card**" at the bottom of this list.
  - You can change the file your cards get added to in **board settings :arrow_right: Single journal file**
- [ ] Quickly edit this card by hovering over it and clicking the pencil.
<!-- due:2022-06-05T09:55:07.181Z -->

## [Add emoji to your cards using the GFM emoji](#TODO:4)
:rocket: <span style="font-size: 1.5em;">:rocket:</span> <span style="font-size: 2em;">:rocket:</span> :crescent_moon: 
<!-- due:2022-06-05T09:55:07.181Z -->

## [Copy filters to open a project in imdone with the filter applied.](#TODO:4.5)
1. Click this [link](imdone://{{source.repoId}}/{{source.path}}?line={{line}}&list={{list}}&filter=allTags%20%3D%20%22getting-started%22)
2. Click the {{clone}} icon to the right of the filter input.
3. Paste the link in a browser or add it to a card in **NOTE**
<!-- due:2022-06-05T09:55:07.181Z -->

## [Copy code snippets](#TODO:5)
Add code blocks to your cards and click the **Copy Code** link to copy to your clipboard.
```json
{
  "testing": "imdone"
}
```
<!-- due:2022-06-05T10:05:07.180Z -->

## [Ignoring files](#TODO:6)
To ignore files add an entry in [`.imdoneignore`](.imdoneignore)
`.imdoneignore` follows the same syntax as `.gitignore`
[Git - gitignore Documentation](https://git-scm.com/docs/gitignore)
<!-- due:2022-06-05T10:05:07.180Z -->

## [Read the documentation](#TODO:8)
- [imdone.io/docs](https://imdone.io/docs).
- [ ] Clear the filter field to see all the TODO comments in your code.  If you have any. :)
- You can get to the documentation at any time using the help menu
<!-- due:2022-06-06T09:45:07.179Z -->

<!-- 
## [Put your TODOs in block comments to keep them out of generated content.](#TODO:9)
[//]: # ( due:2022-06-12T09:45:07.095Z )
-->

## [If you have any questions, feel free to reach out!](#TODO:10)
- [Join the imdone discord](https://discord.gg/b5UQ8HD2hy)
- [Jesse on drift](https://drift.me/jesse36)
<!--  due:2022-06-12T09:45:07.067Z -->


## [Activity](#NOTE:0)
| Status                 | #                                           | <span style="font-size: 1.5em;">:chart:</span> |
|------------------------|---------------------------------------------|------------------------------------------------|
| **What's Due?**        | <!--[{{totals["What's Due?"]}}]-->          | <!--[ {{dueEmoji}} ]-->                        |
| **Recently Completed** | <!--[ {{totals["Recently Completed"]}} ]--> | <!--[ {{recentEmoji}} ]-->                     |
| **WIP**                | <!--[ {{totals["DOING"]}} ]-->              | <!--[ {{wipEmoji}} ]-->                        |
<!-- expand:1 refresh:1 -->
