# The better parts

[![NPM version][1]][2]
[![Davis Dependency status][3]][4]

Javascript is a terribly designed language, fortunately it has a decent subset. eslint-plugin-better is a set of rules to help you avoid some of the bad parts and write better code.

Inspired by [this talk](https://www.youtube.com/watch?v=PSGEjv3Tqo0).

## Rules

| Name  | Description | Default Configuration |
| ------------- | ------------- | ------------- |
| no-classes | Forbids use of classes. | 'no-classes': 0 |
| no-deletes | Forbids use of delete. | 'no-deletes': 2 |
| no-exceptions | Forbids throwing and catching errors. | 'no-exceptions': 2 |
| no-exports | Forbids use of export keyword.  | 'no-exports': 0 |
| no-fors | Forbids use for, for-in, for of statements. | 'no-fors': 2 |
| no-function-expressions | Forbids use function expressions. | 'no-function-expressions': 0 |
| no-ifs | Forbids use of if statements. | 'no-ifs': 2 |
| no-imports | Forbids use of import keyword. | 'no-imports': 0 |
| no-instanceofs | Forbids instanceof operator. | 'no-instanceofs': 2 |
| no-new | Forbids use of new. |'no-new': 2, |
| no-nulls | Forbids use of null. | 'no-nulls': 2 |
| no-reassigns | Forbids reassigning variables. | 'no-reassigns': 2 |
| no-switches | Forbids use of switch statement. | 'no-switches': 2 |
| no-this | Forbids use of this. | 'no-this': 2 |
| no-typeof | Forbids typeof operator. | 'no-typeofs': 2 |
| no-undefined | Forbids use of undefined. | 'no-undefined': 0 |
| no-variable-declaration | Forbids declaring variables. | 'no-variable-declaration': 0 |
| no-whiles | Forbids use while, do-while statements. | 'no-whiles': 2 |
| no-withs | Forbids use of with statement. | 'no-withs': 2 |
| explicit-return | Every function should have a return statement. | 'explicit-return': 2 |


[1]: https://badge.fury.io/js/eslint-plugin-better.svg
[2]: https://badge.fury.io/js/eslint-plugin-better
[3]: https://david-dm.org/idmitriev/eslint-plugin-better.svg
[4]: https://david-dm.org/idmitriev/eslint-plugin-better