import { Transform } from "stream";
import { create } from "domain";
import { lstat } from "fs";

const createCacheStream = (cache, streamingStart) => {
  const bufferedChunks = [];
  return new Transform({
    // transform() is called with each chunk of data
    transform(data, enc, cb) {
      // We store the chunk of data (which is a Buffer) in memory
      bufferedChunks.push(data);
      // Then pass the data unchanged onwards to the next stream
      cb(null, data);
    },

    // flush() is called when everything is done
    flush(cb) {
      // We concatenate all the buffered chunks of HTML to get the full HTML
      // then cache it at "key"

      // console.log(cache);
      // console.log(bufferedChunks.join());
      // cache.set(key, Buffer.concat(bufferedChunks));
      // console.log("final", streamingStart.finalSliceStart);
      //joinedChunks = bufferedChunks.join(""); 
      let html = bufferedChunks.join("");
      delete streamingStart.sliceStartCount; 

      for (let component in streamingStart) {
        let tagStack = [];
        let tagStart;
        let tagEnd;

        do {
          if (!tagStart) tagStart = streamingStart[component];
          else tagStart = (html[tagEnd] === '<') ? tagEnd : html.indexOf('<', tagEnd);
          tagEnd = html.indexOf('>', tagStart) + 1;
          // Skip stack logic for void/self-closing elements and HTML comments 
          // Note: Does not account for tags inside HTML comments
          if (html[tagEnd - 2] !== '/' && html[tagStart + 1] !== '!') {
            // Push opening tags onto stack; pop closing tags off of stack
            if (html[tagStart + 1] !== '/') tagStack.push(html.slice(tagStart, tagEnd));
            else tagStack.pop();
          }
        } while (tagStack.length !== 0);
        //console.log(html.slice(streamingStart[component], tagEnd));
        // cache component by slicing 'html'
        cache.storage.set(component, html.slice(streamingStart[component], tagEnd));
      }
      //console.log("to be saved:", bufferedChunks.join(""));
      cb();
    }
  });
};

export default createCacheStream;
