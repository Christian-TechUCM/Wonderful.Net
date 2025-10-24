'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

//Adding new code here:
build.addSuppression(`Warning - [sass] src/extensions/wonderfulCoMegaMenu/components/WonderfulNavBar/NoHeader.scss: filename should end with module.sass or module.scss`);
build.addSuppression(`Warning - [sass] src/extensions/wonderfulCoMegaMenu/components/WonderfulNavBar/WonderfulStyles.scss: filename should end with module.sass or module.scss`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
