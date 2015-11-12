#JS
Quickest way to create large empty array in js:

Array.apply(null, {length});

#Angular
Most people stop learning after binding, controllers and router. Don't do that!

Can move logic from controller to filter, angular will detect change and update.

Digest loop/cycle

DOM event, http call, timer. You must use the angular versions or angular does
not know about the change.


so don't use setInterval use the angular interval service! Don't work behind angulars back!


#Dependancies

['$scope', '$interval', function($scope, $interval) {}]

The string names much match the angular ones, but the function parameters don't have too.

This is to get around js minimizers.

We could then do:
Dependancies

['$scope', '$interval', function($s, $i) {}]

This is then based on position.

Generally every one uses the standard names.

#Directives

name in camelCase and tag name hypenated nu-game-of-life

Convention is short prefix i.e. 'nu-'


Service === Singleton by default


.service
.directives
