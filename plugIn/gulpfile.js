import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sass from 'sass'
import rename from 'gulp-rename';

const sassCompiler = gulpSass(sass)

export function styles() {
    return gulp.src('content/*.scss')
    .pipe(sassCompiler().on('err', sassCompiler.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/content'))
}
gulp.task('watch', function() {
    gulp.watch('content/*.scss', gulp.series('styles'));
});
export default gulp.series(styles)