function htmlFiller(body, title) {
  return (`
     <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title ? title : "Node Test"}</title>
        </head>
        <body>
          ${body ? body : "<h1>Nothing Found</h1>"}
        </body>
      </html>
  `);
};

module.exports = htmlFiller;