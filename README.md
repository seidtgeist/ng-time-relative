# ng-time-relative

`relative` is an angular directive which parses its element's
text-content or `datetime` attribute and replaces the contents with a
time relative to now, e.g., "1 day ago" instead of a fixed date or
"in 87 years" instead of "2100".

It also sets the element's `title` attribute to a nicely formatted
time localized to the browser's timezone so people can hover to get
the original datetime.

To learn about other options see below.

## Download

* Latest development: [ng-time-relative.js](https://raw.github.com/evilhackerdude/ng-time-relative/v0.3.0/dist/ng-time-relative.js)
* Latest production: [ng-time-relative.min.js](https://raw.github.com/evilhackerdude/ng-time-relative/v0.3.0/dist/ng-time-relative.min.js)

If you've understood programming you can also:

``` js
npm install ng-time-relative
```

## Usage

Easy way:

``` html
<script src="ng-time-relative.js"></script>
<script>
// Add timeRelative as dependency to your module definition
var app = angular.module('YourApp', ['timeRelative']);
</script>
```

And add `timeRelative` to your module's dependencies to the `relative`
directive.

The module is also exposed as a CommonJS module and its dependencies
can be manually injected.

This library depends on the excellent
[Moment.js](https://github.com/timrwood/moment/) ~2.0.0 for date
parsing and formatting. `moment` can be provided as a constant
like this:

``` js
var app = angular.module('app', []);
app.constant('moment', moment);
ngTimeRelative(app);
```

This internally more or less does `app.directive('relative', ...)`.

## DOM output Examples

``` html
Party like it's <time relative>1999</time>
-> Party like it's 14 years ago

<time class="relative" without-suffix>April 5, 2063</time> until warp speed
-> 50 years until warp speed

The UNIX Epoch started <time relative datetime="1970-01-01"></time>
-> The UNIX Epoch started 43 years ago

Torment: Tides of Numenera was funded
<time class="relative" datetime="2013-04-06T00:00:00Z">a while ago</time>
-> Torment: Tides of Numenera was funded 2 days ago
```

## Options

**Restrictions:** (AC) The directive can be used as a class or attribute.

**Input:** Date is parsed from the element's text content or
  `datetime` attribute.

**Attributes**

- `datetime="date"`: Use `date` to calculate time difference. Ignores
  element text-content.

- `to="then"`: Use `then` instead of now to calculate time difference.
  Defaults to current time.

- `without-suffix`: Don't display a suffix, e.g., "15 years" instead
  of "15 years ago" or "in 15 years".

## Performance notes

Every directive instance sets up a timeout. The timeouts are however
set up in a way that they fire only when it makes sense, as in, they
fire when the text rendered by Moment.js would actually change, not
before and not after.
