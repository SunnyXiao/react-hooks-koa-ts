const gulp = require('gulp');
const babel = require('gulp-babel');


gulp.task('default', () => gulp
  .src('./src/nodeui-graphql/**/*.ts')
  .pipe(
    // 使用 .babelrc 配置
    babel()
  )
  .pipe(gulp.dest('./dist/serve')));

if (process.env.NODE_ENV !== 'production') {
  gulp.watch('./src/nodeui-graphql/**/*.ts', gulp.series('default'));
}
