# Readability Checker CLI

A node.js CLI for testing the readability of content using the **Flesch Reading Ease** scale. Can parse local HTML files or URLs.

Returns

* **Flesch Reading Ease** score (out of 100; higher means more readable)
* Notes about the score
* A list of the longer words (more than 4 syllables)
* A list of the longer sentences (more than 35 words)

## Install

```
npm install readability-checker -g
```

## Usage

Just supply one argument: the resource to test

```
readability http://www.heydonworks.com
```

## Notes

Thanks to [wooorm](https://github.com/wooorm) whose [syllable](https://github.com/wooorm/syllable) was needed for this to work.

The sentence boundaries in the long sentences output are not always accurate, but mostly single sentences are printed.
