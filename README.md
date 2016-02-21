# Readability Checker CLI

A node.js CLI for testing the readability of content using the **Flesch Reading Ease** scale. Can parse local HTML files or URLs.

Returns

* **Flesch Reading Ease** score (out of 100; higher means more readable)
* Notes about the score
* A list of the longer words (more than three syllables)

## Install

```
npm install readability-checker -g
```

## Usage

Just supply one argument: the resource to test

```
readability http://www.heydonworks.com
```
