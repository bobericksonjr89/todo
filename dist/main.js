(()=>{"use strict";var e={d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function n(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function a(e){n(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(e,r){n(2,arguments);var i=a(e),o=t(r);return isNaN(o)?new Date(NaN):o?(i.setDate(i.getDate()+o),i):i}function i(e,r){n(2,arguments);var i=a(e),o=t(r);if(isNaN(o))return new Date(NaN);if(!o)return i;var s=i.getDate(),c=new Date(i.getTime());c.setMonth(i.getMonth()+o+1,0);var u=c.getDate();return s>=u?c:(i.setFullYear(c.getFullYear(),c.getMonth(),s),i)}function o(e){n(1,arguments);var t=a(e);return t.setHours(0,0,0,0),t}function s(e,t){n(2,arguments);var a=o(e),r=o(t);return a.getTime()===r.getTime()}function c(e,a){n(2,arguments);var i=t(a);return r(e,-i)}function u(e){n(1,arguments);var t=a(e);return!isNaN(t)}e.d({},{Z:()=>Ce});var d={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function l(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var m,f={date:l({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:l({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:l({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},h={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function g(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=r.width?String(r.width):i;a=e.formattingValues[o]||e.formattingValues[i]}else{var s=e.defaultWidth,c=r.width?String(r.width):e.defaultWidth;a=e.values[c]||e.values[s]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function p(e){return function(t,n){var a=String(t),r=n||{},i=r.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],s=a.match(o);if(!s)return null;var c,u=s[0],d=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return c="[object Array]"===Object.prototype.toString.call(d)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(u))return n}(d):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(u))return n}(d),c=e.valueCallback?e.valueCallback(c):c,{value:c=r.valueCallback?r.valueCallback(c):c,rest:a.slice(u.length)}}}const w={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof d[e]?d[e]:1===t?d[e].one:d[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:f,formatRelative:function(e,t,n,a){return h[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:g({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:g({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:g({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:g({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:g({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(m={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(m.matchPattern);if(!r)return null;var i=r[0],o=n.match(m.parsePattern);if(!o)return null;var s=m.valueCallback?m.valueCallback(o[0]):o[0];return{value:s=a.valueCallback?a.valueCallback(s):s,rest:n.slice(i.length)}}),era:p({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:p({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:p({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:p({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:p({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function v(e,r){n(2,arguments);var i=a(e).getTime(),o=t(r);return new Date(i+o)}function y(e,a){n(2,arguments);var r=t(a);return v(e,-r)}function b(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}const T=function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return b("yy"===t?a%100:a,t.length)},k=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):b(n+1,2)},D=function(e,t){return b(e.getUTCDate(),t.length)},C=function(e,t){return b(e.getUTCHours()%12||12,t.length)},E=function(e,t){return b(e.getUTCHours(),t.length)},M=function(e,t){return b(e.getUTCMinutes(),t.length)},x=function(e,t){return b(e.getUTCSeconds(),t.length)},_=function(e,t){var n=t.length,a=e.getUTCMilliseconds();return b(Math.floor(a*Math.pow(10,n-3)),t.length)};var P=864e5;function L(e){n(1,arguments);var t=1,r=a(e),i=r.getUTCDay(),o=(i<t?7:0)+i-t;return r.setUTCDate(r.getUTCDate()-o),r.setUTCHours(0,0,0,0),r}function S(e){n(1,arguments);var t=a(e),r=t.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(r+1,0,4),i.setUTCHours(0,0,0,0);var o=L(i),s=new Date(0);s.setUTCFullYear(r,0,4),s.setUTCHours(0,0,0,0);var c=L(s);return t.getTime()>=o.getTime()?r+1:t.getTime()>=c.getTime()?r:r-1}function j(e){n(1,arguments);var t=S(e),a=new Date(0);a.setUTCFullYear(t,0,4),a.setUTCHours(0,0,0,0);var r=L(a);return r}var N=6048e5;function U(e,r){n(1,arguments);var i=r||{},o=i.locale,s=o&&o.options&&o.options.weekStartsOn,c=null==s?0:t(s),u=null==i.weekStartsOn?c:t(i.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=a(e),l=d.getUTCDay(),m=(l<u?7:0)+l-u;return d.setUTCDate(d.getUTCDate()-m),d.setUTCHours(0,0,0,0),d}function q(e,r){n(1,arguments);var i=a(e,r),o=i.getUTCFullYear(),s=r||{},c=s.locale,u=c&&c.options&&c.options.firstWeekContainsDate,d=null==u?1:t(u),l=null==s.firstWeekContainsDate?d:t(s.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=new Date(0);m.setUTCFullYear(o+1,0,l),m.setUTCHours(0,0,0,0);var f=U(m,r),h=new Date(0);h.setUTCFullYear(o,0,l),h.setUTCHours(0,0,0,0);var g=U(h,r);return i.getTime()>=f.getTime()?o+1:i.getTime()>=g.getTime()?o:o-1}function Y(e,a){n(1,arguments);var r=a||{},i=r.locale,o=i&&i.options&&i.options.firstWeekContainsDate,s=null==o?1:t(o),c=null==r.firstWeekContainsDate?s:t(r.firstWeekContainsDate),u=q(e,a),d=new Date(0);d.setUTCFullYear(u,0,c),d.setUTCHours(0,0,0,0);var l=U(d,a);return l}var A=6048e5;function W(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),i=a%60;if(0===i)return n+String(r);var o=t||"";return n+String(r)+o+b(i,2)}function F(e,t){return e%60==0?(e>0?"-":"+")+b(Math.abs(e)/60,2):O(e,t)}function O(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+b(Math.floor(r/60),2)+n+b(r%60,2)}const I={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return T(e,t)},Y:function(e,t,n,a){var r=q(e,a),i=r>0?r:1-r;return"YY"===t?b(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):b(i,t.length)},R:function(e,t){return b(S(e),t.length)},u:function(e,t){return b(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return b(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return b(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return k(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return b(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,t,r,i){var o=function(e,t){n(1,arguments);var r=a(e),i=U(r,t).getTime()-Y(r,t).getTime();return Math.round(i/A)+1}(e,i);return"wo"===t?r.ordinalNumber(o,{unit:"week"}):b(o,t.length)},I:function(e,t,r){var i=function(e){n(1,arguments);var t=a(e),r=L(t).getTime()-j(t).getTime();return Math.round(r/N)+1}(e);return"Io"===t?r.ordinalNumber(i,{unit:"week"}):b(i,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):D(e,t)},D:function(e,t,r){var i=function(e){n(1,arguments);var t=a(e),r=t.getTime();t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0);var i=t.getTime(),o=r-i;return Math.floor(o/P)+1}(e);return"Do"===t?r.ordinalNumber(i,{unit:"dayOfYear"}):b(i,t.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return b(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return b(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return b(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return C(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):E(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):b(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):b(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):M(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):x(e,t)},S:function(e,t){return _(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return F(r);case"XXXX":case"XX":return O(r);case"XXXXX":case"XXX":default:return O(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return F(r);case"xxxx":case"xx":return O(r);case"xxxxx":case"xxx":default:return O(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+W(r,":");case"OOOO":default:return"GMT"+O(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+W(r,":");case"zzzz":default:return"GMT"+O(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return b(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return b((a._originalDate||e).getTime(),t.length)}};function z(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function H(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const B={p:H,P:function(e,t){var n,a=e.match(/(P+)(p+)?/),r=a[1],i=a[2];if(!i)return z(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",z(r,t)).replace("{{time}}",H(i,t))}};function X(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var Q=["D","DD"],G=["YY","YYYY"];function R(e){return-1!==Q.indexOf(e)}function $(e){return-1!==G.indexOf(e)}function J(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var Z=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,K=/^'([^]*?)'?$/,ee=/''/g,te=/[a-zA-Z]/;function ne(e,r,i){n(2,arguments);var o=String(r),s=i||{},c=s.locale||w,d=c.options&&c.options.firstWeekContainsDate,l=null==d?1:t(d),m=null==s.firstWeekContainsDate?l:t(s.firstWeekContainsDate);if(!(m>=1&&m<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=c.options&&c.options.weekStartsOn,h=null==f?0:t(f),g=null==s.weekStartsOn?h:t(s.weekStartsOn);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!c.localize)throw new RangeError("locale must contain localize property");if(!c.formatLong)throw new RangeError("locale must contain formatLong property");var p=a(e);if(!u(p))throw new RangeError("Invalid time value");var v=X(p),b=y(p,v),T={firstWeekContainsDate:m,weekStartsOn:g,locale:c,_originalDate:p},k=o.match(V).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,B[t])(e,c.formatLong,T):e})).join("").match(Z).map((function(t){if("''"===t)return"'";var n=t[0];if("'"===n)return ae(t);var a=I[n];if(a)return!s.useAdditionalWeekYearTokens&&$(t)&&J(t,r,e),!s.useAdditionalDayOfYearTokens&&R(t)&&J(t,r,e),a(b,t,c.localize,T);if(n.match(te))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return t})).join("");return k}function ae(e){return e.match(K)[1].replace(ee,"'")}let re=0;const ie=(e,o,u,d)=>{const l=new Date(Date.now()),m=re++;return{title:e,description:o,priority:d,dueDate:u,getTaskID:()=>m,isComplete:!1,toggleCompletionStatus:function(){return!1===this.isComplete?this.isComplete=!0:this.isComplete=!1,this},parseDueDate:function(){const e=function(e,o){if(n(2,arguments),!o||"object"!=typeof o)return new Date(NaN);var s="years"in o?t(o.years):0,c="months"in o?t(o.months):0,u="weeks"in o?t(o.weeks):0,d="days"in o?t(o.days):0,l="hours"in o?t(o.hours):0,m="minutes"in o?t(o.minutes):0,f="seconds"in o?t(o.seconds):0,h=a(e),g=c||s?i(h,c+12*s):h,p=d||u?r(g,d+7*u):g,w=1e3*(f+60*(m+60*l));return new Date(p.getTime()+w)}(new Date(Date.now()),{days:7});if(function(e){return n(1,arguments),s(e,c(Date.now(),1))}(u))return"Yesterday";if(function(e){return n(1,arguments),a(e).getTime()<Date.now()}(u))return"Past Due";if(function(e){return n(1,arguments),s(e,Date.now())}(u))return"Today";if(function(e){return n(1,arguments),s(e,r(Date.now(),1))}(u))return"Tomorrow";if(function(e,t){n(2,arguments);var r=a(e).getTime(),i=a(t.start).getTime(),o=a(t.end).getTime();if(!(i<=o))throw new RangeError("Invalid interval");return r>=i&&r<=o}(u,{start:new Date(Date.now()),end:e})){if(function(e){return n(1,arguments),0===a(e).getDay()}(u))return"Sunday";if(function(e){return n(1,arguments),1===a(e).getDay()}(u))return"Monday";if(function(e){return n(1,arguments),2===a(e).getDay()}(u))return"Tuesday";if(function(e){return n(1,arguments),3===a(e).getDay()}(u))return"Wednesday";if(function(e){return n(1,arguments),4===a(e).getDay()}(u))return"Thursday";if(function(e){return n(1,arguments),5===a(e).getDay()}(u))return"Friday";if(function(e){return n(1,arguments),6===a(e).getDay()}(u))return"Saturday"}return ne(u,"MMM do',' yyyy")},parseDateAdded:function(){return ne(l,"MMM do',' yyyy")}}};let oe=0;const se=(e,t)=>{const n=oe++,a=[];return{getTitle:()=>e,getDescription:()=>t,getProjectID:()=>n,getTodoTasks:function(){return a},addTodoTask:function(e){a.push(e)},removeTodoTask:function(e){let t=e.getTaskID(),n=a.findIndex((e=>e.getTaskID()===t));a.splice(n,1)}}},ce=function(){const e=document.querySelector(".main-content"),t=document.querySelector(".sidebar__projects");function n(){const t=e.childNodes;for(let n=t.length-1;n>0;n--)e.removeChild(t[n])}function a(t){t.forEach((t=>{const n=document.createElement("div");n.classList.add("task");const a=document.createElement("div");a.classList.add("task__shrunk");const r=document.createElement("div");r.classList.add("task__checkmark"),!0===t.isComplete?r.innerText="☑":r.innerText="☐",r.setAttribute("data-id",t.getTaskID()),r.tabIndex=0;const i=document.createElement("div");i.classList.add("task__title",`task__title--priority${t.priority}`),i.innerText=t.title,i.setAttribute("data-id",t.getTaskID()),i.tabIndex=0;const o=document.createElement("div");o.classList.add("task__due-date");const s=t.parseDueDate();o.innerText=s,o.setAttribute("data-id",t.getTaskID());const c=document.createElement("button");c.classList.add("task__delete"),c.setAttribute("data-id",t.getTaskID()),c.innerText="Delete",a.append(r,i,o,c),n.append(a),e.append(n)}))}function r(t){console.log(t);const n=document.createElement("div");n.classList.add("sort-bar");const a=document.createElement("button");a.classList.add("link","sort__checkmark"),a.innerText="☑",a.addEventListener("click",(function(){i(Ce.sortTasksByCompletionStatus(t))}));const r=document.createElement("button");r.classList.add("link","sort__priority"),r.innerText="Priority",r.addEventListener("click",(function(){console.log(t),i(Ce.sortTasksByPriority(t))}));const o=document.createElement("button");o.classList.add("link","sort__due-date"),o.innerText="Due Date",o.addEventListener("click",(function(){i(Ce.sortTasksByDueDate(t))})),n.append(a,r,o),e.append(n)}function i(t){!function(){const t=e.childNodes;for(let n=t.length-1;n>0;n--)t[n].className.includes("task")&&e.removeChild(t[n])}(),a(t),Ce.captureButtons()}function o(){const e=t.childNodes;for(let n=e.length-1;n>0;n--)t.removeChild(e[n])}function s(e,t){e.classList.toggle(t)}return{clearMainContent:n,displayTasksPage:function(t){!function(){const t=document.createElement("div");t.classList.add("tasks__header");const n=document.createElement("h3");n.classList.add("project-header__title"),n.innerText="All Tasks",t.append(n),e.append(t)}(),r(t),a(t)},taskView:function(e,t){const n=e.parentElement.parentElement;"true"!==n.dataset.expanded?(n.classList.add("task--expanded-height"),n.dataset.expanded=!0,window.setTimeout((function(){!function(e,t){const n=document.createElement("div");n.classList.add("task__more");const a=document.createElement("div");a.innerText=t.description,a.classList.add("task__description");const r=document.createElement("div");r.innerText=`Added: ${t.parseDateAdded()}`,r.classList.add("task__date-added");const i=document.createElement("button");i.innerText="Edit",i.classList.add("task__edit"),i.setAttribute("data-id",t.getTaskID()),n.append(a,r,i),e.append(n)}(n,t)}),200)):function(e){e.removeChild(e.lastChild),e.classList.remove("task--expanded-height"),e.dataset.expanded=!1}(n)},toggleCompletionIcon:function(e){"☑"===e.innerText?e.innerText="☐":e.innerText="☑"},clearProjectsList:o,toggleActiveStatus:s,displayProjects:function(i,o){o.forEach((o=>{const c=document.createElement("button");c.classList.add("link","projects__project"),c.innerText=o.getTitle(),c.addEventListener("click",(i=>{i.stopPropagation(),function(i,o){i.classList.add("projects__project--active"),n(),function(a){const r=document.createElement("div");r.classList.add("project-header");const i=document.createElement("h3");i.classList.add("project-header__title"),i.innerText=a.getTitle();const o=document.createElement("p");o.classList.add("project-header__description"),o.innerText=a.getDescription();const s=document.createElement("button");s.classList.add("project-header__delete"),s.innerText="Delete",s.addEventListener("click",(function(){!function(e){confirm(`Do you really want to delete ${e.getTitle()}?`)&&(Ce.deleteProject(e),n(),t.click(),t.click())}(a)})),r.append(i,o,s),e.append(r)}(o),r(o.getTodoTasks()),a(o.getTodoTasks()),Ce.captureButtons(),function(e){const n=t.childNodes;for(let t=n.length-1;t>0;t--)n[t].className.includes("projects__project--active")&&n[t]!=e&&s(n[t],"projects__project--active")}(i)}(c,o)})),i.appendChild(c)}))},removeTask:function(e){e.remove()},taskForm:function(t,n){o();const a=document.createElement("div");a.classList.add("task-form__container");const r=document.createElement("form");r.classList.add("task-form");const i=document.createElement("div");i.classList.add("task-form__left-side");const s=document.createElement("input");s.classList.add("task-form__title"),s.setAttribute("type","text"),s.name="title",s.placeholder=" Title",s.required=!0,s.setAttribute("maxlength","25"),s.ariaLabel="task title";const c=document.createElement("textarea");c.classList.add("task-form__description"),c.name="description",c.placeholder=" Description",c.required=!0,c.setAttribute("maxlength","75"),c.ariaLabel="task description";const u=document.createElement("select");u.classList.add("task-form__projects"),u.name="project",u.required=!0,u.ariaLabel="select a project to which the task will be added";const d=document.createElement("option");d.setAttribute("value",""),d.innerText="Add to Project",d.disabled=!0,d.selected=!0,u.append(d);const l=document.createElement("option");l.setAttribute("value",""),l.innerText="No Project",u.append(l),t.forEach((e=>{const t=document.createElement("option");t.setAttribute("value",e.getTitle()),t.innerText=e.getTitle(),u.append(t)})),i.append(s,c,u);const m=document.createElement("div");m.classList.add("task-form__right-side");let f=0;const h=document.createElement("select");h.classList.add("task-form__priority"),h.name="priority",h.required=!0,h.ariaLabel="select a priority for the task";const g=document.createElement("option");g.setAttribute("value",""),g.innerText="Choose Priority",g.disabled=!0,g.selected=!0,h.append(g),["Low","Medium","High"].forEach((e=>{const t=document.createElement("option");t.setAttribute("value",++f),t.innerText=e,h.append(t)}));const p=document.createElement("div");p.classList.add("task-form__form-group");const w=document.createElement("label");w.classList.add("task-form__due-date-label"),w.setAttribute("for","due-date"),w.innerText="Due Date:";const v=document.createElement("input");v.classList.add("task-form__due-date"),v.setAttribute("type","date"),v.name="due-date",v.required=!0,p.append(w,v);const y=document.createElement("input");y.classList.add("task-form__submit"),y.setAttribute("type","submit"),y.value="Save",n&&(s.value=n.title,c.value=n.description,t.forEach((e=>{e.getTodoTasks().includes(n)&&(u.value=e.getTitle())})),h.value=n.priority,v.valueAsDate=n.dueDate),m.append(h,p,y),r.append(i,m),a.append(r),e.appendChild(a)},newProjectForm:function(){o();const t=document.createElement("div");t.classList.add("project-form__container");const n=document.createElement("form");n.classList.add("project-form");const a=document.createElement("input");a.classList.add("project-form__title"),a.setAttribute("type","text"),a.name="title",a.placeholder=" Project Title",a.required=!0,a.setAttribute("maxlength","26"),a.ariaLabel="project title";const r=document.createElement("textarea");r.classList.add("project-form__description"),r.name="description",r.placeholder=" Description",r.required=!0,r.setAttribute("maxlength","75"),r.ariaLabel="project description";const i=document.createElement("input");i.classList.add("project-form__submit"),i.setAttribute("type","submit"),i.value="Save",n.append(a,r,i),t.append(n),e.append(t)}}}();var ue=36e5,de={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},le=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,me=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,fe=/^([+-])(\d{2})(?::?(\d{2}))?$/;function he(e,a){n(1,arguments);var r=a||{},i=null==r.additionalDigits?2:t(r.additionalDigits);if(2!==i&&1!==i&&0!==i)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var o,s=ge(e);if(s.date){var c=pe(s.date,i);o=we(c.restDateString,c.year)}if(isNaN(o)||!o)return new Date(NaN);var u,d=o.getTime(),l=0;if(s.time&&(l=ye(s.time),isNaN(l)||null===l))return new Date(NaN);if(!s.timezone){var m=new Date(d+l),f=new Date(0);return f.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),f.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),f}return u=Te(s.timezone),isNaN(u)?new Date(NaN):new Date(d+l+u)}function ge(e){var t,n={},a=e.split(de.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?(n.date=null,t=a[0]):(n.date=a[0],t=a[1],de.timeZoneDelimiter.test(n.date)&&(n.date=e.split(de.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var r=de.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function pe(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:null};var r=a[1]&&parseInt(a[1]),i=a[2]&&parseInt(a[2]);return{year:null==i?r:100*i,restDateString:e.slice((a[1]||a[2]).length)}}function we(e,t){if(null===t)return null;var n=e.match(le);if(!n)return null;var a=!!n[4],r=ve(n[1]),i=ve(n[2])-1,o=ve(n[3]),s=ve(n[4]),c=ve(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,s,c)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,s,c):new Date(NaN);var u=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(ke[t]||(De(e)?29:28))}(t,i,o)&&function(e,t){return t>=1&&t<=(De(e)?366:365)}(t,r)?(u.setUTCFullYear(t,i,Math.max(r,o)),u):new Date(NaN)}function ve(e){return e?parseInt(e):1}function ye(e){var t=e.match(me);if(!t)return null;var n=be(t[1]),a=be(t[2]),r=be(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,r)?n*ue+6e4*a+1e3*r:NaN}function be(e){return e&&parseFloat(e.replace(",","."))||0}function Te(e){if("Z"===e)return 0;var t=e.match(fe);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),r=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,r)?n*(a*ue+6e4*r):NaN}var ke=[31,null,31,30,31,30,31,31,30,31,30,31];function De(e){return e%400==0||e%4==0&&e%100}const Ce=(()=>{const e=[];window.tasks=e;const t=[],n=ie("clean","clean the whole house",new Date("May 30, 2021 23:15:30"),"1");window.item1=n,e.push(n);const a=ie("work","work hard",new Date("May 23, 2021 23:15:30"),"2");window.item2=a,e.push(a);const r=ie("study","daily house chores to be done Monday-Friday, twice a day, and without fail",new Date("May 26, 2021 23:15:30"),"3");window.item3=r,e.push(r);const i=ie("harvest spinach","spinach is fully mature and needs to be harvested",new Date("May 26, 2021 23:15:30"),"2");window.item4=i,e.push(i);const o=ie("plant tomatoes","plant tomatoes where the spinach was growing (don't forget to add fertilizer!)",new Date("May 26, 2021 23:15:30"),"1");window.item5=o,e.push(o);const s=se("House Chores","daily house chores to be done Monday-Friday, twice a day, and without fail.");window.proj1=s,s.addTodoTask(n),s.addTodoTask(a),t.push(s);const c=se("Make Todo App","work on it every day");window.proj2=c,c.addTodoTask(r),t.push(c);const u=se("Third Project","do it good");t.push(u),window.projects=t,ce.displayTasksPage(e),h();const d=document.querySelector(".sidebar__tasks"),l=document.querySelector(".sidebar__projects"),m=document.querySelector(".header__new-task-link"),f=document.querySelector(".header__new-project-link");function h(){document.querySelectorAll(".task__delete").forEach((e=>e.addEventListener("click",(function(){!function(e){confirm("You want to delete this task?")&&(v(e.dataset.id),w(e.dataset.id),ce.removeTask(e.parentElement.parentElement))}(e)}))));const t=document.querySelectorAll(".task__checkmark");t.forEach((t=>t.addEventListener("click",(function(){!function(t){const n=t.dataset.id;e.find((e=>e.getTaskID()===parseInt(n))).toggleCompletionStatus(),ce.toggleCompletionIcon(t)}(t)})))),t.forEach((e=>e.addEventListener("keypress",(function(t){"Enter"===t.key&&e.click()}))));const n=document.querySelectorAll(".task__title");n.forEach((e=>e.addEventListener("click",(function(){g(e)})))),n.forEach((e=>e.addEventListener("keypress",(function(t){"Enter"===t.key&&e.click()})))),document.querySelectorAll(".task__due-date").forEach((e=>e.addEventListener("click",(function(){g(e)}))))}function g(n){const a=n.dataset.id,r=e.find((e=>e.getTaskID()===parseInt(a)));ce.taskView(n,r),window.setTimeout((function(){!function(n,a){const r=document.querySelector(`.task__edit[data-id='${a}']`);r&&r.addEventListener("click",(function(){ce.clearMainContent(),ce.taskForm(t,n),document.querySelector(".task-form").addEventListener("submit",(function(t){t.preventDefault();const a=document.querySelector(".task-form");!function(e,t){console.log(t),t.title=e.get("title"),t.description=e.get("description");const n=e.get("project");t.priority=e.get("priority"),t.dueDate=he(e.get("due-date")),v(t.getTaskID()),p(t,n)}(new FormData(a),n),ce.clearMainContent(),ce.displayTasksPage(e),h()}))}))}(r,a)}),200)}function p(e,n){console.log(n),""!==n&&t.find((e=>e.getTitle()===n)).addTodoTask(e)}function w(t){const n=e.findIndex((e=>e.getTaskID()===parseInt(t)));e.splice(n,1)}function v(n){const a=e.find((e=>e.getTaskID()===parseInt(n)));t.forEach((e=>{e.getTodoTasks().includes(a)&&e.removeTodoTask(a)}))}return d.addEventListener("click",(function(){l.parentElement.className.includes("sidebar--active")&&(ce.clearProjectsList(),ce.toggleActiveStatus(l.parentElement,"sidebar--active")),ce.clearMainContent(),ce.displayTasksPage(e),h()})),l.addEventListener("click",(function(){if(l.parentElement.className.includes("sidebar--active"))return ce.toggleActiveStatus(l.parentElement,"sidebar--active"),void ce.clearProjectsList();ce.toggleActiveStatus(l.parentElement,"sidebar--active"),ce.displayProjects(l,t)})),m.addEventListener("click",(function(){ce.clearMainContent(),ce.taskForm(t),document.querySelector(".task-form").addEventListener("submit",(t=>{t.preventDefault();const n=document.querySelector(".task-form");!function(t){const n=t.get("title"),a=t.get("description"),r=t.get("project"),i=t.get("priority"),o=he(t.get("due-date")),s=ie(n,a,o,i);e.push(s),p(s,r)}(new FormData(n)),ce.clearMainContent(),ce.displayTasksPage(e),h()}))})),f.addEventListener("click",(function(){ce.clearMainContent(),ce.newProjectForm(),document.querySelector(".project-form").addEventListener("submit",(()=>{const n=document.querySelector(".project-form"),a=new FormData(n);console.log(a.get("title")),function(e){const n=e.get("title"),a=e.get("description"),r=se(n,a);t.push(r)}(a),ce.clearMainContent(),ce.displayTasksPage(e),h()}))})),{captureButtons:h,deleteProject:function(e){!function(e){confirm("Do you also want to delete its tasks?")&&e.getTodoTasks().forEach((e=>w(e.getTaskID())))}(e);const n=t.findIndex((t=>t.getProjectID()===e.getProjectID()));t.splice(n,1)},sortTasksByCompletionStatus:function(e){return e.slice().sort(((e,t)=>e.isComplete-t.isComplete))},sortTasksByDueDate:function(e){return e.slice().sort(((e,t)=>e.dueDate-t.dueDate))},sortTasksByPriority:function(e){return e.slice().sort(((e,t)=>t.priority-e.priority))}}})()})();