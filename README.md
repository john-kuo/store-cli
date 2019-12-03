# Summary

store-cli allows user to add, list, get and remove key/value pairs using CLI.

### Steps to run the CLI

1. `npm install`
2. `npm link`

### Store API

`$ store add mykey myvalue`

`$ store list`

`$ store get mykey`

`$ store remove mykey`

### Assumptions

1. a key needs to be unique

### Improvements

1. enforce error checking for parameters e.g. store add , missing key and value
2. help menu
3. better listing
