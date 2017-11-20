import { FaceBlinder } 		from '../../'
//const twoFaceFile = `${__dirname}/../examples/image/zhizunbao-zixia.jpg`
//const zixiaFile   = `${__dirname}/../examples/image/zixia.jpg`
const hubinFile = '/home/neon/Desktop/download/1.jpg'
async function main() {

  const faceBlinder = new FaceBlinder()
  await faceBlinder.init()

 
//  const zixia = await faceBlinder.see(zixiaFile)
//  await faceBlinder.remember(hubin[0], 'Hubin')

  const hubin = await faceBlinder.see(hubinFile)
  //const faceList = await faceBlinder.see(twoFaceFile)
  const recognizedZixia     = await faceBlinder.recognize(hubin[0]) || `I don't know the person`
//  const recognizedZhizunbao = await faceBlinder.recognize(zixia[0]) || `I don't know the person`
  console.log(`Recognize hubin     result: ${recognizedZixia}`)

//  console.log(`Recognize Zhizunbao result: ${recognizedZhizunbao}`)

  faceBlinder.quit()
}

main()
.catch(console.error)
