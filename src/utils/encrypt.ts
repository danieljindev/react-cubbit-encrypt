export const encrypt = (data: string, key: string) => {
  console.log('data: ');
  console.log(data);
  //Split message into chunks of keysize
  var chunks, n;
  n = getN(key);
  console.log(n);
  chunks = chunkSubstr(data, key.length);
  console.log('chunks: ');
  console.log(chunks);
  var encrypted_chunks = chunks.map((chunk) => {
    //Reverse each chunk
    var this_chunk = reverseString(chunk);

    //Shift each character by n
    this_chunk = this_chunk
      .split('')
      .map((elem) => shiftUpByN(elem, n))
      .join('');
    console.log(this_chunk);
    this_chunk = reverseString(this_chunk);
    return this_chunk;
  });
  var encrypted_str = encrypted_chunks.join('');
  return encrypted_str;
};

export const decrypt = (data: string, key: string) => {
  //Split message into chunks of keysize
  var chunks, n;
  n = getN(key);
  console.log(n);
  chunks = chunkSubstr(data, key.length);
  var decrypted_chunks = chunks.map((chunk) => {
    //Reverse each chunk
    var this_chunk = reverseString(chunk);

    //Shift each character by n
    this_chunk = this_chunk
      .split('')
      .map((elem) => shiftDownByN(elem, n))
      .join('');
    console.log(this_chunk);
    this_chunk = reverseString(this_chunk);
    return this_chunk;
  });
  var decrypted_str = decrypted_chunks.join('');
  return decrypted_str;
};

function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
}

function reverseString(str: string) {
  return str.split('').reverse().join('');
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function getN(key: string) {
  return (
    key
      .split('')
      .map((elem) => elem.charCodeAt(0))
      .reduce(reducer) % 94
  );
}
function shiftUpByN(val: string, n: number) {
  if (32 <= val.charCodeAt(0) && val.charCodeAt(0) <= 125) {
    if (val.charCodeAt(0) + n > 125) {
      return String.fromCharCode(31 + (val.charCodeAt(0) + n - 125));
    } else {
      return String.fromCharCode(val.charCodeAt(0) + n);
    }
  } else {
    console.log('here');
    return val;
  }
}

function shiftDownByN(val: string, n: number) {
  console.log(val);
  console.log(n);
  if (32 <= val.charCodeAt(0) && val.charCodeAt(0) <= 125) {
    if (val.charCodeAt(0) - n < 32) {
      return String.fromCharCode(125 + (val.charCodeAt(0) - 31) - n);
    } else {
      return String.fromCharCode(val.charCodeAt(0) - n);
    }
  } else {
    return val;
  }
}
