var fs = require("fs");
var path = require("path");
var gunzip = require("gunzip-file");
var parse = require("csv-parse");
var transform = require("stream-transform");

var file = process.argv[2];

const convert = file => {
  var output = process.stdout;
  if (process.argv.length > 3) {
    output = fs.createWriteStream(process.argv[3]);
  }

  var input = fs.createReadStream(file);

  var parser = parse({
    columns: null,
    delimiter: ";",
    skip_lines_with_error: true
  });

  var transformer = transform((rec, cb) => {
    var newRec = [];
    rec.forEach(e => newRec.push(e.replace(/\u0000/gim, "")));

    [, date, , , value] = newRec;

    var newDate = date.replace(
      /(\d{2})\/(\d{2})\/(\d{4}) (\d{2})\.(\d{2})\.(\d{2})/g,
      "$1.$2.$3"
    );
    var time = date.replace(
      /(\d{2})\/(\d{2})\/(\d{4}) (\d{2})\.(\d{2})\.(\d{2})/g,
      "$4:$5"
    );

    cb(null, `${newDate};${time};${value}\r\n`);
  });

  input
    .pipe(parser)
    .pipe(transformer)
    .pipe(output);
};

const main = () => {
  if (path.extname(file) === ".gz") {
    console.log(`${file} is a gzip ...`);
    unpacked = path.basename(file, ".gz");
    gunzip(file, unpacked, err => {
      if (err) {
        console.log(err);
      }
      file = unpacked;
      convert(file);
    });
  } else {
    console.log(`${file} is not a gzip ...`);
    convert(file);
  }
};

main();
