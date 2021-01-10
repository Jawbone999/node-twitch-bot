/**
 * Commands:
 * - gulp clean: delete compiled code
 * - gulp compile: compile code in preparation for deployment
 * - gulp app: compile and run a new application app
 * - gulp watch: compile code and start the node process while watching for code changes so it can re-compile as needed
 * - gulp: compile code in preparation for deployment
 */

const gulp = require("gulp");
const ts = require("gulp-typescript");
const clean = require("gulp-clean");

const spawn = require("child_process").spawn;
const tsProject = ts.createProject("tsconfig.json");

// Variable to store the node process between gulp app runs
let node;

/**
 * Delete all files and folders in the release folder.
 */
function cleanTask() {
  return gulp.src("release", { read: false, allowEmpty: true }).pipe(clean());
}

/**
 * Compile TypeScript source code using type declarations.
 * Turns it into ES5 JavaScript code and uglifies it.
 */
function compileTask() {
  const tsResult = gulp
    .src([
      "./src/**/*.ts", // source TypeScript files
      "./types/**/*.d.ts", // custom TypeScript type declarations
      "./node_modules/@types/**/*.d.ts", // type declarations from node modules
    ])
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest("./release"));
}

/**
 * Try to run the application app.
 * @param {function} callback - run when done
 */
function appTask(callback) {
  // Kill the previously running app, if there is one
  if (node) {
    node.kill();
  }

  // Spawn a new node ChildProcess running the release app
  node = spawn("node", ["release/app.js"], { stdio: "inherit" });

  // Log errors on close
  node.on("close", (statusCode) => {
    if (statusCode === 8) {
      gulp.log("Error detected, waiting for changes...");
    }
  });

  // Signal that we are done with this task
  // This is necessary because we don't return anything
  callback();
}

/**
 * Re-run gulp app when changes in source code are detected.
 */
function watchTask() {
  gulp.watch(["./src/**/*.ts", "./configs/**/*"], gulp.series("app"));
}

/* Export functions for gulp to run as tasks. */

// gulp clean
exports.clean = cleanTask;

// gulp compile
exports.compile = gulp.series(exports.clean, compileTask);

// gulp app
exports.app = gulp.series(exports.compile, appTask);

// gulp watch
exports.watch = gulp.series(exports.app, watchTask);

// gulp
exports.default = exports.compile;
