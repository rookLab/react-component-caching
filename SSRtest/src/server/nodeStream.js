// import { Transform } from "stream";
// // import { create } from "domain";
// // import { lstat } from "fs";
// import { renderToNodeStream, renderToStaticNodeStream } from "../../ModifiedReact.js";

// const createCacheStream = (cache, streamingStart, memLife=0) => {
//   const bufferedChunks = [];
//   return new Transform({
//     // transform() is called with each chunk of data
//     transform(data, enc, cb) {
//       // We store the chunk of data (which is a Buffer) in memory
//       bufferedChunks.push(data);
//       // Then pass the data unchanged onwards to the next stream
//       cb(null, data);
//     },

//     // flush() is called when everything is done
//     flush(cb) {
//       // We concatenate all the buffered chunks of HTML to get the full HTML, then cache it at "key"
//       let html = bufferedChunks.join("");
//       delete streamingStart.sliceStartCount; 

//       for (let component in streamingStart) {
//         let tagStack = [];
//         let tagStart;
//         let tagEnd;

//         do {
//           if (!tagStart) tagStart = streamingStart[component];
//           else tagStart = (html[tagEnd] === '<') ? tagEnd : html.indexOf('<', tagEnd);
//           tagEnd = html.indexOf('>', tagStart) + 1;
//           // Skip stack logic for void/self-closing elements and HTML comments 
//           if (html[tagEnd - 2] !== '/' && html[tagStart + 1] !== '!') {
//             // Push opening tags onto stack; pop closing tags off of stack
//             if (html[tagStart + 1] !== '/') tagStack.push(html.slice(tagStart, tagEnd));
//             else tagStack.pop();
//           }
//         } while (tagStack.length !== 0);
//         // cache component by slicing 'html'
//         if (memLife) {
//           cache.set(component, html.slice(streamingStart[component], tagEnd), memLife, (err) => {
//             if(err) console.log(err)
//           });
//         } else {
//           cache.set(component, html.slice(streamingStart[component], tagEnd));
//         }
//       }
//       cb();
//     }
//   });
// };

// function nodeStream(compo, staticMarkup, cache, res, htmlSt, htmlEn){

//   const htmlStart = htmlSt;
//   // '<html><head><title>Page</title></head><body><div id="react-root">';

//   const htmlEnd = htmlEn;
//   // "</div></body></html>";

//   const streamingStart = {
//     sliceStartCount: htmlStart.length, 
//   }

//   const cacheStream = createCacheStream(cache, streamingStart);
//     cacheStream.pipe(res);
//     cacheStream.write(htmlStart);

//     const stream = staticMarkup? renderToStaticNodeStream(compo, cache, streamingStart) : renderToNodeStream(compo, cache, streamingStart);
//     stream.pipe(cacheStream, { end: false });
//     stream.on("end", () => {
//       cacheStream.end(htmlEnd);
//     });

// }

// export default nodeStream;
