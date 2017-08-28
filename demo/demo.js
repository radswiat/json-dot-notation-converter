// Instruct Converter on how the json file should be rewritten
// example:
// ['items[].ID', 'items[]._ID'] - this will rename ID in items to _ID
var instructions = [
  [
    ['*.PACKAGES', '*.items']
  ],
  [
    ['*.items[].EXPORT_PACKAGE', '*.items[]']
  ],
  [
    ['*.items[].drawer', '*.items[].price', ['copy']]
  ]
];